import styles from '../components/Era/era.module.scss';
import { get2000 } from './eras/2000-tlozmm';
export interface releasesI {
  year: number;
  name: string;
  eras: Array<eraI | connectionI>;
  animations: AnimationType[];
  centerWindow?: boolean;
  makeSpace?: { x: number; y: number; height?: number | string; ids: string[]; }[];
}

export type AnimationType = {
  id: string | string[];
  action?:
  "up" |
  "down" |
  "zoom" |
  "hide" |
  "translateY" |
  "translateX" |
  "translateXY";
};

export interface connectionI {
  title: string;
  id: string;
  show: boolean;
  position?: { left: string | number; top: string | number; };
}

export interface eraI {
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

export const debug_extratop: releasesI[] = [
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
      { id: "#ttopzI-gih", action: 'up' },
      { id: '#tragedyOfPrincessZeldaI', action: 'up' },
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
        position: { left: centerPercentageX, top: "-50%" },
      },
      {
        title: "A LINK TO THE PAST",
        color: "golden",
        backgroundImage: "aLinkToThePast",
        show: false,
        position: { left: centerPercentageX, top: "30%" },
      },
    ],
    animations: [
      { id: '#aLinkToThePast', action: 'up' },
      { id: '#creation1', action: 'up' },
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
      { id: "#alttp-la", action: 'down' },
      { id: "#linksAwakening", action: 'down' },
    ]
  }
];

export const debug_extratop_and_extrabottom: releasesI[] = [
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
      { id: "#ttopzI-gih", action: 'up' },
      { id: '#tragedyOfPrincessZeldaI', action: 'up' },
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
        position: { left: centerPercentageX, top: "-130%" },
      },
      {
        title: "A LINK TO THE PAST",
        color: "golden",
        backgroundImage: "aLinkToThePast",
        show: false,
        position: { left: "200%", top: "100%" },
      },
    ],
    animations: [
      { id: '#aLinkToThePast', action: 'up' },
      { id: '#creation1', action: 'up' },
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
      { id: "#alttp-la", action: 'down' },
      { id: "#linksAwakening", action: 'down' },
    ]
  }
];

export const debug_majoras_mask: releasesI[] = [
  {
    year: 2000,
    name: "The Legend of Zelda: Majora's Mask",
    centerWindow: true,
    makeSpace: [{
      x: 800, y: 0, ids: [
        '#creation2',
        '#cotms2-creation2',
        '#creationOfTheMasterSword2',
        '#cotms2-tfw',
        '#theFierceWar',
        '#oot-child-tfw',
        '#ocarinaOfTimeChild',
        '#oot-adult-oot-child',
        '#ocarinaOfTimeAdult',
      ]
    }],
    eras: get2000(true),
    animations: [
      { id: "#oot-adult-lwzog", action: 'down' },
      { id: "#linkWarnsZeldaOfGanondorf", action: 'down' },
    ]
  } // "The Legend of Zelda: Majora's Mask" 
];