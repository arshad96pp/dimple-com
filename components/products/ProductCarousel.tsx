"use client";

import type { ReactNode } from "react";
import type { Product, ProductBadge } from "@/types";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "./ProductCard";

interface ProductCarouselProps {
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  products: Product[];
  action?: { label: string; href: string };
  /** Per-product badge override (e.g. rotating "New / Just In / Limited"). */
  getBadge?: (product: Product, index: number) => ProductBadge | undefined;
  label: string;
  id?: string;
}

/** A section heading with arrows, over a free-scrolling rail of product cards. */
export function ProductCarousel({ title, eyebrow, description, products, action, getBadge, label, id }: ProductCarouselProps) {
  return (
    <Carousel
      label={label}
      freeMode
      slideClassName="w-[46%] pr-2.5 min-[480px]:w-[40%] sm:w-[31%] sm:pr-4 lg:w-1/4 lg:pr-5"
      renderHeader={(nav) => (
        <SectionHeading id={id} eyebrow={eyebrow} title={title} description={description} action={action} aside={nav} />
      )}
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          badge={getBadge?.(product, i)}
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 31vw, 46vw"
        />
      ))}
    </Carousel>
  );
}
