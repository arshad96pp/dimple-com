/**
 * Single source of truth for every image on the site.
 *
 * `library` holds each photo once under a semantic key; the groups below pick
 * from it for each part of the page. To swap in real photography, change the
 * URL here (a CDN URL or a `/public` path) — no component needs to be touched.
 * If you move off Unsplash, also update `images.remotePatterns` in `next.config.ts`.
 *
 * Art direction: soft daylight, clean light backgrounds, pastel props.
 * Darker, moodier shots are only used as secondary product images.
 */

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

const library = {
  // Gifts & treats
  giftInHands: unsplash("1512909006721-3d6018887383"),
  giftPinkRibbon: unsplash("1513201099705-a9746e1e201f"),
  giftMagenta: unsplash("1549465220-1a8b9238cd48"),
  giftRedStack: unsplash("1513885535751-8b9238bd345a"),
  giftGoldBows: unsplash("1607344645866-009c320b63e0"),
  chocolateBox: unsplash("1481391319762-47dff72954d9"),
  macaronStack: unsplash("1558326567-98ae2405596b"),
  macaronPile: unsplash("1569864358642-9d1684040f43"),
  cupcakes: unsplash("1486427944299-d1955d23e34d"),
  sparklerCake: unsplash("1577998474517-7eeeed4e448a"),
  strawberryJars: unsplash("1488477181946-6428a0291777"),
  heartBouquet: unsplash("1526047932273-341f2a7631f9"),
  pinkTulip: unsplash("1520763185298-1b434c919102"),
  peach: unsplash("1531171596281-8b5d26917d8b"),

  // Stationery & journaling
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

  // Bags & accessories
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

  // Desk
  penCup: unsplash("1456735190827-d1262f71b8a3"),
  succulentMint: unsplash("1485955900006-10f4d324d411"),
  cactusPink: unsplash("1459411552884-841db9b3cc2a"),
  whiteMug: unsplash("1514228742587-6b1558fcca3d"),
  blueMug: unsplash("1570784332176-fdd73da66f03"),
  deskScene: unsplash("1501504905252-473c47e087f8"),
  wallClock: unsplash("1563861826100-9cb868fdbe1c"),

  // Home & cozy
  candleGlow: unsplash("1603006905003-be475563bc59"),
  candleAmber: unsplash("1596433809252-260c2745dfdd"),
  candlePair: unsplash("1572726729207-a78d6feb18d7"),
  ceramicCups: unsplash("1610701596007-11502861dcfa"),
  pillowYellow: unsplash("1584100936595-c0654b55a2e2"),
  sweatshirt: unsplash("1620799140408-edc6dcb6d633"),
  sofaThrow: unsplash("1616627451515-cbc80e5ece35"),
  bottleGreen: unsplash("1602143407151-7111542de6e8"),
  cozyBed: unsplash("1579656381226-5fc0f0100c3b"),

  // Beauty & self care
  makeupFlatlay: unsplash("1596462502278-27bfdc403348"),
  lotion: unsplash("1620916566398-39f1143ab7be"),
  serumDropper: unsplash("1608571423902-eed4a5ad8108"),
  serumWood: unsplash("1617897903246-719242758050"),
  serumPastel: unsplash("1576426863848-c21f53c60b19"),
  skincarePastel: unsplash("1629198688000-71f23e745b6e"),
  bottlesWhite: unsplash("1631729371254-42c2892f0e6e"),
  skincareFlatlay: unsplash("1612817288484-6f916006741a"),

  // Toys & collectibles
  teddyBasket: unsplash("1559454403-b8fb88521f11"),
  teddyAviator: unsplash("1530325553241-4f6e7690cf36"),
  tinRobot: unsplash("1563396983906-b3795482a59a"),
  woodenTrain: unsplash("1596461404969-9ae70f2830c1"),
  rubberDuck: unsplash("1582845512747-e42001c95638"),
  buildingBlocks: unsplash("1575364289437-fb1479d52732"),
  toyFlatlay: unsplash("1545558014-8692077e9b5c"),

  // Community
  puppyPlush: unsplash("1591946614720-90a587da4a36"),

  // People
  avatarAnanya: unsplash("1494790108377-be9c29b29330"),
  avatarMeera: unsplash("1438761681033-6461ffad8d80"),
  avatarKabir: unsplash("1507003211169-0a1dd7228f2d"),
  avatarRia: unsplash("1488426862026-3ee34a7d66df"),
  avatarTara: unsplash("1544005313-94ddf0286df2"),
} as const;

