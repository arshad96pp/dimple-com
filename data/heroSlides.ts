import type { HeroSlide } from "@/types";
import { images } from "./images";

/** Four campaigns — each its own mood, all on the same brand system. */
export const heroSlides: HeroSlide[] = [
  {
    id: "little-joy",
    eyebrow: "The little things matter",
    title: "Give a Little Joy.",
    description: "Cute gifts, everyday essentials and tiny treasures made for people you love.",
    primary: { label: "Shop Gifts", href: "/shop?category=gifts" },
    secondary: { label: "Explore Collection", href: "/shop" },
    tone: "blush",
    image: images.hero.joy,
    accents: [images.hero.joyTreat, images.hero.joyFlower],
    tag: { label: "Sweet Nothings Tin", price: 749 },
  },
  {
    id: "happy-desk",
    eyebrow: "New season",
    title: "Make Your Desk Happy.",
    description: "Pretty stationery and desk essentials for your everyday moments.",
    primary: { label: "Shop Stationery", href: "/shop?category=stationery" },
    secondary: { label: "Desk Essentials", href: "/shop?category=desk" },
    tone: "butter",
    image: images.hero.desk,
    accents: [images.hero.deskPlant, images.hero.deskPaper],
    tag: { label: "Mint Condition Planter", price: 449 },
  },
  {
    id: "just-for-you",
    eyebrow: "Just because",
    title: "Something Cute, Just For You.",
    description: "Discover little finds that make ordinary days feel special.",
    primary: { label: "Explore New Arrivals", href: "/shop?collection=new" },
    secondary: { label: "Bags & Accessories", href: "/shop?category=accessories" },
    tone: "lavender",
    image: images.hero.cute,
    accents: [images.hero.cuteBear, images.hero.cutePeach],
    tag: { label: "Captain Cuddles", price: 749 },
  },
  {
    id: "gifting-made-easy",
    eyebrow: "Gifting made easy",
    title: "Find Something They'll Love.",
    description: "Thoughtful picks for birthdays, besties, celebrations and everything in between.",
    primary: { label: "Find A Gift", href: "/#gift-finder" },
    secondary: { label: "Best Sellers", href: "/shop?collection=best-sellers" },
    tone: "mint",
    image: images.hero.gift,
    accents: [images.hero.giftCupcakes, images.hero.giftMakeup],
    tag: { label: "Birthday Sparkle Box", price: 1149 },
  },
];
