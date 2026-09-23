import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "cream" }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-baseline font-display text-[1.65rem] leading-none font-bold tracking-[-0.06em]",
        tone === "ink" ? "text-ink" : "text-cream",
        className,
      )}
    >
      dimple
      <span
        aria-hidden
        className="ml-0.5 inline-block size-[0.32em] rounded-full bg-coral transition-transform duration-500 ease-out-soft group-hover:-translate-y-1.5"
      />
    </Link>
  );
}
