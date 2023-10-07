import { useEffect, useRef } from "react";
import "./App.scss";
import { Era } from "./components/Era/Era";
import { TimelinePath } from "./components/TimelinePath/TimelinePath";
import { clipPathAnimation, releases } from "./data/releases";
import anime from "animejs/lib/anime.es.js";
import useStep from "./hooks/useStep";
import { AnimeInstance } from "animejs";

function App() {
  const { step, incrementStep, decrementStep } = useStep(releases.length - 1);
  const prevStep = useRef(step);
  const animationRef = useRef<AnimeInstance[]>([]);
  const canceledAnimation = useRef(false);

  const animateElement = (
    element: HTMLElement,
    clipPathDirection: string,
    onComplete: () => void,
  ) => {
    animationRef.current.push(
      anime({
        targets: `#${element.id}`,
        clipPath: clipPathAnimation[clipPathDirection],
        opacity: [0, 1],
        easing: "easeOutSine",
        duration: 1000,
        delay: 500,
        complete: () => {
          if (!canceledAnimation.current) onComplete();
        },
      }),
    );
  };

  const runSequentialAnimations = (elements: any[], index: number) => {
    if (index < elements.length) {
      const clipPathDirection = elements[index].direction;
      animateElement(elements[index], clipPathDirection, () => {
        runSequentialAnimations(elements, index + 1);
      });
    }
  };

  useEffect(() => {
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
    if (releases[step].animations.length > 0) {
      runSequentialAnimations(releases[step].animations, 0);
    }
    prevStep.current = step;
  }, [step]);

  return (
    <main>
      {releases[step].eras.map((release) => {
        if ("id" in release) {
          return (
            <TimelinePath
              show={release.show}
              text={release.title}
              key={release.id}
              id={release.id}
            />
          );
        }
        return <Era key={release.backgroundImage} {...release} />;
      })}
      <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
        <button onClick={decrementStep}>Previous</button>
        <button onClick={incrementStep}>Next</button>
      </div>
      <span style={{ marginTop: 10 }}>
        {`${releases[step].name} - year ${releases[step].year}`}
      </span>
    </main>
  );
}

export default App;
