import { connectionI } from "../releases";
import { eraI } from "../releases";
import { ID } from "../../constants/ids";
import { get2009 } from "./2009-tlozst";

// THE LEGEND OF ZELDA: Skyward Sword
export const get2011 = (show = false): Array<eraI | connectionI> => [
  ...get2009(show),
  {
    title: "??? (A long time)",
    show,
    id: ID.creation2_theDemonInvasion,
    position: { left: 2456, top: -842 },
    orientation: "vertical"
  },
  {
    title: "The Demon Invasion",
    show,
    color: "silver",
    backgroundImage: ID.theDemonInvasion,
    position: { left: 2354, top: -764 },
  },
  {
    title: "Thousands of years",
    show,
    id: ID.theDemonInvasion_skywardSword,
    position: { left: 2472, top: -598 },
  },
  {
    title: "Skyward Sword",
    show,
    color: "golden",
    backgroundImage: ID.skywardSword,
    position: { left: 2354, top: -520 },
  },
];