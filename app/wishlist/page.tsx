import type { Metadata } from "next";
import { getProducts } from "@/lib/catalog";
import { Container } from "@/components/ui/Container";
import { WishlistContent } from "./WishlistContent";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "The little things you've saved for later.",
  robots: { index: false },
};

export default async function WishlistPage() {
  const products = await getProducts();
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-[2.6rem] leading-none font-semibold sm:text-6xl">Your Wishlist</h1>
      <p className="mt-3 mb-10 text-muted sm:mb-14">Saved on this device. Hearts are free — use them generously.</p>
      <WishlistContent products={products} />
    </Container>
  );
}
