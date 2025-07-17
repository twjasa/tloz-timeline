import styles from '../components/Era/era.module.scss';
import { get1986, get1987, get1991, get1993, get1998 } from './eras';
import { get2000 } from './eras/2000-tlozmm';

export interface releasesI {
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

export interface connectionI {
  title: string;
  id: string;
  show: boolean;
  position?: { left: string | number; top: string | number; };
  orientation?: "horizontal" | "vertical";
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

export const centerPercentageX = `calc(50% - ${(parseInt(styles.eraWidth, 10) + 12) / 2}px)`;

export const releases: releasesI[] = [
  {
    year: 1986,
    name: "The Legend of Zelda",
    eras: get1986(),
    animations: [
      { id: 'ganonInvadesHyrule', action: 'down' },
      { id: 'gih-tloz', action: 'down' },
      { id: 'theLegendOfZelda', action: 'down' },
    ]
  },
  {
    year: 1987,
    name: "Zelda II: The Adventure of Link",
    eras: get1987(),
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
    eras: get1991(),
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
    eras: get1993(),
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
    eras: get1998(),
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
  },
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
    eras: get2000(),
    animations: [
      { id: "#oot-adult-lwzog", action: 'down' },
      { id: "#linkWarnsZeldaOfGanondorf", action: 'down' },
    ]
  }
];