"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { SortKey } from "@/lib/catalog";

const options: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export function SortSelect({ value }: { value: SortKey }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Sort products</span>
      <select
        value={value}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams);
          params.set("sort", e.target.value);
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }}
        className="h-10 appearance-none rounded-full border border-ink/15 bg-cream pr-10 pl-4 text-sm font-medium text-ink transition-colors hover:border-ink/40 focus:border-ink"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            Sort: {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 size-4" aria-hidden />
    </label>
  );
}
