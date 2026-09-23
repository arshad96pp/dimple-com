"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, use, useDeferredValue, useState, type FormEvent } from "react";
import { ArrowUpRight, Search, TrendingUp, X } from "lucide-react";
import { categoryLabels } from "@/data/categories";
import { popularSearches } from "@/data/site";
import { searchProducts } from "@/lib/catalog";
import { actions, useUI } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { SparkleDoodle, StarDoodle } from "@/components/icons/Doodles";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { Sheet } from "@/components/ui/Sheet";

// Stable promise per query so `use()` doesn't refetch on every render.
const searchCache = new Map<string, Promise<Product[]>>();
function cachedSearch(query: string) {
  const key = query.trim().toLowerCase();
  let promise = searchCache.get(key);
  if (!promise) {
    promise = searchProducts(key, 8);
    searchCache.set(key, promise);
  }
  return promise;
}

export function SearchOverlay({ suggestions }: { suggestions: Product[] }) {
  const open = useUI((s) => s.searchOpen);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const hasQuery = deferredQuery.trim().length > 0;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    actions.closeSearch();
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <Sheet open={open} onClose={actions.closeSearch} label="Search" side="top" className="rounded-b-[28px]">
      <Container className="flex max-h-dvh flex-col py-5 sm:py-8">
        <form onSubmit={onSubmit} role="search" className="flex items-center gap-3 border-b-2 border-ink pb-3 sm:pb-4">
          <Search className="size-6 shrink-0 text-ink sm:size-7" aria-hidden />
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            data-autofocus
            type="search"
            autoComplete="off"
            placeholder="Search for something cute..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 min-w-0 flex-1 bg-transparent font-display text-2xl font-medium tracking-[-0.03em] text-ink outline-none placeholder:text-subtle sm:h-16 sm:text-4xl [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={actions.closeSearch}
            aria-label="Close search"
            className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-shell"
          >
            <X className="size-5" />
          </button>
        </form>

        <div className="-mx-4 mt-6 overflow-y-auto overscroll-contain px-4 pb-4 sm:mt-8">
          {hasQuery ? (
            <Suspense fallback={<ResultsSkeleton />}>
              <SearchResults query={deferredQuery} onPick={setQuery} />
            </Suspense>
          ) : (
            <IdleState suggestions={suggestions} onPick={setQuery} />
          )}
        </div>
      </Container>
    </Sheet>
  );
}

function PopularSearches({ onPick }: { onPick: (term: string) => void }) {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 eyebrow">
        <TrendingUp className="size-3.5" aria-hidden /> Popular searches
      </p>
      <ul className="flex flex-wrap gap-2">
        {popularSearches.map((term) => (
          <li key={term}>
            <button
              type="button"
              onClick={() => onPick(term)}
              className="rounded-full border border-ink/12 px-4 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
            >
              {term}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IdleState({ suggestions, onPick }: { suggestions: Product[]; onPick: (term: string) => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
      <PopularSearches onPick={onPick} />
      <div>
        <p className="mb-3 eyebrow">Loved this week</p>
        <ResultList products={suggestions} />
      </div>
    </div>
  );
}

function SearchResults({ query, onPick }: { query: string; onPick: (term: string) => void }) {
  const results = use(cachedSearch(query));

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="relative mb-5 grid size-20 place-items-center rounded-full bg-lavender-50">
          <Search className="size-7 text-ink" aria-hidden />
          <StarDoodle className="absolute -top-1 -right-1 size-5 text-butter" />
          <SparkleDoodle className="absolute bottom-0 -left-2 size-4 text-berry" />
        </div>
        <p className="text-lg font-semibold">Nothing cute for &ldquo;{query}&rdquo; — yet.</p>
        <p className="mt-1 mb-6 text-sm text-muted">Try a different word, or one of these favourites.</p>
        <PopularSearches onPick={onPick} />
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 eyebrow" aria-live="polite">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>
      <ResultList products={results} />
      <Link
        href={`/shop?q=${encodeURIComponent(query)}`}
        onClick={actions.closeSearch}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
      >
        See all results <ArrowUpRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

function ResultList({ products }: { products: Product[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {products.map((product) => (
        <li key={product.id}>
          <Link
            href={`/products/${product.slug}`}
            onClick={actions.closeSearch}
            className="group flex items-center gap-3.5 rounded-2xl p-2 transition-colors duration-300 hover:bg-shell"
          >
            <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-sand">
              <Image
                src={product.images[0].src}
                alt=""
                fill
                sizes="64px"
                className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-110"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-display text-[15px] font-medium text-ink">{product.name}</span>
              <span className="text-xs text-muted">{categoryLabels[product.category]}</span>
            </span>
            <span className="pr-2 font-display text-sm font-medium">{formatPrice(product.price)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ResultsSkeleton() {
  return (
    <div role="status" aria-label="Searching" className="grid gap-2 sm:grid-cols-2">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex items-center gap-3.5 p-2">
          <Skeleton className="size-16 shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
