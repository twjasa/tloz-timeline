import { useEffect, useRef, useState } from "react";
import "./App.scss";
import { Era } from "./components/Era/Era";
import { TimelinePath } from "./components/TimelinePath/TimelinePath";
import { clipPathAnimation, releases } from "./data/releases";
import anime from "animejs/lib/anime.es.js";
import useStep from "./hooks/useStep";
import { AnimeInstance } from "animejs";
// @ts-ignore
import createPanZoom from "./panzoom/index.js";
import styles from "./components/Era/era.module.scss";

function App() {
  const { step, incrementStep, decrementStep } = useStep(releases.length - 1);
  const prevStep = useRef(step);
  const animationRef = useRef<AnimeInstance[]>([]);
  const canceledAnimation = useRef(false);
  const panzoomRef = useRef<any>();
  const [title, setTitle] = useState(
    `${releases[step].name} - year ${releases[step].year}`
  );

  const animateElement = (
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
        delay: 500,
        ...props,
        complete: () => {
          if (!canceledAnimation.current) onComplete();
        },
      })
    );
  };

  const runSequentialAnimations = (elements: any[], index: number) => {
    if (index < elements.length) {
      const clipPathDirection = elements[index].action;
      animateElement(elements[index], clipPathDirection, () => {
        runSequentialAnimations(elements, index + 1);
      });
    }
  };

  useEffect(() => {
    if (panzoomRef.current)
      panzoomRef.current.on("zoom", () => {
        // console.log(panzoomRef.current.getTransform());
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

  const centerWindow = async () => {
    const panzoomWindow = document.querySelector("main");
    const children = panzoomWindow?.children || [];
    let extraTop = 0;
    let extraBottom = 0;
    let extraLeft = 0;
    let extraRight = 0;
    let mainHeight = panzoomWindow?.getBoundingClientRect().height || 0;
    console.log(`mainHeight: ${mainHeight}`);
    let mainWidth = panzoomWindow?.getBoundingClientRect().width || 0;
    for (let child of children as any) {
      const {
        offsetTop: top = 0,
        offsetLeft: left = 0,
        clientHeight,
        clientWidth = 0,
      } = child;
      extraTop = Math.min(extraTop, top);
    }
    extraTop = Math.abs(extraTop);
    const mainHeightIncreased = mainHeight + extraTop;
    const newZoom = mainHeight / mainHeightIncreased;
    const newY = mainHeight + extraBottom / 2;
    const newX = mainWidth / 2;

    panzoomRef.current.smoothZoom(newX, newY, newZoom, 5);
  };

  useEffect(() => {
    const nextRelease = releases[step];
    if (prevStep.current !== step) {
      canceledAnimation.current = true;
      // panzoomRef.current.smoothMoveTo(1000, 1000, 20);
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
      // panzoomRef.current.smoothMoveTo(1000, 1000, 10);
      // panzoomRef.current.smoothZoom(800,1000, 0.5, 3);

      runSequentialAnimations(releases[step].animations, 0);
    }
    prevStep.current = step;
  }, [step]);

  const moveElements = (
    elements: string[],
    moves: { x: number; y: number }
  ) => {
    anime({
      targets: elements,
      translateX: moves.x,
      translateY: moves.y,
      easing: "easeOutSine",
      duration: 2000,
    });
  };

  const setScene = async () => {
    const nextStep = releases[step + 1];
    const zoom = nextStep.centerWindow;
    const makeSpace = nextStep.makeSpace;
    if (zoom || makeSpace) {
      await incrementStep();
      if (zoom) centerWindow();
      if (makeSpace)
        moveElements(makeSpace.ids, { x: makeSpace.x, y: makeSpace.y });
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
      <main style={{ backgroundColor: "brown", position: "relative" }}>
        <div
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
        />
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
