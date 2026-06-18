/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.scss";
import { Era } from "./components/Era/Era";
import { TimelinePath } from "./components/TimelinePath/TimelinePath";
import { clipPathAnimation } from "./data/releases";
import { releases } from "./data/releases";
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
import { ZOOM_DURATION, CENTER_PADDING, CENTER_EASING } from "./constants/variables.js";

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
function App() {
  const { step, incrementStep, decrementStep } = useStep(releases.length - 1);
  const prevStep = useRef(step);
  const animationRef = useRef<AnimeInstance[]>([]);
  const canceledAnimation = useRef(false);
  const panzoomRef = useRef<any>();
  const transitionAbortRef = useRef<AbortController | null>(null);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTransitioningRef = useRef(false);
  const currentStepRef = useRef(step);
  const [title, setTitle] = useState(
    `${releases[step].name} - year ${releases[step].year}`
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
    // Esto es crucial porque si se skipió antes de que las animaciones comenzaran,
    // se quedarían invisibles para siempre.
    const currentStepData = releases[currentStepRef.current];
    if (currentStepData && currentStepData.animations) {
      currentStepData.animations.forEach((anim) => {
        const selectors = Array.isArray(anim.id) ? anim.id : [anim.id];
        selectors.forEach(selector => {
          // El ID puede ser un selector directo (si no tiene '#') o puede que necesite '#'.
          // En los datos veo cosas como '#aLinkToThePast' y 'ganonInvadesHyrule'.
          // Si no tiene '#' o '.' asumimos que es un ID.
          const query = selector.startsWith('#') || selector.startsWith('.') ? selector : `#${selector}`;
          const el = document.querySelector(query) as HTMLElement;
          if (el) {
            if (anim.action === "hide") {
              el.style.opacity = '0';
            } else {
              if (["up", "down", "left", "right"].includes(anim.action)) {
                el.style.opacity = '1';
              }
              if (clipPathAnimation[anim.action]) {
                el.style.clipPath = clipPathAnimation[anim.action][1];
              }
            }
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

    isTransitioningRef.current = false;
  }, []);

  /**
   * Anima un elemento individual usando clip-path con anime.js.
   *
   * @param element - Elemento DOM a animar. Debe tener un `id` y una propiedad `action`.
   * @param clipPathDirection - Dirección de la animación (`"up"`, `"down"`, `"left"`, o `"right"`).
   * @param onComplete - Callback que se ejecuta al completar la animación
   *   (solo si no fue cancelada por un cambio de paso).
   */
  const animateElement = useCallback(
    (
      element: HTMLElement,
      clipPathDirection: string,
      onComplete: () => void
    ) => {
      let props: any = {};
      const action = (element as any).action;
      
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
      
      animationRef.current.push(
        anime({
          targets: element.id,
          ...(clipPathValue ? { clipPath: clipPathValue } : {}),
          easing: "easeOutSine",
          duration: 1000,
          delay: 100,
          ...props,
          complete: () => {
            if (!canceledAnimation.current) onComplete();
          },
        })
      );
    },
    []
  );

  /**
   * Ejecuta animaciones de revelado de forma secuencial (una tras otra).
   *
   * Procesa el array de elementos de animación recursivamente: al completar
   * la animación de un elemento, inicia la del siguiente.
   *
   * @param elements - Array de elementos del DOM a animar secuencialmente.
   * @param index - Índice del elemento actual en la secuencia.
   */
  const runSequentialAnimations = useMemo(() => {
    return (elements: any[], index: number) => {
      if (index < elements.length) {
        const clipPathDirection = elements[index].action;
        animateElement(elements[index], clipPathDirection, () => {
          runSequentialAnimations(elements, index + 1);
        });
      }
    };
  }, [animateElement]);

  useEffect(() => {
    if (panzoomRef.current)
      panzoomRef.current.on("pan", () => {
        // console.log(panzoomRef.current.getClientRect());
      });
  });

  useEffect(() => {
    const pz = createPanZoom(document.querySelector("main")!, {
      // bounds: true,
      // boundsPadding: 0.1,
    });
    panzoomRef.current = pz;

    // Calcular y aplicar el transform inicial instantáneamente
    // para que el contenido se vea centrado desde el primer frame.
    const main = document.querySelector("main")!;
    const children = Array.from(main.children) as HTMLElement[];
    if (children.length > 0) {
      let minLeft = Infinity, minTop = Infinity, maxRight = -Infinity, maxBottom = -Infinity;
      for (const child of children) {
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
      const targetX = p.left + (main.clientWidth - p.left - p.right) / 2 - (minLeft + contentWidth / 2) * scale;
      const targetY = p.top + (main.clientHeight - p.top - p.bottom) / 2 - (minTop + contentHeight / 2) * scale;
      pz.zoomAbs(0, 0, scale);
      pz.moveTo(targetX, targetY);
    }
  }, []);

  // Ejecuta las animaciones iniciales para el paso 0 en el montaje del componente
  useEffect(() => {
    const initialRelease = releases[0];
    if (initialRelease.animations.length > 0) {
      runSequentialAnimations(initialRelease.animations, 0);
    }
  }, [runSequentialAnimations]);

  /**
   * Mueve un conjunto de elementos a una nueva posición con animación.
   *
   * Se usa antes de revelar nuevas eras para "hacer espacio" en el canvas,
   * desplazando los elementos existentes.
   *
   * @param elements - Array de selectores CSS de los elementos a mover.
   * @param moves - Objeto con los valores de desplazamiento: `x`, `y`, y opcionalmente `height`.
   * @returns Promesa que se resuelve al completar la animación.
   */
  const moveElements = async (
    elements: string[],
    moves: { x: number; y: number; height?: number | string }
  ) => {
    return new Promise<void>((resolve) => {
      const instance = anime({
        targets: elements,
        translateX: moves.x,
        translateY: moves.y,
        height: moves.height,
        easing: "easeOutSine",
        duration: ZOOM_DURATION,
        complete: () => resolve(),
      });
      // Track it so finishAllAnimations can complete it instantly
      animationRef.current.push(instance);
    });
  };

  /**
   * Retrocede la timeline al paso anterior de forma síncrona.
   */
  const handlePrevStep = async () => {
    if (currentStepRef.current <= 0) return;

    finishAllAnimations();

    const prevStepIdx = currentStepRef.current - 1;
    const prevStep = releases[prevStepIdx];
    currentStepRef.current = prevStepIdx;

    const zoom = prevStep.centerWindow;

    isTransitioningRef.current = true;
    const abortController = new AbortController();
    transitionAbortRef.current = abortController;

    decrementStep();

    if (zoom) {
      await centerWindow(panzoomRef, ZOOM_DURATION, CENTER_EASING, CENTER_PADDING, abortController.signal, undefined, zoom);
    }
    if (abortController.signal.aborted) return;

    isTransitioningRef.current = false;
    transitionAbortRef.current = null;

    if (prevStep.animations.length > 0) {
      runSequentialAnimations(prevStep.animations, 0);
    }

    setTitle(`${prevStep.name} - year ${prevStep.year}`);
  };

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
  const setScene = async () => {
    // Si ya estamos en el último paso, no hacemos nada
    if (currentStepRef.current >= releases.length - 1) return;

    // Completar todas las animaciones pendientes del paso anterior al instante
    finishAllAnimations();

    const nextStepIdx = currentStepRef.current + 1;
    const nextStep = releases[nextStepIdx];
    currentStepRef.current = nextStepIdx; // Update instantly to prevent race conditions on rapid clicks

    const zoom = nextStep.centerWindow;
    const makeSpace = nextStep.makeSpace;
    
    isTransitioningRef.current = true;
    const abortController = new AbortController();
    transitionAbortRef.current = abortController;

    await incrementStep();
    if (abortController.signal.aborted) return;

    if (zoom) {
      await centerWindow(panzoomRef, ZOOM_DURATION, CENTER_EASING, CENTER_PADDING, abortController.signal, makeSpace, zoom);
    }
    if (abortController.signal.aborted) return;

    if (makeSpace) {
      for (const space of makeSpace) {
        await moveElements(space.ids, { ...space });
        if (abortController.signal.aborted) return;
      }
    }

    isTransitioningRef.current = false;
    transitionAbortRef.current = null;

    if (nextStep.animations.length > 0) {
      runSequentialAnimations(nextStep.animations, 0);
    }

    setTitle(`${nextStep.name} - year ${nextStep.year}`);
  };

  return (
    <>
      <section className="leftButtonContainer">
        {step !== 0 && (
          <button 
            className="leftButton" 
            onClick={handlePrevStep} 
            onTouchStart={(e) => {
              e.preventDefault(); // Prevents double firing with onClick
              handlePrevStep();
            }}
          />
        )}
      </section>
      {/* <div
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
      /> */}
      {/* <div
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
      /> */}
      <main
        style={{
          // backgroundColor: "brown",
          position: "relative",
        }}
        id="main"
      >
        {/* <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "2px",
            backgroundColor: "white",
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
            backgroundColor: "white",
            transform: "translateY(-50%)",
            zIndex: 1000,
          }}
        /> */}
        {releases[step].eras.map((release) => {
          if ("id" in release) {
            return (
              <TimelinePath
                text={release.title}
                key={release.id}
                {...release}
              />
            );
          }
          return <Era key={release.backgroundImage} {...release} />;
        })}
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
