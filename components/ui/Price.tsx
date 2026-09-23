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
  const lg = size === "lg";
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      <span className={cn("font-display font-medium tracking-[-0.02em] text-ink", lg ? "text-2xl" : "text-[15px]")}>
        {formatPrice(price)}
      </span>
      {onSale && (
        <>
          <span className={cn("text-subtle line-through decoration-subtle/60", lg ? "text-base" : "text-[12px]")}>
            <span className="sr-only">Was </span>
            {formatPrice(originalPrice)}
          </span>
          {discount ? (
            <span className={cn("font-medium text-berry", lg ? "text-sm" : "text-[12px]")}>−{discount}%</span>
          ) : null}
        </>
      )}
    </div>
  );
}
