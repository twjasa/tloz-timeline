import { connectionI } from "../releases";
import { centerX, eraI } from "../releases";
import { ID } from "../../constants/ids";

// THE LEGEND OF ZELDA
export const get1986 = (show = false): Array<eraI | connectionI> => [
  {
    title: "ganon invades hyrule",
    color: "silver",
    backgroundImage: ID.ganonInvadesHyrule,
    show,
    position: { left: centerX, top: 2532 },
  },
  {
    title: "Immediately after",
    id: ID.ganonInvadesHyrule_theLegendOfZelda,
    show,
    position: { left: 1101, top: 2700 }
  },
  {
    title: "The legend of zelda",
    color: "golden",
    backgroundImage: ID.theLegendOfZelda,
    backgroundPosition: { left: 2, top: 0 },
    show,
    position: { left: centerX, top: 2779 }
  },
];