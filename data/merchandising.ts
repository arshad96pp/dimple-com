/**
 * Merchandising config — how the catalogue is *presented*.
 * Kept separate from product data so a CMS can own it later.
 */
import type { CategorySlug, ProductImage, RecipientTag, Tone } from "@/types";
import { images } from "./images";

export interface FeaturedTab {
  id: string;
  label: string;
  categories: CategorySlug[] | "all";
}

export const featuredTabs: FeaturedTab[] = [
  { id: "all", label: "All", categories: "all" },
  { id: "stationery", label: "Stationery", categories: ["stationery", "journaling"] },
  { id: "gifts", label: "Gifts", categories: ["gifts", "toys", "lifestyle"] },
  { id: "accessories", label: "Accessories", categories: ["accessories", "beauty"] },
  { id: "desk", label: "Desk", categories: ["desk"] },
];

export interface Recipient {
  id: RecipientTag;
  label: string;
  note: string;
  tone: Tone;
  image: ProductImage;
}

export const recipients: Recipient[] = [
  { id: "her", label: "For Her", note: "Soft, pretty, personal", tone: "blush", image: images.recipients.her },
  { id: "him", label: "For Him", note: "Useful, but make it nice", tone: "sky", image: images.recipients.him },
  { id: "besties", label: "For Best Friend", note: "Inside-joke approved", tone: "lavender", image: images.recipients.besties },
  { id: "kids", label: "For Kids", note: "Squishy, bright, safe", tone: "butter", image: images.recipients.kids },
  { id: "desk", label: "For Your Desk", note: "9-to-5, but cuter", tone: "mint", image: images.recipients.desk },
  { id: "just-because", label: "Just Because", note: "No reason needed", tone: "peach", image: images.recipients["just-because"] },
];

export interface CollageTile {
  id: string;
  caption: string;
  kicker: string;
  image: ProductImage;
  href: string;
}

/** Five tiles, laid out magazine-style in `EditorialCollage`. Order sets the slot. */
export const collageTiles: CollageTile[] = [
  { id: "desk-joy", caption: "Desk Joy", kicker: "The stationery edit", image: images.collage.deskJoy, href: "/shop?category=stationery" },
  { id: "gift-better", caption: "Gift Better", kicker: "Birthday-ready", image: images.collage.giftBetter, href: "/shop?category=gifts" },
  { id: "everyday-cute", caption: "Everyday Cute", kicker: "Self-care picks", image: images.collage.everydayCute, href: "/shop?category=beauty" },
  { id: "little-treats", caption: "Little Treats", kicker: "Snack-sized gifts", image: images.collage.littleTreats, href: "/shop?category=gifts" },
  { id: "stay-peachy", caption: "Stay Peachy", kicker: "New season colours", image: images.collage.peachy, href: "/shop?collection=new" },
];
