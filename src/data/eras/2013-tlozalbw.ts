import { connectionI } from "../releases";
import { eraI } from "../releases";
import { get2011 } from "./2011-tlozsw";

// THE LEGEND OF ZELDA: A Link Between Worlds
export const get2013 = (show = false): Array<eraI | connectionI> => [
  ...get2011(show),
  {
    title: "??? (A Long Time)",
    show,
    id: vaatiIsSealed_theTriforceWar1,
    from: vaatiIsSealed,
    to: theTriforceWar1,
    },
  {
    title: "The Triforce War",
    show,
    color: "silver",
    backgroundImage: theTriforceWar1,
    position: { left: 1009, top: 200 },
  },
  {
    title: "??? (A Long Time)",
    show,
    id: theTriforceWar1_fourSwords,
    from: theTriforceWar1,
    to: fourSwords,
    },
  {
    title: "120 years (6 generations)",
    show,
    id: aLinkToThePast_aLinkBetweenWorlds,
    from: aLinkToThePast,
    to: aLinkBetweenWorlds,
    },
  {
    title: "A Link Between Worlds",
    show,
    color: "golden",
    backgroundImage: aLinkBetweenWorlds,
    position: { left: 1009, top: 4112 }
  },
  {
    id: aLinkBetweenWorlds_theTragedyOfPrincessZeldaI,
    title: "??? (A Long Time)",
    show,
    position: { left: 1087, top: 4278 },
    orientation: "vertical"
  }
];