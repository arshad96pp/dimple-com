"use client";

import { useEffect, useState } from "react";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { actions } from "@/lib/store";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface QuickAddProps {
  product: Product;
  quantity?: number;
  /**
   * `bar`  — slides up over the image on desktop hover.
   * `icon` — small round button for touch layouts.
   * `full` — the main button on product pages and quick view.
   */
  variant?: "bar" | "icon" | "full";
  className?: string;
}

export function QuickAdd({ product, quantity = 1, variant = "icon", className }: QuickAddProps) {
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

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Add ${product.name} to bag`}
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-full border border-ink/12 bg-paper text-ink transition-[background-color,border-color,transform] duration-300 active:scale-90",
          added && "border-mint bg-mint",
          className,
        )}
      >
        {added ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
      </button>
    );
  }

  const full = variant === "full";
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,transform] duration-300 ease-out-soft active:scale-[0.98]",
        full
          ? "h-[52px] flex-1 bg-ink px-8 text-[15px] text-cream hover:bg-ink-soft"
          : "h-10 w-full bg-paper/95 text-[13px] text-ink shadow-[0_8px_24px_-12px_rgba(37,37,37,0.35)] backdrop-blur-sm hover:bg-ink hover:text-cream",
        added && (full ? "bg-mint text-ink hover:bg-mint" : "bg-mint text-ink hover:bg-mint hover:text-ink"),
        className,
      )}
    >
      {added ? (
        <Check className="size-4" aria-hidden />
      ) : full ? (
        <ShoppingBag className="size-4" aria-hidden />
      ) : (
        <Plus className="size-4" aria-hidden />
      )}
      {added ? "Added" : "Add to bag"}
      {!full && <span className="sr-only">: {product.name}</span>}
    </button>
  );
}
