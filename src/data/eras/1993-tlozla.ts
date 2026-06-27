import { connectionI } from "../releases";
import { eraI } from "../releases";
import { get1991 } from "./1991-tlozalttp";
import { ID } from "../../constants/ids";

// THE LEGEND OF ZELDA: LINK'S AWAKENING
export const get1993 = (show = false): Array<eraI | connectionI> => [
  ...get1991(show),
  {
    title: "A few months later",
    show,
    id: ID.aLinkToThePast_linksAwakening,
    from: ID.aLinkToThePast,
    to: ID.linksAwakening,
  },
  {
    title: "Link's Awakening",
    color: "golden",
    backgroundImage: ID.linksAwakening,
    show,
    event: 8,
    timeline: 0,
  },
  {
    title: "??? (a long time)",
    show,
    id: ID.linksAwakening_tragedyOfPrincessZeldaI,
    from: ID.linksAwakening,
    to: ID.tragedyOfPrincessZeldaI,
  },
];