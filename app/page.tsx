import { heroSlides } from "@/data/heroSlides";
import { collageTiles, featuredTabs, recipients } from "@/data/merchandising";
import { getCategories, getProducts, getProductsForRecipient, getSocialPosts, getTestimonials } from "@/lib/catalog";
import type { Product, RecipientTag } from "@/types";
import { CategoryShowcase } from "@/components/categories/CategoryShowcase";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { BestSellers } from "@/components/sections/BestSellers";
import { EditorialCollage } from "@/components/sections/EditorialCollage";
import { EditorialGiftBanner } from "@/components/sections/EditorialGiftBanner";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { GiftFinder } from "@/components/sections/GiftFinder";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { Newsletter } from "@/components/sections/Newsletter";
import { SocialSection } from "@/components/sections/SocialSection";
import { Testimonials } from "@/components/sections/Testimonials";

export default async function HomePage() {
  const [categories, allProducts, newArrivals, bestSellers, testimonials, socialPosts, giftPicks] = await Promise.all([
    getCategories(),
    getProducts(),
    getProducts({ collection: "new", limit: 10 }),
    getProducts({ collection: "best-sellers", sort: "rating", limit: 4 }),
    getTestimonials(),
    getSocialPosts(),
    Promise.all(recipients.map(async (r) => [r.id, await getProductsForRecipient(r.id, 4)] as const)),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />
      <CategoryShowcase categories={categories} />
      <FeaturedProducts products={allProducts} tabs={featuredTabs} />
      <EditorialGiftBanner />
      <NewArrivals products={newArrivals} />
      <GiftFinder recipients={recipients} picks={Object.fromEntries(giftPicks) as Record<RecipientTag, Product[]>} />
      <BestSellers products={bestSellers} />
      <EditorialCollage tiles={collageTiles} />
      <SocialSection posts={socialPosts} />
      <Testimonials testimonials={testimonials} />
      <Newsletter />
    </>
  );
}
