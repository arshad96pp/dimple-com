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
      aria-label={`Quick view: ${product.name}`}
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full bg-paper/95 text-ink shadow-[0_8px_24px_-12px_rgba(37,37,37,0.35)] backdrop-blur-sm transition-colors duration-300 hover:bg-ink hover:text-cream",
        className,
      )}
    >
      <Eye className="size-4" aria-hidden />
    </button>
  );
}
