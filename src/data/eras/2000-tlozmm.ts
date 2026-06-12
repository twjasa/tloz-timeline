import { eraI, connectionI } from "../releases";
import { get1998 } from "./1998-tlozoot";

// THE LEGEND OF ZELDA: MAJORA'S MASK
export const get2000 = (show = false): Array<eraI | connectionI> => [
  ...get1998(show),
  {
    title: "",
    show,
    id: "oot-adult-lwzog-1",
    position: { left: 3123, top: 1616 },
    length: 146,
    orientation: "horizontal"
  },
  {
    title: "",
    show,
    id: "oot-adult-lwzog-2",
    position: { left: 2944, top: 1209 },
    length: 427,
    orientation: "vertical"
  },
  {
    title: "",
    show,
    id: "oot-adult-lwzog-3",
    position: { left: 2577, top: 1209 },
    length: 476,
    orientation: "horizontal"
  },
  {
    title: "",
    show,
    id: "oot-adult-lwzog-4",
    position: { left: 2406, top: 1222 },
    length: 81,
    orientation: "vertical"
  },
  {
    title: "Link Warns Zelda of Ganondorf",
    show,
    color: "silver",
    backgroundImage: "linkWarnsZeldaOfGanondorf",
    position: { left: 2304, top: 1294 },
  },
  {
    title: "Several Months",
    show,
    id: "lwzog-mm",
    position: { left: 2483, top: 1463 },
    length: 81,
    orientation: "vertical"
  },
  {
    title: "Majora's Mask",
    show,
    color: "golden",
    backgroundImage: "majorasMask",
    position: { left: 2304, top: 1538 },
  },
]