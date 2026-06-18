import styles from '../components/Era/era.module.scss';
import { get1986, get1987, get1991, get1993, get1998 } from './eras';
import { get2000 } from './eras/2000-tlozmm';
import { get2001 } from './eras/2001-tlozoos';
import { ALL_IDS } from '../constants/ids';

/**
 * Representa un paso (release/juego) en la secuencia de la timeline.
 *
 * Cada release corresponde a un juego de Zelda y define qué eras y conexiones
 * se muestran, qué animaciones se ejecutan, y si la vista debe re-centrarse.
 */
export interface releasesI {
  year: number;
  name: string;
  eras: Array<eraI | connectionI>;
  animations: {
    id: string | string[];
    action:
    "up" |
    "down" |
    "left" |
    "right" |
    "zoom" |
    "hide" |
    "translateY" |
    "translateX" |
    "translateXY";
  }[];
  centerWindow?: boolean | string[];
  makeSpace?: { x: number; y: number; height?: number | string; ids: string[]; }[];
}

/**
 * Representa una conexión temporal (línea) entre dos eras en la timeline.
 */
export interface connectionI {
  title: string;
  id: string;
  show: boolean;
  position?: { left: string | number; top: string | number; };
  orientation?: "horizontal" | "vertical";
  length?: number | string;
}

/**
 * Representa una era (evento histórico o juego) en la timeline.
 */
export interface eraI {
  title: string;
  color: "golden" | "silver" | "zeldaColor";
  backgroundImage: string;
  backgroundPosition?: { left: number, top: number; };
  show: boolean;
  position?: { left: string | number; top: string | number; };
}

/** Mapa de dirección a par de valores clip-path [inicio, fin] para las animaciones. */
type ClipPathAnimation = {
  [key: string]: string[];
};

/**
 * Valores de clip-path para las animaciones de revelado.
 */
export const clipPathAnimation: ClipPathAnimation = {
  down: ['polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'],
  up: ['polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'],
  right: ['polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'],
  left: ['polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)']
};

/**
 * Posición horizontal fija (en px) de la columna principal de eras en el canvas.
 * Derivada del viewport de desarrollo original: 2560/2 - (eraWidth + 12)/2 = 1009px.
 */
export const centerX = Math.round(2560 / 2 - (parseInt(styles.eraWidth, 10) + 12) / 2);

/**
 * Array ordenado cronológicamente con todos los pasos de la timeline.
 *
 * Cada entrada representa un juego de la saga y define las eras visibles,
 * las animaciones de revelado, y las configuraciones de zoom/movimiento.
 * Los pasos se navegan secuencialmente con los botones ← →.
 */
