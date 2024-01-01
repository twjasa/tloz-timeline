import { useEffect, useRef } from 'react';
import './App.scss';
import { Era } from './components/Era/Era';
import { TimelinePath } from './components/TimelinePath/TimelinePath';
import { clipPathAnimation, releases } from './data/releases';
import anime from 'animejs/lib/anime.es.js';
import useStep from './hooks/useStep';
import { AnimeInstance } from 'animejs';
// @ts-ignore
import createPanZoom from './panzoom/index.js';

function App() {
  const { step, incrementStep, decrementStep } = useStep(releases.length - 1);
  const prevStep = useRef(step);
  const animationRef = useRef<AnimeInstance[]>([]);
  const canceledAnimation = useRef(false);
  const panzoomRef = useRef<any>();

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
        easing: 'easeOutSine',
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
      const clipPathDirection = elements[index].action;
      animateElement(elements[index], clipPathDirection, () => {
        runSequentialAnimations(elements, index + 1);
      });
    }
  };

  useEffect(() => {
    panzoomRef.current = createPanZoom(document.querySelector('main')!);
  }, []);

  useEffect(() => {
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
    if (releases[step].animations.length > 0) {
      runSequentialAnimations(releases[step].animations, 0);
    }
    prevStep.current = step;
  }, [step]);

  return (
    <>
      <section className="leftButtonContainer">
        {step !== 0 && (
          <button className="leftButton" onClick={decrementStep} />
        )}
      </section>
      <main>
        {releases[step].eras.map((release) => {
          if ('id' in release) {
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
      </main>
      <section className="rightButtonContainer">
        <button className="rightButton" onClick={incrementStep} />
      </section>
      <section className="releaseTitle">
        <span style={{ marginTop: 10 }}>
          {`${releases[step].name} - year ${releases[step].year}`}
        </span>
      </section>
    </>
  );
}

export default App;
