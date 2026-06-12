import { connectionI } from "../debug_releases";
import { centerPercentageX, eraI } from "../releases";
import { get1986 } from "./1986-tloz";

// ZELDA II: THE ADVENTURE OF LINK
export const get1987 = (): Array<eraI | connectionI> => [
  {
    title: "the tragedy of princess zelda I",
    color: "silver",
    backgroundImage: "tragedyOfPrincessZeldaI",
    show: false,
    position: { left: centerPercentageX, top: "14.4%" },
  },
  {
    title: "??? (A long time)", id: "ttopzI-gih", show: false,
    position: { left: '43%', top: "27.7%" }
  },
  ...get1986(),
  {
    title: "4 years later", id: "tloz-zeldaIItaol",
    show: false,
    position: { left: '43%', top: "66.5%" }
  },
  {
    title: "Zelda II: The Adventure of Link",
    color: "golden",
    backgroundImage: "zeldaIITAoL",
    show: false,
    position: { left: centerPercentageX, top: "72.9%" }
  },
]