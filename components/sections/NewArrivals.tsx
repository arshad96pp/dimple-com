"use client";

import type { Product, ProductBadge } from "@/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCarousel } from "@/components/products/ProductCarousel";

const freshBadges: ProductBadge[] = ["New", "Just In", "Limited"];

/** Keep a product's own fresh badge; otherwise rotate through them. */
const badgeFor = (product: Product, index: number) =>
  product.badge && freshBadges.includes(product.badge) ? product.badge : freshBadges[index % freshBadges.length];

/** Alternate categories so the rail never shows two similar items side by side. */
function interleave(list: Product[]) {
  const buckets = new Map<string, Product[]>();
  for (const p of list) buckets.set(p.category, [...(buckets.get(p.category) ?? []), p]);
  const queues = [...buckets.values()];
  const mixed: Product[] = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) mixed.push(q.shift()!);
  return mixed;
}

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section aria-label="New arrivals" className="overflow-hidden py-20 sm:py-28">
      <Container>
        <Reveal>
          <ProductCarousel
            eyebrow="New arrivals"
            title="Fresh Finds"
            description="New little things worth discovering."
            products={interleave(products)}
            action={{ label: "View all", href: "/shop?collection=new" }}
            getBadge={badgeFor}
            label="New arrivals"
          />
        </Reveal>
      </Container>
    </section>
  );
}
