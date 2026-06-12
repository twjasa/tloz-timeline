import { connectionI } from "../debug_releases";
import { eraI } from "../releases";
import { get1993 } from "./1993-tlozla";

// THE LEGEND OF ZELDA: Ocarina of Time
export const get1998 = (): Array<eraI | connectionI> => [
  ...get1993(),
  {
    title: "Ocarina of Time (Adult)",
    show: false,
    color: "golden",
    backgroundImage: "ocarinaOfTimeAdult",
    position: { left: '90%', top: "-44.2%" },
  },
  {
    title: "7 years",
    show: false,
    id: "oot-adult-oot-child",
    position: { left: '100%', top: "-50.9%" },
  },
  {
    title: "Ocarina of Time (Child)",
    show: false,
    color: "golden",
    backgroundImage: "ocarinaOfTimeChild",
    position: { left: '90%', top: "-63.0652%" },
    backgroundPosition: { left: 0, top: -192 },
  },
  {
    title: "9 years",
    show: false,
    id: "oot-child-tfw",
    position: { left: '100%', top: "-69.7%" },
  },
  {
    title: "The Fierce War",
    color: "silver",
    backgroundImage: "theFierceWar",
    show: false,
    position: { left: '90%', top: "-82.8%" },
  },
  {
    title: "??? (A long time)",
    show: false,
    id: "cotms2-tfw",
    position: { left: '105%', top: "-88.9%" },
  },
  {
    title: "Creation of the master sword",
    show: false,
    color: "silver",
    backgroundImage: "creationOfTheMasterSword2",
    position: { left: '90%', top: "-100.777%" },
  },
  {
    title: "??? (A long time)",
    show: false,
    id: "cotms2-creation2",
    position: { left: '105%', top: "-107.6%" },
  },
  {
    title: "Creation",
    show: false,
    color: "silver",
    backgroundImage: "creation2",
    position: { left: '90%', top: "-120.15%" },
  },
]