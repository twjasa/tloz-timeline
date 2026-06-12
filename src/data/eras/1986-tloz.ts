import { connectionI } from "../debug_releases";
import { centerX, eraI } from "../releases";

// THE LEGEND OF ZELDA
export const get1986 = (show = false): Array<eraI | connectionI> => [
  {
    title: "ganon invades hyrule",
    color: "silver",
    backgroundImage: "ganonInvadesHyrule",
    show,
    position: { left: centerX, top: 2532 },
  },
  {
    title: "Immediately after",
    id: "gih-tloz",
    show,
    position: { left: 1101, top: 2700 }
  },
  {
    title: "The legend of zelda",
    color: "golden",
    backgroundImage: "theLegendOfZelda",
    backgroundPosition: { left: 2, top: 0 },
    show,
    position: { left: centerX, top: 2779 }
  },
]