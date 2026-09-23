import type { ReactNode } from "react";
import type { Product } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CarouselTrack } from "./CarouselTrack";
import { ProductCard } from "./ProductCard";

interface ProductCarouselProps {
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  products: Product[];
  action?: { label: string; href: string };
  /** Optional per-product line rendered under the title. */
  getNote?: (product: Product) => ReactNode;
  label?: string;
}

export function ProductCarousel({
  title,
  eyebrow,
  description,
  products,
  action,
  getNote,
  label = "products",
}: ProductCarouselProps) {
  return (
    <CarouselTrack
      label={label}
      header={<SectionHeading eyebrow={eyebrow} title={title} description={description} action={action} />}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          note={getNote?.(product)}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 31vw, 46vw"
          className="w-full"
        />
      ))}
    </CarouselTrack>
  );
}
