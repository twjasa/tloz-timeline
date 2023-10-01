interface releasesI {
  year: number;
  name: string;
  eras: Array<eraI | connectionI>;
};

interface connectionI {
  title: string;
  id: string;
}

interface eraI {
  title: string;
  color: "golden" | "silver" | "zeldaColor";
  backgroundImage: string;
  backgroundPosition?: { left: number, top: number; };
}

export const releases: releasesI[] = [
  {
    year: 1986,
    name: "The Legend of Zelda",
    eras: [
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
      },
      { title: "Immediately after", id: "gih-tloz" },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 0, top: -50 },
      },
    ]
  },
  {
    year: 1987,
    name: "Zelda II: The Adventure of Link",
    eras: [
      {
        title: "the tragedy of princess zelda I",
        color: "silver",
        backgroundImage: "tragedyOfPrincessZeldaI",
      },
      { title: "??? (A long time)", id: "ttopzI-gih" },
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
      },
      { title: "Immediately after", id: "gih-tloz" },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 0, top: -50 },
      },
      { title: "4 years later", id: "tloz-zeldaII:taol" },
      {
        title: "Zelda II: The Adventure of Link",
        color: "golden",
        backgroundImage: "zeldaIITAoL",
        // backgroundPosition: { left: 0, top: -50 },
      },
    ]
  },
  {
    year: 1991,
    name: "The Legend of Zelda: A Link to the Past",
    eras: [
      {
        title: "Creation",
        color: "silver",
        backgroundImage: "creation1",
      },
      { title: "??? (A long time)", id: "creation1-cotms" },
      {
        title: "Creation of the master sword",
        color: "silver",
        backgroundImage: "creationOfTheMasterSword",
      },
      { title: "??? (A long time)", id: "cotms-ggtct" },
      {
        title: "Ganondorf gets the complete triforce",
        color: "silver",
        backgroundImage: "ganondorfGetsTheCompleteTriforce",
      },
      { title: "Undefined time after", id: "ggtct-tsw" },
      {
        title: "The sealing war",
        color: "silver",
        backgroundImage: "theSealingWar",
      },
      { title: "Centuries later", id: "tsw-alttp" },
      {
        title: "A LINK TO THE PAST",
        color: "golden",
        backgroundImage: "aLinkToThePast",
      },
      { title: "??? (A long time)", id: "alttp-ttopzI" },
      {
        title: "the tragedy of princess zelda I",
        color: "silver",
        backgroundImage: "tragedyOfPrincessZeldaI",
      },
      { title: "??? (A long time)", id: "ttopzI-gih" },
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
      },
      { title: "Immediately after", id: "gih-tloz" },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 0, top: -50 },
      },
      { title: "4 years later", id: "tloz-zeldaII-taol" },
      {
        title: "Zelda II: The Adventure of Link",
        color: "golden",
        backgroundImage: "zeldaIITAoL",
        // backgroundPosition: { left: 0, top: -50 },
      },
    ]
  }
];