/**
 * Identificadores únicos de los elementos de la timeline (Eras y Conexiones).
 *
 * Centraliza todos los IDs para evitar typos en strings, facilitar la edición y
 * proveer tipado fuerte en toda la aplicación. Las claves representan nombres
 * autodescriptivos en lenguaje humano, y los valores son los IDs planos reales del DOM.
 */
export const ID = {
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
  linksAwakening_tragedyOfPrincessZeldaI: "la-ttopzI",

  // ─── 1998: Ocarina of Time ──────────────────────────────────────────────────
  ocarinaOfTimeAdult: "ocarinaOfTimeAdult",
  ocarinaOfTimeChild_ocarinaOfTimeAdult: "oot-child-oot-adult",
  ocarinaOfTimeChild: "ocarinaOfTimeChild",
  theFierceWar_ocarinaOfTimeChild: "tfw-oot-child",
  theFierceWar: "theFierceWar",
  creationOfTheMasterSword2_theFierceWar: "cotms2-tfw",
  creationOfTheMasterSword2: "creationOfTheMasterSword2",
  creation2_creationOfTheMasterSword2: "creation2-cotms2",
  creation2: "creation2",

  // ─── 2000: Majora's Mask ────────────────────────────────────────────────────
  ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf: "oot-adult-lwzog",
  linkWarnsZeldaOfGanondorf: "linkWarnsZeldaOfGanondorf",
  linkWarnsZeldaOfGanondorf_majorasMask: "lwzog-mm",
  majorasMask: "majorasMask",

  // ─── 2001: Oracle of Ages/Seasons ───────────────────────────────────────────
  aLinkToThePast_oracleOfAges: "alttp-ooa",
  oracleOfAges: "oracleOfAges",
  oracleOfAges_oracleOfSeason: "ooa-oos",
  oracleOfSeason: "oracleOfSeason",
  oracleOfSeason_linksAwakening: "oos-la",

  // ─── 2002: The Legend of Zelda: Four Swords ────────────────────────────────
  creationOfTheMasterSword_vaatiIsSealed: "cotms-vis",
  vaatiIsSealed: "vaatiIsSealed",
  vaatiIsSealed_fourSwords: "vis-fs",
  fourSwords: "fourSwords",
  fourSwords_ganondorfGetsTheCompleteTriforce: "fs-ggtct",

  // ─── 2003: The Legend of Zelda: The Wind Waker ──────────────────────────────
  ocarinaOfTimeAdult_theGreatFlood: "oot-adult-tgf",
  theGreatFlood: "theGreatFlood",
  theGreatFlood_theWindWaker: "tgf-ww",
  theWindWaker: "theWindWaker",

  // ─── 2005: The Legend of Zelda: The Minish Cap ──────────────────────────────
  creationOfTheMasterSword1_hyruleKingdomIsEstablished1: "cotms1-hkie1",
  creationOfTheMasterSword2_hyruleKingdomIsEstablished2: "cotms2-hkie2",
  hyruleKingdomIsEstablished1: "hyruleKingdomIsEstablished1",
  hyruleKingdomIsEstablished2: "hyruleKingdomIsEstablished2",
  hyruleKingdomIsEstablished2_theFierceWar: "hkie2-tfw",
  hyruleKingdomIsEstablished1_theWarOfTheBoundChest: "hkie1-wobc",
  theWarOfTheBoundChest: "theWarOfTheBoundChest",
  theWarOfTheBoundChest_theMinishCap: "wobc-tmc",
  theMinishCap: "theMinishCap",
  theMinishCap_vaatiIsSealed: "tmc-vis",

  // ─── 2006: The Legend of Zelda: Twilight Princess ───────────────────────────
  majorasMask_ganondorfExecution: "mm-ge",
  ganondorfExecution: "ganondorfExecution",
  ganondorfExecution_twilightPrincess: "ge-tp",
  twilightPrincess: "twilightPrincess",
  hyruleKingdomIsEstablished2_theTriforceWar: "hkie2-ttw",
  theTriforceWar: "theTriforceWar",
  theTriforceWar_theFierceWar: "ttw-tfw",

  // ─── 2007: The Legend of Zelda: Phantom Hourglass ───────────────────────────
  theWindWaker_phantomHourglass: "ww-ph",
  phantomHourglass: "phantomHourglass",

  // ─── 2009: The Legend of Zelda: Spirit Tracks ──────────────────────────────
  phantomHourglass_spiritTracks: "ph-st",
  spiritTracks: "spiritTracks",

  // ─── 2011: The Legend of Zelda: Skyward Sword ──────────────────────────────
  creation2_theDemonInvasion: "creation2-tdi",
  theDemonInvasion: "theDemonInvasion",
  theDemonInvasion_skywardSword: "tdi-ss",
  skywardSword: "skywardSword",

  // ─── 2013: The Legend of Zelda: A Link Between Worlds ───────────────────────────
  vaatiIsSealed_theTriforceWar1: "vis-ttw1",
  theTriforceWar1: "theTriforceWar1",
  theTriforceWar1_fourSwords: "ttw1-fs",
  linksAwakening_aLinkBetweenWorlds: "la-albw",
  aLinkBetweenWorlds: "aLinkBetweenWorlds",
  aLinkBetweenWorlds_theTragedyOfPrincessZeldaI: "albw-ttopzi",

  // ─── 2015: The Legend of Zelda: Tri Force Heroes ───────────────────────────
  aLinkBetweenWorlds_triForceHeroes: "albw-tfh",
  triForceHeroes: "triForceHeroes",
  triForceHeroes_theTragedyOfPrincessZeldaI: "tfh-ttopzi",

  // ─── 2017: The Legend of Zelda: Breath of the Wild ───────────────────────────
  twilightPrincess_ganondorfSealing: "tp-gs",
  ganondorfSealing: "ganondorfSealing",
  ganondorfSealing_theAncientCalamity: "gs-tac",
  theAncientCalamity: "theAncientCalamity",
  theAncientCalamity_theGreatCalamity: "tac-tgc",
  theGreatCalamity: "theGreatCalamity",
  theGreatCalamity_breathOfTheWild: "tgc-botw",
  breathOfTheWild: "breathOfTheWild",

} as const;

