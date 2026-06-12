import { eraI, connectionI, centerPercentageX } from "../releases";
import { get2000 } from "./2000-tlozmm";

// THE LEGEND OF ZELDA: ORACLE OF SEASONS/AGES
export const get2001 = (show = false): Array<eraI | connectionI> => [
    ...get2000(show),
    {
        title: "A few months later?",
        show,
        id: "alttp-ooa",
        position: { left: "43%", top: "-11.1%" },
        // length: 146,
        orientation: "vertical"
    },
    {
        title: "Oracle of Ages",
        show,
        color: "golden",
        backgroundImage: "oracleOfAges",
        position: { left: centerPercentageX, top: "-5.2%" },
    },
    {
        title: "Immediately after",
        show,
        id: "ooa-oos",
        position: { left: "43%", top: "7.9%" },
        orientation: "vertical"
    },
    {
        title: "Oracle of Season",
        show,
        color: "golden",
        backgroundImage: "oracleOfSeasons",
        position: { left: centerPercentageX, top: "13.8%" },
    },
    {
        title: "A few months later?",
        show,
        id: "oos-la",
        position: { left: "43%", top: "26.9%" },
        orientation: "vertical"
    },
]