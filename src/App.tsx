import { useState } from "react";
import "./App.scss";
import { Era } from "./components/Era/Era";
import { TimelinePath } from "./components/TimelinePath/TimelinePath";
import { releases } from "./data/releases";

function App() {
  const [step, setStep] = useState(0);
  return (
    <main>
      {releases[step].eras.map((release, index) => {
        if (typeof release === "string")
          return <TimelinePath text={release} key={index} />;
        return <Era {...release} />;
      })}
      <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
        <button onClick={() => setStep(step - 1)}>Previous</button>
        <button onClick={() => setStep(step + 1)}>Next</button>
      </div>
      <span style={{ marginTop: 10 }}>
        {`${releases[step].name} - year ${releases[step].year}`}
      </span>
    </main>
  );
}

export default App;