export type TimelineId = typeof ID[keyof typeof ID];

declare global {
  // ─── 1986: The Legend of Zelda ──────────────────────────────────────────────
  /** Era: Ganon Invades Hyrule */
  const ganonInvadesHyrule: "ganonInvadesHyrule";
  /** Connection: Ganon Invades Hyrule ➔ The Legend of Zelda */
  const ganonInvadesHyrule_theLegendOfZelda: "gih-tloz";
  /** Era: The Legend of Zelda (1986) */
  const theLegendOfZelda: "theLegendOfZelda";

  // ─── 1987: Zelda II: The Adventure of Link ──────────────────────────────────
  /** Era: Tragedy of Princess Zelda I */
  const tragedyOfPrincessZeldaI: "tragedyOfPrincessZeldaI";
  /** Connection: Tragedy of Princess Zelda I ➔ Ganon Invades Hyrule */
  const tragedyOfPrincessZeldaI_ganonInvadesHyrule: "ttopzI-gih";
  /** Connection: The Legend of Zelda ➔ Zelda II: The Adventure of Link */
  const theLegendOfZelda_zeldaIITAoL: "tloz-zeldaIItaol";
  /** Era: Zelda II: The Adventure of Link (1987) */
  const zeldaIITAoL: "zeldaIITAoL";

  // ─── 1991: A Link to the Past ───────────────────────────────────────────────
  /** Era: Creation (Part 1) */
  const creation1: "creation1";
  /** Connection: Creation ➔ Creation of the Master Sword */
  const creation1_creationOfTheMasterSword: "creation1-cotms";
  /** Era: Creation of the Master Sword */
  const creationOfTheMasterSword: "creationOfTheMasterSword";
  /** Connection: Creation of the Master Sword ➔ Ganondorf Gets the Complete Triforce */
  const creationOfTheMasterSword_ganondorfGetsTheCompleteTriforce: "cotms-ggtct";
  /** Era: Ganondorf Gets the Complete Triforce */
  const ganondorfGetsTheCompleteTriforce: "ganondorfGetsTheCompleteTriforce";
  /** Connection: Ganondorf Gets the Complete Triforce ➔ The Sealing War */
  const ganondorfGetsTheCompleteTriforce_theSealingWar: "ggtct-tsw";
  /** Era: The Sealing War */
  const theSealingWar: "theSealingWar";
  /** Connection: The Sealing War ➔ A Link to the Past */
  const theSealingWar_aLinkToThePast: "tsw-alttp";
  /** Era: A Link to the Past (1991) */
  const aLinkToThePast: "aLinkToThePast";
  /** Connection: A Link to the Past ➔ Tragedy of Princess Zelda I */
  const aLinkToThePast_tragedyOfPrincessZeldaI: "alttp-ttopzI";

  // ─── 1993: Link's Awakening ─────────────────────────────────────────────────
  /** Connection: A Link to the Past ➔ Link's Awakening */
  const aLinkToThePast_linksAwakening: "alttp-la";
  /** Era: Link's Awakening (1993) */
  const linksAwakening: "linksAwakening";
  /** Connection: Link's Awakening ➔ Tragedy of Princess Zelda I */
  const linksAwakening_tragedyOfPrincessZeldaI: "la-ttopzI";

  // ─── 1998: Ocarina of Time ──────────────────────────────────────────────────
  /** Era: Ocarina of Time - Adult Timeline (1998) */
  const ocarinaOfTimeAdult: "ocarinaOfTimeAdult";
  /** Connection: Ocarina of Time (Adult) ➔ Ocarina of Time (Child) */
  const ocarinaOfTimeChild_ocarinaOfTimeAdult: "oot-child-oot-adult";
  /** Era: Ocarina of Time - Child Timeline (1998) */
  const ocarinaOfTimeChild: "ocarinaOfTimeChild";
  /** Connection: Ocarina of Time (Child) ➔ The Fierce War */
  const theFierceWar_ocarinaOfTimeChild: "tfw-oot-child";
  /** Era: The Fierce War */
  const theFierceWar: "theFierceWar";
  /** Connection: Creation of the Master Sword 2 ➔ The Fierce War */
  const creationOfTheMasterSword2_theFierceWar: "cotms2-tfw";
  /** Era: Creation of the Master Sword (Part 2) */
  const creationOfTheMasterSword2: "creationOfTheMasterSword2";
  /** Connection: Creation 2 ➔ Creation of the Master Sword 2 */
  const creation2_creationOfTheMasterSword2: "creation2-cotms2";
  /** Era: Creation (Part 2) */
  const creation2: "creation2";

  // ─── 2000: Majora's Mask ────────────────────────────────────────────────────
  /** Connection: Ocarina of Time (Adult) ➔ Link Warns Zelda of Ganondorf (Automatic Bent) */
  const ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf: "oot-adult-lwzog";
  /** Connection: Ocarina of Time (Adult) ➔ Link Warns Zelda of Ganondorf (Path 1) */
  const ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_1: "oot-adult-lwzog-1";
  /** Connection: Ocarina of Time (Adult) ➔ Link Warns Zelda of Ganondorf (Path 2) */
  const ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_2: "oot-adult-lwzog-2";
  /** Connection: Ocarina of Time (Adult) ➔ Link Warns Zelda of Ganondorf (Path 3) */
  const ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_3: "oot-adult-lwzog-3";
  /** Connection: Ocarina of Time (Adult) ➔ Link Warns Zelda of Ganondorf (Path 4) */
  const ocarinaOfTimeAdult_linkWarnsZeldaOfGanondorf_4: "oot-adult-lwzog-4";
  /** Era: Link Warns Zelda of Ganondorf */
  const linkWarnsZeldaOfGanondorf: "linkWarnsZeldaOfGanondorf";
  /** Connection: Link Warns Zelda of Ganondorf ➔ Majora's Mask */
  const linkWarnsZeldaOfGanondorf_majorasMask: "lwzog-mm";
  /** Era: Majora's Mask (2000) */
  const majorasMask: "majorasMask";

  // ─── 2001: Oracle of Ages/Seasons ───────────────────────────────────────────
  /** Connection: A Link to the Past ➔ Oracle of Ages */
  const aLinkToThePast_oracleOfAges: "alttp-ooa";
  /** Era: Oracle of Ages (2001) */
  const oracleOfAges: "oracleOfAges";
  /** Connection: Oracle of Ages ➔ Oracle of Seasons */
  const oracleOfAges_oracleOfSeason: "ooa-oos";
  /** Era: Oracle of Seasons (2001) */
  const oracleOfSeason: "oracleOfSeason";
  /** Connection: Oracle of Seasons ➔ Link's Awakening */
  const oracleOfSeason_linksAwakening: "oos-la";

  // ─── 2002: The Legend of Zelda: Four Swords ────────────────────────────────
  /** Connection: Creation of the Master Sword ➔ Vaati is Sealed */
  const creationOfTheMasterSword_vaatiIsSealed: "cotms-vis";
  /** Era: Vaati is Sealed */
  const vaatiIsSealed: "vaatiIsSealed";
  /** Connection: Vaati is Sealed ➔ Four Swords */
  const vaatiIsSealed_fourSwords: "vis-fs";
  /** Era: Four Swords (2002) */
  const fourSwords: "fourSwords";
  /** Connection: Four Swords ➔ Ganondorf Gets the Complete Triforce */
  const fourSwords_ganondorfGetsTheCompleteTriforce: "fs-ggtct";

  // ─── 2003: The Legend of Zelda: The Wind Waker ──────────────────────────────
  /** Connection: Ocarina of Time (Adult) ➔ The Great Flood */
  const ocarinaOfTimeAdult_theGreatFlood: "oot-adult-tgf";
  /** Era: The Great Flood */
  const theGreatFlood: "theGreatFlood";
  /** Connection: The Great Flood ➔ The Wind Waker */
  const theGreatFlood_theWindWaker: "tgf-ww";
  /** Era: The Wind Waker (2003) */
  const theWindWaker: "theWindWaker";

  // ─── 2005: The Legend of Zelda: The Minish Cap ──────────────────────────────
  /** Connection: Creation of the Master Sword (Part 1) ➔ Hyrule Kingdom is Established */
  const creationOfTheMasterSword1_hyruleKingdomIsEstablished1: "cotms1-hkie1";
  /** Connection: Creation of the Master Sword (Part 2) ➔ Hyrule Kingdom is Established (Part 2) */
  const creationOfTheMasterSword2_hyruleKingdomIsEstablished2: "cotms2-hkie2";
  /** Era: Hyrule Kingdom is Established */
  const hyruleKingdomIsEstablished1: "hyruleKingdomIsEstablished1";
  /** Era: Hyrule Kingdom is Established */
  const hyruleKingdomIsEstablished2: "hyruleKingdomIsEstablished2";
  /** Connection: Hyrule Kingdom is Established 2 ➔ The Fierce War */
  const hyruleKingdomIsEstablished2_theFierceWar: "hkie2-tfw";
  /** Connection: Hyrule Kingdom is Established ➔ The War of the Bound Chest */
  const hyruleKingdomIsEstablished1_theWarOfTheBoundChest: "hkie1-wobc";
  /** Era: The War of the Bound Chest */
  const theWarOfTheBoundChest: "theWarOfTheBoundChest";
  /** Connection: The War of the Bound Chest ➔ The Minish Cap */
  const theWarOfTheBoundChest_theMinishCap: "wobc-tmc";
  /** Era: The Minish Cap (2005) */
  const theMinishCap: "theMinishCap";
  /** Connection: The Minish Cap ➔ Vaati is Sealed */
  const theMinishCap_vaatiIsSealed: "tmc-vis";

  // ─── 2006: The Legend of Zelda: Twilight Princess ───────────────────────────
  /** Connection: Majora's Mask ➔ Ganondorf Execution */
  const majorasMask_ganondorfExecution: "mm-ge";
  /** Era: Ganondorf Execution */
  const ganondorfExecution: "ganondorfExecution";
  /** Connection: Ganondorf Execution ➔ Twilight Princess */
  const ganondorfExecution_twilightPrincess: "ge-tp";
  /** Era: Twilight Princess (2006) */
  const twilightPrincess: "twilightPrincess";
  /** Connection: Hyrule Kingdom is Established (Part 2) ➔ The Triforce War */
  const hyruleKingdomIsEstablished2_theTriforceWar: "hkie2-ttw";
  /** Era: The Triforce War */
  const theTriforceWar: "theTriforceWar";
  /** Connection: The Triforce War ➔ The Fierce War */
  const theTriforceWar_theFierceWar: "ttw-tfw";

  // ─── 2007: The Legend of Zelda: Phantom Hourglass ───────────────────────────
  /** Connection: The Wind Waker ➔ Phantom Hourglass */
  const theWindWaker_phantomHourglass: "ww-ph";
  /** Era: Phantom Hourglass (2007) */
  const phantomHourglass: "phantomHourglass";

  // ─── 2009: The Legend of Zelda: Spirit Tracks ──────────────────────────────
  /** Connection: Phantom Hourglass ➔ Spirit Tracks */
  const phantomHourglass_spiritTracks: "ph-st";
  /** Era: Spirit Tracks (2009) */
  const spiritTracks: "spiritTracks";

  // ─── 2011: The Legend of Zelda: Skyward Sword ─────────────────────────────
  /** Connection: Creation (Part 2) ➔ The Demon Invasion */
  const creation2_theDemonInvasion: "creation2-tdi";
  /** Era: The Demon Invasion */
  const theDemonInvasion: "theDemonInvasion";
  /** Connection: The Demon Invasion ➔ Skyward Sword */
  const theDemonInvasion_skywardSword: "tdi-ss";
  /** Era: Skyward Sword (2011) */
  const skywardSword: "skywardSword";

  // ─── 2013: The Legend of Zelda: A Link Between Worlds ───────────────────────────
  /** Connection: Vaati is Sealed ➔ The Triforce War (Part 1) */
  const vaatiIsSealed_theTriforceWar1: "vis-ttw1";
  /** Era: The Triforce War (Part 1) */
  const theTriforceWar1: "theTriforceWar1";
  /** Connection: The Triforce War (Part 1) ➔ Four Swords */
  const theTriforceWar1_fourSwords: "ttw1-fs";
  /** Connection: A Link to the Past ➔ A Link Between Worlds */
  const linksAwakening_aLinkBetweenWorlds: "la-albw";
  /** Era: A Link Between Worlds (2013) */
  const aLinkBetweenWorlds: "aLinkBetweenWorlds";
  /** Connection: A Link Between Worlds ➔ The Tragedy of Princess Zelda (I) */
  const aLinkBetweenWorlds_theTragedyOfPrincessZeldaI: "albw-ttopzi";

  // ─── 2015: The Legend of Zelda: Tri Force Heroes ───────────────────────────
  /** Connection: A Link Between Worlds ➔ Tri Force Heroes */
  const aLinkBetweenWorlds_triForceHeroes: "albw-tfh";
  /** Era: Tri Force Heroes (2015) */
  const triForceHeroes: "triForceHeroes";
  /** Connection: Tri Force Heroes ➔ The Tragedy of Princess Zelda (I) */
  const triForceHeroes_theTragedyOfPrincessZeldaI: "tfh-ttopzi";

  // ─── 2017: The Legend of Zelda: Breath of the Wild ───────────────────────────
  /** Connection: Twilight Princess ➔ Ganondorf Sealing */
  const twilightPrincess_ganondorfSealing: "tp-gs";
  /** Era: Ganondorf Sealing */
  const ganondorfSealing: "ganondorfSealing";
  /** Connection: Ganondorf Sealing ➔ The Ancient Calamity */
  const ganondorfSealing_theAncientCalamity: "gs-tac";
  /** Era: The Ancient Calamity */
  const theAncientCalamity: "theAncientCalamity";
  /** Connection: The Ancient Calamity ➔ The Great Calamity */
  const theAncientCalamity_theGreatCalamity: "tac-tgc";
  /** Era: The Great Calamity */
  const theGreatCalamity: "theGreatCalamity";
  /** Connection: The Great Calamity ➔ Breath of the Wild */
  const theGreatCalamity_breathOfTheWild: "tgc-botw";
  /** Era: Breath of the Wild (2017) */
  const breathOfTheWild: "breathOfTheWild";

}

// Assign variables to globalThis at runtime
Object.entries(ID).forEach(([key, value]) => {
  (globalThis as any)[key] = value;
});
