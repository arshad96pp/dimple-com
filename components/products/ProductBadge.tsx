import type { ProductBadge as Badge } from "@/types";
import { cn } from "@/lib/utils";

const tones: Record<Badge, string> = {
  New: "bg-mint text-ink",
  Sale: "bg-coral text-white",
  "Best Seller": "bg-butter text-ink",
  Limited: "bg-lavender text-ink",
  "Gift Pick": "bg-pink text-ink",
};

export function ProductBadge({ badge, className }: { badge: Badge; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-[11px] font-semibold tracking-wide",
        tones[badge],
        className,
      )}
    >
      {badge}
    </span>
  );
}
