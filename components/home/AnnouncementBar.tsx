import { Sparkle } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { site } from "@/data/site";

const messages = [
  `Free shipping on orders above ${formatPrice(site.freeShippingThreshold)}`,
  "Gift-ready packaging on every order",
  "New: The Pastel Desk Edit is here",
  "Easy 7-day returns",
];

/** Thin rotating ticker — pure CSS marquee, pauses on hover. */
export function AnnouncementBar() {
  // Two identical halves so the -50% translate loops seamlessly on wide screens.
  const half = [...messages, ...messages];
  return (
    <div className="relative z-50 overflow-hidden bg-ink text-cream">
      <p className="sr-only">{messages[0]}</p>
      <div aria-hidden className="group flex h-9 items-center">
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {[...half, ...half].map((msg, i) => (
            <span
              key={i}
              className="flex items-center gap-6 px-6 text-[11px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase"
            >
              {msg}
              <Sparkle className="size-3 fill-butter text-butter" strokeWidth={0} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
