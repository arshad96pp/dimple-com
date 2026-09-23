"use client";

import { Heart } from "lucide-react";
import { actions, useIsWishlisted } from "@/lib/store";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  variant?: "floating" | "outline";
}

/**
 * Heart toggle. Exposes `data-saved` so a card can hide it until hover
 * while keeping saved items visible (`data-[saved=true]:opacity-100`).
 */
export function WishlistButton({ product, className, variant = "floating" }: WishlistButtonProps) {
  const saved = useIsWishlisted(product.id);
  return (
    <button
      type="button"
      onClick={() => actions.toggleWishlist(product)}
      aria-pressed={saved}
      data-saved={saved}
      aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      className={cn(
        "group/wish grid place-items-center rounded-full transition-[background-color,transform,border-color,opacity] duration-300 ease-out-soft active:scale-90",
        variant === "floating"
          ? "size-9 bg-paper/90 backdrop-blur-sm hover:bg-paper"
          : "size-[52px] border border-ink/12 hover:border-ink/40",
        className,
      )}
    >
      <Heart
        aria-hidden
        className={cn(
          "size-[17px] transition-[color,fill,transform] duration-300 ease-out-soft group-hover/wish:scale-110",
          saved ? "fill-berry text-berry" : "text-ink",
        )}
        strokeWidth={1.7}
      />
    </button>
  );
}
