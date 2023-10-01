import { useEffect, useMemo, useRef, useState } from "react";
import "./App.scss";
import { Era } from "./components/Era/Era";
import { TimelinePath } from "./components/TimelinePath/TimelinePath";
import { releases } from "./data/releases";
import anime from "animejs/lib/anime.es.js";
import useStep from "./hooks/useStep";

function App() {
  const { step, incrementStep, decrementStep } = useStep(releases.length - 1);
  const allErasRef = useMemo(() => {
    const buffer = [] as string[];
    releases.forEach((release) => {
      release.eras.forEach((era) => {
        if ("backgroundImage" in era) {
          buffer.push(`#${era.backgroundImage}`);
        } else {
          buffer.push(`#${era.id}`);
        }
      });
    });
    return buffer;
  }, [step]);

  useEffect(() => {
    if (step === 2) {
      anime({
        targets: allErasRef,
        scale: [0, 0.4],
      });
    }
  }, [step]);

  console.log(allErasRef);

  return (
    <main>
      {releases[step].eras.map((release) => {
        if ("id" in release) {
          return (
            <TimelinePath
              text={release.title}
              key={release.id}
              id={release.id}
            />
          );
        }
        return <Era {...release} />;
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
