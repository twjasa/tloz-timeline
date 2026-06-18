import { connectionI } from "../releases";
import { eraI } from "../releases";
import { get1993 } from "./1993-tlozla";
import { ALL_IDS } from "../../constants/ids";

// THE LEGEND OF ZELDA: Ocarina of Time
export const get1998 = (show = false): Array<eraI | connectionI> => [
  ...get1993(show),
  {
    title: "Ocarina of Time (Adult)",
    show,
    color: "golden",
    backgroundImage: ALL_IDS.ocarinaOfTimeAdult,
    position: { left: 1754, top: 1538 },
  },
  {
    title: "7 years",
    show,
    id: ALL_IDS.ocarinaOfTimeAdult_ocarinaOfTimeChild,
    position: { left: 1865, top: 1453 },
  },
  {
    title: "Ocarina of Time (Child)",
    show,
    color: "golden",
    backgroundImage: ALL_IDS.ocarinaOfTimeChild,
    position: { left: 1754, top: 1298 },
    backgroundPosition: { left: 0, top: -192 },
  },
  {
    title: "9 years",
    show,
    id: ALL_IDS.ocarinaOfTimeChild_theFierceWar,
    position: { left: 1865, top: 1214 },
  },
  {
    title: "The Fierce War",
    color: "silver",
    backgroundImage: ALL_IDS.theFierceWar,
    show,
    position: { left: 1754, top: 1048 },
  },
  {
    title: "??? (A long time)",
    show,
    id: ALL_IDS.creationOfTheMasterSword2_theFierceWar,
    position: { left: 1865, top: 970 },
  },
  {
    title: "Creation of the master sword",
    show,
    color: "silver",
    backgroundImage: ALL_IDS.creationOfTheMasterSword2,
    position: { left: 1754, top: 819 },
  },
  {
    title: "??? (A long time)",
    show,
    id: ALL_IDS.creationOfTheMasterSword2_creation2,
    position: { left: 1865, top: 732 },
  },
  {
    title: "Creation",
    show,
    color: "silver",
    backgroundImage: ALL_IDS.creation2,
    position: { left: 1754, top: 564 },
  },
];