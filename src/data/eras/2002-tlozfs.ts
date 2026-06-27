import { eraI, connectionI } from "../releases";
import { get2001 } from "./2001-tlozoos";
import { ID } from "../../constants/ids";

// THE LEGEND OF ZELDA: FALLEN STAR
export const get2002 = (show = false): Array<eraI | connectionI> => [
  ...get2001(show),
  {
    title: "??? (A long time)",
    show,
    id: creationOfTheMasterSword_vaatiIsSealed,
    from: creationOfTheMasterSword,
    to: vaatiIsSealed,
  },
  {
    title: "Vaati is Sealed",
    show,
    color: "silver",
    backgroundImage: ID.vaatiIsSealed,
    event: 1,
    timeline: 0,
  },
  {
    title: "??? (A long time)",
    show,
    id: vaatiIsSealed_fourSwords,
    from: vaatiIsSealed,
    to: fourSwords,
  },
  {
    title: "Four Swords",
    show,
    id: ID.fourSwords,
    color: "golden",
    backgroundImage: ID.fourSwords,
    backgroundPosition: { left: 2, top: -54 },
    event: 2,
    timeline: 0,
  },
  {
    title: "???",
    show,
    id: fourSwords_ganondorfGetsTheCompleteTriforce,
    from: fourSwords,
    to: ganondorfGetsTheCompleteTriforce,
  },
];