/**
 * Single source of truth for every image on the site.
 *
 * Every photo is referenced by a semantic key. To swap in real product
 * photography, change the value here (a CDN URL or a `/public` path) —
 * no component needs to be touched. If you move off Unsplash, also update
 * `images.remotePatterns` in `next.config.ts`.
 */

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

export const IMAGES = {
  // Campaign / editorial
  heroMain: unsplash("1512909006721-3d6018887383"),
  heroTreats: unsplash("1558326567-98ae2405596b"),
  editorialGift: unsplash("1549465220-1a8b9238cd48"),
  collageDesk: unsplash("1501504905252-473c47e087f8"),
  collageTreats: unsplash("1488477181946-6428a0291777"),
  collageGift: unsplash("1577998474517-7eeeed4e448a"),
  collageMadeForYou: unsplash("1520763185298-1b434c919102"),
  collagePeach: unsplash("1531171596281-8b5d26917d8b"),

  // Social
  socialPuppy: unsplash("1591946614720-90a587da4a36"),
  socialLattes: unsplash("1495474472287-4d71bcdd2085"),
  socialCupcakes: unsplash("1486427944299-d1955d23e34d"),
  socialCactus: unsplash("1459411552884-841db9b3cc2a"),
  socialWashi: unsplash("1452860606245-08befc0ff44b"),
  socialFlowers: unsplash("1526047932273-341f2a7631f9"),

  // Avatars
  avatarAnanya: unsplash("1494790108377-be9c29b29330"),
  avatarMeera: unsplash("1438761681033-6461ffad8d80"),
  avatarKabir: unsplash("1507003211169-0a1dd7228f2d"),
  avatarRia: unsplash("1488426862026-3ee34a7d66df"),
  avatarTara: unsplash("1544005313-94ddf0286df2"),

  // Products — stationery & journaling
  notebookSpiral: unsplash("1531346878377-a5be20888e57"),
  notebookFountain: unsplash("1471107340929-a87cd0f5b5f3"),
  notesAndPen: unsplash("1517842645767-c639042777db"),
  plannerGoals: unsplash("1506784983877-45594efa4cbe"),
  checklistJournal: unsplash("1484480974693-6ca0a78fb36b"),
  handwriting: unsplash("1455390582262-044cdead277a"),
  pastelPencils: unsplash("1568205612837-017257d2310a"),
  tealPen: unsplash("1585336261022-680e295ce3fe"),
  inkPen: unsplash("1583485088034-697b5bc54ccd"),
  washiDesk: unsplash("1452860606245-08befc0ff44b"),
  peachPaper: unsplash("1510935813936-763eb6fbc613"),
  clipboard: unsplash("1586281380349-632531db7ed4"),

  // Products — gifts & treats
  giftPinkRibbon: unsplash("1513201099705-a9746e1e201f"),
  giftMagenta: unsplash("1549465220-1a8b9238cd48"),
  giftHeld: unsplash("1512909006721-3d6018887383"),
  giftRedStack: unsplash("1513885535751-8b9238bd345a"),
  giftGoldBows: unsplash("1607344645866-009c320b63e0"),
  chocolateBox: unsplash("1481391319762-47dff72954d9"),
  macaronStack: unsplash("1558326567-98ae2405596b"),
  macaronPile: unsplash("1569864358642-9d1684040f43"),
  cupcakes: unsplash("1486427944299-d1955d23e34d"),
  sparklerCake: unsplash("1577998474517-7eeeed4e448a"),

  // Products — accessories
  kraftTote: unsplash("1544816155-12df9643f363"),
  pinkBag: unsplash("1566150905458-1bf1fc113f0d"),
  wickerBag: unsplash("1590874103328-eac38a683ce7"),
  redBag: unsplash("1584917865442-de89df76afd3"),
  leatherBackpack: unsplash("1622560480605-d83c853bc5c3"),
  floralBag: unsplash("1591561954557-26941169b49e"),
  goldBracelet: unsplash("1602173574767-37ac01994b2a"),
  goldEarrings: unsplash("1617038220319-276d3cfab638"),
  earringsNotebook: unsplash("1535556116002-6281ff3e9f36"),
  necklace: unsplash("1611652022419-a9419f74343d"),

  // Products — desk
  penCup: unsplash("1456735190827-d1262f71b8a3"),
  succulentMint: unsplash("1485955900006-10f4d324d411"),
  cactusPink: unsplash("1459411552884-841db9b3cc2a"),
  whiteMug: unsplash("1514228742587-6b1558fcca3d"),
  blueMug: unsplash("1570784332176-fdd73da66f03"),
  deskScene: unsplash("1501504905252-473c47e087f8"),
  wallClock: unsplash("1563861826100-9cb868fdbe1c"),

  // Products — lifestyle & cozy
  candleGlow: unsplash("1603006905003-be475563bc59"),
  candleAmber: unsplash("1596433809252-260c2745dfdd"),
  candlePair: unsplash("1572726729207-a78d6feb18d7"),
  ceramicCups: unsplash("1610701596007-11502861dcfa"),
  pillowYellow: unsplash("1584100936595-c0654b55a2e2"),
  sweatshirt: unsplash("1620799140408-edc6dcb6d633"),
  sofaThrow: unsplash("1616627451515-cbc80e5ece35"),
  bottleGreen: unsplash("1602143407151-7111542de6e8"),
  cozyBed: unsplash("1579656381226-5fc0f0100c3b"),

  // Products — beauty
  makeupFlatlay: unsplash("1596462502278-27bfdc403348"),
  lotion: unsplash("1620916566398-39f1143ab7be"),
  serumDropper: unsplash("1608571423902-eed4a5ad8108"),
  serumWood: unsplash("1617897903246-719242758050"),
  bottlesWhite: unsplash("1631729371254-42c2892f0e6e"),
  skincareFlatlay: unsplash("1612817288484-6f916006741a"),

  // Products — toys & collectibles
  teddyBasket: unsplash("1559454403-b8fb88521f11"),
  teddyAviator: unsplash("1530325553241-4f6e7690cf36"),
  tinRobot: unsplash("1563396983906-b3795482a59a"),
  woodenTrain: unsplash("1596461404969-9ae70f2830c1"),
  rubberDuck: unsplash("1582845512747-e42001c95638"),
  buildingBlocks: unsplash("1575364289437-fb1479d52732"),
  peach: unsplash("1531171596281-8b5d26917d8b"),
} as const;

export type ImageKey = keyof typeof IMAGES;
