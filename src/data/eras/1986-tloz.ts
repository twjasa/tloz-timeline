import { connectionI } from "../debug_releases";
import { centerPercentageX, eraI } from "../releases";

// THE LEGEND OF ZELDA
export const get1986 = (): Array<eraI | connectionI> => [
  {
    title: "ganon invades hyrule",
    color: "silver",
    backgroundImage: "ganonInvadesHyrule",
    show: true,
    position: { left: centerPercentageX, top: "34%" },
  },
  {
    title: "Immediately after",
    id: "gih-tloz",
    show: true,
    position: { left: '43%', top: "47.2%" }
  },
  {
    title: "The legend of zelda",
    color: "golden",
    backgroundImage: "theLegendOfZelda",
    backgroundPosition: { left: 2, top: -30 },
    show: true,
    position: { left: centerPercentageX, top: "53.4%" }
  },
]