import { eraI, connectionI } from "../releases";
import { get2005 } from "./2005-tloztmc";

// THE LEGEND OF ZELDA: THE WIND WAKER
export const get2006 = (show = false): Array<eraI | connectionI> => [
  ...get2005(show),
  {
    title: "7 years",
    show,
    id: majorasMask_ganondorfExecution,
    position: { left: 1742, top: 1704 },
    orientation: "vertical",
    length: 81
  },
  {
    title: "Ganondorf's Execution",
    show,
    id: ganondorfExecution,
    color: "silver",
    backgroundImage: ganondorfExecution,
    position: { left: 1691, top: 1785 },
  },
  {
    title: "100 years",
    show,
    id: ganondorfExecution_twilightPrincess,
    position: { left: 1742, top: 1951 },
    orientation: "vertical",
    length: 86
  },
  {
    title: "Twilight Princess",
    show,
    id: twilightPrincess,
    color: "golden",
    backgroundImage: twilightPrincess,
    backgroundPosition: { left: 0, top: -93 },
    position: { left: 1691, top: 2037 },
  },
  {
    title: "??? (A long time)",
    show,
    id: hyruleKingdomIsEstablished2_theTriforceWar,
    position: { left: 2456, top: -110 },
    orientation: "vertical",
    length: 566
  },
  {
    title: "The Triforce War",
    color: "silver",
    backgroundImage: theTriforceWar,
    show,
    backgroundPosition: { left: 0, top: -204 },
    position: { left: 2354, top: 456 }
  },
  {
    title: "??? (A long time)",
    show,
    id: theTriforceWar_theFierceWar,
    length: 263,
    position: { left: 2456, top: 622 },
    orientation: "vertical",
  }

];