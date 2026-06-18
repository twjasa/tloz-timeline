import styles from '../components/Era/era.module.scss';
import { get1986, get1987, get1991, get1993, get1998 } from './eras';
import { get2000 } from './eras/2000-tlozmm';
import { get2001 } from './eras/2001-tlozoos';


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
      { id: ganonInvadesHyrule, action: 'down' },
      { id: ganonInvadesHyrule_theLegendOfZelda, action: 'down' },
      { id: theLegendOfZelda, action: 'down' },
    ]
  }, // "The Legend of Zelda" 
  {
    year: 1987,
    name: "Zelda II: The Adventure of Link",
    eras: get1987(),
    centerWindow: true,
    animations: [
      { id: tragedyOfPrincessZeldaI, action: 'down' },
      { id: tragedyOfPrincessZeldaI_ganonInvadesHyrule, action: 'down' },
      { id: theLegendOfZelda_zeldaIITAoL, action: 'down' },
      { id: zeldaIITAoL, action: 'down' },
    ]
  }, // "Zelda II: The Adventure of Link" 
  {
    year: 1991,
    name: "The Legend of Zelda: A Link to the Past",
    centerWindow: true,
    eras: get1991(),
    animations: [
      { id: creation1, action: 'down' },
      { id: creation1_creationOfTheMasterSword, action: 'down' },
      { id: creationOfTheMasterSword, action: 'down' },
      { id: creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce, action: 'down' },
      { id: ganondorfGetsTheCompleteTriforce, action: 'down' },
      { id: ganondorfGetsTheCompleteTriforce_theSealingWar, action: 'down' },
      { id: theSealingWar, action: 'down' },
      { id: theSealingWar_aLinkToThePast, action: 'down' },
      { id: aLinkToThePast, action: 'down' },
      { id: aLinkToThePast_tragedyOfPrincessZeldaI, action: 'down' },
    ]
  }, // "The Legend of Zelda: A Link to the Past" 
  {
    year: 1993,
    name: "The Legend of Zelda: Link's Awakening",
    centerWindow: [
      creation1,
      creation1_creationOfTheMasterSword,
      creationOfTheMasterSword,
      creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
      ganondorfGetsTheCompleteTriforce,
      ganondorfGetsTheCompleteTriforce_theSealingWar,
      theSealingWar,
      theSealingWar_aLinkToThePast,
      aLinkToThePast,
      aLinkToThePast_tragedyOfPrincessZeldaI,
    ],
    makeSpace: [{
      x: 0, y: -244.06, ids: [
        aLinkToThePast_linksAwakening,
        aLinkToThePast,
        theSealingWar_aLinkToThePast,
        theSealingWar,
        ganondorfGetsTheCompleteTriforce_theSealingWar,
        ganondorfGetsTheCompleteTriforce,
        creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
        creationOfTheMasterSword,
        creation1_creationOfTheMasterSword,
        creation1,
      ]
    }],
    eras: get1993(),
    animations: [
      { id: aLinkToThePast_linksAwakening, action: 'down' },
      { id: linksAwakening, action: 'down' },
    ]
  }, // "The Legend of Zelda: Link's Awakening"   
  {
    year: 1998,
    name: "The Legend of Zelda: Ocarina of Time",
    centerWindow: true,
    makeSpace: [{
      x: 0, y: -481.06, ids: [
        creation1,
        creation1_creationOfTheMasterSword,
        creationOfTheMasterSword,
      ]
    },
    {
      x: 0, y: -481.06, height: "316px", ids: [
        creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
      ]
    }],
    eras: get1998(),
    animations: [
      { id: creation2, action: 'down' },
      { id: creationOfTheMasterSword2_creation2, action: 'down' },
      { id: creationOfTheMasterSword2, action: 'down' },
      { id: creationOfTheMasterSword2_theFierceWar, action: 'down' },
      { id: theFierceWar, action: 'down' },
      { id: ocarinaOfTimeChild_theFierceWar, action: 'down' },
      { id: ocarinaOfTimeChild, action: 'down' },
      { id: ocarinaOfTimeAdult_ocarinaOfTimeChild, action: 'down' },
      { id: ocarinaOfTimeAdult, action: 'down' },
    ]
  }, // "The Legend of Zelda: Ocarina of Time" 
  {
    year: 2000,
    name: "The Legend of Zelda: Majora's Mask",
    centerWindow: true,
    makeSpace: [{
      x: 300, y: 0, ids: [
        creation2,
        creationOfTheMasterSword2_creation2,
        creationOfTheMasterSword2,
        creationOfTheMasterSword2_theFierceWar,
        theFierceWar,
        ocarinaOfTimeChild_theFierceWar,
        ocarinaOfTimeChild,
        ocarinaOfTimeAdult_ocarinaOfTimeChild,
        ocarinaOfTimeAdult,
      ]
    }],
    eras: get2000(),
    animations: [
      { id: ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_1, action: 'left' },
      { id: ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_2, action: 'up' },
      { id: ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_3, action: 'left' },
      { id: ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_4, action: 'down' },
      { id: linkWarnsZeldaOfGanondorf, action: 'down' },
      { id: linkWarnsZeldaOfGanondorf_majorasMask, action: 'down' },
      { id: majorasMask, action: 'down' }
    ]
  }, // "The Legend of Zelda: Majora's Mask" 
  {
    year: 2001,
    name: "The Legend of Zelda: Oracle of Ages/Seasons",
    centerWindow: true,
    makeSpace: [{
      x: 0, y: 485, ids: [
        linksAwakening,
        aLinkToThePast_tragedyOfPrincessZeldaI,
        tragedyOfPrincessZeldaI,
        tragedyOfPrincessZeldaI_ganonInvadesHyrule,
        ganonInvadesHyrule,
        theLegendOfZelda,
        ganonInvadesHyrule_theLegendOfZelda,
        zeldaIITAoL,
        theLegendOfZelda_zeldaIITAoL,
      ]
    }],
    eras: get2001(),
    animations: [
      { id: aLinkToThePast_linksAwakening, action: 'hide' },
      { id: aLinkToThePast_oracleOfAges, action: 'down' },
      { id: oracleOfAges, action: 'down' },
      { id: oracleOfAges_oracleOfSeasons, action: 'down' },
      { id: oracleOfSeasons, action: 'down' },
      { id: oracleOfSeasons_linksAwakening, action: "down" }
    ]
  }, // "The Legend of Zelda: Oracle of Ages" 
];
