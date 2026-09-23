"use client";

import { Eye } from "lucide-react";
import { actions } from "@/lib/store";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export function QuickViewButton({ product, className }: { product: Product; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => actions.openQuickView(product)}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full bg-cream/95 px-4 text-[13px] font-medium text-ink backdrop-blur-sm transition-colors duration-300 hover:bg-ink hover:text-cream",
        className,
      )}
    >
      <Eye className="size-4" aria-hidden />
      Quick view
      <span className="sr-only">of {product.name}</span>
    </button>
  );
}
