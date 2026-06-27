import { eraI, connectionI } from "../releases";
import { get2015 } from "./2015-tloztfh";

// THE LEGEND OF ZELDA: THE WIND WAKER
export const get2017 = (show = false): Array<eraI | connectionI> => [
  ...get2015(show),
  {
    title: "??? (A long time)",
    show,
    id: twilightPrincess_ganondorfSealing,
    from: twilightPrincess,
    to: ganondorfSealing,
  },
  {
    title: "Ganondorf's Sealing",
    show,
    id: ganondorfSealing,
    color: "silver",
    backgroundImage: ganondorfSealing,
    event: 21,
    timeline: 1
  },
  {
    title: "??? (A long time)",
    show,
    id: ganondorfSealing_theAncientCalamity,
    from: ganondorfSealing,
    to: theAncientCalamity,
  },
  {
    title: "The Ancient Calamity",
    show,
    id: theAncientCalamity,
    color: "silver",
    backgroundImage: theAncientCalamity,
    backgroundPosition: { left: -1, top: -69 },
    event: 22,
    timeline: 1
  },
  {
    title: "9,900 years",
    show,
    id: theAncientCalamity_theGreatCalamity,
    from: theAncientCalamity,
    to: theGreatCalamity,
  },
  {
    title: "The Great Calamity",
    color: "silver",
    backgroundImage: theGreatCalamity,
    show,
    backgroundPosition: { left: 0, top: -101 },
    event: 23,
    timeline: 1
  },
  {
    title: "100 years",
    show,
    id: theGreatCalamity_breathOfTheWild,
    from: theGreatCalamity,
    to: breathOfTheWild,
  },
  {
    title: "Breath of the Wild",
    color: "golden",
    backgroundImage: breathOfTheWild,
    show,
    backgroundPosition: { left: 0, top: -75 },
    event: 24,
    timeline: 1
  },

];