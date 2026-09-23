import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types";
import { cn, toneClasses } from "@/lib/utils";

export type CategoryCardVariant = "feature" | "tall" | "wide" | "chip";

interface CategoryCardProps {
  category: Category;
  variant: CategoryCardVariant;
  sizes: string;
}

/**
 * Photo cards carry their label on a white panel — no dark gradients.
 * `chip` is the compact pastel tile with a round cut-out image.
 */
export function CategoryCard({ category, variant, sizes }: CategoryCardProps) {
  const tone = toneClasses[category.tone];

  if (variant === "chip") {
    return (
      <Link
        href={category.href}
        className={cn(
          "group relative flex size-full flex-col justify-between overflow-hidden rounded-[22px] p-4 sm:p-5",
          tone.soft,
        )}
      >
        <span className="relative z-10 max-w-[70%] font-display text-[15px] leading-tight tracking-[-0.03em] text-ink transition-transform duration-500 ease-out-soft group-hover:-translate-y-1 sm:text-lg">
          {category.name}
        </span>
        <span className="relative z-10 flex items-center gap-1 text-[12px] text-muted">
          {category.productCount} pieces
          <ArrowUpRight
            aria-hidden
            className="size-3.5 transition-transform duration-500 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
        <span
          className={cn(
            "absolute -right-[8%] -bottom-[14%] aspect-square w-[58%] overflow-hidden rounded-full ring-[6px] ring-paper/70 sm:w-[52%]",
            tone.bg,
          )}
        >
          <Image
            src={category.image.src}
            alt={category.image.alt}
            fill
            sizes="(min-width: 1024px) 12vw, 28vw"
            style={{ objectPosition: category.image.position }}
            className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
        </span>
      </Link>
    );
  }

  const feature = variant === "feature";
  return (
    <Link
      href={category.href}
      className={cn("group relative flex size-full overflow-hidden rounded-[22px] sm:rounded-[26px]", tone.soft)}
    >
      <Image
        src={category.image.src}
        alt={category.image.alt}
        fill
        sizes={sizes}
        style={{ objectPosition: category.image.position }}
        className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.04]"
      />
      <span
        className={cn(
          "relative mt-auto flex w-full items-end justify-between gap-3 p-2.5 sm:p-3",
          feature && "lg:p-4",
        )}
      >
        <span
          className={cn(
            "flex min-w-0 flex-col rounded-[16px] bg-paper/92 px-3.5 py-2.5 backdrop-blur-md transition-transform duration-500 ease-out-soft group-hover:-translate-y-1 sm:px-4 sm:py-3",
            feature && "lg:px-5 lg:py-4",
          )}
        >
          {feature && <span className="eyebrow mb-1 hidden sm:block">{category.productCount} pieces</span>}
          <span
            className={cn(
              "font-display leading-tight tracking-[-0.03em] text-ink",
              feature ? "text-xl sm:text-2xl lg:text-[1.9rem]" : "text-[15px] sm:text-lg",
            )}
          >
            {category.name}
          </span>
          {feature && <span className="mt-1 hidden text-sm text-muted sm:block">{category.blurb}</span>}
        </span>
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-full bg-paper/92 text-ink backdrop-blur-md transition-transform duration-500 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-11"
        >
          <ArrowUpRight className="size-[18px]" strokeWidth={1.6} />
        </span>
      </span>
    </Link>
  );
}
