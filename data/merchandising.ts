/**
 * Merchandising config — how the catalogue is *presented*.
 * Kept separate from product data so a CMS can own it later.
 */
import type { CategorySlug, RecipientTag } from "@/types";
import { IMAGES } from "./images";

export interface FeaturedTab {
  id: string;
  label: string;
  categories: CategorySlug[] | "all";
}

export const featuredTabs: FeaturedTab[] = [
  { id: "all", label: "All", categories: "all" },
  { id: "stationery", label: "Stationery", categories: ["stationery", "journaling"] },
  { id: "gifts", label: "Gifts", categories: ["gifts", "toys"] },
  { id: "accessories", label: "Accessories", categories: ["accessories"] },
  { id: "desk", label: "Desk", categories: ["desk"] },
  { id: "lifestyle", label: "Lifestyle", categories: ["lifestyle", "beauty"] },
];

export interface Recipient {
  id: RecipientTag;
  label: string;
  note: string;
  /** Tailwind classes for the tile's resting and selected colour. */
  tone: string;
}

export const recipients: Recipient[] = [
  { id: "her", label: "For Her", note: "Soft, pretty, personal", tone: "bg-pink-100" },
  { id: "him", label: "For Him", note: "Useful but make it nice", tone: "bg-mint-100" },
  { id: "besties", label: "For Besties", note: "Inside-joke approved", tone: "bg-lavender-100" },
  { id: "kids", label: "For Kids", note: "Squishy, bright, safe", tone: "bg-butter-100" },
  { id: "desk", label: "For Your Desk", note: "9-to-5, but cuter", tone: "bg-coral-100" },
  { id: "just-because", label: "Just Because", note: "No reason needed", tone: "bg-cream-200" },
];

export type TrendingNote = { kind: "views" | "bestseller" | "low-stock"; label: string };

/** Social-proof notes for the trending rail, keyed by product id. Demo values. */
export const trendingNotes: Record<string, TrendingNote> = {
  "p-009": { kind: "views", label: "124 people viewed this today" },
  "p-016": { kind: "low-stock", label: "Almost gone" },
  "p-027": { kind: "bestseller", label: "Best seller" },
  "p-011": { kind: "views", label: "86 people viewed this today" },
  "p-036": { kind: "bestseller", label: "Best seller" },
  "p-020": { kind: "low-stock", label: "Only a few left" },
  "p-006": { kind: "views", label: "212 people viewed this today" },
  "p-033": { kind: "bestseller", label: "Best seller" },
};

export const collageTiles = [
  {
    id: "desk-joy",
    caption: "Desk Joy",
    kicker: "Stationery edit",
    image: { src: IMAGES.collageDesk, alt: "A calm desk with an open notebook, mug and laptop" },
    href: "/shop?category=stationery",
  },
  {
    id: "little-treats",
    caption: "Little Treats",
    kicker: "Snack-sized gifts",
    image: { src: IMAGES.collageTreats, alt: "Strawberry dessert jars on a white table" },
    href: "/shop?category=gifts",
  },
  {
    id: "gift-something-cute",
    caption: "Gift Something Cute",
    kicker: "Birthday-ready",
    image: { src: IMAGES.collageGift, alt: "A birthday cake topped with a lit sparkler" },
    href: "/shop?category=gifts",
  },
  {
    id: "made-for-you",
    caption: "Made For You",
    kicker: "Self-care picks",
    image: { src: IMAGES.collageMadeForYou, alt: "Single pink tulip on a pink background" },
    href: "/shop?category=beauty",
  },
  {
    id: "peachy",
    caption: "Stay Peachy",
    kicker: "New season colours",
    image: { src: IMAGES.collagePeach, alt: "A single ripe peach on a blush background" },
    href: "/shop?collection=new",
  },
];
