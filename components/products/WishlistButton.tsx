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

export function WishlistButton({ product, className, variant = "floating" }: WishlistButtonProps) {
  const saved = useIsWishlisted(product.id);
  return (
    <button
      type="button"
      onClick={() => actions.toggleWishlist(product)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      className={cn(
        "group/wish grid place-items-center rounded-full transition-[background-color,transform,border-color] duration-300 ease-out-soft active:scale-90",
        variant === "floating"
          ? "size-9 bg-cream/85 backdrop-blur-sm hover:bg-cream"
          : "size-12 border border-ink/15 hover:border-ink",
        className,
      )}
    >
      <Heart
        aria-hidden
        className={cn(
          "size-[18px] transition-[color,fill,transform] duration-300 ease-out-soft group-hover/wish:scale-110",
          saved ? "fill-coral text-coral" : "text-ink",
        )}
        strokeWidth={1.8}
      />
    </button>
  );
}
