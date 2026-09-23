import type { Category } from "@/types";
import { images } from "./images";

/** Order matters: the home page lays these out editorially in this sequence. */
export const categories: Category[] = [
  {
    slug: "stationery",
    name: "Cute Stationery",
    blurb: "Pens, pencils, stickers & paper goods",
    image: images.categories.stationery,
    productCount: 124,
    href: "/shop?category=stationery",
    tone: "butter",
  },
  {
    slug: "gifts",
    name: "Gifts",
    blurb: "Boxes, treats & wraps",
    image: images.categories.gifts,
    productCount: 86,
    href: "/shop?category=gifts",
    tone: "blush",
  },
  {
    slug: "journaling",
    name: "Journaling",
    blurb: "Notebooks & planners",
    image: images.categories.journaling,
    productCount: 58,
    href: "/shop?category=journaling",
    tone: "peach",
  },
  {
    slug: "desk",
    name: "Desk Essentials",
    blurb: "Organisers, mugs & planters",
    image: images.categories.desk,
    productCount: 65,
    href: "/shop?category=desk",
    tone: "mint",
  },
  {
    slug: "accessories",
    name: "Bags & Accessories",
    blurb: "Totes, pouches & jewellery",
    image: images.categories.accessories,
    productCount: 72,
    href: "/shop?category=accessories",
    tone: "lavender",
  },
  {
    slug: "beauty",
    name: "Beauty & Self Care",
    blurb: "Glow-ups & soft rituals",
    image: images.categories.beauty,
    productCount: 41,
    href: "/shop?category=beauty",
    tone: "peach",
  },
  {
    slug: "toys",
    name: "Toys & Collectibles",
    blurb: "Plushies & shelf friends",
    image: images.categories.toys,
    productCount: 37,
    href: "/shop?category=toys",
    tone: "sky",
  },
  {
    slug: "cozy",
    name: "Home & Cozy",
    blurb: "Candles, cushions & knits",
    image: images.categories.cozy,
    productCount: 49,
    href: "/shop?category=lifestyle",
    tone: "blush",
  },
];

/** Human-readable labels for product category slugs. */
export const categoryLabels: Record<string, string> = {
  stationery: "Stationery",
  journaling: "Journaling",
  gifts: "Gifts",
  accessories: "Accessories",
  desk: "Desk",
  lifestyle: "Home & Cozy",
  beauty: "Beauty",
  toys: "Toys",
};
