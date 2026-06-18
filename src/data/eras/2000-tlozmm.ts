import { eraI, connectionI } from "../releases";
import { get1998 } from "./1998-tlozoot";
import { ALL_IDS } from "../../constants/ids";

// THE LEGEND OF ZELDA: MAJORA'S MASK
export const get2000 = (show = false): Array<eraI | connectionI> => [
  ...get1998(show),
  {
    title: "",
    show,
    id: ALL_IDS.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_1,
    position: { left: 2489, top: 1578 },
    length: 135,
    orientation: "horizontal"
  },
  {
    title: "",
    show,
    id: ALL_IDS.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_2,
    position: { left: 2348, top: 1200 },
    length: 378,
    orientation: "vertical"
  },
  {
    title: "",
    show,
    id: ALL_IDS.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_3,
    position: { left: 2104, top: 1200 },
    length: 410,
    orientation: "horizontal"
  },
  {
    title: "",
    show,
    id: ALL_IDS.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_4,
    position: { left: 1963, top: 1200 },
    length: 94,
    orientation: "vertical"
  },
  {
    title: "Link Warns Zelda of Ganondorf",
    show,
    color: "silver",
    backgroundImage: ALL_IDS.linkWarnsZeldaOfGanondorf,
    position: { left: 1838, top: 1294 },
  },
  {
    title: "Several Months",
    show,
    id: ALL_IDS.linkWarnsZeldaOfGanondorf_majorasMask,
    position: { left: 1982, top: 1463 },
    length: 81,
    orientation: "vertical"
  },
  {
    title: "Majora's Mask",
    show,
    color: "golden",
    backgroundImage: ALL_IDS.majorasMask,
    position: { left: 1838, top: 1538 },
  },
];