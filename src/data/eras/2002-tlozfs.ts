import { eraI, connectionI, centerX } from "../releases";
import { get2001 } from "./2001-tlozoos";
import { ID } from "../../constants/ids";

// THE LEGEND OF ZELDA: FALLEN STAR
export const get2002 = (show = false): Array<eraI | connectionI> => [
  ...get2001(show),
  {
    title: "??? (A long time)",
    show,
    id: creationOfTheMasterSword_fourSwords,
    position: { left: 1101, top: 577 },
    // length: 146,
    orientation: "vertical"
  },
  {
    title: "Four Swords",
    show,
    id: ID.fourSwords,
    color: "golden",
    backgroundImage: ID.fourSwords,
    backgroundPosition: { left: 2, top: -54 },
    position: { left: centerX, top: 656 },
  },
  {
    title: "???",
    show,
    id: fourSwords_ganondorfGetsTheCompleteTriforce,
    position: { left: centerX, top: 822 },
    length: 472,
    orientation: "vertical"
  },
];