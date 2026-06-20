import { eraI, connectionI, centerX } from "../releases";
import { get2002 } from "./2002-tlozfs";

// THE LEGEND OF ZELDA: THE WIND WAKER
export const get2003 = (show = false): Array<eraI | connectionI> => [
  ...get2002(show),
  {
    title: "??? (A Century?)",
    show,
    id: ocarinaOfTimeAdult_theGreatFlood,
    position: { left: 2455, top: 1704 },
    orientation: "vertical"
  },
  {
    title: "The Great Flood",
    show,
    id: theGreatFlood,
    color: "silver",
    backgroundImage: theGreatFlood,
    position: { left: 2354, top: 1782 },
  },
  {
    title: "About 300 years later...",
    show,
    id: theGreatFlood_theWindWaker,
    position: { left: 2456, top: 1948 },
    orientation: "vertical"
  },
  {
    title: "The Wind Waker",
    show,
    id: theWindWaker,
    color: "golden",
    backgroundImage: theWindWaker,
    backgroundPosition: { left: 0, top: -93 },
    position: { left: 2354, top: 2026 },
  },

];