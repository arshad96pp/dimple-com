import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gift, RotateCcw, Truck } from "lucide-react";
import { categoryLabels } from "@/data/categories";
import { site } from "@/data/site";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { PurchasePanel } from "@/components/products/PurchasePanel";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product, 4);

  const details = [
    {
      title: "Details",
      body: `${product.description} Designed in our Bengaluru studio and quality-checked by hand before it ships.`,
    },
    {
      title: "Shipping",
      body: `Dispatched within 24 hours. Free shipping on orders above ${formatPrice(site.freeShippingThreshold)}; ₹79 flat below that. Most metros receive orders in 2–4 days.`,
    },
    {
      title: "Returns",
      body: "Changed your mind? Return unused items within 7 days for a full refund. We'll even send the pickup.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((i) => i.src),
    description: product.description,
    offers: { "@type": "Offer", priceCurrency: "INR", price: product.price, availability: "https://schema.org/InStock" },
    ...(product.rating && {
      aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="pt-6 pb-20 sm:pt-10 sm:pb-28">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted sm:mb-10">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span className="mx-2" aria-hidden>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-ink">
            {categoryLabels[product.category]}
          </Link>
          <span className="mx-2" aria-hidden>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <ProductGallery
            images={product.images}
            preload
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="lg:col-span-6"
          />

          <div className="lg:col-span-6 lg:pt-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-2">
                <span className="eyebrow">
                  {categoryLabels[product.category]}
                </span>
                {product.badge && <Badge badge={product.badge} />}
              </div>
              <h1 className="mt-3 text-4xl leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[3.4rem]">{product.name}</h1>
              {product.rating && <Rating value={product.rating} count={product.reviewCount} size="md" className="mt-4" />}
              <Price
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                size="lg"
                className="mt-6"
              />
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted">{product.description}</p>

              <div className="mt-8">
                <PurchasePanel product={product} />
              </div>

              <ul className="mt-8 grid gap-3 rounded-[20px] bg-shell p-5 text-sm text-ink-soft sm:grid-cols-3">
                <li className="flex items-center gap-2.5"><Truck className="size-4 text-berry" aria-hidden /> Ships in 24h</li>
                <li className="flex items-center gap-2.5"><Gift className="size-4 text-berry" aria-hidden /> Gift-ready</li>
                <li className="flex items-center gap-2.5"><RotateCcw className="size-4 text-berry" aria-hidden /> 7-day returns</li>
              </ul>

              <div className="mt-8 divide-y divide-line border-y border-line">
                {details.map((d, i) => (
                  <details key={d.title} open={i === 0} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base [&::-webkit-details-marker]:hidden">
                      {d.title}
                      <span aria-hidden className="text-xl leading-none font-normal transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">{d.body}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-shell py-20 sm:py-24">
          <Container>
            <SectionHeading id="related-title" eyebrow="You might also love" title="Goes Well With" />
            <ProductGrid products={related} columns={4} />
          </Container>
        </section>
      )}
    </>
  );
}
