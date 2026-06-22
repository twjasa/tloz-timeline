import { eraI, connectionI } from "../releases";
import { get1998 } from "./1998-tlozoot";
import { ID } from "../../constants/ids";

// THE LEGEND OF ZELDA: MAJORA'S MASK
export const get2000 = (show = false): Array<eraI | connectionI> => [
  ...get1998(show),
  {
    title: "",
    show,
    id: ID.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_1,
    position: { left: 2294, top: 1863 },
    length: 80,
    orientation: "horizontal"
  },
  {
    title: "",
    show,
    id: ID.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_2,
    position: { left: 2114, top: 1200 },
    length: 666,
    orientation: "vertical"
  },
  {
    title: "",
    show,
    id: ID.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_3,
    position: { left: 1935, top: 1200 },
    length: 397,
    orientation: "horizontal"
  },
  {
    title: "",
    show,
    id: ID.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_4,
    position: { left: 1755, top: 1200 },
    length: 94,
    orientation: "vertical"
  },
  {
    title: "Link Warns Zelda of Ganondorf",
    show,
    color: "silver",
    backgroundImage: ID.linkWarnsZeldaOfGanondorf,
    backgroundPosition: { left: 0, top: -46 },
    position: { left: 1691, top: 1294 },
  },
  {
    title: "Several Months",
    show,
    id: ID.linkWarnsZeldaOfGanondorf_majorasMask,
    position: { left: 1797, top: 1463 },
    length: 81,
    orientation: "vertical"
  },
  {
    title: "Majora's Mask",
    show,
    color: "golden",
    backgroundImage: ID.majorasMask,
    backgroundPosition: { left: 0, top: -167 },
    position: { left: 1691, top: 1538 },
  },
];