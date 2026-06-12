import { connectionI } from "../debug_releases";
import { centerPercentageX, eraI } from "../releases";
import { get1987 } from "./1987-ziitaol";

// THE LEGEND OF ZELDA: A LINK TO THE PAST
export const get1991 = (): Array<eraI | connectionI> => [
  {
    title: "Creation",
    color: "silver",
    backgroundImage: "creation1",
    show: false,
    position: { left: centerPercentageX, top: "-83%" },
  },
  {
    title: "??? (A long time)", id: "creation1-cotms",
    show: false,
    position: { left: '43%', top: "-69.8%" },
  },
  {
    title: "Creation of the master sword",
    color: "silver",
    backgroundImage: "creationOfTheMasterSword",
    show: false,
    position: { left: centerPercentageX, top: "-63.6%" },
  },
  {
    title: "??? (A long time)", id: "cotms-ggtct",
    show: false,
    position: { left: '43%', top: "-50.4%" },
  },
  {
    title: "Ganondorf gets the complete triforce",
    color: "silver",
    backgroundImage: "ganondorfGetsTheCompleteTriforce",
    show: false,
    position: { left: centerPercentageX, top: "-44.2%" },
  },
  {
    title: "Undefined time after",
    show: false,
    id: "ggtct-tsw",
    position: { left: '43%', top: "-31%" },
  },
  {
    title: "The sealing war",
    color: "silver",
    backgroundImage: "theSealingWar",
    show: false,
    position: { left: centerPercentageX, top: "-25%" },
  },
  {
    title: "Centuries later",
    show: false,
    id: "tsw-alttp",
    position: { left: '43%', top: "-11.6%" },
  },
  {
    title: "A LINK TO THE PAST",
    color: "golden",
    backgroundImage: "aLinkToThePast",
    show: false,
    position: { left: centerPercentageX, top: "-5.2%" },
  },
  {
    title: "??? (A long time)",
    show: false,
    id: "alttp-ttopzI",
    position: { left: '43%', top: "8.1%" },
  },
  ...get1987(),
]
