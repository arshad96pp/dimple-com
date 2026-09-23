import { cn, formatPrice } from "@/lib/utils";

interface PriceProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  size?: "sm" | "lg";
  className?: string;
}

export function Price({ price, originalPrice, discount, size = "sm", className }: PriceProps) {
  const onSale = originalPrice !== undefined && originalPrice > price;
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      <span className={cn("font-display font-semibold text-ink", size === "lg" ? "text-2xl" : "text-[15px]")}>
        {formatPrice(price)}
      </span>
      {onSale && (
        <>
          <span className={cn("text-subtle line-through", size === "lg" ? "text-base" : "text-xs")}>
            <span className="sr-only">Was </span>
            {formatPrice(originalPrice)}
          </span>
          {discount ? (
            <span className={cn("font-semibold text-coral-dark", size === "lg" ? "text-sm" : "text-xs")}>
              {discount}% off
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}
