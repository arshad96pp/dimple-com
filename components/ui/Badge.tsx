import type { ProductBadge } from "@/types";
import { cn } from "@/lib/utils";

const tones: Record<ProductBadge, string> = {
  New: "bg-mint text-ink",
  "Just In": "bg-sky text-ink",
  Sale: "bg-blush text-berry",
  "Best Seller": "bg-butter text-ink",
  Limited: "bg-lavender text-ink",
  "Gift Pick": "bg-peach text-ink",
};

export function Badge({ badge, className }: { badge: ProductBadge; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center rounded-full px-2.5 text-[10px] font-semibold tracking-[0.12em] uppercase",
        tones[badge],
        className,
      )}
    >
      {badge}
    </span>
  );
}
