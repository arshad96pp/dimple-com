/**
 * Domain types shared by the UI and the data layer.
 * When a real API is connected, map its responses to these shapes in `lib/catalog.ts`
 * and nothing in `components/` needs to change.
 */

export type CategorySlug =
  | "stationery"
  | "journaling"
  | "gifts"
  | "accessories"
  | "desk"
  | "lifestyle"
  | "beauty"
  | "toys";

export type ProductBadge = "New" | "Sale" | "Best Seller" | "Limited" | "Gift Pick";

export type RecipientTag = "her" | "him" | "besties" | "kids" | "desk" | "just-because";

export interface ProductImage {
  src: string;
  alt: string;
  /** Optional CSS object-position to keep the subject in frame when cropped. */
  position?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  price: number;
  originalPrice?: number;
  /** Whole-number percentage, derived from price/originalPrice. */
  discount?: number;
  rating?: number;
  reviewCount?: number;
  images: ProductImage[];
  badge?: ProductBadge;
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  tags?: RecipientTag[];
}

export interface Category {
  slug: CategorySlug | "cozy";
  name: string;
  blurb: string;
  image: ProductImage;
  productCount: number;
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  product: string;
}

export interface SocialPost {
  id: string;
  handle: string;
  image: ProductImage;
  likes: number;
  href: string;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: ProductImage;
  quantity: number;
}

export interface NavLink {
  label: string;
  href: string;
}
