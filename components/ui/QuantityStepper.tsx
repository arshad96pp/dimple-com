"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  label,
  size = "sm",
  min = 0,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
  size?: "sm" | "lg";
  min?: number;
}) {
  const btn = cn(
    "grid place-items-center rounded-full transition-colors hover:bg-shell disabled:opacity-30",
    size === "sm" ? "size-8" : "size-11",
  );
  return (
    <div className={cn("inline-flex items-center rounded-full border border-ink/12", size === "lg" && "h-[52px] px-1")}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease quantity of ${label}`}>
        <Minus className="size-3.5" aria-hidden />
      </button>
      <span aria-live="polite" className={cn("text-center text-sm font-semibold tabular-nums", size === "sm" ? "w-7" : "w-9")}>
        <span className="sr-only">Quantity </span>
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= 20} aria-label={`Increase quantity of ${label}`}>
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}
