import type { Metadata } from "next";
import { getProducts } from "@/lib/catalog";
import { HeartDoodle, SparkleDoodle, StarDoodle } from "@/components/icons/Doodles";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/products/ProductGrid";

export const metadata: Metadata = { title: "Page not found" };

export default async function NotFound() {
  const picks = await getProducts({ collection: "best-sellers", limit: 4 });
  return (
    <>
      <Container className="relative flex flex-col items-center py-20 text-center sm:py-28">
        <div className="relative mb-8 select-none" aria-hidden>
          <span className="font-display text-[8rem] leading-none font-bold tracking-[-0.08em] text-ink sm:text-[12rem]">
            4<span className="inline-block -rotate-12 text-berry">0</span>4
          </span>
          <StarDoodle className="absolute -top-2 -left-8 size-10 animate-drift text-butter" />
          <HeartDoodle className="absolute right-[-1.5rem] bottom-6 size-8 animate-drift-slow text-[#ef9fb2]" />
          <SparkleDoodle className="absolute top-4 right-2 size-6 text-lavender" />
        </div>
        <h1 className="text-4xl sm:text-6xl">Oops. This page wandered off.</h1>
        <p className="mt-4 max-w-md text-lg text-muted">
          It might be hiding in a gift box somewhere. Let&apos;s get you back to the good stuff.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg" withArrow>
            Back Home
          </Button>
          <Button href="/shop" size="lg" variant="outline">
            Browse the shop
          </Button>
        </div>
      </Container>
      <section className="border-t border-line bg-shell py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-2xl sm:text-3xl">Meanwhile, these are very popular</h2>
          <ProductGrid products={picks} columns={4} />
        </Container>
      </section>
    </>
  );
}
