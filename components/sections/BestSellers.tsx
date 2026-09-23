import Image from "next/image";
import Link from "next/link";
import { categoryLabels } from "@/data/categories";
import type { Product } from "@/types";
import { categoryTone, cn, pad2, toneClasses } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { QuickAdd } from "@/components/products/QuickAdd";
import { WishlistButton } from "@/components/products/WishlistButton";

export function BestSellers({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="bestsellers-title" className="py-20 sm:py-28">
      <Container>
        <Reveal className="mb-12 grid gap-5 sm:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-3">Best sellers</p>
            <h2
              id="bestsellers-title"
              className="text-[2.75rem] leading-none tracking-[-0.05em] sm:text-6xl lg:text-[4.5rem]"
            >
              Most Loved
            </h2>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <p className="max-w-sm text-[15px] leading-relaxed text-muted sm:text-base">
              The four pieces that end up in the most bags — and the most thank-you messages.
            </p>
            <Button href="/shop?collection=best-sellers" variant="link" className="mt-4 text-sm" withArrow>
              Shop all best sellers
            </Button>
          </div>
        </Reveal>

        <ol className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
          {products.slice(0, 4).map((product, i) => (
            <Reveal as="li" key={product.id} delay={i * 0.08} className={cn("flex", i % 2 === 1 && "lg:mt-16")}>
              <RankedProduct product={product} rank={i + 1} />
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function RankedProduct({ product, rank }: { product: Product; rank: number }) {
  const href = `/products/${product.slug}`;
  const [image] = product.images;
  return (
    <article className="group flex w-full flex-col">
      <div className="mb-3 flex items-end gap-3 sm:mb-4">
        <span
          aria-label={`Number ${rank}`}
          className="font-display text-[2.6rem] leading-[0.8] font-light tracking-[-0.06em] text-ink sm:text-[3.5rem]"
        >
          {pad2(rank)}
        </span>
        <span aria-hidden className="mb-1.5 h-px flex-1 bg-ink/15" />
        <span className="mb-0.5 hidden text-[10.5px] tracking-[0.16em] text-subtle uppercase sm:block">
          {categoryLabels[product.category]}
        </span>
      </div>

      <div
        className={cn(
          "relative aspect-[3/4] overflow-hidden rounded-[20px] sm:rounded-[24px]",
          toneClasses[categoryTone[product.category]].soft,
        )}
      >
        <Link href={href} tabIndex={-1} aria-hidden className="absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 23vw, 46vw"
            style={{ objectPosition: image.position }}
            className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.04]"
          />
        </Link>
        <WishlistButton product={product} className="absolute top-2.5 right-2.5" />
      </div>

      <h3 className="mt-4 font-display text-base leading-snug tracking-[-0.025em] sm:text-lg">
        <Link href={href} className="underline-offset-4 hover:underline">
          {product.name}
        </Link>
      </h3>
      {product.rating && (
        <Rating value={product.rating} count={product.reviewCount} className="mt-1.5" />
      )}
      <div className="mt-3 flex items-center justify-between gap-2">
        <Price price={product.price} originalPrice={product.originalPrice} discount={product.discount} />
        <QuickAdd product={product} variant="icon" />
      </div>
    </article>
  );
}
