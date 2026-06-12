/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.scss";
import { Era } from "./components/Era/Era";
import { TimelinePath } from "./components/TimelinePath/TimelinePath";
import { clipPathAnimation, releases } from "./data/releases";
// import {
//   debug_extratop,
//   debug_extratop_and_extrabottom,
// } from "./data/debug_releases";
import anime from "animejs/lib/anime.es.js";
import useStep from "./hooks/useStep";
import { AnimeInstance } from "animejs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import createPanZoom from "./panzoom/index.js";
import { centerWindow } from "./utils/centerWindow";
import { ZOOM_DURATION } from "./constants/variables.js";

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
  const [title, setTitle] = useState(
    `${releases[step].name} - year ${releases[step].year}`
  );

  /**
   * Anima un elemento individual usando clip-path con anime.js.
   *
   * @param element - Elemento DOM a animar. Debe tener un `id` y una propiedad `action`.
   * @param clipPathDirection - Dirección de la animación (`"up"` o `"down"`).
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
      if (["up", "down"].includes((element as any).action)) {
        props = {
          opacity: [0, 1],
          // begin: () => {
          //   const updatedElementId = element.id.slice(1);
          //   document.getElementById(updatedElementId)!.style.display = 'flex';
          // },
        };
      }
      animationRef.current.push(
        anime({
          targets: element.id,
          clipPath: clipPathAnimation[clipPathDirection],
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
    panzoomRef.current = createPanZoom(document.querySelector("main")!, {
      // bounds: true,
      // boundsPadding: 0.1,
    });
    // panzoomRef.current.
    // panzoomRef.current.smoothZoom(800, 1000, 0.5, 1);
  }, []);

  useEffect(() => {
    const nextRelease = releases[step];
    if (prevStep.current !== step) {
      canceledAnimation.current = true;
      animationRef.current.forEach((animation) => {
        if (animation) {
          animation.pause();
          animation.seek(animation.duration);
        }
      });
      canceledAnimation.current = false;
      animationRef.current = [];
    }
    if (nextRelease.animations.length > 0) {
      setTimeout(
        () => {
          runSequentialAnimations(nextRelease.animations, 0);
        },
        nextRelease.centerWindow ? ZOOM_DURATION : 0
      );
    }
    prevStep.current = step;
  }, [step, runSequentialAnimations]);

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
      anime({
        targets: elements,
        translateX: moves.x,
        translateY: moves.y,
        height: moves.height,
        easing: "easeOutSine",
        duration: ZOOM_DURATION,
        complete: () => resolve(),
      });
    });
  };

  /**
   * Prepara la escena para el siguiente paso y avanza la timeline.
   *
   * Flujo:
   * 1. Verifica si el siguiente paso requiere `makeSpace` o `centerWindow`.
   * 2. Si requiere `makeSpace`, mueve los elementos existentes para hacer espacio.
   * 3. Si requiere `centerWindow`, re-centra y ajusta el zoom del canvas.
   * 4. Incrementa el paso (lo que dispara las animaciones de revelado en el `useEffect`).
   * 5. Actualiza el título con el nombre y año del juego.
   */
  const setScene = async () => {
    const nextStep = releases[step + 1];
    const zoom = nextStep.centerWindow;
    const makeSpace = nextStep.makeSpace;
    if (zoom || makeSpace) {
      await incrementStep();
      if (makeSpace) {
        for (const space of makeSpace) {
          await moveElements(space.ids, { ...space });
        }
      }
      if (zoom) {
        await centerWindow(panzoomRef, ZOOM_DURATION, "easeOutCubic", 100, 50);
      }
    } else {
      incrementStep();
    }
    setTitle(`${releases[step + 1].name} - year ${releases[step + 1].year}`);
  };

  return (
    <>
      <section className="leftButtonContainer">
        {step !== 0 && (
          <button className="leftButton" onClick={decrementStep} />
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
        <button className="rightButton" onClick={setScene} />
      </section>
      <section className="releaseTitle">
        <span style={{ marginTop: 10 }}>{title}</span>
      </section>
    </>
  );
}

export default App;
