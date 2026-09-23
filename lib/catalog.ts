/**
 * Catalogue data access.
 *
 * Every function is async on purpose: today they read static data, tomorrow
 * they can `fetch()` from an API. Components only depend on these signatures
 * and on the types in `@/types`, so swapping the source is a one-file change.
 */
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { socialPosts } from "@/data/socialPosts";
import { testimonials } from "@/data/testimonials";
import type { CategorySlug, Product, RecipientTag } from "@/types";

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "rating";
export type Collection = "new" | "best-sellers" | "sale";

export interface ProductQuery {
  category?: CategorySlug;
  collection?: Collection;
  sort?: SortKey;
  limit?: number;
}

const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
  featured: (a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured),
  newest: (a, b) => Number(!!b.isNew) - Number(!!a.isNew),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
};

const inCollection: Record<Collection, (p: Product) => boolean> = {
  new: (p) => !!p.isNew,
  "best-sellers": (p) => !!p.isBestSeller,
  sale: (p) => !!p.discount,
};

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  let result = products;
  if (query.category) result = result.filter((p) => p.category === query.category);
  if (query.collection) result = result.filter(inCollection[query.collection]);
  if (query.sort) result = [...result].sort(sorters[query.sort]);
  return query.limit ? result.slice(0, query.limit) : result;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  const byId = new Map(products.map((p) => [p.id, p]));
  return ids.flatMap((id) => byId.get(id) ?? []);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category && p.isBestSeller))
    .slice(0, limit);
}

export async function getProductsForRecipient(tag: RecipientTag, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.tags?.includes(tag))
    .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
    .slice(0, limit);
}

export async function searchProducts(term: string, limit = 6): Promise<Product[]> {
  const q = term.trim().toLowerCase();
  if (!q) return [];
  // Loose matching so "Journals" finds "journal" and "Desk Accessories" finds desk items.
  const words = q.split(/\s+/).map((w) => w.replace(/(es|s)$/, ""));
  return products
    .map((p) => {
      const haystack = `${p.name} ${p.category} ${p.description} ${p.tags?.join(" ") ?? ""}`.toLowerCase();
      const score = words.reduce(
        (sum, w) => sum + (p.name.toLowerCase().includes(w) ? 3 : haystack.includes(w) ? 1 : 0),
        0,
      );
      return { p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

export async function getCategories() {
  return categories;
}

export async function getTestimonials() {
  return testimonials;
}

export async function getSocialPosts() {
  return socialPosts;
}
