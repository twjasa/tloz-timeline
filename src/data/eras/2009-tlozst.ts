import { eraI, connectionI } from "../releases";
import { get2007 } from "./2007-tlozph";

// THE LEGEND OF ZELDA: SPIRIT TRACKS
export const get2009 = (show = false): Array<eraI | connectionI> => [
  ...get2007(show),
  {
    title: "100 years",
    show,
    id: phantomHourglass_spiritTracks,
    from: phantomHourglass,
    to: spiritTracks,
    },
  {
    title: "Spirit Tracks",
    show,
    id: spiritTracks,
    color: "golden",
    backgroundImage: spiritTracks,
    position: { left: 2354, top: 2771 },
  },
];