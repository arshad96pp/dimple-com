"use client";

import { useMemo } from "react";
import { useWishlist } from "@/lib/store";
import type { Product } from "@/types";
import { HeartDoodle, SparkleDoodle } from "@/components/icons/Doodles";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductGrid } from "@/components/products/ProductGrid";

export function WishlistContent({ products }: { products: Product[] }) {
  const ids = useWishlist();
  const saved = useMemo(() => products.filter((p) => ids.includes(p.id)), [products, ids]);

  if (saved.length === 0) {
    return (
      <EmptyState
        className="rounded-3xl bg-cream-100 py-20"
        illustration={
          <span className="relative grid size-28 place-items-center rounded-full bg-pink-100">
            <HeartDoodle className="size-12 text-coral" />
            <SparkleDoodle className="absolute top-3 right-3 size-5 text-ink" />
          </span>
        }
        title="No hearts yet"
        description="Tap the heart on anything you love and it'll wait for you here."
        action={
          <Button href="/shop" withArrow>
            Find something cute
          </Button>
        }
      />
    );
  }

  return <ProductGrid products={saved} columns={4} />;
}
