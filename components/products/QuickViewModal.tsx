"use client";

import Link from "next/link";
import { ArrowRight, Gift, X } from "lucide-react";
import { categoryLabels } from "@/data/categories";
import { actions, useUI } from "@/lib/store";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { Sheet } from "@/components/ui/Sheet";
import { Badge } from "@/components/ui/Badge";
import { ProductGallery } from "./ProductGallery";
import { PurchasePanel } from "./PurchasePanel";

export function QuickViewModal() {
  const product = useUI((s) => s.quickView);

  return (
    <Sheet
      open={product !== null}
      onClose={actions.closeQuickView}
      label={product ? `Quick view: ${product.name}` : "Quick view"}
      side="center"
      className="overflow-hidden rounded-3xl"
    >
      {product && (
        <div className="relative overflow-y-auto overscroll-contain">
          <button
            type="button"
            onClick={actions.closeQuickView}
            aria-label="Close quick view"
            data-autofocus
            className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-paper/90 backdrop-blur-sm hover:bg-paper"
          >
            <X className="size-5" />
          </button>
          <div className="grid gap-6 p-4 sm:grid-cols-2 sm:gap-8 sm:p-6">
            <ProductGallery key={product.id} images={product.images} sizes="(min-width: 640px) 440px, 90vw" />
            <div className="flex flex-col sm:py-4 sm:pr-4">
              <div className="flex items-center gap-2">
                <span className="eyebrow">
                  {categoryLabels[product.category]}
                </span>
                {product.badge && <Badge badge={product.badge} />}
              </div>
              <h2 className="mt-3 text-3xl leading-tight sm:text-[2.1rem]">{product.name}</h2>
              {product.rating && <Rating value={product.rating} count={product.reviewCount} className="mt-3" />}
              <Price
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                size="lg"
                className="mt-5"
              />
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{product.description}</p>
              <div className="mt-6">
                <PurchasePanel product={product} />
              </div>
              <p className="mt-5 flex items-center gap-2 text-[13px] text-muted">
                <Gift className="size-4 text-berry" aria-hidden /> Free gift wrap &amp; a handwritten note, on request.
              </p>
              <Link
                href={`/products/${product.slug}`}
                onClick={actions.closeQuickView}
                className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold"
              >
                View full details
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      )}
    </Sheet>
  );
}
