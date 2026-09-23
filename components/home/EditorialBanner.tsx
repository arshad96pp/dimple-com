"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Gift, PenLine, Sparkles } from "lucide-react";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StarDoodle } from "@/components/icons/Doodles";

const perks = [
  { icon: Gift, label: "Gift wrap on request" },
  { icon: PenLine, label: "Handwritten notes" },
  { icon: Sparkles, label: "Picks under ₹999" },
];

export function EditorialBanner() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <section ref={ref} aria-labelledby="editorial-title" className="bg-pink-100">
      <div className="mx-auto grid max-w-[1560px] lg:grid-cols-2">
        <div className="relative h-[420px] overflow-hidden sm:h-[560px] lg:h-auto lg:min-h-[680px]">
          <m.div style={{ y }} className="absolute -inset-y-[9%] inset-x-0">
            <Image
              src={IMAGES.editorialGift}
              alt="A magenta gift box tied with gold ribbon, scattered with confetti"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_50%]"
            />
          </m.div>
          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-cream/90 px-3.5 py-2 text-xs font-semibold text-ink backdrop-blur-sm sm:bottom-8 sm:left-8">
            <span className="size-2 rounded-full bg-coral" aria-hidden />
            Hooray Confetti Box — ₹899
          </div>
        </div>

        <div className="relative flex items-center px-4 py-16 sm:px-10 sm:py-20 lg:px-16 xl:px-24">
          <StarDoodle className="absolute top-10 right-8 size-10 text-butter sm:top-14 sm:right-14 sm:size-14" />
          <Reveal>
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-coral-dark uppercase">The gifting edit</p>
            <h2 id="editorial-title" className="text-[2.6rem] leading-[0.98] font-semibold text-ink sm:text-6xl xl:text-7xl">
              Small Gifts.
              <br />
              <span className="text-coral-dark">Big</span> Reactions.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              From tiny surprises to everyday favorites, find something they&apos;ll actually want to keep.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {perks.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 rounded-full bg-cream px-3.5 py-2 text-[13px] font-medium text-ink-soft">
                  <Icon className="size-4 text-coral" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <Button href="/shop?category=gifts" size="lg" className="mt-10" withArrow>
              Explore Gift Picks
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
