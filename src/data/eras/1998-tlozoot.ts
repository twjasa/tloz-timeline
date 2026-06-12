import { connectionI } from "../debug_releases";
import { eraI } from "../releases";
import { get1993 } from "./1993-tlozla";

// THE LEGEND OF ZELDA: Ocarina of Time
export const get1998 = (show = false): Array<eraI | connectionI> => [
  ...get1993(show),
  {
    title: "Ocarina of Time (Adult)",
    show,
    color: "golden",
    backgroundImage: "ocarinaOfTimeAdult",
    position: { left: '90%', top: "-44.2%" },
  },
  {
    title: "7 years",
    show,
    id: "oot-adult-oot-child",
    position: { left: '96%', top: "-50.9%" },
  },
  {
    title: "Ocarina of Time (Child)",
    show,
    color: "golden",
    backgroundImage: "ocarinaOfTimeChild",
    position: { left: '90%', top: "-63.0652%" },
    backgroundPosition: { left: 0, top: -192 },
  },
  {
    title: "9 years",
    show,
    id: "oot-child-tfw",
    position: { left: '96%', top: "-69.7%" },
  },
  {
    title: "The Fierce War",
    color: "silver",
    backgroundImage: "theFierceWar",
    show,
    position: { left: '90%', top: "-82.8%" },
  },
  {
    title: "??? (A long time)",
    show,
    id: "cotms2-tfw",
    position: { left: '96%', top: "-88.9%" },
  },
  {
    title: "Creation of the master sword",
    show,
    color: "silver",
    backgroundImage: "creationOfTheMasterSword2",
    position: { left: '90%', top: "-100.777%" },
  },
  {
    title: "??? (A long time)",
    show,
    id: "cotms2-creation2",
    position: { left: '96%', top: "-107.6%" },
  },
  {
    title: "Creation",
    show,
    color: "silver",
    backgroundImage: "creation2",
    position: { left: '90%', top: "-120.15%" },
  },
]