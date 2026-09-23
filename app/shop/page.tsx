import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SearchX } from "lucide-react";
import { categoryLabels } from "@/data/categories";
import { getProducts, searchProducts, type Collection, type SortKey } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { CategorySlug } from "@/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SortSelect } from "@/components/shop/SortSelect";

const collections: Record<Collection, { title: string; blurb: string }> = {
  new: { title: "New Arrivals", blurb: "Fresh from the studio — the newest little things to land in the shop." },
  "best-sellers": { title: "Best Sellers", blurb: "The ones people can't stop gifting (and quietly keeping)." },
  sale: { title: "On Sale", blurb: "Same joy, softer price." },
};

const sortKeys: SortKey[] = ["featured", "newest", "price-asc", "price-desc", "rating"];

type Params = { category?: CategorySlug; collection?: Collection; sort: SortKey; q?: string };

function parseParams(raw: Record<string, string | string[] | undefined>): Params {
  const pick = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string) : undefined);
  const category = pick("category");
  const collection = pick("collection");
  const sort = pick("sort");
  return {
    category: category && category in categoryLabels ? (category as CategorySlug) : undefined,
    collection: collection && collection in collections ? (collection as Collection) : undefined,
    sort: sort && sortKeys.includes(sort as SortKey) ? (sort as SortKey) : "featured",
    q: pick("q")?.slice(0, 80),
  };
}

function describe({ category, collection, q }: Params) {
  if (q) return { title: `“${q}”`, blurb: "Search results from across the shop." };
  if (collection) return collections[collection];
  if (category) return { title: categoryLabels[category], blurb: "Handpicked, gift-ready and just a little bit extra." };
  return { title: "Shop Everything", blurb: "Every cute, useful, giftable thing we make — all in one place." };
}

export async function generateMetadata({ searchParams }: PageProps<"/shop">): Promise<Metadata> {
  const { title, blurb } = describe(parseParams(await searchParams));
  return { title: title.replace(/[“”]/g, ""), description: blurb };
}

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const params = parseParams(await searchParams);
  const { title, blurb } = describe(params);
  const products = params.q
    ? await searchProducts(params.q, 100)
    : await getProducts({ category: params.category, collection: params.collection, sort: params.sort });

  const filterLinks = [
    { label: "All", href: "/shop", active: !params.category && !params.collection && !params.q },
    { label: "New", href: "/shop?collection=new", active: params.collection === "new" },
    { label: "Best Sellers", href: "/shop?collection=best-sellers", active: params.collection === "best-sellers" },
    ...Object.entries(categoryLabels).map(([slug, label]) => ({
      label,
      href: `/shop?category=${slug}`,
      active: params.category === slug,
    })),
  ];

  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-blush-50 to-cream">
        <Container className="py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2" aria-hidden>/</span>
            <span className="text-ink">Shop</span>
          </nav>
          <h1 className="text-[2.6rem] leading-none tracking-[-0.05em] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-4 max-w-lg text-base text-muted sm:text-lg">{blurb}</p>
        </Container>
      </section>

      <Container className="py-8 sm:py-10">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Filter products" className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <ul className="flex gap-2 lg:flex-wrap">
              {filterLinks.map((f) => (
                <li key={f.href}>
                  <Link
                    href={f.href}
                    aria-current={f.active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors duration-300",
                      f.active ? "border-ink/80 bg-paper text-ink shadow-[0_2px_8px_-2px_rgba(37,37,37,0.12)]" : "border-ink/10 text-muted hover:border-ink/30 hover:text-ink",
                    )}
                  >
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex shrink-0 items-center justify-between gap-4 lg:justify-end">
            <p className="text-sm text-muted" aria-live="polite">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
            {!params.q && (
              <Suspense>
                <SortSelect value={params.sort} />
              </Suspense>
            )}
          </div>
        </div>

        {products.length ? (
          <ProductGrid products={products} columns={5} />
        ) : (
          <EmptyState
            illustration={
              <span className="grid size-24 place-items-center rounded-full bg-lavender-50">
                <SearchX className="size-9 text-ink" strokeWidth={1.6} />
              </span>
            }
            title="Nothing here… yet"
            description="We couldn't find anything matching that. Try another search or browse our favourites."
            action={
              <Button href="/shop" withArrow>
                Browse everything
              </Button>
            }
            className="py-20"
          />
        )}
      </Container>
    </>
  );
}
