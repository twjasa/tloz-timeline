import { connectionI } from "../debug_releases";
import { centerX, eraI } from "../releases";
import { get1987 } from "./1987-ziitaol";
import { ALL_IDS } from "../../constants/ids";

// THE LEGEND OF ZELDA: A LINK TO THE PAST
export const get1991 = (show = false): Array<eraI | connectionI> => [
  {
    title: "Creation",
    color: "silver",
    backgroundImage: ALL_IDS.creation1,
    show,
    position: { left: centerX, top: 1045 },
  },
  {
    title: "??? (A long time)",
    id: ALL_IDS.creation1_creationOfTheMasterSword,
    show,
    position: { left: 1101, top: 1213 },
  },
  {
    title: "Creation of the master sword",
    color: "silver",
    backgroundImage: ALL_IDS.creationOfTheMasterSword,
    show,
    position: { left: centerX, top: 1292 },
  },
  {
    title: "??? (A long time)",
    id: ALL_IDS.creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
    show,
    position: { left: 1101, top: 1459 },
  },
  {
    title: "Ganondorf gets the complete triforce",
    color: "silver",
    backgroundImage: ALL_IDS.ganondorfGetsTheCompleteTriforce,
    show,
    position: { left: centerX, top: 1538 },
  },
  {
    title: "Undefined time after",
    show,
    id: ALL_IDS.ganondorfGetsTheCompleteTriforce_theSealingWar,
    position: { left: 1101, top: 1706 },
  },
  {
    title: "The sealing war",
    color: "silver",
    backgroundImage: ALL_IDS.theSealingWar,
    show,
    position: { left: centerX, top: 1782 },
  },
  {
    title: "Centuries later",
    show,
    id: ALL_IDS.theSealingWar_aLinkToThePast,
    position: { left: 1101, top: 1953 },
  },
  {
    title: "A LINK TO THE PAST",
    color: "golden",
    backgroundImage: ALL_IDS.aLinkToThePast,
    show,
    position: { left: centerX, top: 2034 },
  },
  {
    title: "??? (A long time)",
    show,
    id: ALL_IDS.aLinkToThePast_tragedyOfPrincessZeldaI,
    position: { left: 1101, top: 2203 },
  },
  ...get1987(show),
];
