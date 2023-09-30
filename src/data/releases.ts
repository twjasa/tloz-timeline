interface releasesI {
  year: number;
  name: string;
  eras: Array<eraI | string>;
};

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
        backgroundImage: "link_impa.png",
      },
      "Immediately after",
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "tloz1_link_observing.png",
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
        backgroundImage: "tragedyOfPrincessZelda-taol.png",
      },
      "??? (A long time)",
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "link_impa.png",
      },
      "Immediately after",
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "tloz1_link_observing.png",
        backgroundPosition: { left: 0, top: -50 },
      },
      "4 years later",
      {
        title: "Zelda II: The Adventure of Link",
        color: "golden",
        backgroundImage: "zeldaIITAoL-impaLink.png",
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
        backgroundImage: "alttp_goddesses.png",
      },
      "??? (A long time)",
      {
        title: "Creation of the master sword",
        color: "silver",
        backgroundImage: "master_sword.jpg",
      },
      "??? (A long time)",
      {
        title: "Ganondorf gets the complete triforce",
        color: "silver",
        backgroundImage: "triforce_alttp.png",
      },
      "Undefined time after",
      {
        title: "The sealing war",
        color: "silver",
        backgroundImage: "imprisoning_war.webp",
      },
      "Centuries later",
      {
        title: "A LINK TO THE PAST",
        color: "golden",
        backgroundImage: "lttp.webp",
      },
      "??? (A long time)",
      {
        title: "the tragedy of princess zelda I",
        color: "silver",
        backgroundImage: "tragedyOfPrincessZelda-taol.png",
      },
      "??? (A long time)",
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "link_impa.png",
      },
      "Immediately after",
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "tloz1_link_observing.png",
        backgroundPosition: { left: 0, top: -50 },
      },
      "4 years later",
      {
        title: "Zelda II: The Adventure of Link",
        color: "golden",
        backgroundImage: "zeldaIITAoL-impaLink.png",
        // backgroundPosition: { left: 0, top: -50 },
      },
    ]
  }
];