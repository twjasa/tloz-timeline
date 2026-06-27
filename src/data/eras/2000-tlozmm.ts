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
    position: { left: 2302, top: 1861 },
    length: 72,
    orientation: "horizontal"
  },
  {
    title: "",
    show,
    id: ID.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_2,
    position: { left: 2302, top: 1200 },
    length: 666,
    orientation: "vertical"
  },
  {
    title: "",
    show,
    id: ID.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_3,
    position: { left: 1943, top: 1199 },
    length: 384,
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
    event: 5,
    timeline: 1
  },
  {
    title: "Several Months",
    show,
    id: ID.linkWarnsZeldaOfGanondorf_majorasMask,
    from: ID.linkWarnsZeldaOfGanondorf,
    to: ID.majorasMask,
  },
  {
    title: "Majora's Mask",
    show,
    color: "golden",
    backgroundImage: ID.majorasMask,
    backgroundPosition: { left: 0, top: -167 },
    event: 6,
    timeline: 1
  },
];