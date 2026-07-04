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
    from: ID.creation2,
    to: ID.theDemonInvasion,
  },
  {
    title: "The Demon Invasion",
    show,
    color: "silver",
    backgroundImage: ID.theDemonInvasion,
    event: -4,
    timeline: 2
  },
  {
    title: "Thousands of years",
    show,
    id: ID.theDemonInvasion_skywardSword,
    from: ID.theDemonInvasion,
    to: ID.skywardSword,
  },
  {
    title: "Skyward Sword",
    show,
    color: "golden",
    backgroundImage: ID.skywardSword,
    event: -3,
    timeline: 2
  },
  {
    title: "??? (A long time)",
    show,
    id: "skywardSword_hyruleKingdomIsEstablished2",
    from: ID.skywardSword,
    to: ID.hyruleKingdomIsEstablished2,
  }
];