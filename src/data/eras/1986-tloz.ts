import { connectionI } from "../releases";
import { eraI } from "../releases";
import { ID } from "../../constants/ids";

// THE LEGEND OF ZELDA
export const get1986 = (show = false): Array<eraI | connectionI> => [
  {
    title: "ganon invades hyrule",
    color: "silver",
    backgroundImage: ID.ganonInvadesHyrule,
    show,
    event: 10,
    timeline: 0,
  },
  {
    title: "Immediately after",
    id: ID.ganonInvadesHyrule_theLegendOfZelda,
    show,
    from: ID.ganonInvadesHyrule,
    to: ID.theLegendOfZelda,
    },
  {
    title: "The legend of zelda",
    color: "golden",
    backgroundImage: ID.theLegendOfZelda,
    backgroundPosition: { left: 2, top: 0 },
    show,
    event: 11,
    timeline: 0,
  },
];