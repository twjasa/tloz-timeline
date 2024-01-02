interface releasesI {
  year: number;
  name: string;
  eras: Array<eraI | connectionI>;
  animations: { id: string; action: "up" | "down" | "zoom"; }[];
  cameraPosition?: { x: number; y: number; };
  zoom?: { x: number; y: number; z: number; };
};

interface connectionI {
  title: string;
  id: string;
  show: boolean;
}

interface eraI {
  title: string;
  color: "golden" | "silver" | "zeldaColor";
  backgroundImage: string;
  backgroundPosition?: { left: number, top: number; };
  show: boolean;
}
type ClipPathAnimation = {
  [key: string]: string[];
};

export const clipPathAnimation: ClipPathAnimation = {
  down: ['polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'],
  up: ['polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)']
};

export const releases: releasesI[] = [
  {
    year: 1986,
    name: "The Legend of Zelda",
    eras: [
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
        show: false,
      },
      { title: "Immediately after", id: "gih-tloz", show: false },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 0, top: -50 },
        show: false,
      },
    ],
    animations: [
      { id: 'ganonInvadesHyrule', action: 'down' },
      { id: 'gih-tloz', action: 'down' },
      { id: 'theLegendOfZelda', action: 'down' },
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
        show: false,

      },
      { title: "??? (A long time)", id: "ttopzI-gih", show: false },
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
        show: true,

      },
      { title: "Immediately after", id: "gih-tloz", show: true },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 0, top: -50 },
        show: true,

      },
      {
        title: "4 years later", id: "tloz-zeldaIItaol",
        show: false,
      },
      {
        title: "Zelda II: The Adventure of Link",
        color: "golden",
        backgroundImage: "zeldaIITAoL",
        show: false,
      },
    ],
    animations: [
      { id: "ttopzI-gih", action: 'up' },
      { id: 'tragedyOfPrincessZeldaI', action: 'up' },
      { id: 'tloz-zeldaIItaol', action: 'down' },
      { id: 'zeldaIITAoL', action: 'down' },
    ]
  },
  {
    year: 1991,
    name: "The Legend of Zelda: A Link to the Past",
    cameraPosition: { x: 0, y: 0 },
    zoom: { x: 800, y: 1000, z: 0.5 },
    eras: [
      {
        title: "Creation",
        color: "silver",
        backgroundImage: "creation1",
        show: false,

      },
      {
        title: "??? (A long time)", id: "creation1-cotms",
        show: false,
      },
      {
        title: "Creation of the master sword",
        color: "silver",
        backgroundImage: "creationOfTheMasterSword",
        show: false,

      },
      {
        title: "??? (A long time)", id: "cotms-ggtct",
        show: false,
      },
      {
        title: "Ganondorf gets the complete triforce",
        color: "silver",
        backgroundImage: "ganondorfGetsTheCompleteTriforce",
        show: false,

      },
      {
        title: "Undefined time after",
        show: false,
        id: "ggtct-tsw"
      },
      {
        title: "The sealing war",
        color: "silver",
        backgroundImage: "theSealingWar",
        show: false,

      },
      {
        title: "Centuries later",
        show: false,
        id: "tsw-alttp"
      },
      {
        title: "A LINK TO THE PAST",
        color: "golden",
        backgroundImage: "aLinkToThePast",
        show: false,

      },
      {
        title: "??? (A long time)",
        show: false,
        id: "alttp-ttopzI"
      },
      {
        title: "the tragedy of princess zelda I",
        color: "silver",
        backgroundImage: "tragedyOfPrincessZeldaI",
        show: true,

      },
      {
        title: "??? (A long time)",
        show: true,
        id: "ttopzI-gih"
      },
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
        show: true,

      },
      {
        title: "Immediately after",
        show: true,
        id: "gih-tloz"
      },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 0, top: -50 },
        show: true,

      },
      {
        title: "4 years later",
        show: true,
        id: "tloz-zeldaII-taol"
      },
      {
        title: "Zelda II: The Adventure of Link",
        color: "golden",
        backgroundImage: "zeldaIITAoL",
        show: true,
        // backgroundPosition: { left: 0, top: -50 },
      },
    ],
    animations: [
      { id: '1991-zoom', action: 'zoom' },
      { id: 'alttp-ttopzI', action: 'up' },
      { id: 'aLinkToThePast', action: 'up' },
      { id: 'tsw-alttp', action: 'up' },
      { id: 'theSealingWar', action: 'up' },
      { id: 'ggtct-tsw', action: 'up' },
      { id: 'ganondorfGetsTheCompleteTriforce', action: 'up' },
      { id: 'cotms-ggtct', action: 'up' },
      { id: 'creationOfTheMasterSword', action: 'up' },
      { id: 'creation1-cotms', action: 'up' },
      { id: 'creation1', action: 'up' },
    ]
  },
  {
    year: 1993,
    name: "The Legend of Zelda: Link's Awakening",
    eras: [
      {
        title: "Creation",
        color: "silver",
        backgroundImage: "creation1",
        show: true,

      },
      {
        title: "??? (A long time)", id: "creation1-cotms",
        show: true,
      },
      {
        title: "Creation of the master sword",
        color: "silver",
        backgroundImage: "creationOfTheMasterSword",
        show: true,

      },
      {
        title: "??? (A long time)", id: "cotms-ggtct",
        show: true,
      },
      {
        title: "Ganondorf gets the complete triforce",
        color: "silver",
        backgroundImage: "ganondorfGetsTheCompleteTriforce",
        show: true,

      },
      {
        title: "Undefined time after",
        show: true,
        id: "ggtct-tsw"
      },
      {
        title: "The sealing war",
        color: "silver",
        backgroundImage: "theSealingWar",
        show: true,

      },
      {
        title: "Centuries later",
        show: true,
        id: "tsw-alttp"
      },
      {
        title: "A LINK TO THE PAST",
        color: "golden",
        backgroundImage: "aLinkToThePast",
        show: true,
      },
      {
        title: "A few months later",
        show: true,
        id: "alttp-la"
      },
      {
        title: "Link's Awakening",
        color: "golden",
        backgroundImage: "linksAwakening",
        show: true,
      },
      {
        title: "??? (A long time)",
        show: true,
        id: "alttp-ttopzI"
      },
      {
        title: "the tragedy of princess zelda I",
        color: "silver",
        backgroundImage: "tragedyOfPrincessZeldaI",
        show: true,

      },
      {
        title: "??? (A long time)",
        show: true,
        id: "ttopzI-gih"
      },
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
        show: true,

      },
      {
        title: "Immediately after",
        show: true,
        id: "gih-tloz"
      },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 0, top: -50 },
        show: true,

      },
      {
        title: "4 years later",
        show: true,
        id: "tloz-zeldaII-taol"
      },
      {
        title: "Zelda II: The Adventure of Link",
        color: "golden",
        backgroundImage: "zeldaIITAoL",
        show: true,
        // backgroundPosition: { left: 0, top: -50 },
      }
    ],
    animations: [

    ]
  }
];