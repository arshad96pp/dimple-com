import type { NavLink } from "@/types";

export const site = {
  name: "Dimple",
  legalName: "Dimple Goods Co.",
  tagline: "Little things. Big smiles.",
  description:
    "Cute stationery, thoughtful gifts and tiny treasures for the people you love. Free shipping above ₹1499, gift wrapping on every order.",
  url: "https://dimple.example.com",
  freeShippingThreshold: 1499,
  instagram: "https://instagram.com",
  handle: "@dimple.goods",
} as const;

/** Desktop header links; "Collections" is a category menu rendered separately. */
export const primaryNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?collection=new" },
  { label: "Best Sellers", href: "/shop?collection=best-sellers" },
  { label: "Gift Guide", href: "/#gift-finder" },
];

export const announcements = [
  "Free shipping on orders above ₹1499",
  "Gift wrapping available",
  "New: the pastel desk edit",
  "Easy 7-day returns",
];

export const popularSearches = ["Journals", "Gift boxes", "Desk", "Stickers", "Pouches", "Candles"];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/shop?collection=new" },
      { label: "Best Sellers", href: "/shop?collection=best-sellers" },
      { label: "Stationery", href: "/shop?category=stationery" },
      { label: "Accessories", href: "/shop?category=accessories" },
      { label: "Home & Cozy", href: "/shop?category=lifestyle" },
    ],
  },
  {
    title: "Gift Guide",
    links: [
      { label: "For Her", href: "/#gift-finder" },
      { label: "For Him", href: "/#gift-finder" },
      { label: "For Best Friends", href: "/#gift-finder" },
      { label: "Gift Boxes", href: "/shop?category=gifts" },
      { label: "Under ₹499", href: "/shop?sort=price-asc" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/info/our-story" },
      { label: "Journal", href: "/info/journal" },
      { label: "Instagram", href: site.instagram },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", href: "/info/contact" },
      { label: "Shipping", href: "/info/shipping" },
      { label: "Returns", href: "/info/returns" },
      { label: "FAQ", href: "/info/faq" },
    ],
  },
];
