import { connectionI } from "../releases";
import { centerX, eraI } from "../releases";
import { get1986 } from "./1986-tloz";

// ZELDA II: THE ADVENTURE OF LINK
export const get1987 = (show = false): Array<eraI | connectionI> => [
  {
    title: "the tragedy of princess zelda I",
    color: "silver",
    backgroundImage: tragedyOfPrincessZeldaI,
    show,
    position: { left: centerX, top: 2283 },
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
    position: { left: centerX, top: 3027 }
  },
];