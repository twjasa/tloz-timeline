import { connectionI } from "../debug_releases";
import { centerX, eraI } from "../releases";
import { get1991 } from "./1991-tlozalttp";

// THE LEGEND OF ZELDA: LINK'S AWAKENING
export const get1993 = (show = false): Array<eraI | connectionI> => [
  ...get1991(show),
  {
    title: "A few months later",
    show,
    id: "alttp-la",
    position: { left: 1101, top: 2202 },
  },
  {
    title: "Link's Awakening",
    color: "golden",
    backgroundImage: "linksAwakening",
    show,
    position: { left: centerX, top: 2036 },
  },

]