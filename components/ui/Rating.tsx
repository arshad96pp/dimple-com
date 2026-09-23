import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
}

export function Rating({ value, count, size = "sm", className }: RatingProps) {
  const icon = size === "sm" ? "size-3" : "size-4";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="sr-only">Rated {value} out of 5</span>
      <span aria-hidden className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(icon, i < Math.round(value) ? "fill-ink text-ink" : "fill-line text-line")}
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
