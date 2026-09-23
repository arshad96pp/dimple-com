import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Wordmark: lowercase Sora with a blush "dimple" dot that hops on hover. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-baseline font-display text-[1.6rem] leading-none font-semibold tracking-[-0.06em] text-ink",
        className,
      )}
    >
      dimple
      <span
        aria-hidden
        className="ml-[0.06em] inline-block size-[0.3em] rounded-full bg-[#ef9fb2] transition-transform duration-500 ease-out-soft group-hover:-translate-y-1"
      />
    </Link>
  );
}
