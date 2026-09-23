import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md";
  /** Compact: one star and the number — used on product cards. */
  compact?: boolean;
  className?: string;
}

export function Rating({ value, count, size = "sm", compact, className }: RatingProps) {
  const icon = size === "sm" ? "size-3" : "size-4";

  if (compact) {
    return (
      <span className={cn("inline-flex items-center gap-1 text-[12px] text-muted", className)}>
        <Star className="size-3 fill-[#f0b43c] text-[#f0b43c]" strokeWidth={0} aria-hidden />
        <span className="sr-only">Rated</span>
        <span className="font-medium text-ink-soft">{value.toFixed(1)}</span>
        {count !== undefined && <span className="text-subtle">({count})</span>}
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="sr-only">Rated {value} out of 5</span>
      <span aria-hidden className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(icon, i < Math.round(value) ? "fill-[#f0b43c] text-[#f0b43c]" : "fill-sand text-sand")}
            strokeWidth={0}
          />
        ))}
      </span>
      {count !== undefined && (
        <span className="text-xs text-muted">
          {value.toFixed(1)} <span className="text-subtle">({count})</span>
        </span>
      )}
    </div>
  );
}
