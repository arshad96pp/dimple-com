import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeartDoodle } from "@/components/icons/Doodles";
import { ProductCard } from "@/components/products/ProductCard";

export function BestSellers({ products }: { products: Product[] }) {
  const [top, ...rest] = products;
  if (!top) return null;

  return (
    <section aria-labelledby="bestsellers-title" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="self-start sm:grid sm:grid-cols-2 sm:items-end sm:gap-8 lg:sticky lg:top-24 lg:col-span-5 lg:block">
            <Reveal className="mb-10 sm:mb-0 lg:mb-10">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-coral uppercase">
                <span aria-hidden className="h-px w-6 bg-current" />
                Best sellers
              </p>
              <h2
                id="bestsellers-title"
                className="relative w-fit text-[2.6rem] leading-none font-semibold sm:text-6xl lg:text-7xl"
              >
                Most Loved
                <HeartDoodle className="absolute -top-3 -right-8 size-7 rotate-12 text-pink sm:-right-10 sm:size-9" />
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted sm:text-lg">
                The pieces our community keeps coming back for — ranked by how often they end up in someone&apos;s bag.
              </p>
              <Button href="/shop?collection=best-sellers" variant="outline" className="mt-7" withArrow>
                Shop best sellers
              </Button>
            </Reveal>

            <Reveal delay={0.1}>
              <ProductCard
                product={top}
                rank={1}
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 46vw, 92vw"
                className="rounded-3xl bg-pink-100 p-3 sm:p-4"
              />
            </Reveal>
          </div>

          <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:col-span-7 lg:mt-40">
            {rest.slice(0, 4).map((product, i) => (
              <Reveal as="li" key={product.id} delay={i * 0.06} className="flex">
                <ProductCard
                  product={product}
                  rank={i + 2}
                  sizes="(min-width: 1024px) 26vw, 46vw"
                  className="w-full"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
