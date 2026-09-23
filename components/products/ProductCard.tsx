import Image from "next/image";
import Link from "next/link";
import { categoryLabels } from "@/data/categories";
import { categoryTone, cn, toneClasses } from "@/lib/utils";
import type { Product, ProductBadge } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { QuickAdd } from "./QuickAdd";
import { QuickViewButton } from "./QuickViewButton";
import { WishlistButton } from "./WishlistButton";

interface ProductCardProps {
  product: Product;
  /** Override the product's own badge (e.g. "Just In" on a new-arrivals rail). */
  badge?: ProductBadge | null;
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
  className?: string;
}

/**
 * White card on the cream page, pastel image well per category.
 * Desktop: hover swaps to the second photo, reveals wishlist and slides up
 * quick add. Touch: everything is visible, nothing depends on hover.
 */
export function ProductCard({
  product,
  badge,
  sizes = "(min-width: 1280px) 20vw, (min-width: 1024px) 23vw, (min-width: 768px) 30vw, 46vw",
  className,
}: ProductCardProps) {
  const [primary, secondary] = product.images;
  const href = `/products/${product.slug}`;
  const shownBadge = badge === null ? undefined : (badge ?? product.badge);

  return (
    <article
      className={cn(
        "group/card relative flex w-full flex-col rounded-[22px] border border-line/80 bg-paper p-1.5 transition-[box-shadow,border-color] duration-500 ease-out-soft sm:p-2 lg:hover:border-line lg:hover:shadow-[0_24px_48px_-32px_rgba(37,37,37,0.28)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden rounded-[16px]",
          toneClasses[categoryTone[product.category]].soft,
        )}
      >
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
              className="hidden scale-[1.04] object-cover opacity-0 transition-[transform,opacity] duration-700 ease-out-soft lg:block lg:group-hover/card:scale-100 lg:group-hover/card:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-2 top-2 flex items-start justify-between gap-2 sm:inset-x-2.5 sm:top-2.5">
          <div>{shownBadge && <Badge badge={shownBadge} />}</div>
          <WishlistButton
            product={product}
            className="pointer-events-auto lg:opacity-0 lg:group-focus-within/card:opacity-100 lg:group-hover/card:opacity-100 lg:data-[saved=true]:opacity-100"
          />
        </div>

        {/* Desktop quick add — slides up on hover or keyboard focus */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden translate-y-[calc(100%+12px)] gap-1.5 transition-transform duration-500 ease-out-soft group-focus-within/card:translate-y-0 lg:flex lg:group-hover/card:translate-y-0">
          <QuickAdd product={product} variant="bar" />
          <QuickViewButton product={product} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1.5 pt-3 pb-1.5 sm:px-2 sm:pt-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[10.5px] font-medium tracking-[0.14em] text-subtle uppercase">
            {categoryLabels[product.category]}
          </span>
          {product.rating && <Rating value={product.rating} compact className="shrink-0" />}
        </div>

        <h3 className="mt-1 font-display text-[14.5px] leading-snug font-medium tracking-[-0.02em] text-ink sm:text-[15.5px]">
          <Link href={href} className="underline-offset-4 hover:underline">
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <Price price={product.price} originalPrice={product.originalPrice} discount={product.discount} />
          <QuickAdd product={product} variant="icon" className="lg:hidden" />
        </div>
      </div>
    </article>
  );
}
