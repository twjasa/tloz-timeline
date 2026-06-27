import { connectionI } from "../releases";
import { eraI } from "../releases";
import { get1987 } from "./1987-ziitaol";
import { ID } from "../../constants/ids";

// THE LEGEND OF ZELDA: A LINK TO THE PAST
export const get1991 = (show = false): Array<eraI | connectionI> => [
  {
    title: "Creation",
    color: "silver",
    backgroundImage: ID.creation1,
    show,
    timeline: 0,
    event: 4,
  },
  {
    title: "??? (A long time)",
    id: ID.creation1_creationOfTheMasterSword,
    show,
    from: ID.creation1,
    to: ID.creationOfTheMasterSword,
  },
  {
    title: "Creation of the master sword",
    color: "silver",
    backgroundImage: ID.creationOfTheMasterSword,
    show,
    timeline: 0,
    event: 5,
  },
  {
    title: "??? (A long time)",
    id: ID.creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
    show,
    from: ID.creationOfTheMasterSword,
    to: ID.ganondorfGetsTheCompleteTriforce,
  },
  {
    title: "Ganondorf gets the complete triforce",
    color: "silver",
    backgroundImage: ID.ganondorfGetsTheCompleteTriforce,
    show,
    timeline: 0,
    event: 6,
  },
  {
    title: "Undefined time after",
    show,
    id: ID.ganondorfGetsTheCompleteTriforce_theSealingWar,
    from: ID.ganondorfGetsTheCompleteTriforce,
    to: ID.theSealingWar,
  },
  {
    title: "The sealing war",
    color: "silver",
    backgroundImage: ID.theSealingWar,
    show,
    timeline: 0,
    event: 7,
  },
  {
    title: "Centuries later",
    show,
    id: ID.theSealingWar_aLinkToThePast,
    from: ID.theSealingWar,
    to: ID.aLinkToThePast,
  },
  {
    title: "A LINK TO THE PAST",
    color: "golden",
    backgroundImage: ID.aLinkToThePast,
    show,
    timeline: 0,
    event: 8,
  },
  {
    title: "??? (A long time)",
    show,
    id: ID.aLinkToThePast_tragedyOfPrincessZeldaI,
    from: ID.aLinkToThePast,
    to: ID.tragedyOfPrincessZeldaI,
  },
  ...get1987(show),
];
