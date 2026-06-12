import { connectionI } from "../debug_releases";
import { centerX, eraI } from "../releases";
import { get1986 } from "./1986-tloz";

// ZELDA II: THE ADVENTURE OF LINK
export const get1987 = (show = false): Array<eraI | connectionI> => [
  {
    title: "the tragedy of princess zelda I",
    color: "silver",
    backgroundImage: "tragedyOfPrincessZeldaI",
    show,
    position: { left: centerX, top: 2283 },
  },
  {
    title: "??? (A long time)", id: "ttopzI-gih", show,
    position: { left: 1101, top: 2452 }
  },
  ...get1986(true),
  {
    title: "4 years later", id: "tloz-zeldaIItaol",
    show,
    position: { left: 1101, top: 2945 }
  },
  {
    title: "Zelda II: The Adventure of Link",
    color: "golden",
    backgroundImage: "zeldaIITAoL",
    show,
    position: { left: centerX, top: 3027 }
  },
]