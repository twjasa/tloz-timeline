import styles from '../components/Era/era.module.scss';
import { get1986, get1987, get1991, get1993, get1998 } from './eras';
import { get2000 } from './eras/2000-tlozmm';
import { get2001 } from './eras/2001-tlozoos';
import { ID } from '../constants/ids';

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
    eras: get1986(),
    centerWindow: true,
    animations: [
      { id: ID.ganonInvadesHyrule, action: 'down' },
      { id: ID.ganonInvadesHyrule_theLegendOfZelda, action: 'down' },
      { id: ID.theLegendOfZelda, action: 'down' },
    ]
  }, // "The Legend of Zelda" 
  {
    year: 1987,
    name: "Zelda II: The Adventure of Link",
    eras: get1987(),
    centerWindow: true,
    animations: [
      { id: ID.tragedyOfPrincessZeldaI, action: 'down' },
      { id: ID.tragedyOfPrincessZeldaI_ganonInvadesHyrule, action: 'down' },
      { id: ID.theLegendOfZelda_zeldaIITAoL, action: 'down' },
      { id: ID.zeldaIITAoL, action: 'down' },
    ]
  }, // "Zelda II: The Adventure of Link" 
  {
    year: 1991,
    name: "The Legend of Zelda: A Link to the Past",
    centerWindow: true,
    eras: get1991(),
    animations: [
      { id: ID.creation1, action: 'down' },
      { id: ID.creation1_creationOfTheMasterSword, action: 'down' },
      { id: ID.creationOfTheMasterSword, action: 'down' },
      { id: ID.creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce, action: 'down' },
      { id: ID.ganondorfGetsTheCompleteTriforce, action: 'down' },
      { id: ID.ganondorfGetsTheCompleteTriforce_theSealingWar, action: 'down' },
      { id: ID.theSealingWar, action: 'down' },
      { id: ID.theSealingWar_aLinkToThePast, action: 'down' },
      { id: ID.aLinkToThePast, action: 'down' },
      { id: ID.aLinkToThePast_tragedyOfPrincessZeldaI, action: 'down' },
    ]
  }, // "The Legend of Zelda: A Link to the Past" 
  {
    year: 1993,
    name: "The Legend of Zelda: Link's Awakening",
    centerWindow: [
      ID.creation1,
      ID.creation1_creationOfTheMasterSword,
      ID.creationOfTheMasterSword,
      ID.creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
      ID.ganondorfGetsTheCompleteTriforce,
      ID.ganondorfGetsTheCompleteTriforce_theSealingWar,
      ID.theSealingWar,
      ID.theSealingWar_aLinkToThePast,
      ID.aLinkToThePast,
      ID.aLinkToThePast_tragedyOfPrincessZeldaI,
    ],
    makeSpace: [{
      x: 0, y: -244.06, ids: [
        ID.aLinkToThePast_linksAwakening,
        ID.aLinkToThePast,
        ID.theSealingWar_aLinkToThePast,
        ID.theSealingWar,
        ID.ganondorfGetsTheCompleteTriforce_theSealingWar,
        ID.ganondorfGetsTheCompleteTriforce,
        ID.creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
        ID.creationOfTheMasterSword,
        ID.creation1_creationOfTheMasterSword,
        ID.creation1,
      ]
    }],
    eras: get1993(),
    animations: [
      { id: ID.aLinkToThePast_linksAwakening, action: 'down' },
      { id: ID.linksAwakening, action: 'down' },
    ]
  }, // "The Legend of Zelda: Link's Awakening"   
  {
    year: 1998,
    name: "The Legend of Zelda: Ocarina of Time",
    centerWindow: true,
    makeSpace: [{
      x: 0, y: -481.06, ids: [
        ID.creation1,
        ID.creation1_creationOfTheMasterSword,
        ID.creationOfTheMasterSword,
      ]
    },
    {
      x: 0, y: -481.06, height: "316px", ids: [
        ID.creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
      ]
    }],
    eras: get1998(),
    animations: [
      { id: ID.creation2, action: 'down' },
      { id: ID.creationOfTheMasterSword2_creation2, action: 'down' },
      { id: ID.creationOfTheMasterSword2, action: 'down' },
      { id: ID.creationOfTheMasterSword2_theFierceWar, action: 'down' },
      { id: ID.theFierceWar, action: 'down' },
      { id: ID.ocarinaOfTimeChild_theFierceWar, action: 'down' },
      { id: ID.ocarinaOfTimeChild, action: 'down' },
      { id: ID.ocarinaOfTimeAdult_ocarinaOfTimeChild, action: 'down' },
      { id: ID.ocarinaOfTimeAdult, action: 'down' },
    ]
  }, // "The Legend of Zelda: Ocarina of Time" 
  {
    year: 2000,
    name: "The Legend of Zelda: Majora's Mask",
    centerWindow: true,
    makeSpace: [{
      x: 300, y: 0, ids: [
        ID.creation2,
        ID.creationOfTheMasterSword2_creation2,
        ID.creationOfTheMasterSword2,
        ID.creationOfTheMasterSword2_theFierceWar,
        ID.theFierceWar,
        ID.ocarinaOfTimeChild_theFierceWar,
        ID.ocarinaOfTimeChild,
        ID.ocarinaOfTimeAdult_ocarinaOfTimeChild,
        ID.ocarinaOfTimeAdult,
      ]
    }],
    eras: get2000(),
    animations: [
      { id: ID.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_1, action: 'left' },
      { id: ID.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_2, action: 'up' },
      { id: ID.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_3, action: 'left' },
      { id: ID.ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_4, action: 'down' },
      { id: ID.linkWarnsZeldaOfGanondorf, action: 'down' },
      { id: ID.linkWarnsZeldaOfGanondorf_majorasMask, action: 'down' },
      { id: ID.majorasMask, action: 'down' }
    ]
  }, // "The Legend of Zelda: Majora's Mask" 
  {
    year: 2001,
    name: "The Legend of Zelda: Oracle of Ages/Seasons",
    centerWindow: true,
    makeSpace: [{
      x: 0, y: 485, ids: [
        ID.linksAwakening,
        ID.aLinkToThePast_tragedyOfPrincessZeldaI,
        ID.tragedyOfPrincessZeldaI,
        ID.tragedyOfPrincessZeldaI_ganonInvadesHyrule,
        ID.ganonInvadesHyrule,
        ID.theLegendOfZelda,
        ID.ganonInvadesHyrule_theLegendOfZelda,
        ID.zeldaIITAoL,
        ID.theLegendOfZelda_zeldaIITAoL,
      ]
    }],
    eras: get2001(),
    animations: [
      { id: ID.aLinkToThePast_linksAwakening, action: 'hide' },
      { id: ID.aLinkToThePast_oracleOfAges, action: 'down' },
      { id: ID.oracleOfAges, action: 'down' },
      { id: ID.oracleOfAges_oracleOfSeasons, action: 'down' },
      { id: ID.oracleOfSeasons, action: 'down' },
      { id: ID.oracleOfSeasons_linksAwakening, action: "down" }
    ]
  }, // "The Legend of Zelda: Oracle of Ages" 
];