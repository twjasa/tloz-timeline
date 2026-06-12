import { connectionI } from "../debug_releases";
import { centerX, eraI } from "../releases";
import { get1987 } from "./1987-ziitaol";

// THE LEGEND OF ZELDA: A LINK TO THE PAST
export const get1991 = (show = false): Array<eraI | connectionI> => [
  {
    title: "Creation",
    color: "silver",
    backgroundImage: "creation1",
    show,
    position: { left: centerX, top: 1045 },
  },
  {
    title: "??? (A long time)", id: "creation1-cotms",
    show,
    position: { left: 1101, top: 1213 },
  },
  {
    title: "Creation of the master sword",
    color: "silver",
    backgroundImage: "creationOfTheMasterSword",
    show,
    position: { left: centerX, top: 1292 },
  },
  {
    title: "??? (A long time)", id: "cotms-ggtct",
    show,
    position: { left: 1101, top: 1459 },
  },
  {
    title: "Ganondorf gets the complete triforce",
    color: "silver",
    backgroundImage: "ganondorfGetsTheCompleteTriforce",
    show,
    position: { left: centerX, top: 1538 },
  },
  {
    title: "Undefined time after",
    show,
    id: "ggtct-tsw",
    position: { left: 1101, top: 1706 },
  },
  {
    title: "The sealing war",
    color: "silver",
    backgroundImage: "theSealingWar",
    show,
    position: { left: centerX, top: 1782 },
  },
  {
    title: "Centuries later",
    show,
    id: "tsw-alttp",
    position: { left: 1101, top: 1953 },
  },
  {
    title: "A LINK TO THE PAST",
    color: "golden",
    backgroundImage: "aLinkToThePast",
    show,
    position: { left: centerX, top: 2034 },
  },
  {
    title: "??? (A long time)",
    show,
    id: "alttp-ttopzI",
    position: { left: 1101, top: 2203 },
  },
  ...get1987(show),
]
