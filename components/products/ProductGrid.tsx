import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4 | 5;
  className?: string;
}

const columnClasses = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-3 lg:grid-cols-4",
  5: "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
};

const sizeHints = {
  3: "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 46vw",
  4: "(min-width: 1024px) 23vw, (min-width: 768px) 30vw, 46vw",
  5: "(min-width: 1280px) 19vw, (min-width: 1024px) 23vw, (min-width: 768px) 30vw, 46vw",
};

export function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  return (
    <ul className={cn("grid grid-cols-2 gap-2.5 sm:gap-4 lg:gap-5", columnClasses[columns], className)}>
      {products.map((product) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} sizes={sizeHints[columns]} />
        </li>
      ))}
    </ul>
  );
}
