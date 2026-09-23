"use client";

import { m } from "framer-motion";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { FeaturedTab } from "@/data/merchandising";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";

/** Round-robin across categories so "All" reads as a curated mix, not a sorted list. */
function interleaveByCategory(list: Product[]) {
  const buckets = new Map<string, Product[]>();
  for (const p of list) buckets.set(p.category, [...(buckets.get(p.category) ?? []), p]);
  const queues = [...buckets.values()];
  const mixed: Product[] = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) mixed.push(q.shift()!);
  return mixed;
}

interface FeaturedProductsProps {
  products: Product[];
  tabs: FeaturedTab[];
  limit?: number;
}

export function FeaturedProducts({ products, tabs, limit = 8 }: FeaturedProductsProps) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const byTab = useMemo(() => {
    const featuredFirst = [...products].sort((a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured));
    return Object.fromEntries(
      tabs.map((tab) => [
        tab.id,
        (tab.categories === "all"
          ? interleaveByCategory(featuredFirst)
          : featuredFirst.filter((p) => (tab.categories as string[]).includes(p.category))
        ).slice(0, limit),
      ]),
    ) as Record<string, Product[]>;
  }, [products, tabs, limit]);

  const visible = byTab[activeId];
  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const index = tabs.findIndex((t) => t.id === activeId);
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActiveId(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const shopHref =
    activeTab.categories === "all" ? "/shop" : `/shop?category=${activeTab.categories[0]}`;

  return (
    <section aria-labelledby="featured-title" className="bg-cream-100 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="featured-title"
            eyebrow="Featured"
            title={
              <>
                Find Something <span className="text-coral">You&apos;ll Love</span>
              </>
            }
            align="center"
            className="sm:mb-10"
          />
        </Reveal>

        <div
          role="tablist"
          aria-label="Filter featured products"
          onKeyDown={onKeyDown}
          className="no-scrollbar -mx-4 mb-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:mb-12 sm:justify-center sm:px-0"
        >
          {tabs.map((tab, i) => {
            const selected = tab.id === activeId;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls="featured-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                className={cn(
                  "h-10 shrink-0 rounded-full border px-5 text-sm font-medium transition-[background-color,color,border-color] duration-300",
                  selected
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/12 bg-cream text-ink-soft hover:border-ink/40 hover:text-ink",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div id="featured-panel" role="tabpanel" aria-labelledby={`tab-${activeId}`}>
          <m.ul
            key={activeId}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4 md:max-lg:[&>li:nth-child(n+7)]:hidden"
          >
            {visible.map((product) => (
              <li key={product.id} className="flex">
                <ProductCard product={product} className="w-full" />
              </li>
            ))}
          </m.ul>
        </div>

        <div className="mt-12 flex justify-center sm:mt-14">
          <Button href={shopHref} variant="outline" size="lg" withArrow>
            Shop all {activeTab.id === "all" ? "products" : activeTab.label.toLowerCase()}
          </Button>
        </div>
      </Container>
    </section>
  );
}
