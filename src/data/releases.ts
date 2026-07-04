import styles from '../components/Era/era.module.scss';
import { get1986, get1987, get1991, get1993, get1998 } from './eras';
import { get2000 } from './eras/2000-tlozmm';
import { get2001 } from './eras/2001-tlozoos';
import { get2002 } from './eras/2002-tlozfs';
import { get2003 } from './eras/2003-tloztww';
import { get2005 } from './eras/2005-tloztmc';
import { get2006 } from './eras/2006-tloztp';
import { get2007 } from './eras/2007-tlozph';
import { get2009 } from './eras/2009-tlozst';
import { get2011 } from './eras/2011-tlozsw';
import { get2013 } from './eras/2013-tlozalbw';
import { get2015 } from './eras/2015-tloztfh';
import { get2017 } from './eras/2017-tlozbotw';
import { getUnification } from './eras/unification';


/**
 * Representa un paso (release/juego) en la secuencia de la timeline.
 *
 * Cada release corresponde a un juego de Zelda y define qué eras y conexiones
 * se muestran, qué animaciones se ejecutan, y si la vista debe re-centrarse.
 */
export type animationI =
  | {
    id: string | string[];
    action: "up" | "down" | "left" | "right" | "zoom" | "hide";
    parallel?: boolean;
  }
  | {
    id: string | string[];
    x?: number;
    y?: number;
    eventY?: number;
    timelineX?: number;
    height?: number | string;
    parallel?: boolean;
  }
  | {
    pause: number;
  }
  | {
    center: string[];
    parallel?: boolean;
  };

export type animationBlock =
  | animationI
  | {
    parallel: boolean;
    animations: animationI[];
  };

export interface releasesI {
  year: number;
  name: string;
  eras: Array<eraI | connectionI>;
  animations: Array<animationBlock>;
  centerWindow?: boolean | string[];
  resetAllPos?: boolean;
}

/**
 * Representa una conexión temporal (línea) entre dos eras en la timeline.
 */
