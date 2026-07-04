import { eraI, connectionI } from "../releases";
import { get1998 } from "./1998-tlozoot";
import { ID } from "../../constants/ids";

// THE LEGEND OF ZELDA: MAJORA'S MASK
export const get2000 = (show = false): Array<eraI | connectionI> => [
  ...get1998(show),
  {
    title: "",
    show,
    id: ID.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf,
    from: ID.ocarinaOfTimeAdult,
    to: ID.linkWarnsZeldaOfGanondorf,
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