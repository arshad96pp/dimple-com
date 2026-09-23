import type { NavLink } from "@/types";

export const site = {
  name: "Dimple",
  legalName: "Dimple Goods Co.",
  tagline: "Little things. Big smiles.",
  description:
    "Playful stationery, thoughtful gifts and everyday essentials made to brighten your world. Free shipping above ₹1499.",
  url: "https://dimple.example.com",
  freeShippingThreshold: 1499,
  instagram: "https://instagram.com",
} as const;

export const primaryNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?collection=new" },
  { label: "Best Sellers", href: "/shop?collection=best-sellers" },
  { label: "Gift Picks", href: "/shop?category=gifts" },
];

export const popularSearches = ["Journals", "Gifts", "Desk Accessories", "Stickers", "Bags"];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/shop?collection=new" },
      { label: "Best Sellers", href: "/shop?collection=best-sellers" },
      { label: "Gift Picks", href: "/shop?category=gifts" },
      { label: "Stationery", href: "/shop?category=stationery" },
      { label: "Accessories", href: "/shop?category=accessories" },
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
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/info/our-story" },
      { label: "Journal", href: "/info/journal" },
      { label: "Instagram", href: site.instagram },
    ],
  },
];
