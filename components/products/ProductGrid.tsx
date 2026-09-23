import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-3 lg:grid-cols-4",
};

const sizeHints = {
  2: "(min-width: 640px) 40vw, 46vw",
  3: "(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 46vw",
  4: "(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw",
};

export function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12", columnClasses[columns], className)}>
      {products.map((product) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} sizes={sizeHints[columns]} className="w-full" />
        </li>
      ))}
    </ul>
  );
}
