import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCarousel } from "@/components/products/ProductCarousel";

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section aria-label="New arrivals" className="overflow-hidden py-20 sm:py-28">
      <Container>
        <Reveal>
          <ProductCarousel
            eyebrow="New arrivals"
            title="Freshly Added"
            description="Just unpacked and already a little bit famous."
            products={products}
            action={{ label: "View all", href: "/shop?collection=new" }}
            label="new arrivals"
          />
        </Reveal>
      </Container>
    </section>
  );
}
