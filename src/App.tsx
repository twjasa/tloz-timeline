import "./App.scss";
import { Era } from "./components/Era/Era";
import { TimelinePath } from "./components/TimelinePath/TimelinePath";

function App() {
  return (
    <main>
      <Era
        title="Creation"
        color="silver"
        backgroundImage="alttp_goddesses.png"
      />
      <TimelinePath text="??? (A long time)" />
      <Era
        title="Creation of the master sword"
        color="silver"
        backgroundImage="master_sword.jpg"
      />
      <TimelinePath text="??? (A long time)" />
      <Era
        title="Ganondorf gets the complete triforce"
        color="silver"
        backgroundImage="triforce_alttp.png"
      />
      <TimelinePath text="Undefinided time after" />
      <Era
        title="The sealing war"
        color="silver"
        backgroundImage="imprisoning_war.webp"
      />
      <TimelinePath text="Centuries" />
      <Era
        title="A LINK TO THE PAST"
        color="golden"
        backgroundImage="lttp.webp"
      />
      <TimelinePath text="??? (A long time ago)" />
      <Era
        title="ganon invades hyrule"
        color="silver"
        backgroundImage="link_impa.png"
      />
      <TimelinePath text="Immediately after" />
      <Era
        title="the legend of zelda"
        color="golden"
        backgroundImage="tloz1_link_observing.png"
        backgroundPosition={{ left: 0, top: -50 }} // TODO: adjust this by screen size
      />
    </main>
  );
}

export default App;
