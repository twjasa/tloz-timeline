import { eraI, connectionI } from "../releases";
import { get1998 } from "./1998-tlozoot";

// THE LEGEND OF ZELDA: MAJORA'S MASK
export const get2000 = (show = false): Array<eraI | connectionI> => [
  ...get1998(show),
  {
    title: "",
    show,
    id: "oot-adult-lwzog-1",
    position: { left: '122%', top: "-38.1%" },
    length: 146,
    orientation: "horizontal"
  },
  {
    title: "",
    show,
    id: "oot-adult-lwzog-2",
    position: { left: '115%', top: "-70.1%" },
    length: 427,
    orientation: "vertical"
  },
  {
    title: "",
    show,
    id: "oot-adult-lwzog-3",
    position: { left: '100.67%', top: "-70.1%" },
    length: 476,
    orientation: "horizontal"
  },
  {
    title: "",
    show,
    id: "oot-adult-lwzog-4",
    position: { left: '94%', top: "-69.1%" },
    length: 81,
    orientation: "vertical"
  },
  {
    title: "Link Warns Zelda of Ganondorf",
    show,
    color: "silver",
    backgroundImage: "linkWarnsZeldaOfGanondorf",
    position: { left: '90%', top: "-63.4%" },
  },
  {
    title: "Several Months",
    show,
    id: "lwzog-mm",
    position: { left: '97%', top: "-50.1%" },
    length: 81,
    orientation: "vertical"
  },
  {
    title: "Majora's Mask",
    show,
    color: "golden",
    backgroundImage: "majorasMask",
    position: { left: '90%', top: "-44.2%" },
  },
]