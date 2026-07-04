/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.scss";
import { Era } from "./components/Era/Era";
import { TimelinePath } from "./components/TimelinePath/TimelinePath";
import { clipPathAnimation, releases, centerX } from "./data/releases";
import type { connectionI } from "./data/releases";
// import {
//   debug_majoras_mask as releases,
// } from "./data/debug_releases";
import anime from "animejs/lib/anime.es.js";
import useStep from "./hooks/useStep";
import { AnimeInstance } from "animejs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import createPanZoom from "./panzoom/index.js";
import { centerWindow } from "./utils/centerWindow";
import { parseTransformMatrix } from "./utils/transformUtils";
import {
  ZOOM_DURATION,
  CENTER_PADDING,
  CENTER_EASING,
  GRID_VERTICAL_SPACING,
  GRID_HORIZONTAL_SPACING,
  CLIP_PATH_DURATION,
  CLIP_PATH_DELAY,
  ANIMATION_SPEED,
} from "./constants/variables.js";

/**
 * Asegura que un valor numérico o string numérico tenga la unidad "px".
 */
const ensurePx = (val: string | number): string => {
  if (typeof val === "number") {
    return `${val}px`;
  }
  if (val && !isNaN(Number(val))) {
    return `${val}px`;
  }
  return val as string;
};

/**
 * Obtiene la altura original de un elemento (si es una conexión vertical con un length definido).
 */
const getOriginalHeight = (id: string): string | number => {
  for (const r of releases) {
    const found = r.eras.find((e) => !("backgroundImage" in e) && e.id === id);
    if (found && !("backgroundImage" in found)) {
      const conn = found as connectionI;
      if (conn.orientation === "vertical" && conn.length !== undefined) {
        return conn.length;
      }
    }
  }
  return "";
};

/**
 * Determina si una conexión calcula sus extremos (from/to) de forma dinámica en runtime.
 */
