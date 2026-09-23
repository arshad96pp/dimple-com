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
}

// 10 products: 2 rows of 5 on xl, 4 on lg (8 shown), 3 on md and 2 on mobile (6 shown).
const LIMIT = 10;

export function FeaturedProducts({ products, tabs }: FeaturedProductsProps) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const byTab = useMemo(() => {
    const featuredFirst = [...products].sort((a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured));
    return Object.fromEntries(
      tabs.map((tab) => [
        tab.id,
        (tab.categories === "all"
          ? interleaveByCategory(featuredFirst.filter((p) => p.isFeatured))
          : featuredFirst.filter((p) => (tab.categories as string[]).includes(p.category))
        ).slice(0, LIMIT),
      ]),
    ) as Record<string, Product[]>;
  }, [products, tabs]);

  const visible = byTab[activeId];
  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const index = tabs.findIndex((t) => t.id === activeId);
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActiveId(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const shopHref = activeTab.categories === "all" ? "/shop" : `/shop?category=${activeTab.categories[0]}`;

  return (
    <section aria-labelledby="featured-title" className="pb-20 sm:pb-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            id="featured-title"
            eyebrow="Trending now"
            title="Little Things You'll Love"
            description="Our most-wished-for pieces this week — small, useful and very giftable."
            align="center"
            className="sm:mb-9"
          />
        </Reveal>

        <div className="-mx-4 mb-8 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:mb-11 sm:px-0">
          <div
            role="tablist"
            aria-label="Filter products"
            onKeyDown={onKeyDown}
            className="mx-auto flex w-max gap-1 rounded-full border border-line bg-shell p-1"
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
                    "h-9 shrink-0 rounded-full px-4 text-[13.5px] transition-[background-color,color,box-shadow] duration-300 sm:px-5",
                    selected
                      ? "bg-paper font-medium text-ink shadow-[0_2px_8px_-2px_rgba(37,37,37,0.12)]"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div id="featured-panel" role="tabpanel" aria-labelledby={`tab-${activeId}`}>
          <m.ul
            key={activeId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 [&>li:nth-child(n+7)]:hidden lg:[&>li:nth-child(n+7)]:flex lg:[&>li:nth-child(n+9)]:hidden xl:[&>li:nth-child(n+9)]:flex"
          >
            {visible.map((product) => (
              <li key={product.id} className="flex">
                <ProductCard product={product} />
              </li>
            ))}
          </m.ul>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Button href={shopHref} variant="outline" withArrow>
            Shop all {activeTab.id === "all" ? "products" : activeTab.label.toLowerCase()}
          </Button>
        </div>
      </Container>
    </section>
  );
}
