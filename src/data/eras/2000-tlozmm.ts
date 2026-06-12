import { connectionI } from "../debug_releases";
import { eraI } from "../releases";
import { get1998 } from "./1998-tlozoot";

// THE LEGEND OF ZELDA: MAJORA'S MASK
export const get2000 = (show = false): Array<eraI | connectionI> => [
  ...get1998(show),
  {
    title: "",
    show,
    id: "oot-adult-lwzog",
    position: { left: '100%', top: "-127.1%" },
  },
  {
    title: "Link Warns Zelda of Ganondorf",
    show,
    color: "silver",
    backgroundImage: "linkWarnsZeldaOfGanondorf",
    position: { left: '90%', top: "-63.4%" },
  },
]