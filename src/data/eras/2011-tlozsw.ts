import { connectionI } from "../releases";
import { eraI } from "../releases";
import { ID } from "../../constants/ids";
import { get2009 } from "./2009-tlozst";

// THE LEGEND OF ZELDA: Skyward Sword
export const get2011 = (show = false): Array<eraI | connectionI> => [
  ...get2009(show),
  {
    title: "The Demon Invasion",
    show,
    color: "silver",
    backgroundImage: ID.ocarinaOfTimeAdult,
    position: { left: 1754, top: 1538 },
  },
  {
    title: "7 years",
    show,
    id: ID.ocarinaOfTimeAdult_ocarinaOfTimeChild,
    position: { left: 1865, top: 1460 },
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
    id: ID.ocarinaOfTimeChild_theFierceWar,
    position: { left: 1865, top: 1214 },
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
    position: { left: 1865, top: 777 },
    length: 271,
    orientation: "vertical",
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
    id: ID.creationOfTheMasterSword2_creation2,
    position: { left: 1865, top: 531 },
  },
  {
    title: "Creation",
    show,
    color: "silver",
    backgroundImage: ID.creation2,
    position: { left: 1754, top: 364 },
  },
];