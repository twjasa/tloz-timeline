import { eraI, connectionI } from "../releases";
import { get2000 } from "./2000-tlozmm";
import { ID } from "../../constants/ids";

// THE LEGEND OF ZELDA: ORACLE OF SEASONS/AGES
export const get2001 = (show = false): Array<eraI | connectionI> => [
    ...get2000(show),
    {
        title: "A few months later?",
        show,
        id: ID.aLinkToThePast_oracleOfAges,
        from: ID.aLinkToThePast,
        to: ID.oracleOfAges
    },
    {
        title: "Oracle of Ages",
        show,
        color: "golden",
        backgroundImage: ID.oracleOfAges,
        backgroundPosition: { left: -1, top: -56 },
        event: 9,
        timeline: 0
    },
    {
        title: "Immediately after",
        show,
        id: ID.oracleOfAges_oracleOfSeason,
        from: ID.oracleOfAges,
        to: ID.oracleOfSeason,
    },
    {
        title: "Oracle of Season",
        show,
        color: "golden",
        backgroundImage: ID.oracleOfSeason,
        backgroundPosition: { left: 2, top: -54 },
        event: 10,
        timeline: 0,
    },
    {
        title: "A few months later?",
        show,
        id: ID.oracleOfSeason_linksAwakening,
        from: ID.oracleOfSeason,
        to: ID.linksAwakening,
    },
];