const isDynamicConnection = (id: string): boolean => {
  for (const r of releases) {
    const found = r.eras.find((e) => !("backgroundImage" in e) && e.id === id);
    if (found && !("backgroundImage" in found)) {
      const conn = found as connectionI;
      if (conn.from && conn.to) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Obtiene un array plano de animaciones de un bloque del timeline (objeto, sub-array, o wrapper).
 */
const getAnimsFromBlock = (block: any): any[] => {
  if (block && typeof block === "object" && "animations" in block) {
    return block.animations;
  }
  return [block];
};

/**
 * Componente principal de la aplicación TLoZ Timeline.
 *
 * Orquesta toda la experiencia interactiva:
 * - Renderiza las eras y conexiones del paso actual.
 * - Controla la navegación entre pasos (botones ← →).
 * - Ejecuta animaciones secuenciales de clip-path al avanzar.
 * - Gestiona el pan/zoom del canvas mediante la librería panzoom.
 * - Re-centra y ajusta la vista automáticamente cuando un paso lo requiere.
 */
/**
 * Resuelve la posición absoluta (left, top) de un elemento en base a sus propiedades
 * de grid (event y timeline), con fallback a la propiedad position tradicional.
 */
const resolvePosition = (release: any) => {
  const pos = release.position || {};
  const left =
    release.timeline !== undefined
      ? centerX + release.timeline * GRID_HORIZONTAL_SPACING
      : pos.left;
  const top =
    release.event !== undefined
      ? release.event * GRID_VERTICAL_SPACING
      : pos.top;
  return { left, top };
};

function App() {
  const { step, incrementStep, decrementStep } = useStep(releases.length - 1);
  const animationRef = useRef<AnimeInstance[]>([]);
  const canceledAnimation = useRef(false);
  const panzoomRef = useRef<any>();
  const transitionAbortRef = useRef<AbortController | null>(null);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const isTransitioningRef = useRef(false);
  const currentStepRef = useRef(step);
  const stepAnimationsCompletedRef = useRef<Set<number>>(new Set());
  const [title, setTitle] = useState(
    `${releases[step].name} - year ${releases[step].year}`
  );
  const [unmountedIds, setUnmountedIds] = useState<Set<string>>(new Set());

  /**
   * Obtiene la altura natural de un elemento (limpiando temporalmente su altura inline).
   */
  const getNaturalHeight = useCallback((el: HTMLElement): number => {
    const prevHeight = el.style.height;
    el.style.height = "";
    const naturalHeight = el.offsetHeight;
    el.style.height = prevHeight;
    return naturalHeight;
  }, []);

  /**
   * Obtiene la columna (timeline) base de una era consultando la base de datos de releases.
   */
  const getElementBaseTimeline = useCallback((id: string): number => {
    for (const r of releases) {
      if (r.eras) {
        const found = r.eras.find(
          (e) => ("backgroundImage" in e ? e.backgroundImage : e.id) === id
        );
        if (found) {
          return found.timeline !== undefined ? found.timeline : 0;
        }
      }
    }
    return 0;
  }, []);

  /**
   * Obtiene la definición base (el primer registro) de una era en las releases.
   */
  const getElementBaseDef = useCallback((id: string): any => {
    for (const r of releases) {
      if (r.eras) {
        const found = r.eras.find(
          (e) => ("backgroundImage" in e ? e.backgroundImage : e.id) === id
        );
        if (found) {
          return found;
        }
      }
    }
    return null;
  }, []);

  /**
   * Obtiene el estado esperado (x, y, height) de todos los elementos que alguna vez
   * han sido modificados por un desplazamiento en animations, calculando su estado acumulado en un paso específico.
   */
  const getElementsStateAtStep = useCallback(
    (targetStepIdx: number) => {
      const stateMap = new Map<
        string,
        { x: number; y: number; height: string | number }
      >();

      // Inicializar todos los IDs de desplazamientos a su valor por defecto (0, 0, originalHeight)
      releases.forEach((r) => {
        if (r.animations) {
          r.animations.forEach((animOrArray) => {
            const anims = getAnimsFromBlock(animOrArray);
            anims.forEach((anim) => {
              if (!("action" in anim) && "id" in anim) {
                const selectors = Array.isArray(anim.id) ? anim.id : [anim.id];
                selectors.forEach((id: string) => {
                  stateMap.set(id, {
                    x: 0,
                    y: 0,
                    height: getOriginalHeight(id),
                  });
                });
              }
            });
          });
        }
      });

      // Aplicar desplazamientos secuencialmente hasta el paso objetivo
      for (let i = 0; i <= targetStepIdx; i++) {
        const r = releases[i];
        if (r && r.resetAllPos) {
          stateMap.forEach((val, key) => {
            stateMap.set(key, {
              x: 0,
              y: 0,
              height: val.height,
            });
          });
        }
        if (r && r.eras) {
          r.eras.forEach((e) => {
            const id = ("backgroundImage" in e ? e.backgroundImage : e.id) || "";
            const baseDef = getElementBaseDef(id);
            if (baseDef) {
              const current = stateMap.get(id);
              if (current) {
                let nextX = current.x;
                let nextY = current.y;
                const eraE = e as any;
                if (
                  eraE.timeline !== undefined &&
                  baseDef.timeline !== undefined &&
                  eraE.timeline !== baseDef.timeline
                ) {
                  nextX = 0;
                }
                if (
                  eraE.event !== undefined &&
                  baseDef.event !== undefined &&
                  eraE.event !== baseDef.event
                ) {
                  nextY = 0;
                }
                stateMap.set(id, {
                  x: nextX,
                  y: nextY,
                  height: current.height,
                });
              }
            }
          });
        }

        if (r && r.animations) {
          r.animations.forEach((animOrArray) => {
            const anims = getAnimsFromBlock(animOrArray);
            anims.forEach((anim) => {
              if (!("action" in anim) && "id" in anim) {
                const selectors = Array.isArray(anim.id) ? anim.id : [anim.id];
                selectors.forEach((id: string) => {
                  const originalHeight = getOriginalHeight(id);
                  const current = stateMap.get(id) || {
                    x: 0,
                    y: 0,
                    height: originalHeight,
                  };
                  const baseTimeline = getElementBaseTimeline(id);
                  const shiftCols =
                    anim.timelineX !== undefined
                      ? anim.timelineX - baseTimeline
                      : 0;
                  const shiftX =
                    (anim.x !== undefined ? anim.x : 0) +
                    (anim.timelineX !== undefined
                      ? shiftCols * GRID_HORIZONTAL_SPACING
                      : 0);
                  const shiftY =
                    (anim.y !== undefined ? anim.y : 0) +
                    (anim.eventY !== undefined
                      ? anim.eventY * GRID_VERTICAL_SPACING
                      : 0);
                  stateMap.set(id, {
                    x: current.x + shiftX,
                    y: current.y + shiftY,
                    height:
                      anim.height !== undefined ? anim.height : current.height,
                  });
                });
              }
            });
          });
        }
      }

      return stateMap;
    },
    [getElementBaseTimeline, getElementBaseDef]
  );

  /**
   * Obtiene el estado esperado (x, y, height) antes de comenzar las animaciones secuenciales de un paso específico.
   * Acumula todos los desplazamientos hasta el paso anterior (targetStepIdx - 1), más los desplazamientos iniciales
   * que se encuentran al comienzo de la lista de animaciones de targetStepIdx.
   */
  const getElementsStateBeforeAnimations = useCallback(
    (targetStepIdx: number) => {
      // Comenzar con el estado al final del paso anterior
      const stateMap = getElementsStateAtStep(targetStepIdx - 1);

      const r = releases[targetStepIdx];
      if (r && r.resetAllPos) {
        stateMap.forEach((val, key) => {
          stateMap.set(key, {
            x: 0,
            y: 0,
            height: val.height,
          });
        });
      }
      if (r && r.eras) {
        r.eras.forEach((e) => {
          const id = ("backgroundImage" in e ? e.backgroundImage : e.id) || "";
          const baseDef = getElementBaseDef(id);
          if (baseDef) {
            const current = stateMap.get(id);
            if (current) {
              let nextX = current.x;
              let nextY = current.y;
              const eraE = e as any;
              if (
                eraE.timeline !== undefined &&
                baseDef.timeline !== undefined &&
                eraE.timeline !== baseDef.timeline
              ) {
                nextX = 0;
              }
              if (
                eraE.event !== undefined &&
                baseDef.event !== undefined &&
                eraE.event !== baseDef.event
              ) {
                nextY = 0;
              }
              stateMap.set(id, {
                x: nextX,
                y: nextY,
                height: current.height,
              });
            }
          }
        });
      }

      if (r && r.animations) {
        for (const animOrArray of r.animations) {
          const isParallelWrapper =
            animOrArray &&
            typeof animOrArray === "object" &&
            "parallel" in animOrArray &&
            "animations" in animOrArray &&
            animOrArray.parallel;

          const anims = getAnimsFromBlock(animOrArray);

          // Si el bloque es un wrapper paralelo, o si tiene acción, o si alguna animación tiene parallel, detenemos la acumulación
          const hasAction = anims.some(
            (anim: any) => "action" in anim && anim.action
          );
          const hasParallel = anims.some((anim: any) => anim.parallel);
          if (isParallelWrapper || hasAction || hasParallel) {
            break;
          }

          // Si no, es un desplazamiento inicial, por lo que lo acumulamos
          anims.forEach((anim) => {
            if (!("action" in anim) && "id" in anim) {
              const selectors = Array.isArray(anim.id) ? anim.id : [anim.id];
              selectors.forEach((id: string) => {
                const originalHeight = getOriginalHeight(id);
                const current = stateMap.get(id) || {
                  x: 0,
                  y: 0,
                  height: originalHeight,
                };
                const baseTimeline = getElementBaseTimeline(id);
                const shiftCols =
                  anim.timelineX !== undefined
                    ? anim.timelineX - baseTimeline
                    : 0;
                const shiftX =
                  (anim.x !== undefined ? anim.x : 0) +
                  (anim.timelineX !== undefined
                    ? shiftCols * GRID_HORIZONTAL_SPACING
                    : 0);
                const shiftY =
                  (anim.y !== undefined ? anim.y : 0) +
                  (anim.eventY !== undefined
                    ? anim.eventY * GRID_VERTICAL_SPACING
                    : 0);
                stateMap.set(id, {
                  x: current.x + shiftX,
                  y: current.y + shiftY,
                  height:
                    anim.height !== undefined ? anim.height : current.height,
                });
              });
            }
          });
        }
      }

      return stateMap;
    },
    [getElementsStateAtStep, getElementBaseTimeline, getElementBaseDef]
  );

  /**
   * Completa instantáneamente todas las animaciones activas:
   * - anime.js (clip-path y moveElements)
   * - centerWindow (rAF via AbortController)
   * - setTimeout pendiente para las animaciones secuenciales
   */
  const finishAllAnimations = useCallback(() => {
    // 1. Cancelar timeout pendiente de animaciones secuenciales
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    // Asegurar que TODOS los elementos de la animación del paso actual queden visibles
    const currentStepData = releases[currentStepRef.current];
    if (currentStepData && currentStepData.animations) {
      currentStepData.animations.forEach((animOrArray) => {
        const anims = getAnimsFromBlock(animOrArray);
        anims.forEach((anim) => {
          if ("action" in anim && anim.action) {
            const selectors = Array.isArray(anim.id) ? anim.id : [anim.id];
            selectors.forEach((selector: string) => {
              const query =
                selector === "all-elements"
                  ? "#main > *"
                  : selector.startsWith("#") || selector.startsWith(".")
                    ? selector
                    : `#${selector}`;
              const elements = document.querySelectorAll(query);
              elements.forEach((elNode) => {
                const el = elNode as HTMLElement;
                if (anim.action === "hide") {
                  el.style.opacity = "0";
                  el.style.visibility = "hidden";
                } else {
                  if (["up", "down", "left", "right"].includes(anim.action)) {
                    el.style.opacity = "1";
                    el.style.visibility = "visible";
                  }
                  if (clipPathAnimation[anim.action]) {
                    el.style.clipPath = clipPathAnimation[anim.action][1];
                  }
                }
              });
            });
          }
        });
      });
    }

    // 2. Completar todas las instancias de anime.js al instante
    canceledAnimation.current = true;
    animationRef.current.forEach((animation) => {
      if (animation) {
        animation.pause();
        animation.seek(animation.duration);
      }
    });
    canceledAnimation.current = false;
    animationRef.current = [];

    // 3. Abortar centerWindow (salta al estado final)
    if (transitionAbortRef.current) {
      transitionAbortRef.current.abort();
      transitionAbortRef.current = null;
    }

    // Marcar el paso actual como completado
    stepAnimationsCompletedRef.current.add(currentStepRef.current);

    isTransitioningRef.current = false;
  }, []);

  /**
   * Obtiene todos los IDs que se animarán o centrarán después de la animación de "all-elements"
   * en el paso actual, para evitar desmontarlos del DOM.
   */
  const getUpcomingIdsAfterAllElements = useCallback(
    (stepIdx: number): Set<string> => {
      const ids = new Set<string>();
      const animations = releases[stepIdx]?.animations || [];
      const idx = animations.findIndex(
        (a: any) =>
          a &&
          typeof a === "object" &&
          !("parallel" in a) &&
          a.id === "all-elements" &&
          a.action === "hide"
      );
      if (idx === -1) return ids;

      for (let i = idx + 1; i < animations.length; i++) {
        const block = animations[i];
        if (!block) continue;
        const anims = getAnimsFromBlock(block);
        anims.forEach((anim) => {
          if (anim) {
            if (anim.id) {
              const selectors = Array.isArray(anim.id) ? anim.id : [anim.id];
              selectors.forEach((sel: string) => ids.add(sel));
            }
            if (anim.center) {
              const centers = Array.isArray(anim.center)
                ? anim.center
                : [anim.center];
              centers.forEach((c: string) => ids.add(c));
            }
          }
        });
      }
      return ids;
    },
    []
  );

  /**
   * Anima un elemento individual usando clip-path con anime.js.
   *
   * @param element - Elemento DOM a animar. Debe tener un `id` y una propiedad `action`.
   * @param clipPathDirection - Dirección de la animación (`"up"`, `"down"`, `"left"`, o `"right"`).
   * @param onComplete - Callback que se ejecuta al completar la animación
   *   (solo si no fue cancelada por un cambio de paso).
   */
  const animateElement = useCallback(
    (anim: any, clipPathDirection: string, onComplete: () => void) => {
      let props: any = {};
      const action = anim.action;

      if (["up", "down", "left", "right"].includes(action)) {
        props = {
          opacity: [0, 1],
        };
      } else if (action === "hide") {
        props = {
          opacity: [1, 0],
        };
      }

      const clipPathValue = clipPathAnimation[clipPathDirection];
      const selectors = Array.isArray(anim.id) ? anim.id : [anim.id];

      // Before starting the animation, set visibility to visible if revealing
      if (action !== "hide") {
        selectors.forEach((selector: string) => {
          const query =
            selector === "all-elements"
              ? "#main > *"
              : selector.startsWith("#") || selector.startsWith(".")
                ? selector
                : `#${selector}`;
          document.querySelectorAll(query).forEach((elNode) => {
            const el = elNode as HTMLElement;
            el.style.visibility = "visible";
          });
        });
      }

      const targets = selectors
        .map((sel: string) => {
          if (sel === "all-elements") return "#main > *";
          return sel.startsWith("#") || sel.startsWith(".") ? sel : `#${sel}`;
        })
        .join(", ");

      animationRef.current.push(
        anime({
          targets,
          ...(clipPathValue ? { clipPath: clipPathValue } : {}),
          easing: "easeOutSine",
          duration: CLIP_PATH_DURATION,
          delay: CLIP_PATH_DELAY,
          ...props,
          complete: () => {
            // After completing the animation, set visibility to hidden if hiding
            if (action === "hide") {
              selectors.forEach((selector: string) => {
                const query =
                  selector === "all-elements"
                    ? "#main > *"
                    : selector.startsWith("#") || selector.startsWith(".")
                      ? selector
                      : `#${selector}`;
                document.querySelectorAll(query).forEach((elNode) => {
                  const el = elNode as HTMLElement;
                  el.style.visibility = "hidden";
                });
              });

              if (selectors.includes("all-elements")) {
                const upcoming = getUpcomingIdsAfterAllElements(
                  currentStepRef.current
                );
                const toUnmount = new Set<string>();
                releases[currentStepRef.current].eras.forEach((release) => {
                  const id =
                    ("backgroundImage" in release
                      ? release.backgroundImage
                      : release.id) || "";
                  if (!upcoming.has(id)) {
                    toUnmount.add(id);
                  }
                });
                setUnmountedIds(toUnmount);
              }
            }
            if (!canceledAnimation.current) onComplete();
          },
        })
      );
    },
    [getUpcomingIdsAfterAllElements]
  );

  /**
   * Anima un desplazamiento de layout individual (x, y, height) usando anime.js.
   */
  const animateLayoutShift = useCallback(
    (anim: any, onComplete: () => void) => {
      const selectors = Array.isArray(anim.id) ? anim.id : [anim.id];
      const promises = selectors.map((selector: string) => {
        const query =
          selector.startsWith("#") || selector.startsWith(".")
            ? selector
            : `#${selector}`;
        const el = document.querySelector(query) as HTMLElement;
        if (!el) return Promise.resolve();

        const cleanId = selector.startsWith("#") ? selector.slice(1) : selector;
        if (isDynamicConnection(cleanId)) return Promise.resolve();

        // Obtener el estado objetivo acumulado al final del paso actual
        const targetStates = getElementsStateAtStep(currentStepRef.current);
        const targetState = targetStates.get(selector) || {
          x: 0,
          y: 0,
          height: "",
        };

        // Obtener el estado inicial (antes de las animaciones del paso actual) de forma determinista
        const beforeStates = getElementsStateBeforeAnimations(
          currentStepRef.current
        );
        const startState = beforeStates.get(selector) || {
          x: 0,
          y: 0,
          height: getOriginalHeight(selector),
        };

        const diffX = Math.abs(startState.x - targetState.x) > 0.1;
        const diffY = Math.abs(startState.y - targetState.y) > 0.1;
        const diffHeight = startState.height !== targetState.height;

        if (!diffX && !diffY && !diffHeight) {
          return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
          const animeParams: any = {
            targets: query,
            translateX: [startState.x, targetState.x],
            translateY: [startState.y, targetState.y],
            easing: "easeOutSine",
            duration: ZOOM_DURATION,
            complete: () => {
              if (targetState.height === "") {
                el.style.height = "";
              }
              resolve();
            },
          };

          if (diffHeight) {
            let animStartHeight: any = startState.height;
            if (animStartHeight === "") {
              animStartHeight = getNaturalHeight(el);
            }
            let animTargetHeight: any = targetState.height;
            if (animTargetHeight === "") {
              animTargetHeight = getNaturalHeight(el);
            }
            animeParams.height = [
              ensurePx(animStartHeight),
              ensurePx(animTargetHeight),
            ];
          }

          const instance = anime(animeParams);
          animationRef.current.push(instance);
        });
      });

      Promise.all(promises).then(() => {
        if (!canceledAnimation.current) onComplete();
      });
    },
    [getElementsStateAtStep, getElementsStateBeforeAnimations, getNaturalHeight]
  );

  /**
   * Ejecuta animaciones de forma secuencial y paralela recursivamente.
   */
  const runSequentialAnimations = useCallback(
    (elements: any[], index: number) => {
      if (index >= elements.length) {
        // Al finalizar todas las animaciones del paso actual, lo marcamos como completado
        stepAnimationsCompletedRef.current.add(currentStepRef.current);
        return;
      }

      const anim = elements[index];

      const next = () => {
        runSequentialAnimations(elements, index + 1);
      };

      if (
        anim &&
        typeof anim === "object" &&
        "parallel" in anim &&
        "animations" in anim
      ) {
        // Ejecución de un lote (wrapper) en paralelo
        let abortController: AbortController | undefined;
        const promises = anim.animations.map((item: any) => {
          return new Promise<void>((resolve) => {
            if ("action" in item && item.action) {
              animateElement(item, item.action, resolve);
            } else if ("center" in item) {
              abortController = new AbortController();
              transitionAbortRef.current = abortController;
              centerWindow(
                panzoomRef,
                ZOOM_DURATION,
                CENTER_EASING,
                CENTER_PADDING,
                abortController.signal,
                getPendingMakeSpaceForStep(currentStepRef.current),
                item.center
              ).then(() => {
                if (transitionAbortRef.current === abortController) {
                  transitionAbortRef.current = null;
                }
                resolve();
              });
            } else {
              animateLayoutShift(item, resolve);
            }
          });
        });

        if (anim.parallel) {
          next(); // Avanza inmediatamente
        } else {
          Promise.all(promises).then(next); // Espera a todos
        }
      } else if (anim && typeof anim === "object" && "pause" in anim) {
        // Ejecución de una pausa/delay (frena las siguientes animaciones)
        const ms = (anim.pause * 1000) / ANIMATION_SPEED;
        animationTimeoutRef.current = setTimeout(() => {
          animationTimeoutRef.current = null;
          next();
        }, ms);
      } else {
        // Ejecución de un objeto de animación individual
        const isParallel = anim.parallel === true;
        const onComplete = () => {
          if (!isParallel) {
            next();
          }
        };

        if ("action" in anim && anim.action) {
          animateElement(anim, anim.action, onComplete);
        } else if ("center" in anim) {
          const abortController = new AbortController();
          transitionAbortRef.current = abortController;
          centerWindow(
            panzoomRef,
            ZOOM_DURATION,
            CENTER_EASING,
            CENTER_PADDING,
            abortController.signal,
            getPendingMakeSpaceForStep(currentStepRef.current),
            anim.center
          ).then(() => {
            if (transitionAbortRef.current === abortController) {
              transitionAbortRef.current = null;
            }
            onComplete();
          });
        } else {
          animateLayoutShift(anim, onComplete);
        }

        if (isParallel) {
          next();
        }
      }
    },
    [animateElement, animateLayoutShift]
  );

  // useEffect(() => {
  //   if (panzoomRef.current)
  //     panzoomRef.current.on("pan", () => {
  //       // console.log(panzoomRef.current.getClientRect());
  //     });
  // });

  useEffect(() => {
    const pz = createPanZoom(document.querySelector("main")!, {
      // bounds: true,
      // boundsPadding: 0.1,
      disableKeyboardInteraction: true,
    });
    panzoomRef.current = pz;

    // Calcular y aplicar el transform inicial instantáneamente
    // para que el contenido se vea centrado desde el primer frame.
    const main = document.querySelector("main")!;
    const children = Array.from(main.children) as HTMLElement[];
    const positionedChildren = children.filter(
      (child) =>
        child.classList.contains("externalBorder1") ||
        child.offsetLeft > 0 ||
        child.offsetTop > 0
    );
    if (positionedChildren.length > 0) {
      let minLeft = Infinity,
        minTop = Infinity,
        maxRight = -Infinity,
        maxBottom = -Infinity;
      for (const child of positionedChildren) {
        const left = child.offsetLeft;
        const top = child.offsetTop;
        minLeft = Math.min(minLeft, left);
        minTop = Math.min(minTop, top);
        maxRight = Math.max(maxRight, left + child.offsetWidth);
        maxBottom = Math.max(maxBottom, top + child.offsetHeight);
      }
      const contentWidth = maxRight - minLeft;
      const contentHeight = maxBottom - minTop;
      const p = CENTER_PADDING;
      const scale = Math.min(
        (main.clientWidth - p.left - p.right) / contentWidth,
        (main.clientHeight - p.top - p.bottom) / contentHeight
      );
      const targetX =
        p.left +
        (main.clientWidth - p.left - p.right) / 2 -
        (minLeft + contentWidth / 2) * scale;
      const targetY =
        p.top +
        (main.clientHeight - p.top - p.bottom) / 2 -
        (minTop + contentHeight / 2) * scale;
      pz.zoomAbs(0, 0, scale);
      pz.moveTo(targetX, targetY);
      pz.setMinZoom(scale * 0.95);

      const eraEl = main.querySelector(".externalBorder1") as HTMLElement;
      const eraWidth = eraEl ? eraEl.offsetWidth : 530;
      const eraHeight = eraEl ? eraEl.offsetHeight : 130;
      const initialMaxZoom =
        Math.min(main.clientWidth / eraWidth, main.clientHeight / eraHeight) *
        0.95;
      pz.setMaxZoom(initialMaxZoom);
    }
  }, []);

  // Ejecuta las animaciones iniciales para el paso 0 en el montaje del componente
  useEffect(() => {
    const initialRelease = releases[0];
    if (initialRelease.animations.length > 0) {
      runSequentialAnimations(initialRelease.animations, 0);
    } else {
      stepAnimationsCompletedRef.current.add(0);
    }
  }, [runSequentialAnimations]);

  /**
   * Convierte el mapa de estados calculados en la estructura esperada por centerWindow (pendingMakeSpace).
   */
  const getPendingMakeSpaceForStep = useCallback(
    (targetStepIdx: number) => {
      const targetStates = getElementsStateAtStep(targetStepIdx);
      return Array.from(targetStates.entries()).map(([id, state]) => ({
        ids: [id],
        x: state.x,
        y: state.y,
        height: state.height,
      }));
    },
    [getElementsStateAtStep]
  );

  /**
   * Calcula el zoom-out máximo (minZoom) para el paso actual basándose en los elementos en pantalla.
   */
  const calculateMinZoomForStep = useCallback(
    (stepIdx: number) => {
      const main = document.querySelector("main");
      if (!main) return 0;

      const children = Array.from(main.children) as HTMLElement[];
      const positionedChildren = children.filter(
        (child) =>
          child.classList.contains("externalBorder1") ||
          child.offsetLeft > 0 ||
          child.offsetTop > 0
      );
      if (positionedChildren.length === 0) return 0;

      const pendingMakeSpace = getPendingMakeSpaceForStep(stepIdx);
      const makeSpaceOffsets = new Map<string, { x: number; y: number }>();
      if (pendingMakeSpace) {
        for (const space of pendingMakeSpace) {
          for (const id of space.ids) {
            const cleanId = id.startsWith("#") ? id.slice(1) : id;
            makeSpaceOffsets.set(cleanId, { x: space.x, y: space.y });
          }
        }
      }

      let minLeft = Infinity,
        minTop = Infinity,
        maxRight = -Infinity,
        maxBottom = -Infinity;

      for (const child of positionedChildren) {
        const baseLeft = child.offsetLeft + main.scrollLeft;
        const baseTop = child.offsetTop + main.scrollTop;

        const computedStyle = window.getComputedStyle(child);
        const transform = computedStyle.transform;
        const { translateX, translateY, scale } =
          parseTransformMatrix(transform);

        const msOffset = makeSpaceOffsets.get(child.id);
        const finalTranslateX = msOffset ? msOffset.x : translateX;
        const finalTranslateY = msOffset ? msOffset.y : translateY;

        const left = baseLeft + finalTranslateX;
        const top = baseTop + finalTranslateY;
        const right = left + child.offsetWidth * scale;
        const bottom = top + child.offsetHeight * scale;

        minLeft = Math.min(minLeft, left);
        minTop = Math.min(minTop, top);
        maxRight = Math.max(maxRight, right);
        maxBottom = Math.max(maxBottom, bottom);
      }

      const contentWidth = maxRight - minLeft;
      const contentHeight = maxBottom - minTop;

      const containerWidth = main.clientWidth;
      const containerHeight = main.clientHeight;

      const p = CENTER_PADDING;
      const fitScale = Math.min(
        (containerWidth - p.left - p.right) / contentWidth,
        (containerHeight - p.top - p.bottom) / contentHeight
      );

      return fitScale * 0.95;
    },
    [getPendingMakeSpaceForStep]
  );

  /**
   * Calcula el zoom-in máximo (maxZoom) para evitar que una Era sea más grande que la pantalla.
   */
  const calculateMaxZoom = useCallback(() => {
    const main = document.querySelector("main");
    if (!main) return Number.POSITIVE_INFINITY;

    const eraEl = main.querySelector(".externalBorder1") as HTMLElement;
    const eraWidth = eraEl ? eraEl.offsetWidth : 530;
    const eraHeight = eraEl ? eraEl.offsetHeight : 130;

    const containerWidth = main.clientWidth;
    const containerHeight = main.clientHeight;

    const fitScale = Math.min(
      containerWidth / eraWidth,
      containerHeight / eraHeight
    );

    return fitScale * 0.95;
  }, []);

  /**
   * Anima todos los elementos modificados por makeSpace hacia sus posiciones y alturas
   * correspondientes en el paso objetivo.
   */
  const moveElementsToStep = useCallback(
    async (fromStepIdx: number, toStepIdx: number) => {
      const startStates = getElementsStateAtStep(fromStepIdx);
      const targetStates =
        toStepIdx > fromStepIdx
          ? getElementsStateBeforeAnimations(toStepIdx)
          : getElementsStateAtStep(toStepIdx);
      const promises: Promise<void>[] = [];

      targetStates.forEach((targetState, selector) => {
        const cleanId = selector.startsWith("#") ? selector.slice(1) : selector;
        if (isDynamicConnection(cleanId)) return;

        const startState = startStates.get(selector) || {
          x: 0,
          y: 0,
          height: "",
        };

        const diffX = Math.abs(startState.x - targetState.x) > 0.1;
        const diffY = Math.abs(startState.y - targetState.y) > 0.1;
        const diffHeight = startState.height !== targetState.height;

        if (diffX || diffY || diffHeight) {
          const query =
            selector.startsWith("#") || selector.startsWith(".")
              ? selector
              : `#${selector}`;
          const el = document.querySelector(query) as HTMLElement;
          if (!el) return;

          const targetHeight = targetState.height;

          const promise = new Promise<void>((resolve) => {
            const animeParams: any = {
              targets: query,
              translateX: targetState.x,
              translateY: targetState.y,
              easing: "easeOutSine",
              duration: ZOOM_DURATION,
              complete: () => {
                if (targetHeight === "") {
                  el.style.height = "";
                }
                resolve();
              },
            };

            if (diffHeight) {
              let animHeight: any = targetHeight;
              if (targetHeight === "") {
                animHeight = getNaturalHeight(el);
              }
              animeParams.height = ensurePx(animHeight);
            }

            const instance = anime(animeParams);
            animationRef.current.push(instance);
          });
          promises.push(promise);
        }
      });

      await Promise.all(promises);
    },
    [getElementsStateAtStep, getElementsStateBeforeAnimations, getNaturalHeight]
  );

  /**
   * Sincroniza el estado visual (opacidad, clip-path, posición y altura de makeSpace)
   * de todos los elementos anteriores al paso objetivo.
   */
  const syncElementsState = useCallback(
    (targetStepIdx: number) => {
      // 1. Forzar opacidades y clip-paths de todos los pasos estrictamente anteriores al actual
      for (let i = 0; i < targetStepIdx; i++) {
        const release = releases[i];
        if (release.animations) {
          release.animations.forEach((animOrArray) => {
            const anims = getAnimsFromBlock(animOrArray);
            anims.forEach((anim) => {
              if ("action" in anim && anim.action) {
                const selectors = Array.isArray(anim.id) ? anim.id : [anim.id];
                selectors.forEach((selector: string) => {
                  const query =
                    selector === "all-elements"
                      ? "#main > *"
                      : selector.startsWith("#") || selector.startsWith(".")
                        ? selector
                        : `#${selector}`;
                  const elements = document.querySelectorAll(query);
                  elements.forEach((elNode) => {
                    const el = elNode as HTMLElement;
                    if (anim.action === "hide") {
                      el.style.opacity = "0";
                      el.style.visibility = "hidden";
                    } else {
                      el.style.opacity = "1";
                      el.style.visibility = "visible";
                      if (clipPathAnimation[anim.action]) {
                        el.style.clipPath = clipPathAnimation[anim.action][1];
                      }
                    }
                  });
                });
              }
            });
          });
        }
      }

      // 2. Forzar posiciones y alturas de desplazamientos acumuladas
      const targetStates = isTransitioningRef.current
        ? getElementsStateAtStep(targetStepIdx - 1)
        : stepAnimationsCompletedRef.current.has(targetStepIdx)
          ? getElementsStateAtStep(targetStepIdx)
          : getElementsStateBeforeAnimations(targetStepIdx);

      targetStates.forEach((targetState, selector) => {
        const query =
          selector.startsWith("#") || selector.startsWith(".")
            ? selector
            : `#${selector}`;
        const el = document.querySelector(query) as HTMLElement;
        if (el) {
          const cleanId = selector.startsWith("#")
            ? selector.slice(1)
            : selector;
          if (isDynamicConnection(cleanId)) return;

          el.style.transform = `translateX(${targetState.x}px) translateY(${targetState.y}px)`;
          if (targetState.height !== "") {
            el.style.height =
              typeof targetState.height === "number"
                ? `${targetState.height}px`
                : targetState.height;
          } else {
            el.style.height = "";
          }
        }
      });
    },
    [getElementsStateAtStep, getElementsStateBeforeAnimations]
  );

  // Sincroniza el estado de los elementos cuando cambia el paso (para re-establecer layouts abortados/completos)
  useEffect(() => {
    syncElementsState(step);
  }, [step, syncElementsState]);

  // Resetea el conjunto de elementos desmontados al cambiar de paso
  useEffect(() => {
    setUnmountedIds(new Set());
  }, [step]);

  // Actualiza minZoom y maxZoom dinámicamente cuando cambia el paso o se redimensiona la ventana
  useEffect(() => {
    const handleResize = () => {
      if (panzoomRef.current) {
        const minZoomVal = calculateMinZoomForStep(step);
        panzoomRef.current.setMinZoom(minZoomVal);

        const maxZoomVal = calculateMaxZoom();
        panzoomRef.current.setMaxZoom(maxZoomVal);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [step, calculateMinZoomForStep, calculateMaxZoom]);

  /**
   * Prepara la escena para el paso anterior y retrocede la timeline.
   */
  const prevScene = useCallback(async () => {
    if (currentStepRef.current <= 0) return;

    // Completar/cancelar todas las animaciones activas del paso actual
    finishAllAnimations();

    const prevStepIdx = currentStepRef.current - 1;
    currentStepRef.current = prevStepIdx; // Actualizar de inmediato para evitar race conditions

    // Actualizar el título de inmediato
    setTitle(
      `${releases[prevStepIdx].name} - year ${releases[prevStepIdx].year}`
    );

    const prevRelease = releases[prevStepIdx];
    const zoom = prevRelease.centerWindow;

    isTransitioningRef.current = true;
    const abortController = new AbortController();
    transitionAbortRef.current = abortController;

    // Ejecutar decrementStep para actualizar la UI
    await decrementStep();

    // Re-centrar el canvas y mover los elementos en paralelo
    const zoomPromise = zoom
      ? centerWindow(
          panzoomRef,
          ZOOM_DURATION,
          CENTER_EASING,
          CENTER_PADDING,
          abortController.signal,
          getPendingMakeSpaceForStep(prevStepIdx),
          zoom
        )
      : Promise.resolve();

    const movePromise = moveElementsToStep(prevStepIdx + 1, prevStepIdx);

    await Promise.all([zoomPromise, movePromise]);
    if (abortController.signal.aborted) return;

    isTransitioningRef.current = false;
    transitionAbortRef.current = null;

    syncElementsState(prevStepIdx);
  }, [
    decrementStep,
    finishAllAnimations,
    getPendingMakeSpaceForStep,
    moveElementsToStep,
    syncElementsState,
  ]);

  /**
   * Prepara la escena para el siguiente paso y avanza la timeline.
   *
   * Flujo:
   * 1. Completa instantáneamente todas las animaciones activas del paso anterior.
   * 2. Incrementa el paso para renderizar los elementos en el DOM.
   * 3. Si requiere `centerWindow`, re-centra y ajusta el zoom del canvas.
   * 4. Si requiere `makeSpace`, mueve los elementos existentes para hacer espacio.
   * 5. Ejecuta las animaciones secuenciales de revelado.
   * 6. Actualiza el título con el nombre y año del juego.
   */
  const setScene = useCallback(async () => {
    // Si ya estamos en el último paso, no hacemos nada
    if (currentStepRef.current >= releases.length - 1) return;

    // Completar todas las animaciones pendientes del paso anterior al instante
    finishAllAnimations();

    const nextStepIdx = currentStepRef.current + 1;
    const nextStep = releases[nextStepIdx];
    currentStepRef.current = nextStepIdx; // Update instantly to prevent race conditions on rapid clicks

    // Actualizar el título de inmediato
    setTitle(`${nextStep.name} - year ${nextStep.year}`);

    const zoom = nextStep.centerWindow;

    isTransitioningRef.current = true;
    const abortController = new AbortController();
    transitionAbortRef.current = abortController;

    await incrementStep();
    if (abortController.signal.aborted) return;

    if (zoom) {
      await centerWindow(
        panzoomRef,
        ZOOM_DURATION,
        CENTER_EASING,
        CENTER_PADDING,
        abortController.signal,
        getPendingMakeSpaceForStep(nextStepIdx),
        zoom
      );
    }
    if (abortController.signal.aborted) return;

    await moveElementsToStep(nextStepIdx - 1, nextStepIdx);
    if (abortController.signal.aborted) return;

    isTransitioningRef.current = false;
    transitionAbortRef.current = null;
    syncElementsState(nextStepIdx);

    if (nextStep.animations.length > 0) {
      runSequentialAnimations(nextStep.animations, 0);
    }
  }, [
    incrementStep,
    finishAllAnimations,
    getPendingMakeSpaceForStep,
    moveElementsToStep,
    syncElementsState,
    runSequentialAnimations,
  ]);

  // Maneja la navegación en la timeline usando las flechas izquierda/derecha del teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setScene();
      } else if (e.key === "ArrowLeft") {
        prevScene();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setScene, prevScene]);

  return (
    <>
      <section className="leftButtonContainer">
        {step !== 0 && (
          <button
            className="leftButton"
            onClick={prevScene}
            onTouchStart={(e) => {
              e.preventDefault(); // Prevents double firing with onClick
              prevScene();
            }}
          />
        )}
      </section>
      {window.DEBUG_MODE && (
        <>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: "blue",
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "blue",
              transform: "translateY(-50%)",
              zIndex: 1000,
            }}
          />
        </>
      )}
      <main
        style={{
          position: "relative",
        }}
        id="main"
      >
        {(() => {
          const elementStates = getElementsStateAtStep(step);
          return releases[step].eras.map((release) => {
            const elementId =
              ("backgroundImage" in release
                ? release.backgroundImage
                : release.id) || "";
            if (unmountedIds.has(elementId)) {
              return null;
            }

            if (!("backgroundImage" in release)) {
              const resolvedPosition = resolvePosition(release);
              return (
                <TimelinePath
                  text={release.title}
                  key={release.id}
                  {...release}
                  position={resolvedPosition}
                />
              );
            }

            const resolvedPosition = resolvePosition(release);
            const shiftState = elementStates.get(elementId) || { x: 0, y: 0 };
            const baseTop =
              resolvedPosition.top !== undefined
                ? typeof resolvedPosition.top === "number"
                  ? resolvedPosition.top
                  : parseFloat(resolvedPosition.top as string)
                : 0;
            const currentEvent = Math.round(
              (baseTop + shiftState.y) / GRID_VERTICAL_SPACING
            );

            if ("textOnly" in release && release.textOnly) {
              return (
                <h1
                  id={release.backgroundImage}
                  key={release.backgroundImage}
                  className="unificationText"
                  style={{
                    position: "absolute",
                    opacity: release.show ? 1 : 0,
                    visibility: (release.show ? "visible" : "hidden") as any,
                    left: resolvedPosition.left,
                    top: resolvedPosition.top,
                  }}
                >
                  {release.title}
                </h1>
              );
            }
            return (
              <Era
                key={release.backgroundImage}
                {...release}
                position={resolvedPosition}
                event={currentEvent}
              />
            );
          });
        })()}
      </main>
      <section className="rightButtonContainer">
        <button
          className="rightButton"
          onClick={setScene}
          onTouchStart={(e) => {
            e.preventDefault(); // Prevents double firing with onClick
            setScene();
          }}
        />
      </section>
      <section className="releaseTitle">
        <span style={{ marginTop: 10 }}>{title}</span>
      </section>
    </>
  );
}

export default App;
