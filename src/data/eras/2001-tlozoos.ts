import { eraI, connectionI, centerX } from "../releases";
import { get2000 } from "./2000-tlozmm";

// THE LEGEND OF ZELDA: ORACLE OF SEASONS/AGES
export const get2001 = (show = false): Array<eraI | connectionI> => [
    ...get2000(show),
    {
        title: "A few months later?",
        show,
        id: "alttp-ooa",
        position: { left: 1101, top: 1959 },
        // length: 146,
        orientation: "vertical"
    },
    {
        title: "Oracle of Ages",
        show,
        color: "golden",
        backgroundImage: "oracleOfAges",
        position: { left: centerX, top: 2034 },
    },
    {
        title: "Immediately after",
        show,
        id: "ooa-oos",
        position: { left: 1101, top: 2200 },
        orientation: "vertical"
    },
    {
        title: "Oracle of Season",
        show,
        color: "golden",
        backgroundImage: "oracleOfSeasons",
        position: { left: centerX, top: 2275 },
    },
    {
        title: "A few months later?",
        show,
        id: "oos-la",
        position: { left: 1101, top: 2442 },
        orientation: "vertical"
    },
]