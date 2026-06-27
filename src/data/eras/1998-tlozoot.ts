import { connectionI } from "../releases";
import { eraI } from "../releases";
import { get1993 } from "./1993-tlozla";
import { ID } from "../../constants/ids";

// THE LEGEND OF ZELDA: Ocarina of Time
export const get1998 = (show = false): Array<eraI | connectionI> => [
  ...get1993(show),
  {
    title: "Ocarina of Time (Adult)",
    show,
    color: "golden",
    backgroundImage: ID.ocarinaOfTimeAdult,
    position: { left: 1754, top: 1538 },
  },
  {
    title: "7 years",
    show,
    id: ID.ocarinaOfTimeChild_ocarinaOfTimeAdult,
    from: ID.ocarinaOfTimeChild,
    to: ID.ocarinaOfTimeAdult,
  },
  {
    title: "Ocarina of Time (Child)",
    show,
    color: "golden",
    backgroundImage: ID.ocarinaOfTimeChild,
    position: { left: 1754, top: 1294 },
    backgroundPosition: { left: 0, top: -192 },
  },
  {
    title: "9 years",
    show,
    id: ID.theFierceWar_ocarinaOfTimeChild,
    from: ID.theFierceWar,
    to: ID.ocarinaOfTimeChild,
  },
  {
    title: "The Fierce War",
    color: "silver",
    backgroundImage: ID.theFierceWar,
    show,
    position: { left: 1754, top: 1048 },
  },
  {
    title: "??? (A long time)",
    show,
    id: ID.creationOfTheMasterSword2_theFierceWar,
    from: ID.creationOfTheMasterSword2,
    to: ID.theFierceWar,
  },
  {
    title: "Creation of the master sword",
    show,
    color: "silver",
    backgroundImage: ID.creationOfTheMasterSword2,
    position: { left: 1754, top: 611 },
  },
  {
    title: "??? (A long time)",
    show,
    id: ID.creation2_creationOfTheMasterSword2,
    from: ID.creation2,
    to: ID.creationOfTheMasterSword2,
  },
  {
    title: "Creation",
    show,
    color: "silver",
    backgroundImage: ID.creation2,
    position: { left: 1754, top: 364 },
  },
];