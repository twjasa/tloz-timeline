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
    event: 6,
    timeline: 1
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
    event: 5,
    timeline: 1
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
    event: 4,
    timeline: 1
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
    event: 3,
    timeline: 1
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
    event: 2,
    timeline: 1
  },
];