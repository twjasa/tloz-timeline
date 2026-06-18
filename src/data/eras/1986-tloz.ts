import { connectionI } from "../debug_releases";
import { centerX, eraI } from "../releases";
import { ALL_IDS } from "../../constants/ids";

// THE LEGEND OF ZELDA
export const get1986 = (show = false): Array<eraI | connectionI> => [
  {
    title: "ganon invades hyrule",
    color: "silver",
    backgroundImage: ALL_IDS.ganonInvadesHyrule,
    show,
    position: { left: centerX, top: 2532 },
  },
  {
    title: "Immediately after",
    id: ALL_IDS.ganonInvadesHyrule_theLegendOfZelda,
    show,
    position: { left: 1101, top: 2700 }
  },
  {
    title: "The legend of zelda",
    color: "golden",
    backgroundImage: ALL_IDS.theLegendOfZelda,
    backgroundPosition: { left: 2, top: 0 },
    show,
    position: { left: centerX, top: 2779 }
  },
];