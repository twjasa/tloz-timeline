import styles from '../components/Era/era.module.scss';
interface releasesI {
  year: number;
  name: string;
  eras: Array<eraI | connectionI>;
  animations: {
    id: string | string[];
    action:
    "up" |
    "down" |
    "zoom" |
    "hide" |
    "translateY" |
    "translateX" |
    "translateXY";
  }[];
  centerWindow?: boolean;
  makeSpace?: { x: number; y: number; height?: number | string; ids: string[]; }[];
}

interface connectionI {
  title: string;
  id: string;
  show: boolean;
  position?: { left: string | number; top: string | number; };
}

interface eraI {
  title: string;
  color: "golden" | "silver" | "zeldaColor";
  backgroundImage: string;
  backgroundPosition?: { left: number, top: number; };
  show: boolean;
  position?: { left: string | number; top: string | number; };
}
type ClipPathAnimation = {
  [key: string]: string[];
};

export const clipPathAnimation: ClipPathAnimation = {
  down: ['polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'],
  up: ['polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)']
};

const centerPercentageX = `calc(50% - ${(parseInt(styles.eraWidth, 10) + 12) / 2}px)`;

export const releases: releasesI[] = [
  {
    year: 1986,
    name: "The Legend of Zelda",
    eras: [
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
        show: true,
        position: { left: centerPercentageX, top: "34%" },
      },
      {
        title: "Immediately after",
        id: "gih-tloz",
        show: true,
        position: { left: '43%', top: "47.2%" }
      },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 2, top: -30 },
        show: true,
        position: { left: centerPercentageX, top: "53.4%" }
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
    // centerWindow: true,
    eras: [
      {
        title: "the tragedy of princess zelda I",
        color: "silver",
        backgroundImage: "tragedyOfPrincessZeldaI",
        show: false,
        position: { left: centerPercentageX, top: "14.4%" },
      },
      {
        title: "??? (A long time)", id: "ttopzI-gih", show: false,
        position: { left: '43%', top: "27.7%" }
      },
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
        show: true,
        position: { left: centerPercentageX, top: "34%" },
      },
      {
        title: "Immediately after",
        id: "gih-tloz",
        show: true,
        position: { left: '43%', top: "47.2%" }
      },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 2, top: -30 },
        show: true,
        position: { left: centerPercentageX, top: "53.4%" }
      },
      {
        title: "4 years later", id: "tloz-zeldaIItaol",
        show: false,
        position: { left: '43%', top: "66.5%" }
      },
      {
        title: "Zelda II: The Adventure of Link",
        color: "golden",
        backgroundImage: "zeldaIITAoL",
        show: false,
        position: { left: centerPercentageX, top: "72.9%" }
      },
    ],
    animations: [
      { id: '#tragedyOfPrincessZeldaI', action: 'down' },
      { id: "#ttopzI-gih", action: 'down' },
      { id: '#tloz-zeldaIItaol', action: 'down' },
      { id: '#zeldaIITAoL', action: 'down' },
    ]
  },
  {
    year: 1991,
    name: "The Legend of Zelda: A Link to the Past",
    centerWindow: true,
    eras: [
      {
        title: "Creation",
        color: "silver",
        backgroundImage: "creation1",
        show: false,
        position: { left: centerPercentageX, top: "-83%" },
      },
      {
        title: "??? (A long time)", id: "creation1-cotms",
        show: false,
        position: { left: '43%', top: "-69.8%" },
      },
      {
        title: "Creation of the master sword",
        color: "silver",
        backgroundImage: "creationOfTheMasterSword",
        show: false,
        position: { left: centerPercentageX, top: "-63.6%" },
      },
      {
        title: "??? (A long time)", id: "cotms-ggtct",
        show: false,
        position: { left: '43%', top: "-50.4%" },
      },
      {
        title: "Ganondorf gets the complete triforce",
        color: "silver",
        backgroundImage: "ganondorfGetsTheCompleteTriforce",
        show: false,
        position: { left: centerPercentageX, top: "-44.2%" },
      },
      {
        title: "Undefined time after",
        show: false,
        id: "ggtct-tsw",
        position: { left: '43%', top: "-31%" },
      },
      {
        title: "The sealing war",
        color: "silver",
        backgroundImage: "theSealingWar",
        show: false,
        position: { left: centerPercentageX, top: "-25%" },
      },
      {
        title: "Centuries later",
        show: false,
        id: "tsw-alttp",
        position: { left: '43%', top: "-11.6%" },
      },
      {
        title: "A LINK TO THE PAST",
        color: "golden",
        backgroundImage: "aLinkToThePast",
        show: false,
        position: { left: centerPercentageX, top: "-5.2%" },
      },
      {
        title: "??? (A long time)",
        show: false,
        id: "alttp-ttopzI",
        position: { left: '43%', top: "8.1%" },
      },
      {
        title: "the tragedy of princess zelda I",
        color: "silver",
        backgroundImage: "tragedyOfPrincessZeldaI",
        show: true,
        position: { left: centerPercentageX, top: "14.4%" },
      },
      {
        title: "??? (A long time)", id: "ttopzI-gih", show: false,
        position: { left: '43%', top: "27.7%" }
      },
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
        show: true,
        position: { left: centerPercentageX, top: "34%" },
      },
      {
        title: "Immediately after",
        id: "gih-tloz",
        show: true,
        position: { left: '43%', top: "47.2%" }
      },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 2, top: -30 },
        show: true,
        position: { left: centerPercentageX, top: "53.4%" }
      },
      {
        title: "4 years later", id: "tloz-zeldaIItaol",
        show: true,
        position: { left: '43%', top: "66.5%" }
      },
      {
        title: "Zelda II: The Adventure of Link",
        color: "golden",
        backgroundImage: "zeldaIITAoL",
        show: true,
        position: { left: centerPercentageX, top: "72.9%" }
      },
    ],
    animations: [
      { id: '#creation1', action: 'down' },
      { id: '#creation1-cotms', action: 'down' },
      { id: '#creationOfTheMasterSword', action: 'down' },
      { id: '#cotms-ggtct', action: 'down' },
      { id: '#ganondorfGetsTheCompleteTriforce', action: 'down' },
      { id: '#ggtct-tsw', action: 'down' },
      { id: '#theSealingWar', action: 'down' },
      { id: '#tsw-alttp', action: 'down' },
      { id: '#aLinkToThePast', action: 'down' },
      { id: '#alttp-ttopzI', action: 'down' },
    ]
  },
  {
    year: 1993,
    name: "The Legend of Zelda: Link's Awakening",
    centerWindow: true,
    makeSpace: [{
      x: 0, y: -244.06, ids: [
        '#alttp-la',
        '#aLinkToThePast',
        '#tsw-alttp',
        '#theSealingWar',
        '#ggtct-tsw',
        '#ganondorfGetsTheCompleteTriforce',
        '#cotms-ggtct',
        '#creationOfTheMasterSword',
        '#creation1-cotms',
        '#creation1',
      ]
    }],
    eras: [
      {
        title: "Creation",
        color: "silver",
        backgroundImage: "creation1",
        show: true,
        position: { left: centerPercentageX, top: "-83%" },
      },
      {
        title: "??? (A long time)", id: "creation1-cotms",
        show: true,
        position: { left: '43%', top: "-69.8%" },
      },
      {
        title: "Creation of the master sword",
        color: "silver",
        backgroundImage: "creationOfTheMasterSword",
        show: true,
        position: { left: centerPercentageX, top: "-63.6%" },
      },
      {
        title: "??? (A long time)", id: "cotms-ggtct",
        show: true,
        position: { left: '43%', top: "-50.4%" },
      },
      {
        title: "Ganondorf gets the complete triforce",
        color: "silver",
        backgroundImage: "ganondorfGetsTheCompleteTriforce",
        show: true,
        position: { left: centerPercentageX, top: "-44.2%" },
      },
      {
        title: "Undefined time after",
        show: true,
        id: "ggtct-tsw",
        position: { left: '43%', top: "-31%" },
      },
      {
        title: "The sealing war",
        color: "silver",
        backgroundImage: "theSealingWar",
        show: true,
        position: { left: centerPercentageX, top: "-25%" },
      },
      {
        title: "Centuries later",
        show: true,
        id: "tsw-alttp",
        position: { left: '43%', top: "-11.6%" },
      },
      {
        title: "A LINK TO THE PAST",
        color: "golden",
        backgroundImage: "aLinkToThePast",
        show: true,
        position: { left: centerPercentageX, top: "-5.2%" },
      },
      {
        title: "A few months later",
        show: false,
        id: "alttp-la",
        position: { left: '43%', top: "8%" },
      },
      {
        title: "Link's Awakening",
        color: "golden",
        backgroundImage: "linksAwakening",
        show: false,
        position: { left: centerPercentageX, top: "-5%" },
      },
      {
        title: "??? (A long time)",
        show: true,
        id: "alttp-ttopzI",
        position: { left: '43%', top: "8.1%" },
      },
      {
        title: "the tragedy of princess zelda I",
        color: "silver",
        backgroundImage: "tragedyOfPrincessZeldaI",
        show: true,
        position: { left: centerPercentageX, top: "14.4%" },
      },
      {
        title: "??? (A long time)",
        show: true,
        id: "ttopzI-gih",
        position: { left: '43%', top: "27.7%" },
      },
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
        show: true,
        position: { left: centerPercentageX, top: "34%" },
      },
      {
        title: "Immediately after",
        show: true,
        id: "gih-tloz",
        position: { left: '43%', top: "47.2%" }
      },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 0, top: -50 },
        show: true,
        position: { left: centerPercentageX, top: "53.4%" }
      },
      {
        title: "4 years later",
        show: true,
        id: "tloz-zeldaII-taol",
        position: { left: '43%', top: "66.5%" }
      },
      {
        title: "Zelda II: The Adventure of Link",
        color: "golden",
        backgroundImage: "zeldaIITAoL",
        show: true,
        position: { left: centerPercentageX, top: "72.9%" }
      }
    ],
    animations: [
      { id: "#alttp-la", action: 'down' },
      { id: "#linksAwakening", action: 'down' },
    ]
  },
  {
    year: 1998,
    name: "The Legend of Zelda: Ocarina of Time",
    centerWindow: true,
    makeSpace: [{
      x: 0, y: -481.06, ids: [
        '#creation1',
        '#creation1-cotms',
        '#creationOfTheMasterSword',
      ]
    },
    {
      x: 0, y: -481.06, height: "316px", ids: [
        '#cotms-ggtct',
      ]
    }],
    eras: [
      {
        title: "Creation",
        color: "silver",
        backgroundImage: "creation1",
        show: true,
        position: { left: centerPercentageX, top: "-83%" },
      },
      {
        title: "??? (A long time)", id: "creation1-cotms",
        show: true,
        position: { left: '43%', top: "-69.8%" },
      },
      {
        title: "Creation of the master sword",
        color: "silver",
        backgroundImage: "creationOfTheMasterSword",
        show: true,
        position: { left: centerPercentageX, top: "-63.6%" },
      },
      {
        title: "??? (A long time)", id: "cotms-ggtct",
        show: true,
        position: { left: '43%', top: "-50.4%" },
      },
      {
        title: "Ganondorf gets the complete triforce",
        color: "silver",
        backgroundImage: "ganondorfGetsTheCompleteTriforce",
        show: true,
        position: { left: centerPercentageX, top: "-44.2%" },
      },
      {
        title: "Undefined time after",
        show: true,
        id: "ggtct-tsw",
        position: { left: '43%', top: "-31%" },
      },
      {
        title: "The sealing war",
        color: "silver",
        backgroundImage: "theSealingWar",
        show: true,
        position: { left: centerPercentageX, top: "-25%" },
      },
      {
        title: "Centuries later",
        show: true,
        id: "tsw-alttp",
        position: { left: '43%', top: "-11.6%" },
      },
      {
        title: "A LINK TO THE PAST",
        color: "golden",
        backgroundImage: "aLinkToThePast",
        show: true,
        position: { left: centerPercentageX, top: "-5.2%" },
      },
      {
        title: "A few months later",
        show: true,
        id: "alttp-la",
        position: { left: '43%', top: "8%" },
      },
      {
        title: "Link's Awakening",
        color: "golden",
        backgroundImage: "linksAwakening",
        show: true,
        position: { left: centerPercentageX, top: "-5%" },
      },
      {
        title: "??? (A long time)",
        show: true,
        id: "alttp-ttopzI",
        position: { left: '43%', top: "8.1%" },
      },
      {
        title: "the tragedy of princess zelda I",
        color: "silver",
        backgroundImage: "tragedyOfPrincessZeldaI",
        show: true,
        position: { left: centerPercentageX, top: "14.4%" },
      },
      {
        title: "??? (A long time)",
        show: true,
        id: "ttopzI-gih",
        position: { left: '43%', top: "27.7%" },
      },
      {
        title: "ganon invades hyrule",
        color: "silver",
        backgroundImage: "ganonInvadesHyrule",
        show: true,
        position: { left: centerPercentageX, top: "34%" },
      },
      {
        title: "Immediately after",
        show: true,
        id: "gih-tloz",
        position: { left: '43%', top: "47.2%" }
      },
      {
        title: "The legend of zelda",
        color: "golden",
        backgroundImage: "theLegendOfZelda",
        backgroundPosition: { left: 0, top: -50 },
        show: true,
        position: { left: centerPercentageX, top: "53.4%" }
      },
      {
        title: "4 years later",
        show: true,
        id: "tloz-zeldaII-taol",
        position: { left: '43%', top: "66.5%" }
      },
      {
        title: "Zelda II: The Adventure of Link",
        color: "golden",
        backgroundImage: "zeldaIITAoL",
        show: true,
        position: { left: centerPercentageX, top: "72.9%" }
      },
      {
        title: "Ocarina of Time (Adult)",
        show: false,
        color: "golden",
        backgroundImage: "ocarinaOfTimeAdult",
        position: { left: '90%', top: "-43.9%" },
      },
      {
        title: "7 years",
        show: false,
        id: "oot-adult-oot-child",
        position: { left: '100%', top: "-49.9%" },
      },
      {
        title: "Ocarina of Time (Child)",
        show: false,
        color: "golden",
        backgroundImage: "ocarinaOfTimeChild",
        position: { left: '90%', top: "-62.9%" },
      },
      {
        title: "9 years",
        show: false,
        id: "oot-child-tfw",
        position: { left: '100%', top: "-68.9%" },
      },
      {
        title: "The Fierce War",
        color: "silver",
        backgroundImage: "theFierceWar",
        show: false,
        position: { left: '90%', top: "-81.9%" },
      },
      {
        title: "??? (A long time)",
        show: false,
        id: "cotms2-tfw",
        position: { left: '105%', top: "-87.9%" },
      },
      {
        title: "Creation of the master sword",
        show: false,
        color: "silver",
        backgroundImage: "creationOfTheMasterSword2",
        position: { left: '90%', top: "-100.9%" },
      },
      {
        title: "??? (A long time)",
        show: false,
        id: "cotms2-creation2",
        position: { left: '105%', top: "-107%" },
      },
      {
        title: "Creation",
        show: false,
        color: "silver",
        backgroundImage: "creation2",
        position: { left: '90%', top: "-120.2%" },
      },
    ],
    animations: [
      { id: "#creation2", action: 'down' },
      { id: "#cotms2-creation2", action: 'down' },
      { id: "#creationOfTheMasterSword2", action: 'down' },
      { id: "#cotms2-tfw", action: 'down' },
      { id: "#theFierceWar", action: 'down' },
      { id: "#oot-child-tfw", action: 'down' },
      { id: "#ocarinaOfTimeChild", action: 'down' },
      { id: "#oot-adult-oot-child", action: 'down' },
      { id: "#ocarinaOfTimeAdult", action: 'down' },
    ]
  }
];