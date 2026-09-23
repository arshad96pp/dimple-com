"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductImage[];
  sizes: string;
  preload?: boolean;
  className?: string;
}

export function ProductGallery({ images, sizes, preload, className }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200">
        {images.map((image, i) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            preload={preload && i === 0}
            style={{ objectPosition: image.position }}
            aria-hidden={i !== active}
            className={cn(
              "object-cover transition-[opacity,transform] duration-500 ease-out-soft",
              i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
            )}
          />
        ))}
        <span className="sr-only" aria-live="polite">
          Showing image {active + 1} of {images.length}: {current.alt}
        </span>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2" role="group" aria-label="Choose image">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === active}
              className={cn(
                "relative size-16 overflow-hidden rounded-xl bg-cream-200 ring-2 ring-offset-2 ring-offset-cream transition-[box-shadow,opacity] duration-300",
                i === active ? "ring-ink" : "opacity-70 ring-transparent hover:opacity-100",
              )}
            >
              <Image src={image.src} alt="" fill sizes="64px" style={{ objectPosition: image.position }} className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
