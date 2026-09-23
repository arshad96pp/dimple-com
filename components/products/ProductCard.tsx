import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { categoryLabels } from "@/data/categories";
import { cn, pad2 } from "@/lib/utils";
import type { Product } from "@/types";
import { Price } from "@/components/ui/Price";
import { AddToCartButton } from "./AddToCartButton";
import { ProductBadge } from "./ProductBadge";
import { QuickViewButton } from "./QuickViewButton";
import { WishlistButton } from "./WishlistButton";

interface ProductCardProps {
  product: Product;
  /** Optional ranking shown as a small numeral (Best Sellers). */
  rank?: number;
  /** Optional line of social proof under the title (Trending). */
  note?: ReactNode;
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
  className?: string;
}

export function ProductCard({
  product,
  rank,
  note,
  sizes = "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw",
  className,
}: ProductCardProps) {
  const [primary, secondary] = product.images;
  const href = `/products/${product.slug}`;

  return (
    <article
      className={cn(
        "group/card relative flex flex-col transition-transform duration-500 ease-out-soft lg:hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200">
        <Link href={href} tabIndex={-1} aria-hidden className="absolute inset-0">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            sizes={sizes}
            style={{ objectPosition: primary.position }}
            className={cn(
              "object-cover transition-[transform,opacity] duration-700 ease-out-soft lg:group-hover/card:scale-[1.04]",
              secondary && "lg:group-hover/card:opacity-0",
            )}
          />
          {secondary && (
            <Image
              src={secondary.src}
              alt=""
              fill
              sizes={sizes}
              style={{ objectPosition: secondary.position }}
              className="hidden scale-[1.06] object-cover opacity-0 transition-[transform,opacity] duration-700 ease-out-soft lg:block lg:group-hover/card:scale-100 lg:group-hover/card:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div>{product.badge && <ProductBadge badge={product.badge} />}</div>
          <WishlistButton product={product} className="pointer-events-auto" />
        </div>

        {rank !== undefined && (
          <span
            aria-hidden
            className="absolute bottom-3 left-3 font-display text-[13px] font-semibold tracking-wider text-ink/80 transition-opacity duration-300 lg:group-hover/card:opacity-0"
          >
            <span className="rounded-full bg-cream/90 px-2 py-1 backdrop-blur-sm">No. {pad2(rank)}</span>
          </span>
        )}

        {/* Desktop hover actions — mobile gets the always-visible add button below. */}
        <div className="absolute inset-x-3 bottom-3 hidden translate-y-3 opacity-0 transition-[transform,opacity] duration-500 ease-out-soft group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100 lg:flex lg:group-hover/card:translate-y-0 lg:group-hover/card:opacity-100">
          <QuickViewButton product={product} className="w-full" />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-3.5 sm:pt-4">
        <div className="flex items-center justify-between gap-2 text-[11px] font-medium tracking-[0.12em] text-subtle uppercase">
          <span>{categoryLabels[product.category]}</span>
          {product.rating && (
            <span className="flex items-center gap-1 tracking-normal normal-case text-muted">
              <Star className="size-3 fill-butter text-butter" strokeWidth={0} aria-hidden />
              <span className="sr-only">Rated</span>
              {product.rating.toFixed(1)}
              {product.reviewCount && <span className="hidden text-subtle sm:inline">({product.reviewCount})</span>}
            </span>
          )}
        </div>

        <h3 className="mt-1.5 font-display text-[15px] leading-snug font-medium tracking-[-0.015em] text-ink sm:text-base">
          <Link href={href} className="decoration-coral decoration-2 underline-offset-4 hover:underline">
            {product.name}
          </Link>
        </h3>

        {note && <div className="mt-1.5">{note}</div>}

        <div className="mt-auto flex items-end justify-between gap-2 pt-2.5">
          <Price price={product.price} originalPrice={product.originalPrice} discount={product.discount} />
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
