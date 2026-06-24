import { connectionI, eraI } from "../releases";
import { get2017 } from "./2017-tlozbotw";

export const getUnification = (): Array<eraI | connectionI> => [
  ...get2017(true),
  {
    title: "UNIFICATION OF ALL TIMELINES",
    color: "zeldaColor",
    backgroundImage: "unificationText",
    show: false,
    position: { left: 1280, top: 6300 },
    textOnly: true,
  } as any
];