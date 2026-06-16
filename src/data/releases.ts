import styles from '../components/Era/era.module.scss';
import { get1986, get1987, get1991, get1993, get1998 } from './eras';
import { get2000 } from './eras/2000-tlozmm';
import { get2001 } from './eras/2001-tlozoos';

/**
 * Representa un paso (release/juego) en la secuencia de la timeline.
 *
 * Cada release corresponde a un juego de Zelda y define qué eras y conexiones
 * se muestran, qué animaciones se ejecutan, y si la vista debe re-centrarse.
 *
 * @property year - Año de lanzamiento del juego.
 * @property name - Nombre completo del juego.
 * @property eras - Array de eras (tarjetas) y conexiones (líneas temporales) visibles en este paso.
 * @property animations - Secuencia de animaciones de clip-path que se ejecutan al llegar a este paso.
 *   Cada animación tiene un `id` (selector CSS) y una `action` que indica la dirección.
 * @property centerWindow - Si `true` o un array de IDs, la vista se re-centra y ajusta el zoom para enmarcar el contenido (si es un array, se centra en los elementos indicados).
 * @property makeSpace - Movimientos previos de elementos existentes para hacer espacio a los nuevos.
 *   Cada entrada define los IDs de los elementos a mover y el desplazamiento en `x`, `y` (y opcionalmente `height`).
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
 *
 * @property title - Etiqueta de la conexión (ej. "7 years", "Centuries later", "Immediately after").
 * @property id - Identificador único del elemento DOM, usado como selector para animaciones.
 * @property show - Visibilidad inicial de la conexión.
 * @property position - Posición absoluta dentro del canvas.
 * @property orientation - Dirección de la línea: `"vertical"` (por defecto) u `"horizontal"`.
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
 *
 * @property title - Nombre de la era o evento.
 * @property color - Esquema de color: `"golden"` para juegos jugables,
 *   `"silver"` para eventos históricos de fondo, `"zeldaColor"` para variantes especiales.
 * @property backgroundImage - Nombre base del archivo PNG en `/public/` (sin extensión).
 *   También sirve como `id` del elemento DOM para animaciones.
 * @property backgroundPosition - Desplazamiento opcional de la imagen de fondo dentro de la tarjeta.
 * @property show - Visibilidad inicial de la era.
 * @property position - Posición absoluta dentro del canvas (`left`, `top`).
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
 *
 * - `down`: Revela de arriba hacia abajo (el rectángulo crece hacia abajo).
 * - `up`: Revela de abajo hacia arriba (el rectángulo crece hacia arriba).
 *
 * Cada entrada es un par `[clipPath_inicial, clipPath_final]` que anime.js interpola.
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
      { id: 'ganonInvadesHyrule', action: 'down' },
      { id: 'gih-tloz', action: 'down' },
      { id: 'theLegendOfZelda', action: 'down' },
    ]
  }, // "The Legend of Zelda" 
  {
    year: 1987,
    name: "Zelda II: The Adventure of Link",
    eras: get1987(),
    centerWindow: true,
    animations: [
      { id: '#tragedyOfPrincessZeldaI', action: 'down' },
      { id: "#ttopzI-gih", action: 'down' },
      { id: '#tloz-zeldaIItaol', action: 'down' },
      { id: '#zeldaIITAoL', action: 'down' },
    ]
  }, // "Zelda II: The Adventure of Link" 
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
  }, // "The Legend of Zelda: A Link to the Past" 
  {
    year: 1993,
    name: "The Legend of Zelda: Link's Awakening",
    centerWindow: ['creation1', 'creation1-cotms', 'creationOfTheMasterSword', 'cotms-ggtct', 'ganondorfGetsTheCompleteTriforce', 'ggtct-tsw', 'theSealingWar', 'tsw-alttp', 'aLinkToThePast', 'alttp-ttopzI'],
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
  }, // "The Legend of Zelda: Link's Awakening"   
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
  }, // "The Legend of Zelda: Ocarina of Time" 
  {
    year: 2000,
    name: "The Legend of Zelda: Majora's Mask",
    centerWindow: true,
    makeSpace: [{
      x: 300, y: 0, ids: [
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
      { id: "#oot-adult-lwzog-1", action: 'left' },
      { id: "#oot-adult-lwzog-2", action: 'up' },
      { id: "#oot-adult-lwzog-3", action: 'left' },
      { id: "#oot-adult-lwzog-4", action: 'down' },
      { id: "#linkWarnsZeldaOfGanondorf", action: 'down' },
      { id: "#lwzog-mm", action: 'down' },
      { id: '#majorasMask', action: 'down' }
    ]
  }, // "The Legend of Zelda: Majora's Mask" 
  {
    year: 2001,
    name: "The Legend of Zelda: Oracle of Ages/Seasons",
    centerWindow: true,
    makeSpace: [{
      x: 0, y: 485, ids: [
        "#linksAwakening",
        "#alttp-ttopzI",
        "#tragedyOfPrincessZeldaI",
        "#ttopzI-gih",
        "#ganonInvadesHyrule",
        "#theLegendOfZelda",
        "#gih-tloz",
        "#zeldaIITAoL",
        "#tloz-zeldaIItaol"
      ]
    }],
    eras: get2001(),
    animations: [
      { id: "#alttp-la", action: 'hide' },
      { id: "#alttp-ooa", action: 'down' },
      { id: "#oracleOfAges", action: 'down' },
      { id: "#ooa-oos", action: 'down' },
      { id: "#oracleOfSeasons", action: 'down' },
      { id: "#oos-la", action: "down" }
    ]
  }, // "The Legend of Zelda: Oracle of Ages" 
];