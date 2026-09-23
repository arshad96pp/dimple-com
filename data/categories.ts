import type { Category } from "@/types";
import { IMAGES } from "./images";

export const categories: Category[] = [
  {
    slug: "stationery",
    name: "Cute Stationery",
    blurb: "Pens, pencils & paper goods",
    image: { src: IMAGES.pastelPencils, alt: "Pastel coloured pencils on white paper" },
    productCount: 124,
    href: "/shop?category=stationery",
  },
  {
    slug: "journaling",
    name: "Journaling",
    blurb: "Notebooks & planners",
    image: { src: IMAGES.checklistJournal, alt: "Hand writing a checklist in a journal" },
    productCount: 58,
    href: "/shop?category=journaling",
  },
  {
    slug: "gifts",
    name: "Gifts",
    blurb: "Boxes, treats & wraps",
    image: { src: IMAGES.giftPinkRibbon, alt: "Gift box tied with a pink ribbon" },
    productCount: 86,
    href: "/shop?category=gifts",
  },
  {
    slug: "accessories",
    name: "Bags & Accessories",
    blurb: "Totes, pouches & jewellery",
    image: { src: IMAGES.pinkBag, alt: "Blush pink crossbody pouch" },
    productCount: 72,
    href: "/shop?category=accessories",
  },
  {
    slug: "beauty",
    name: "Beauty & Self Care",
    blurb: "Glow-ups & soft rituals",
    image: { src: IMAGES.makeupFlatlay, alt: "Peach makeup brushes and blush flat lay" },
    productCount: 41,
    href: "/shop?category=beauty",
  },
  {
    slug: "desk",
    name: "Desk Essentials",
    blurb: "Organisers, mugs & planters",
    image: { src: IMAGES.succulentMint, alt: "Succulent in a mint pot" },
    productCount: 65,
    href: "/shop?category=desk",
  },
  {
    slug: "cozy",
    name: "Cozy Essentials",
    blurb: "Candles, cushions & knits",
    image: { src: IMAGES.candleGlow, alt: "Candle glowing among fairy lights" },
    productCount: 49,
    href: "/shop?category=lifestyle",
  },
  {
    slug: "toys",
    name: "Toys & Collectibles",
    blurb: "Plushies & shelf friends",
    image: { src: IMAGES.teddyBasket, alt: "Teddy bear beside a wicker basket" },
    productCount: 37,
    href: "/shop?category=toys",
  },
];

/** Human-readable labels for product category slugs. */
export const categoryLabels: Record<string, string> = {
  stationery: "Stationery",
  journaling: "Journaling",
  gifts: "Gifts",
  accessories: "Accessories",
  desk: "Desk",
  lifestyle: "Lifestyle",
  beauty: "Beauty",
  toys: "Toys",
};
