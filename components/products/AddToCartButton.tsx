"use client";

import { useEffect, useState } from "react";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { actions } from "@/lib/store";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  variant?: "compact" | "full";
  className?: string;
}

export function AddToCartButton({ product, quantity = 1, variant = "compact", className }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(timer);
  }, [added]);

  const handleClick = () => {
    actions.addToCart(product, quantity);
    setAdded(true);
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-8 text-[15px] font-medium text-cream transition-[background-color,transform] duration-300 ease-out-soft hover:bg-ink-soft active:scale-[0.98]",
          added && "bg-mint text-ink hover:bg-mint",
          className,
        )}
      >
        {added ? <Check className="size-4" aria-hidden /> : <ShoppingBag className="size-4" aria-hidden />}
        {added ? "Added to bag" : "Add to bag"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Add ${product.name} to bag`}
      className={cn(
        "group/add relative inline-flex h-9 shrink-0 items-center gap-1.5 overflow-hidden rounded-full border border-ink/15 pl-2 pr-2 text-ink transition-[background-color,border-color,color,padding] duration-300 ease-out-soft hover:border-ink hover:bg-ink hover:text-cream active:scale-95 lg:hover:pr-3.5",
        added && "border-mint bg-mint hover:border-mint hover:bg-mint hover:text-ink",
        className,
      )}
    >
      <span className="grid size-5 place-items-center">
        {added ? <Check className="size-4" aria-hidden /> : <Plus className="size-4 transition-transform duration-300 group-hover/add:rotate-90" aria-hidden />}
      </span>
      <span className="hidden max-w-0 overflow-hidden text-[13px] font-medium whitespace-nowrap transition-[max-width] duration-300 ease-out-soft lg:inline lg:group-hover/add:max-w-12">
        Add
      </span>
    </button>
  );
}
