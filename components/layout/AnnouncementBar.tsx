import { announcements } from "@/data/site";

/** Thin pastel ticker — pure CSS marquee, pauses on hover. */
export function AnnouncementBar() {
  // Two identical halves so the -50% translate loops seamlessly on wide screens.
  const half = [...announcements, ...announcements];
  return (
    <div className="relative z-50 overflow-hidden border-b border-ink/[0.04] bg-blush-50 text-ink-soft">
      <p className="sr-only">{announcements.slice(0, 2).join(" · ")}</p>
      <div aria-hidden className="group flex h-8 items-center">
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {[...half, ...half].map((msg, i) => (
            <span
              key={i}
              className="flex items-center gap-7 pr-7 text-[10.5px] font-medium tracking-[0.18em] whitespace-nowrap uppercase"
            >
              {msg}
              <span className="size-1 rounded-full bg-[#ef9fb2]" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
