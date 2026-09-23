import { collageTiles, featuredTabs, recipients, trendingNotes } from "@/data/merchandising";
import { getCategories, getProducts, getProductsByIds, getProductsForRecipient, getSocialPosts, getTestimonials } from "@/lib/catalog";
import type { Product, RecipientTag } from "@/types";
import { BenefitsStrip } from "@/components/home/BenefitsStrip";
import { BestSellers } from "@/components/home/BestSellers";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { EditorialBanner } from "@/components/home/EditorialBanner";
import { EditorialCollage } from "@/components/home/EditorialCollage";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { GiftFinder } from "@/components/home/GiftFinder";
import { Hero } from "@/components/home/Hero";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Newsletter } from "@/components/home/Newsletter";
import { SocialGallery } from "@/components/home/SocialGallery";
import { Testimonials } from "@/components/home/Testimonials";
import { TrendingProducts } from "@/components/home/TrendingProducts";

export default async function HomePage() {
  const [categories, allProducts, newArrivals, bestSellers, trending, testimonials, socialPosts, giftPicks] =
    await Promise.all([
      getCategories(),
      getProducts(),
      getProducts({ collection: "new", limit: 10 }),
      getProducts({ collection: "best-sellers", sort: "rating", limit: 5 }),
      getProductsByIds(Object.keys(trendingNotes)),
      getTestimonials(),
      getSocialPosts(),
      Promise.all(recipients.map(async (r) => [r.id, await getProductsForRecipient(r.id, 4)] as const)),
    ]);

  return (
    <>
      <Hero />
      <BenefitsStrip />
      <CategoryShowcase categories={categories} />
      <FeaturedProducts products={allProducts} tabs={featuredTabs} />
      <NewArrivals products={newArrivals} />
      <EditorialBanner />
      <BestSellers products={bestSellers} />
      <GiftFinder recipients={recipients} picks={Object.fromEntries(giftPicks) as Record<RecipientTag, Product[]>} />
      <TrendingProducts products={trending} notes={trendingNotes} />
      <EditorialCollage tiles={collageTiles} />
      <SocialGallery posts={socialPosts} />
      <Testimonials testimonials={testimonials} />
      <Newsletter />
    </>
  );
}
