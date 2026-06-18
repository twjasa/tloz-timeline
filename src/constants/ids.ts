/**
 * Identificadores únicos de los elementos de la timeline (Eras y Conexiones).
 *
 * Centraliza todos los IDs para evitar typos en strings, facilitar la edición y
 * proveer tipado fuerte en toda la aplicación. Las claves representan nombres
 * autodescriptivos en lenguaje humano, y los valores son los IDs planos reales del DOM.
 */
export const ALL_IDS = {
  // ─── 1986: The Legend of Zelda ──────────────────────────────────────────────
  ganonInvadesHyrule: "ganonInvadesHyrule",
  ganonInvadesHyrule_theLegendOfZelda: "gih-tloz",
  theLegendOfZelda: "theLegendOfZelda",

  // ─── 1987: Zelda II: The Adventure of Link ──────────────────────────────────
  tragedyOfPrincessZeldaI: "tragedyOfPrincessZeldaI",
  tragedyOfPrincessZeldaI_ganonInvadesHyrule: "ttopzI-gih",
  theLegendOfZelda_zeldaIITAoL: "tloz-zeldaIItaol",
  zeldaIITAoL: "zeldaIITAoL",

  // ─── 1991: A Link to the Past ───────────────────────────────────────────────
  creation1: "creation1",
  creation1_creationOfTheMasterSword: "creation1-cotms",
  creationOfTheMasterSword: "creationOfTheMasterSword",
  creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce: "cotms-ggtct",
  ganondorfGetsTheCompleteTriforce: "ganondorfGetsTheCompleteTriforce",
  ganondorfGetsTheCompleteTriforce_theSealingWar: "ggtct-tsw",
  theSealingWar: "theSealingWar",
  theSealingWar_aLinkToThePast: "tsw-alttp",
  aLinkToThePast: "aLinkToThePast",
  aLinkToThePast_tragedyOfPrincessZeldaI: "alttp-ttopzI",

  // ─── 1993: Link's Awakening ─────────────────────────────────────────────────
  aLinkToThePast_linksAwakening: "alttp-la",
  linksAwakening: "linksAwakening",

  // ─── 1998: Ocarina of Time ──────────────────────────────────────────────────
  ocarinaOfTimeAdult: "ocarinaOfTimeAdult",
  ocarinaOfTimeAdult_ocarinaOfTimeChild: "oot-adult-oot-child",
  ocarinaOfTimeChild: "ocarinaOfTimeChild",
  ocarinaOfTimeChild_theFierceWar: "oot-child-tfw",
  theFierceWar: "theFierceWar",
  creationOfTheMasterSword2_theFierceWar: "cotms2-tfw",
  creationOfTheMasterSword2: "creationOfTheMasterSword2",
  creationOfTheMasterSword2_creation2: "cotms2-creation2",
  creation2: "creation2",

  // ─── 2000: Majora's Mask ────────────────────────────────────────────────────
  ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_1: "oot-adult-lwzog-1",
  ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_2: "oot-adult-lwzog-2",
  ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_3: "oot-adult-lwzog-3",
  ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_4: "oot-adult-lwzog-4",
  linkWarnsZeldaOfGanondorf: "linkWarnsZeldaOfGanondorf",
  linkWarnsZeldaOfGanondorf_majorasMask: "lwzog-mm",
  majorasMask: "majorasMask",

  // ─── 2001: Oracle of Ages/Seasons ───────────────────────────────────────────
  aLinkToThePast_oracleOfAges: "alttp-ooa",
  oracleOfAges: "oracleOfAges",
  oracleOfAges_oracleOfSeasons: "ooa-oos",
  oracleOfSeasons: "oracleOfSeasons",
  oracleOfSeasons_linksAwakening: "oos-la",
} as const;

export type TimelineId = typeof ALL_IDS[keyof typeof ALL_IDS];
