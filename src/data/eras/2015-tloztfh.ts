import { connectionI } from "../releases";
import { eraI } from "../releases";
import { get2013 } from "./2013-tlozalbw";

// THE LEGEND OF ZELDA: A Link Between Worlds
export const get2015 = (show = false): Array<eraI | connectionI> => [
  ...get2013(show),
  {
    title: "Several years",
    show,
    id: aLinkBetweenWorlds_triForceHeroes,
    position: { left: 1061, top: 4278 },
    orientation: "vertical",
  },
  {
    title: "Tri Force Heroes",
    show,
    color: "golden",
    backgroundImage: triForceHeroes,
    position: { left: 1009, top: 4356 }
  },
  {
    title: "??? (A Long Time)",
    id: triForceHeroes_theTragedyOfPrincessZeldaI,
    show,
    position: { left: 1087, top: 4522 },
    orientation: "vertical"
  }
];