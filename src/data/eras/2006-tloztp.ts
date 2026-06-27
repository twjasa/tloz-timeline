import { eraI, connectionI } from "../releases";
import { get2005 } from "./2005-tloztmc";

// THE LEGEND OF ZELDA: TWILIGHT PRINCESS
export const get2006 = (show = false): Array<eraI | connectionI> => [
  ...get2005(show),
  {
    title: "7 years",
    show,
    id: majorasMask_ganondorfExecution,
    from: majorasMask,
    to: ganondorfExecution,
  },
  {
    title: "Ganondorf's Execution",
    show,
    id: ganondorfExecution,
    color: "silver",
    backgroundImage: ganondorfExecution,
    event: 7,
    timeline: 1,
  },
  {
    title: "100 years",
    show,
    id: ganondorfExecution_twilightPrincess,
    from: ganondorfExecution,
    to: twilightPrincess,
  },
  {
    title: "Twilight Princess",
    show,
    id: twilightPrincess,
    color: "golden",
    backgroundImage: twilightPrincess,
    backgroundPosition: { left: 0, top: -93 },
    event: 8,
    timeline: 1
  },
  {
    title: "??? (A long time)",
    show,
    id: hyruleKingdomIsEstablished2_theTriforceWar,
    from: hyruleKingdomIsEstablished2,
    to: theTriforceWar,
  },
  {
    title: "The Triforce War",
    color: "silver",
    backgroundImage: theTriforceWar,
    show,
    backgroundPosition: { left: 0, top: -204 },
    event: 1,
    timeline: 2
  },
  {
    title: "??? (A long time)",
    show,
    id: theTriforceWar_theFierceWar,
    from: theTriforceWar,
    to: theFierceWar,
  }

];