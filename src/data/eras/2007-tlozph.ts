import { eraI, connectionI } from "../releases";
import { get2006 } from "./2006-tloztp";

// THE LEGEND OF ZELDA: PHANTOM HOURGLASS
export const get2007 = (show = false): Array<eraI | connectionI> => [
  ...get2006(show),
  {
    title: "A few months?",
    show,
    id: theWindWaker_phantomHourglass,
    position: { left: 2455, top: 2447 },
    orientation: "vertical"
  },
  {
    title: "Phantom Hourglass",
    show,
    id: phantomHourglass,
    color: "golden",
    backgroundImage: phantomHourglass,
    position: { left: 2354, top: 2526 },
  },
];