import { Award, Eye } from "lucide-react";
import type { TrendingNote } from "@/data/merchandising";
import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCarousel } from "@/components/products/ProductCarousel";

function Note({ note }: { note: TrendingNote }) {
  if (note.kind === "low-stock") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-coral-dark">
        <span className="relative flex size-1.5" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-coral opacity-60 [animation-duration:2s]" />
          <span className="relative size-1.5 rounded-full bg-coral" />
        </span>
        {note.label}
      </span>
    );
  }
  const Icon = note.kind === "views" ? Eye : Award;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <Icon className="size-3.5 shrink-0" aria-hidden />
      <span className="line-clamp-1">{note.label}</span>
    </span>
  );
}

export function TrendingProducts({ products, notes }: { products: Product[]; notes: Record<string, TrendingNote> }) {
  return (
    <section aria-label="Trending now" className="overflow-hidden py-20 sm:py-28">
      <Container>
        <Reveal>
          <ProductCarousel
            eyebrow="Trending"
            title="Trending Right Now"
            description="What everyone's quietly adding to their bags this week."
            products={products}
            action={{ label: "Shop trending", href: "/shop?sort=rating" }}
            getNote={(p) => (notes[p.id] ? <Note note={notes[p.id]} /> : null)}
            label="trending products"
          />
        </Reveal>
      </Container>
    </section>
  );
}
