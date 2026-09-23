import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CategorySlug, Tone } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number) => inr.format(value);

export const formatCompact = (value: number) =>
  new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value);

export const pad2 = (n: number) => String(n).padStart(2, "0");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const isValidEmail = (value: string) => EMAIL_PATTERN.test(value.trim());

/**
 * Pastel classes per tone. Written out in full so Tailwind can see them.
 * `bg` is the true pastel, `soft` a lighter wash for large surfaces and
 * `deep` a slightly richer shade for shapes that sit on a `soft` wash.
 */
export const toneClasses: Record<Tone, { bg: string; soft: string; deep: string }> = {
  blush: { bg: "bg-blush", soft: "bg-blush-50", deep: "bg-[#f5cbd6]" },
  peach: { bg: "bg-peach", soft: "bg-peach-50", deep: "bg-[#f6c1a8]" },
  butter: { bg: "bg-butter", soft: "bg-butter-50", deep: "bg-[#f6dd8a]" },
  lavender: { bg: "bg-lavender", soft: "bg-lavender-50", deep: "bg-[#ddcdf0]" },
  mint: { bg: "bg-mint", soft: "bg-mint-50", deep: "bg-[#cce6d8]" },
  sky: { bg: "bg-sky", soft: "bg-sky-50", deep: "bg-[#c9e0f0]" },
};

/** Each product category gets a consistent pastel for its image well. */
export const categoryTone: Record<CategorySlug, Tone> = {
  stationery: "butter",
  journaling: "peach",
  gifts: "blush",
  accessories: "lavender",
  desk: "mint",
  lifestyle: "peach",
  beauty: "blush",
  toys: "sky",
};
