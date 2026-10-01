import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Brand mark: the wordmark's diamond i-dot as a ribbon-tied gift. Shared with app/icon.svg. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect width="32" height="32" rx="8" fill="#252525" />
      <g transform="rotate(45 16 16)">
        <rect x="9" y="9" width="14" height="14" rx="2.2" fill="#fffcf7" />
        <rect x="15.2" y="9" width="1.6" height="14" fill="#252525" />
        <rect x="9" y="15.2" width="14" height="1.6" fill="#252525" />
      </g>
    </svg>
  );
}

/** Wordmark: lowercase Sora with a diamond dotting the "i" (a dotless ı plus an em-sized mark). */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center font-display text-[1.6rem] leading-none font-semibold tracking-tighter text-ink",
        className,
      )}
    >
      <span aria-hidden>
        toyyg
        <span className="relative ml-[0.02em] inline-block">
          ı
          <svg
            viewBox="0 0 10 10"
            className="absolute top-[0.03em] left-1/2 size-[0.21em] -translate-x-1/2"
          >
            <rect x="1.5" y="1.5" width="7" height="7" rx="1.3" transform="rotate(45 5 5)" fill="currentColor" />
          </svg>
        </span>
        ft
        <span className="ml-[0.08em] inline-block size-[0.2em] rounded-full bg-[#c97b84] align-middle" />
      </span>
    </Link>
  );
}
