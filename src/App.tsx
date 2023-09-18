import "./App.scss";
import { Era } from "./components/Era/Era";

function App() {
  return (
    <main>
      <Era
        title="ganon invades hyrule"
        color="silver"
        backgroundImage="link_impa.png"
      />
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "700px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "auto",
            width: "20px",
            backgroundColor: "black",
            marginRight: "14%",
          }}
        />
        <h1
          style={{
            fontFamily: "Inter",
            textShadow: "black 3px 3px 2px",
          }}
        >
          Immediately after
        </h1>
      </div>

      <Era
        title="the legend of zelda"
        color="golden"
        backgroundImage="tloz1_link_observing.png"
      />
    </main>
  );
}

export default App;
