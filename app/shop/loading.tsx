import { Container } from "@/components/ui/Container";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <>
      <div className="border-b border-line bg-shell">
        <Container className="py-12 sm:py-16">
          <Skeleton className="mb-5 h-3 w-24" />
          <Skeleton className="h-14 w-2/3 max-w-md rounded-2xl sm:h-20" />
          <Skeleton className="mt-5 h-4 w-full max-w-sm" />
        </Container>
      </div>
      <Container className="py-8 sm:py-10">
        <div className="mb-10 flex gap-2 overflow-hidden">
          {Array.from({ length: 7 }, (_, i) => (
            <Skeleton key={i} className="h-9 w-24 shrink-0 rounded-full" />
          ))}
        </div>
        <ProductGridSkeleton />
      </Container>
    </>
  );
}
