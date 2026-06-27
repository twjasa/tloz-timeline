import { connectionI, eraI } from "../releases";

export const getUnification = (): Array<eraI | connectionI> => [
  {
    title: "UNIFICATION OF ALL TIMELINES",
    color: "zeldaColor",
    backgroundImage: "unificationText",
    show: false,
    event: 0,
    timeline: 0,
    textOnly: true,
  } as any,
  {
    title: "Creation",
    color: "silver",
    backgroundImage: creation1,
    show: false,
    timeline: 0,
    event: 0,
  },
  // {
  //   title: "??? (A long time)",
  //   show: false,
  //   id: creation1_sky,
  //   from: creation1,
  //   to: skywardSword,
  // },
  {
    title: "Skyward Sword",
    color: "golden",
    backgroundImage: skywardSword,
    show: false,
    timeline: 0,
    event: 1,
  }
];