export interface connectionI {
  title: string;
  id?: string;
  show: boolean;
  position?: { left: string | number; top: string | number; };
  event?: number;
  timeline?: number;
  orientation?: "horizontal" | "vertical";
  length?: number | string;
  from?: string;
  to?: string;
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
  event?: number;
  timeline?: number;
  textOnly?: boolean;
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
    centerWindow: [creation1, tragedyOfPrincessZeldaI],
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
      theSealingWar,
      ganonInvadesHyrule
    ],
    eras: get1993(),
    animations: [
      { id: aLinkToThePast_tragedyOfPrincessZeldaI, action: 'hide' },
      {
        parallel: false,
        animations: [
          {
            id: [
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
            ],
            eventY: -1
          }
        ]
      },
      { id: aLinkToThePast_linksAwakening, action: 'down' },
      { id: linksAwakening, action: 'down' },
      { id: linksAwakening_tragedyOfPrincessZeldaI, action: 'down' },
    ]
  }, // "The Legend of Zelda: Link's Awakening"   
  {
    year: 1998,
    name: "The Legend of Zelda: Ocarina of Time",
    centerWindow: [creation1, ocarinaOfTimeAdult],
    eras: get1998(),
    animations: [
      {
        parallel: true,
        animations: [
          {
            id: [
              creation1,
              creation1_creationOfTheMasterSword,
              creationOfTheMasterSword,
              creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce,
            ],
            eventY: -1
          }
        ]
      },
      { id: creation2, action: 'down' },
      { id: creation2_creationOfTheMasterSword2, action: 'down' },
      { id: creationOfTheMasterSword2, action: 'down' },
      { id: creationOfTheMasterSword2_theFierceWar, action: 'down' },
      { id: theFierceWar, action: 'down' },
      { id: theFierceWar_ocarinaOfTimeChild, action: 'down' },
      { id: ocarinaOfTimeChild, action: 'down' },
      { id: ocarinaOfTimeChild_ocarinaOfTimeAdult, action: 'down' },
      { id: ocarinaOfTimeAdult, action: 'down' },
    ]
  }, // "The Legend of Zelda: Ocarina of Time" 
  {
    year: 2000,
    name: "The Legend of Zelda: Majora's Mask",
    centerWindow: [creation1, ocarinaOfTimeAdult],
    eras: get2000(),
    animations: [
      {
        parallel: false,
        animations: [
          {
            id: [
              creation2,
              creation2_creationOfTheMasterSword2,
              creationOfTheMasterSword2,
              creationOfTheMasterSword2_theFierceWar,
              theFierceWar,
              theFierceWar_ocarinaOfTimeChild,
              ocarinaOfTimeChild,
              ocarinaOfTimeChild_ocarinaOfTimeAdult,
              ocarinaOfTimeAdult,
            ],
            timelineX: 2
          },
          {
            id: [
              theSealingWar,
              theSealingWar_aLinkToThePast,
              aLinkToThePast,
              aLinkToThePast_linksAwakening,
              linksAwakening,
              aLinkToThePast_tragedyOfPrincessZeldaI,
              tragedyOfPrincessZeldaI,
              tragedyOfPrincessZeldaI_ganonInvadesHyrule,
              ganonInvadesHyrule,
              ganonInvadesHyrule_theLegendOfZelda,
              theLegendOfZelda,
              theLegendOfZelda_zeldaIITAoL,
              zeldaIITAoL,
              ocarinaOfTimeAdult
            ],
            eventY: 1
          }
        ]
      },
      // { id: ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_1, action: 'left' },
      // { id: ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_2, action: 'up' },
      // { id: ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_3, action: 'left' },
      // { id: ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_4, action: 'down' },
      { id: linkWarnsZeldaOfGanondorf, action: 'down' },
      { id: linkWarnsZeldaOfGanondorf_majorasMask, action: 'down' },
      { id: majorasMask, action: 'down' }
    ]
  }, // "The Legend of Zelda: Majora's Mask" 
  {
    year: 2001,
    name: "The Legend of Zelda: Oracle of Ages/Seasons",
    centerWindow: [theSealingWar, tragedyOfPrincessZeldaI],
    eras: get2001(),
    animations: [
      {
        parallel: true,
        animations: [
          {
            id: [
              linksAwakening,
              aLinkToThePast_tragedyOfPrincessZeldaI,
              tragedyOfPrincessZeldaI,
              tragedyOfPrincessZeldaI_ganonInvadesHyrule,
              ganonInvadesHyrule,
              theLegendOfZelda,
              ganonInvadesHyrule_theLegendOfZelda,
              zeldaIITAoL,
              theLegendOfZelda_zeldaIITAoL,
            ],
            eventY: 2
          }
        ]
      },
      { id: aLinkToThePast_linksAwakening, action: 'hide' },
      { id: aLinkToThePast_oracleOfAges, action: 'down' },
      { id: oracleOfAges, action: 'down' },
      { id: oracleOfAges_oracleOfSeason, action: 'down' },
      { id: oracleOfSeason, action: 'down' },
      { id: oracleOfSeason_linksAwakening, action: "down" },
      { id: aLinkToThePast_linksAwakening, action: 'hide' },
    ]
  }, // "The Legend of Zelda: Oracle of Ages" 
  {
    year: 2002,
    name: "The Legend of Zelda: Four Swords",
    centerWindow: [creation1, ocarinaOfTimeAdult],
    eras: get2002(),
    animations: [
      {
        parallel: true,
        animations: [
          {
            id: [
              creation1,
              creationOfTheMasterSword,
              creation2,
              creationOfTheMasterSword2,
              creation1_creationOfTheMasterSword,
              creation2_creationOfTheMasterSword2,
              creationOfTheMasterSword2_theFierceWar
            ],
            eventY: -3
          }
        ]
      },
      { id: creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce, action: "hide" },
      { id: creationOfTheMasterSword_vaatiIsSealed, action: "down" },
      { id: vaatiIsSealed, action: "down" },
      { id: vaatiIsSealed_fourSwords, action: "down" },
      { id: fourSwords, action: "down" },
      { id: fourSwords_ganondorfGetsTheCompleteTriforce, action: "down" },
    ]
  }, // "The Legend of Zelda: Four Swords" 
  {
    year: 2003,
    name: "The Legend of Zelda: The Wind Waker",
    centerWindow: [aLinkToThePast, ocarinaOfTimeAdult],
    eras: get2003(),
    animations: [
      {
        parallel: true,
        animations: [
          {
            id: [
              aLinkToThePast,
              aLinkToThePast_oracleOfAges,
              oracleOfSeason,
              oracleOfAges,
              oracleOfAges_oracleOfSeason,
              oracleOfSeason_linksAwakening,
              linksAwakening,
              aLinkToThePast_tragedyOfPrincessZeldaI,
              tragedyOfPrincessZeldaI,
              tragedyOfPrincessZeldaI_ganonInvadesHyrule,
              ganonInvadesHyrule,
              ganonInvadesHyrule_theLegendOfZelda,
              theLegendOfZelda,
              theLegendOfZelda_zeldaIITAoL,
              zeldaIITAoL,
            ],
            eventY: 3
          }
        ]
      },
      { id: ocarinaOfTimeAdult_theGreatFlood, action: "down" },
      { id: theGreatFlood, action: "down" },
      { id: theGreatFlood_theWindWaker, action: "down" },
      { id: theWindWaker, action: "down" },
    ]
  }, // "The Legend of Zelda: The Wind Waker" 
  {
    year: 2005,
    name: "The Legend of Zelda: The Minish Cap",
    centerWindow: [creation1, theFierceWar],
    eras: get2005(),
    animations: [
      {
        parallel: true,
        animations: [
          {
            id: [
              creationOfTheMasterSword2_theFierceWar,
              creationOfTheMasterSword_vaatiIsSealed
            ], action: "hide"
          },
          {
            id: [
              creation1,
              creation2,
              creation1_creationOfTheMasterSword,
              creationOfTheMasterSword,
              creationOfTheMasterSword2,
              creation2_creationOfTheMasterSword2
            ],
            eventY: -3
          }
        ]
      },
      { pause: 2 },
      {
        id: [
          creationOfTheMasterSword1_hyruleKingdomIsEstablished1,
          creationOfTheMasterSword2_hyruleKingdomIsEstablished2
        ],
        action: "down"
      },
      {
        id: [
          hyruleKingdomIsEstablished1,
          hyruleKingdomIsEstablished2,
          hyruleKingdomIsEstablished2_theFierceWar
        ],
        action: "down"
      },
      { id: hyruleKingdomIsEstablished1_theWarOfTheBoundChest, action: "down" },
      { id: theWarOfTheBoundChest, action: "down" },
      { id: theWarOfTheBoundChest_theMinishCap, action: "down" },
      { id: theMinishCap, action: "down" },
      { id: theMinishCap_vaatiIsSealed, action: "down" },
    ]
  }, // "The Legend of Zelda: The Minish Cap" 
  {
    year: 2006,
    name: "The Legend of Zelda: Twilight Princess",
    centerWindow: [twilightPrincess, theTriforceWar],
    eras: get2006(),
    animations: [
      { id: hyruleKingdomIsEstablished2_theFierceWar, action: "hide" },
      {
        parallel: true,
        animations: [
          {
            id: [
              theFierceWar,
              theFierceWar_ocarinaOfTimeChild
            ],
            eventY: -1
          }]
      },
      { id: [majorasMask_ganondorfExecution, hyruleKingdomIsEstablished2_theTriforceWar], action: "down" },
      { id: [ganondorfExecution, theTriforceWar], action: "down" },
      { id: [ganondorfExecution_twilightPrincess, theTriforceWar_theFierceWar], action: "down" },
      { id: twilightPrincess, action: "down" },


    ]
  }, // "The Legend of Zelda: Twilight Princess" 
  {
    year: 2007,
    name: "The Legend of Zelda: Phantom Hourglass",
    centerWindow: [theGreatFlood, phantomHourglass],
    eras: get2007(),
    animations: [
      { id: theWindWaker_phantomHourglass, action: "down" },
      { id: phantomHourglass, action: "down" },
    ]
  }, // "The Legend of Zelda: Phantom Hourglass" 
  {
    year: 2009,
    name: "The Legend of Zelda: Spirit Tracks",
    centerWindow: [theGreatFlood, spiritTracks],
    eras: get2009(),
    animations: [
      { id: phantomHourglass_spiritTracks, action: "down" },
      { id: spiritTracks, action: "down" },
    ]
  }, // "The Legend of Zelda: Spirit Tracks" 
  {
    year: 2011,
    name: "The Legend of Zelda: Skyward Sword",
    centerWindow: [creation2, creation1, skywardSword],
    eras: get2011(),
    animations: [
      {
        parallel: true,
        animations: [
          { id: [creation2_creationOfTheMasterSword2], action: "hide" }
        ]
      },
      {
        eventY: -1, id: [
          creation1,
          creation2,
          creation1_creationOfTheMasterSword,
          creation2_creationOfTheMasterSword2
        ],
      },
      { id: creation2_theDemonInvasion, action: "down" },
      { id: theDemonInvasion, action: "down" },
      { id: theDemonInvasion_skywardSword, action: "down" },
      {
        parallel: true, animations: [
          { id: creationOfTheMasterSword2, action: "hide" },
          { id: skywardSword, action: "down" },
        ]
      }
    ]
  }, // "The Legend of Zelda: Skyward Sword" 
  {
    year: 2013,
    name: "The Legend of Zelda: A Link Between Worlds",
    centerWindow: [fourSwords, hyruleKingdomIsEstablished2],
    eras: get2013(),
    animations: [
      {
        parallel: false,
        animations: [
          { id: vaatiIsSealed_fourSwords, action: "hide" },
          {
            eventY: -2,
            id: [
              vaatiIsSealed_fourSwords,
              vaatiIsSealed,
              theMinishCap_vaatiIsSealed,
              theMinishCap,
              theWarOfTheBoundChest_theMinishCap,
              theWarOfTheBoundChest,
              hyruleKingdomIsEstablished1,
              hyruleKingdomIsEstablished1_theWarOfTheBoundChest,
              creationOfTheMasterSword,
              creationOfTheMasterSword1_hyruleKingdomIsEstablished1,
              creation1,
              creation1_creationOfTheMasterSword,
              hyruleKingdomIsEstablished2,
              creationOfTheMasterSword2_hyruleKingdomIsEstablished2,
              skywardSword,
              theDemonInvasion_skywardSword,
              theDemonInvasion,
              creation2,
              creation2_theDemonInvasion,
              hyruleKingdomIsEstablished2_theTriforceWar
            ]
          },
          { id: [theTriforceWar, theTriforceWar_theFierceWar], eventY: -1 }
        ]
      },
      { id: vaatiIsSealed_theTriforceWar1, action: "down" },
      { id: theTriforceWar1, action: "down" },
      { id: theTriforceWar1_fourSwords, action: "down" },
      { pause: 2 },
      { center: [oracleOfSeason, ganonInvadesHyrule] },
      { action: 'hide', id: [aLinkToThePast_tragedyOfPrincessZeldaI] },
      {
        eventY: 1,
        id: [
          tragedyOfPrincessZeldaI,
          tragedyOfPrincessZeldaI_ganonInvadesHyrule,
          ganonInvadesHyrule,
          ganonInvadesHyrule_theLegendOfZelda,
          theLegendOfZelda,
          theLegendOfZelda_zeldaIITAoL,
          zeldaIITAoL,
        ]
      },
      { id: linksAwakening_tragedyOfPrincessZeldaI, action: 'hide' },
      { id: linksAwakening_aLinkBetweenWorlds, action: "down" },
      { id: aLinkBetweenWorlds, action: "down" },
      { id: aLinkBetweenWorlds_theTragedyOfPrincessZeldaI, action: "down" },
    ]
  }, // "The Legend of Zelda: A Link Between Worlds" 
  {
    year: 2015,
    name: "The Legend of Zelda: Tri Force Heroes",
    centerWindow: [linksAwakening, ganonInvadesHyrule],
    eras: get2015(),
    animations: [
      { parallel: true, animations: [{ id: aLinkBetweenWorlds_theTragedyOfPrincessZeldaI, action: 'hide' }] },
      {
        eventY: 1, id: [
          aLinkBetweenWorlds_theTragedyOfPrincessZeldaI,
          tragedyOfPrincessZeldaI,
          tragedyOfPrincessZeldaI_ganonInvadesHyrule,
          ganonInvadesHyrule,
          ganonInvadesHyrule_theLegendOfZelda,
          theLegendOfZelda,
          theLegendOfZelda_zeldaIITAoL,
          zeldaIITAoL
        ]
      },
      { id: aLinkBetweenWorlds_triForceHeroes, action: "down" },
      { id: triForceHeroes, action: "down" },
      { id: triForceHeroes_theTragedyOfPrincessZeldaI, action: "down" },
    ]
  }, // "The Legend of Zelda: Tri Force Heroes" 
  {
    year: 2017,
    name: "The Legend of Zelda: Breath of the Wild",
    centerWindow: [ocarinaOfTimeAdult, aLinkToThePast],
    eras: get2017(),
    animations: [
      { id: twilightPrincess_ganondorfSealing, action: "down" },
      { center: [ganondorfSealing, breathOfTheWild] },
      { id: ganondorfSealing, action: "down" },
      { id: ganondorfSealing_theAncientCalamity, action: "down" },
      { id: theAncientCalamity, action: "down" },
      { id: theAncientCalamity_theGreatCalamity, action: "down" },
      { id: theGreatCalamity, action: "down" },
      { id: theGreatCalamity_breathOfTheWild, action: "down" },
      { id: breathOfTheWild, action: "down" },
      { pause: 1 },
      { center: [breathOfTheWild, twilightPrincess] }
    ],

  }, // "The Legend of Zelda: Breath of the Wild" 
  {
    year: 2001,
    name: "Unification",
    resetAllPos: true,
    eras: getUnification(),
    animations: [
      { id: "all-elements", action: "hide" },
      { center: ["unificationText"] },
      { id: "unificationText", action: "down" },
      { pause: 2 },
      { id: "unificationText", action: "hide" },
      { center: [creation1, breathOfTheWild] },
      { id: creation1, action: "down" },
      { id: 'creation1_theDemonInvasion', action: "down" },
      { id: theDemonInvasion, action: "down" },
      { id: 'theDemonInvasion_skywardSword', action: 'down' },
      { id: skywardSword, action: "down" },
      { id: 'skywardSword_hyruleKingdomIsEstablished1', action: "down" },
      {
        parallel: false,
        animations: [
          { id: hyruleKingdomIsEstablished1, action: "down" },
          // { center: [hyruleKingdomIsEstablished1, theMinishCap] }
        ]
      },
      { id: 'hyruleKingdomIsEstablished1_theWarOfTheBoundChest', action: 'down' },
      { id: theWarOfTheBoundChest, action: 'down' },
      { id: 'theWarOfTheBoundChest_theMinishCap', action: 'down' },
      { id: theMinishCap, action: 'down' },
      // { id: 'theMinishCap_vaatiIsSealed', action: 'down' },
      {
        parallel: false,
        animations: [
          { id: vaatiIsSealed, action: 'down' },
          // { center: [vaatiIsSealed, fourSwords] }
        ]
      },
      { id: 'vaatiIsSealed_theTriforceWar', action: 'down' },
      { id: theTriforceWar, action: 'down' },
      { id: 'theTriforceWar_fourSwords', action: 'down' },
      { id: fourSwords, action: 'down' },
      {
        parallel: false,
        animations: [
          { id: "fourSwords_ganondorfGetsTheCompleteTriforce", action: 'down' },
          // { center: [ganondorfGetsTheCompleteTriforce, aLinkToThePast] }
        ]
      },
      { id: ganondorfGetsTheCompleteTriforce, action: 'down' },
      { id: 'ganondorfGetsTheCompleteTriforce_theSealingWar', action: 'down' },
      { id: theSealingWar, action: 'down' },
      { id: 'theSealingWar_aLinkToThePast', action: 'down' },
      { id: aLinkToThePast, action: 'down' },
      {
        parallel: false,
        animations: [
          { id: "aLinkToThePast_oracleOfAges", action: 'down' },
          // { center: [oracleOfAges, ganonInvadesHyrule] }
        ]
      },
      { id: oracleOfAges, action: 'down' },
      { id: 'oracleOfAges_oracleOfSeasons', action: 'down' },
      { id: oracleOfSeason, action: 'down' },
      { id: 'oracleOfSeason_linksAwakening', action: 'down' },
      { id: linksAwakening, action: 'down' },
      { id: 'linksAwakening_aLinkBetweenWorlds', action: 'down' },
      { id: aLinkBetweenWorlds, action: 'down' },
      { id: 'aLinkBetweenWorlds_triForceHeroes', action: 'down' },
      { id: triForceHeroes, action: 'down' },
      { id: 'triForceHeroes_tragedyOfPrincessZeldaI', action: 'down' },
      {
        parallel: false,
        animations: [
          { id: "tragedyOfPrincessZeldaI", action: 'down' },
          // { center: [tragedyOfPrincessZeldaI, zeldaIITAoL] }
        ]
      },
      { id: 'tragedyOfPrincessZeldaI_ganonInvadesHyrule', action: 'down' },
      { id: ganonInvadesHyrule, action: 'down' },
      { id: 'ganonInvadesHyrule_theLegendOfZelda', action: 'down' },
      { id: theLegendOfZelda, action: 'down' },
      { id: 'theLegendOfZelda_zeldaIITAoL', action: 'down' },
      { id: zeldaIITAoL, action: 'down' },
      //// conexion especial
      // { center: [theTriforceWar1, ocarinaOfTimeAdult] },
      { id: theTriforceWar1, action: 'down' },
      { id: "theTriforceWar1_theFierceWar", action: "down" },
      { id: theFierceWar, action: "down" },
      { id: "theFierceWar_ocarinaOfTimeChild", action: "down" },
      { id: ocarinaOfTimeChild, action: "down" },
      { id: "ocarinaOfTimeChild_ocarinaOfTimeAdult", action: "down" },
      { id: ocarinaOfTimeAdult, action: "down" },
      { id: "ocarinaOfTimeAdult_theGreatFlood", action: "down" },
      { id: theGreatFlood, action: "down" },
      { id: "theGreatFlood_theWindWaker", action: "down" },
      { id: theWindWaker, action: "down" },
      { id: "theWindWaker_phantomHourglass", action: "down" },
      { id: phantomHourglass, action: "down" },
      { id: "phantomHourglass_spiritTracks", action: "down" },
      { id: spiritTracks, action: "down" },
      /// conexion especial
      { id: linkWarnsZeldaOfGanondorf, action: "down" },
      { id: "linkWarnsZeldaOfGanondorf_majorasMask", action: "down" },
      { id: majorasMask, action: "down" },
      { id: "majorasMask_ganondorfExecution", action: "down" },
      { id: ganondorfExecution, action: "down" },
      { id: "ganondorfExecution_twilightPrincess", action: "down" },
      { id: twilightPrincess, action: "down" },
      { id: "twilightPrincess_ganondorfSealing", action: "down" },
      { id: ganondorfSealing, action: "down" },
      { id: "ganondorfSealing_theAncientCalamity", action: "down" },
      { id: theAncientCalamity, action: "down" },
      { id: "theAncientCalamity_theGreatCalamity", action: "down" },
      { id: theGreatCalamity, action: "down" },
      { id: "theGreatCalamity_breathOfTheWild", action: "down" },
      { id: breathOfTheWild, action: "down" },
    ]
  }
];
