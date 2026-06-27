import { connectionI } from "../releases";
import { eraI } from "../releases";
import { get1986 } from "./1986-tloz";

// ZELDA II: THE ADVENTURE OF LINK
export const get1987 = (show = false): Array<eraI | connectionI> => [
  {
    title: "the tragedy of princess zelda I",
    color: "silver",
    backgroundImage: tragedyOfPrincessZeldaI,
    show,
    timeline: 0,
    event: 9,
  },
  {
    title: "??? (A long time)",
    id: tragedyOfPrincessZeldaI_ganonInvadesHyrule,
    show,
    from: tragedyOfPrincessZeldaI,
    to: ganonInvadesHyrule,
  },
  ...get1986(true),
  {
    title: "4 years later",
    id: theLegendOfZelda_zeldaIITAoL,
    show,
    from: theLegendOfZelda,
    to: zeldaIITAoL,
  },
  {
    title: "Zelda II: The Adventure of Link",
    color: "golden",
    backgroundImage: zeldaIITAoL,
    show,
    timeline: 0,
    event: 12,
  },
];