import { useEffect, useRef, useState } from 'react';
import './App.scss';
import { Era } from './components/Era/Era';
import { TimelinePath } from './components/TimelinePath/TimelinePath';
import { clipPathAnimation, releases } from './data/releases';
import anime from 'animejs/lib/anime.es.js';
import useStep from './hooks/useStep';
import { AnimeInstance } from 'animejs';
// @ts-ignore
import createPanZoom from './panzoom/index.js';
import styles from './components/Era/era.module.scss';

function App() {
  const { step, incrementStep, decrementStep } = useStep(releases.length - 1);
  const prevStep = useRef(step);
  const animationRef = useRef<AnimeInstance[]>([]);
  const canceledAnimation = useRef(false);
  const panzoomRef = useRef<any>();
  const [title, setTitle] = useState(
    `${releases[step].name} - year ${releases[step].year}`,
  );

  const animateElement = (
    element: HTMLElement,
    clipPathDirection: string,
    onComplete: () => void,
  ) => {
    let props: any = {};
    if (['up', 'down'].includes((element as any).action)) {
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
        easing: 'easeOutSine',
        duration: 1000,
        delay: 500,
        ...props,
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
    if (panzoomRef.current)
      panzoomRef.current.on('zoom', () => {
        // console.log(panzoomRef.current.getTransform());
      });
  });

  useEffect(() => {
    panzoomRef.current = createPanZoom(document.querySelector('main')!, {
      // bounds: true,
      // boundsPadding: 0.1,
    });
    // panzoomRef.current.
    // panzoomRef.current.smoothZoom(800, 1000, 0.5, 1);
  }, []);

  const centerWindow = async () => {
    const panzoomWindow = document.querySelector('main');
    const children = panzoomWindow?.children || [];
    let extraTop = 0;
    let extraBottom = 0;
    let extraLeft = 0;
    let extraRight = 0;
    let mainHeight = panzoomWindow?.getBoundingClientRect().height || 0;
    let mainWidth = panzoomWindow?.getBoundingClientRect().width || 0;
    for (let child of children as any) {
      const {
        offsetTop: top,
        offsetLeft: left,
        clientHeight,
        clientWidth = 0,
      } = child;
      extraTop = Math.max(extraTop, -top);
      extraBottom = Math.max(extraBottom, top + clientHeight - mainHeight);
      extraLeft = Math.max(extraLeft, -left);
      extraRight = Math.max(extraRight, left + clientWidth - mainWidth);
    }
    debugger;
    if (extraRight < mainWidth) {
      extraRight = 0;
    } else {
      extraRight = Math.max(0, Math.abs(extraRight - mainWidth));
    }
    const zoomLvl = Math.min(
      mainWidth / (extraLeft + extraRight + mainWidth * 1.5),
      mainHeight / (extraBottom + extraTop + mainHeight * 1.5),
    );

    extraTop *= zoomLvl;
    extraLeft *= zoomLvl;
    extraRight *= zoomLvl;
    // const newWidth = mainWidth * zoomLvl;
    const newHeight = mainHeight * zoomLvl;
    let initialPaddingX = 0;
    if (extraRight > 0) {
      initialPaddingX = (mainWidth - parseInt(styles.eraWidth, 10)) / 2;
      initialPaddingX *= zoomLvl;
    }
    let initialPaddingY = 0;
    if (extraTop > 0) {
      initialPaddingY = 600 * zoomLvl;
    }
    const newX = (mainWidth - extraLeft + extraRight - initialPaddingX) / 2;
    const newY = (mainHeight + extraTop + initialPaddingY) / 2;
    // const centerWindowHeight = window.screen.height / 2
    // const transformedExtraTop = extraTop * zoomLvl;
    // console.log(newWidth, newHeight, zoomLvl);
    console.log(`mainHeight: ${mainHeight}`);
    console.log(`newHeight: ${newHeight}`);
    console.log(`extraTop: ${extraTop}`);
    console.log(`initialPaddingY: ${initialPaddingY}`);
    console.log(`zoomLvl: ${zoomLvl}`);
    console.log(`newY: ${newY}`);
    // console.log(`mainHeight: ${mainHeight}`);
    // console.log(`newY: ${newY}`);
    // console.log(`newWidth: ${newWidth}`);
    // console.log(`newHeight: ${newHeight}`);
    // panzoomRef.current.zoomAbs(0, 0, zoomLvl);
    panzoomRef.current.zoomTo(newX, newY, zoomLvl, 5);
    // panzoomRef.current.getTran;
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
    moves: { x: number; y: number },
  ) => {
    anime({
      targets: elements,
      translateX: moves.x,
      translateY: moves.y,
      easing: 'easeOutSine',
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
      <main>
        {releases[step].eras.map((release) => {
          if ('id' in release) {
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
