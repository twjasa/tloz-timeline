import { eraI, connectionI } from "../releases";
import { get2002 } from "./2002-tlozfs";

// THE LEGEND OF ZELDA: THE WIND WAKER
export const get2003 = (show = false): Array<eraI | connectionI> => [
  ...get2002(show),
  {
    title: "About 100 years",
    show,
    id: ocarinaOfTimeAdult_theGreatFlood,
    from: ocarinaOfTimeAdult,
    to: theGreatFlood,
  },
  {
    title: "The Great Flood",
    show,
    id: theGreatFlood,
    color: "silver",
    backgroundImage: theGreatFlood,
    event: 8,
    timeline: 2
  },
  {
    title: "About 300 years later...",
    show,
    id: theGreatFlood_theWindWaker,
    from: theGreatFlood,
    to: theWindWaker,
  },
  {
    title: "The Wind Waker",
    show,
    id: theWindWaker,
    color: "golden",
    backgroundImage: theWindWaker,
    backgroundPosition: { left: 0, top: -93 },
    event: 9,
    timeline: 2
  },

];