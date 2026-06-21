import { eraI, connectionI, centerX } from "../releases";
import { get2003 } from "./2003-tloztww";

// THE LEGEND OF ZELDA: THE MINISH CAP
export const get2005 = (show = false): Array<eraI | connectionI> => [
  ...get2003(show),
  {
    title: "??? (A long time)",
    show,
    id: creationOfTheMasterSword1_hyruleKingdomIsEstablished1,
    position: { left: 1101, top: -354 },
    orientation: "vertical"
  },
  {
    title: "??? (A long time)",
    show,
    id: creationOfTheMasterSword2_hyruleKingdomIsEstablished2,
    position: { left: 2456, top: -354 },
    orientation: "vertical"
  },
  {
    title: "Hyrule Kingdom is Established",
    show,
    id: hyruleKingdomIsEstablished1,
    color: "silver",
    backgroundImage: hyruleKingdomIsEstablished1,
    backgroundPosition: { left: 0, top: -27 },
    position: { left: centerX, top: -276 },
  },
  {
    title: "Hyrule Kingdom is Established",
    show,
    id: hyruleKingdomIsEstablished2,
    color: "silver",
    backgroundPosition: { left: 0, top: -47 },
    backgroundImage: hyruleKingdomIsEstablished2,
    position: { left: 2354, top: -276 },
  },
  {
    title: "??? (A long time)",
    show,
    id: hyruleKingdomIsEstablished2_theFierceWar,
    position: { left: 2456, top: -110 },
    orientation: "vertical",
    length: 1157
  },
  {
    title: "??? (A long time)",
    show,
    id: hyruleKingdomIsEstablished1_theWarOfTheBoundChest,
    position: { left: 1101, top: -110 },
    orientation: "vertical"
  },
  {
    title: "The War of the Bound Chest",
    show,
    id: theWarOfTheBoundChest,
    color: "silver",
    backgroundImage: theWarOfTheBoundChest,
    backgroundPosition: { left: 0, top: -108 },
    position: { left: centerX, top: -32 },
  },
  {
    title: "??? (Centuries?)",
    show,
    id: theWarOfTheBoundChest_theMinishCap,
    position: { left: 1101, top: 134 },
    orientation: "vertical"
  },
  {
    title: "The Minish Cap",
    show,
    id: theMinishCap,
    color: "golden",
    backgroundImage: theMinishCap,
    backgroundPosition: { left: 2, top: -54 },
    position: { left: centerX, top: 212 },
  },
  {
    title: "???",
    show,
    id: theMinishCap_vaatiIsSealed,
    position: { left: 1101, top: 378 },
    orientation: "vertical"
  },
];