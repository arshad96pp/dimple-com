"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { QuickAdd } from "./QuickAdd";
import { WishlistButton } from "./WishlistButton";

/** Quantity + add to bag + wishlist, shared by quick view and the product page. */
export function PurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} size="lg" min={1} />
      <QuickAdd product={product} quantity={quantity} variant="full" className="min-w-[180px]" />
      <WishlistButton product={product} variant="outline" />
    </div>
  );
}
