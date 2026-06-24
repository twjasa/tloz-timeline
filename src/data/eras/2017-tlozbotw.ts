import { eraI, connectionI } from "../releases";
import { get2015 } from "./2015-tloztfh";

// THE LEGEND OF ZELDA: THE WIND WAKER
export const get2017 = (show = false): Array<eraI | connectionI> => [
  ...get2015(show),
  {
    title: "??? (A long time)",
    show,
    id: twilightPrincess_ganondorfSealing,
    position: { left: 1791, top: 2203 },
    orientation: "vertical",
    length: 3374
  },
  {
    title: "Ganondorf's Sealing",
    show,
    id: ganondorfSealing,
    color: "silver",
    backgroundImage: ganondorfSealing,
    position: { left: 1691, top: 5577 },
  },
  {
    title: "??? (A long time)",
    show,
    id: ganondorfSealing_theAncientCalamity,
    position: { left: 1791, top: 5743 },
    orientation: "vertical",
  },
  {
    title: "The Ancient Calamity",
    show,
    id: theAncientCalamity,
    color: "silver",
    backgroundImage: theAncientCalamity,
    backgroundPosition: { left: -1, top: -69 },
    position: { left: 1691, top: 5821 },
  },
  {
    title: "9,900 years",
    show,
    id: theAncientCalamity_theGreatCalamity,
    position: { left: 1756, top: 5987 },
    orientation: "vertical",
  },
  {
    title: "The Great Calamity",
    color: "silver",
    backgroundImage: theGreatCalamity,
    show,
    backgroundPosition: { left: 0, top: -101 },
    position: { left: 1691, top: 6065 }
  },
  {
    title: "100 years",
    show,
    id: theGreatCalamity_breathOfTheWild,
    position: { left: 1742, top: 6231 },
    orientation: "vertical",
  },
  {
    title: "Breath of the Wild",
    color: "golden",
    backgroundImage: breathOfTheWild,
    show,
    backgroundPosition: { left: 0, top: -75 },
    position: { left: 1691, top: 6309 }
  },

];