export const releases: releasesI[] = [
  {
    year: 1986,
    name: "The Legend of Zelda",
    eras: get1986(true),
    centerWindow: true,
    animations: [
      { id: ALL_IDS.ganonInvadesHyrule, action: 'down' },
      { id: ALL_IDS.ganonInvadesHyrule_theLegendOfZelda, action: 'down' },
      { id: ALL_IDS.theLegendOfZelda, action: 'down' },
    ]
  }, // "The Legend of Zelda" 
  {
    year: 1987,
    name: "Zelda II: The Adventure of Link",
    eras: get1987(),
    centerWindow: true,
    animations: [
      { id: ALL_IDS.tragedyOfPrincessZeldaI, action: 'down' },
      { id: ALL_IDS.tragedyOfPrincessZeldaI_ganonInvadesHyrule, action: 'down' },
      { id: ALL_IDS.theLegendOfZelda_zeldaIITAoL, action: 'down' },
      { id: ALL_IDS.zeldaIITAoL, action: 'down' },
    ]
  }, // "Zelda II: The Adventure of Link" 
  {
    year: 1991,
    name: "The Legend of Zelda: A Link to the Past",
    centerWindow: true,
    eras: get1991(),
    animations: [
      { id: ALL_IDS.creation1, action: 'down' },
      { id: ALL_IDS.creation1_creationOfTheMasterSword, action: 'down' },
      { id: ALL_IDS.creationOfTheMasterSword, action: 'down' },
      { id: ALL_IDS.creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce, action: 'down' },
      { id: ALL_IDS.ganondorfGetsTheCompleteTriforce, action: 'down' },
      { id: ALL_IDS.ganondorfGetsTheCompleteTriforce_theSealingWar, action: 'down' },
      { id: ALL_IDS.theSealingWar, action: 'down' },
      { id: ALL_IDS.theSealingWar_aLinkToThePast, action: 'down' },
      { id: ALL_IDS.aLinkToThePast, action: 'down' },
      { id: ALL_IDS.aLinkToThePast_tragedyOfPrincessZeldaI, action: 'down' },
    ]
  }, // "The Legend of Zelda: A Link to the Past" 
  {
    year: 1993,
    name: "The Legend of Zelda: Link's Awakening",
    centerWindow: [
      ALL_IDS.creation1,
      ALL_IDS.creation1_creationOfTheMasterSword,
      ALL_IDS.creationOfTheMasterSword,
      ALL_IDS.creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
      ALL_IDS.ganondorfGetsTheCompleteTriforce,
      ALL_IDS.ganondorfGetsTheCompleteTriforce_theSealingWar,
      ALL_IDS.theSealingWar,
      ALL_IDS.theSealingWar_aLinkToThePast,
      ALL_IDS.aLinkToThePast,
      ALL_IDS.aLinkToThePast_tragedyOfPrincessZeldaI,
    ],
    makeSpace: [{
      x: 0, y: -244.06, ids: [
        ALL_IDS.aLinkToThePast_linksAwakening,
        ALL_IDS.aLinkToThePast,
        ALL_IDS.theSealingWar_aLinkToThePast,
        ALL_IDS.theSealingWar,
        ALL_IDS.ganondorfGetsTheCompleteTriforce_theSealingWar,
        ALL_IDS.ganondorfGetsTheCompleteTriforce,
        ALL_IDS.creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
        ALL_IDS.creationOfTheMasterSword,
        ALL_IDS.creation1_creationOfTheMasterSword,
        ALL_IDS.creation1,
      ]
    }],
    eras: get1993(),
    animations: [
      { id: ALL_IDS.aLinkToThePast_linksAwakening, action: 'down' },
      { id: ALL_IDS.linksAwakening, action: 'down' },
    ]
  }, // "The Legend of Zelda: Link's Awakening"   
  {
    year: 1998,
    name: "The Legend of Zelda: Ocarina of Time",
    centerWindow: true,
    makeSpace: [{
      x: 0, y: -481.06, ids: [
        ALL_IDS.creation1,
        ALL_IDS.creation1_creationOfTheMasterSword,
        ALL_IDS.creationOfTheMasterSword,
      ]
    },
    {
      x: 0, y: -481.06, height: "316px", ids: [
        ALL_IDS.creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
      ]
    }],
    eras: get1998(),
    animations: [
      { id: ALL_IDS.creation2, action: 'down' },
      { id: ALL_IDS.creationOfTheMasterSword2_creation2, action: 'down' },
      { id: ALL_IDS.creationOfTheMasterSword2, action: 'down' },
      { id: ALL_IDS.creationOfTheMasterSword2_theFierceWar, action: 'down' },
      { id: ALL_IDS.theFierceWar, action: 'down' },
      { id: ALL_IDS.ocarinaOfTimeChild_theFierceWar, action: 'down' },
      { id: ALL_IDS.ocarinaOfTimeChild, action: 'down' },
      { id: ALL_IDS.ocarinaOfTimeAdult_ocarinaOfTimeChild, action: 'down' },
      { id: ALL_IDS.ocarinaOfTimeAdult, action: 'down' },
    ]
  }, // "The Legend of Zelda: Ocarina of Time" 
  {
    year: 2000,
    name: "The Legend of Zelda: Majora's Mask",
    centerWindow: true,
    makeSpace: [{
      x: 300, y: 0, ids: [
        ALL_IDS.creation2,
        ALL_IDS.creationOfTheMasterSword2_creation2,
        ALL_IDS.creationOfTheMasterSword2,
        ALL_IDS.creationOfTheMasterSword2_theFierceWar,
        ALL_IDS.theFierceWar,
        ALL_IDS.ocarinaOfTimeChild_theFierceWar,
        ALL_IDS.ocarinaOfTimeChild,
        ALL_IDS.ocarinaOfTimeAdult_ocarinaOfTimeChild,
        ALL_IDS.ocarinaOfTimeAdult,
      ]
    }],
    eras: get2000(),
    animations: [
      { id: ALL_IDS.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_1, action: 'left' },
      { id: ALL_IDS.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_2, action: 'up' },
      { id: ALL_IDS.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_3, action: 'left' },
      { id: ALL_IDS.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_4, action: 'down' },
      { id: ALL_IDS.linkWarnsZeldaOfGanondorf, action: 'down' },
      { id: ALL_IDS.linkWarnsZeldaOfGanondorf_majorasMask, action: 'down' },
      { id: ALL_IDS.majorasMask, action: 'down' }
    ]
  }, // "The Legend of Zelda: Majora's Mask" 
  {
    year: 2001,
    name: "The Legend of Zelda: Oracle of Ages/Seasons",
    centerWindow: true,
    makeSpace: [{
      x: 0, y: 485, ids: [
        ALL_IDS.linksAwakening,
        ALL_IDS.aLinkToThePast_tragedyOfPrincessZeldaI,
        ALL_IDS.tragedyOfPrincessZeldaI,
        ALL_IDS.tragedyOfPrincessZeldaI_ganonInvadesHyrule,
        ALL_IDS.ganonInvadesHyrule,
        ALL_IDS.theLegendOfZelda,
        ALL_IDS.ganonInvadesHyrule_theLegendOfZelda,
        ALL_IDS.zeldaIITAoL,
        ALL_IDS.theLegendOfZelda_zeldaIITAoL,
      ]
    }],
    eras: get2001(),
    animations: [
      { id: ALL_IDS.aLinkToThePast_linksAwakening, action: 'hide' },
      { id: ALL_IDS.aLinkToThePast_oracleOfAges, action: 'down' },
      { id: ALL_IDS.oracleOfAges, action: 'down' },
      { id: ALL_IDS.oracleOfAges_oracleOfSeasons, action: 'down' },
      { id: ALL_IDS.oracleOfSeasons, action: 'down' },
      { id: ALL_IDS.oracleOfSeasons_linksAwakening, action: "down" }
    ]
  }, // "The Legend of Zelda: Oracle of Ages" 
];