import { connectionI } from "../debug_releases";
import { centerPercentageX, eraI } from "../releases";
import { get1991 } from "./1991-tlozalttp";

// THE LEGEND OF ZELDA: A LINK TO THE PAST
export const get1993 = (): Array<eraI | connectionI> => [
  ...get1991(),
  {
    title: "A few months later",
    show: false,
    id: "alttp-la",
    position: { left: '43%', top: "8%" },
  },
  {
    title: "Link's Awakening",
    color: "golden",
    backgroundImage: "linksAwakening",
    show: false,
    position: { left: centerPercentageX, top: "-5%" },
  },

]