export type ImageKey = keyof typeof library;

const pick = (key: ImageKey, alt: string, position?: string) => ({ src: library[key], alt, position });

export const images = {
  hero: {
    joy: pick("giftInHands", "Hands holding out a gift wrapped in kraft paper and candy-stripe twine", "50% 45%"),
    joyTreat: pick("macaronStack", "A stack of pastel macarons"),
    joyFlower: pick("pinkTulip", "A single pink tulip on a blush background"),
    desk: pick("pastelPencils", "Pastel coloured pencils fanned across white paper", "40% 50%"),
    deskPlant: pick("succulentMint", "A succulent in a mint ceramic pot"),
    deskPaper: pick("cactusPink", "A small cactus in a terracotta pot against pink", "50% 60%"),
    cute: pick("pinkBag", "A blush pink crossbody bag with a chevron flap", "55% 55%"),
    cuteBear: pick("teddyAviator", "A small teddy bear in aviator goggles", "62% 60%"),
    cutePeach: pick("peach", "A ripe peach on a blush background"),
    gift: pick("giftMagenta", "A magenta gift box tied with gold ribbon and confetti", "50% 50%"),
    giftCupcakes: pick("cupcakes", "Cupcakes with mint frosting and sprinkles", "30% 50%"),
    giftMakeup: pick("makeupFlatlay", "Peach makeup brushes and blush on a peach backdrop"),
  },
  categories: {
    stationery: pick("pastelPencils", "Pastel coloured pencils on white paper", "35% 50%"),
    gifts: pick("giftPinkRibbon", "A kraft gift box tied with a pink satin ribbon"),
    journaling: pick("plannerGoals", "An open planner beside a cup of coffee"),
    desk: pick("succulentMint", "A succulent in a mint pot"),
    accessories: pick("pinkBag", "A blush pink crossbody pouch", "55% 50%"),
    beauty: pick("makeupFlatlay", "Peach makeup brushes and blush flat lay"),
    toys: pick("teddyBasket", "A honey teddy bear beside a wicker basket"),
    cozy: pick("ceramicCups", "Speckled cream ceramic cups stacked on a table"),
  },
  recipients: {
    her: pick("heartBouquet", "Hands holding a heart-shaped bouquet on pink"),
    him: pick("blueMug", "A white mug against a periwinkle backdrop"),
    besties: pick("macaronPile", "A pile of pastel macarons"),
    kids: pick("rubberDuck", "A classic yellow rubber duck"),
    desk: pick("notebookSpiral", "A white spiral notebook and pen on a clean desk"),
    "just-because": pick("peach", "A ripe peach on a blush background"),
  },
  editorial: {
    gift: pick("giftInHands", "Hands holding out a kraft-wrapped gift tied with candy-stripe twine", "50% 40%"),
    giftDetail: pick("macaronStack", "A stack of pastel macarons"),
  },
  collage: {
    deskJoy: pick("deskScene", "A calm desk with an open notebook, mug and laptop", "30% 50%"),
    giftBetter: pick("sparklerCake", "A birthday cake topped with a lit sparkler"),
    everydayCute: pick("pinkTulip", "A single pink tulip on a pink background"),
    littleTreats: pick("strawberryJars", "Strawberry dessert jars on a white table"),
    peachy: pick("peach", "A ripe peach on a blush background"),
  },
  social: {
    flowers: pick("heartBouquet", "Hands holding a heart-shaped bouquet on pink"),
    puppy: pick("puppyPlush", "A golden puppy holding a plush toy"),
    cupcakes: pick("cupcakes", "A row of cupcakes with mint frosting"),
    washi: pick("washiDesk", "Washi tape and scissors on a teal desk"),
    cactus: pick("cactusPink", "A small cactus in a terracotta pot on pink"),
    toys: pick("toyFlatlay", "Colourful toys and blocks laid out on white"),
  },
  avatars: {
    ananya: library.avatarAnanya,
    meera: library.avatarMeera,
    kabir: library.avatarKabir,
    ria: library.avatarRia,
    tara: library.avatarTara,
  },
  /** Product photography, referenced by key from `data/products.ts`. */
  products: library,
} as const;

export const ogImage =
  "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&h=630&q=80";
