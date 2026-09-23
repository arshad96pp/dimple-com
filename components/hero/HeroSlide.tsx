"use client";

import Image from "next/image";
import { m, type Variants } from "framer-motion";
import type { HeroSlide as HeroSlideData } from "@/types";
import { cn, formatPrice, toneClasses } from "@/lib/utils";
import { HeartDoodle, SparkleDoodle, StarDoodle } from "@/components/icons/Doodles";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

const copy: Variants = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const settle: Variants = {
  hidden: { scale: 0.96, transition: { duration: 0.3 } },
  show: { scale: 1, transition: { duration: 1.1, ease } },
};

const pop: Variants = {
  hidden: { opacity: 0, y: 14, transition: { duration: 0.25 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.35, ease } },
};

interface HeroSlideProps {
  slide: HeroSlideData;
  index: number;
  active: boolean;
}

/**
 * One campaign: copy on the left, an editorial composition on the right.
 * On mobile the copy comes first and the composition sits underneath in a
 * fixed-ratio box, so the product is always fully in frame.
 */
export function HeroSlide({ slide, index, active }: HeroSlideProps) {
  const Heading = index === 0 ? "h1" : "h2";
  const state = active ? "show" : "hidden";
  const tone = toneClasses[slide.tone];
  // Mirror every other slide so consecutive campaigns don't feel templated.
  const flip = index % 2 === 1;

  return (
    <div className={cn("relative h-full overflow-hidden", tone.soft)}>
      <div className="mx-auto grid h-full max-w-[1320px] items-center gap-6 px-5 pt-10 pb-20 sm:px-10 sm:pt-14 md:pb-24 lg:grid-cols-12 lg:gap-8 lg:px-14 lg:py-0">
        {/* Copy */}
        <m.div variants={copy} initial="hidden" animate={state} className="relative z-10 lg:col-span-5">
          <m.p variants={rise} className="eyebrow flex items-center gap-2.5 text-ink-soft">
            <span aria-hidden className={cn("size-1.5 rounded-full", tone.bg, "ring-4 ring-paper/70")} />
            {slide.eyebrow}
          </m.p>
          <Heading className="mt-4 text-[2.5rem] leading-[1.02] tracking-[-0.05em] text-ink min-[400px]:text-[2.85rem] sm:mt-5 sm:text-6xl lg:text-[4rem] xl:text-[4.6rem]">
            <m.span variants={rise} className="block">
              {slide.title}
            </m.span>
          </Heading>
          <m.p variants={rise} className="mt-4 max-w-[26rem] text-[15px] leading-relaxed text-ink-soft sm:mt-6 sm:text-[17px]">
            {slide.description}
          </m.p>
          <m.div variants={rise} className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-3 sm:mt-9 sm:gap-x-3">
            <Button href={slide.primary.href} size="lg" withArrow tabIndex={active ? undefined : -1} className="h-11 px-5 text-sm sm:h-[52px] sm:px-8 sm:text-[15px]">
              {slide.primary.label}
            </Button>
            {slide.secondary && (
              <Button
                href={slide.secondary.href}
                size="lg"
                variant="soft"
                className="h-11 px-5 text-sm max-[359px]:hidden sm:h-[52px] sm:px-8 sm:text-[15px]"
                tabIndex={active ? undefined : -1}
              >
                {slide.secondary.label}
              </Button>
            )}
          </m.div>
        </m.div>

        {/* Composition */}
        <div className="relative lg:col-span-7 lg:h-full">
          <div className="relative mx-auto aspect-[6/5] w-full max-w-[480px] sm:aspect-[5/4] lg:absolute lg:inset-y-10 lg:right-0 lg:aspect-auto lg:w-[92%] lg:max-w-[620px]">
            {/* Sun disc behind the arch */}
            <m.span
              aria-hidden
              variants={settle}
              initial="hidden"
              animate={state}
              className={cn(
                "absolute top-1/2 aspect-square w-[66%] -translate-y-1/2 rounded-full",
                tone.deep,
                flip ? "left-[8%]" : "right-[6%]",
              )}
            />

            {/* Main image — arch crop keeps the subject centred at any width */}
            <m.div
              variants={settle}
              initial="hidden"
              animate={state}
              className={cn(
                "absolute top-1/2 aspect-[4/5] w-[56%] -translate-y-1/2 overflow-hidden rounded-t-full rounded-b-[28px] bg-paper shadow-[0_40px_80px_-40px_rgba(37,37,37,0.35)]",
                flip ? "left-[22%]" : "right-[18%]",
              )}
            >
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                preload={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 300px, 56vw"
                style={{ objectPosition: slide.image.position }}
                className="object-cover"
              />
            </m.div>

            {/* Polaroid product card */}
            <m.figure
              variants={pop}
              initial="hidden"
              animate={state}
              className={cn("absolute bottom-[2%] w-[34%] min-w-[118px] sm:w-[30%]", flip ? "right-[4%]" : "left-[4%]")}
            >
              <div
                className={cn(
                  "animate-drift-slow rounded-[18px] bg-paper p-1.5 pb-2.5 shadow-[0_24px_50px_-24px_rgba(37,37,37,0.35)] sm:p-2 sm:pb-3",
                  flip ? "[--drift-rotate:4deg]" : "[--drift-rotate:-4deg]",
                )}
              >
                <div className={cn("relative aspect-square overflow-hidden rounded-[13px]", tone.soft)}>
                  <Image
                    src={slide.accents[0].src}
                    alt={slide.accents[0].alt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(min-width: 1024px) 200px, 36vw"
                    style={{ objectPosition: slide.accents[0].position }}
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 flex items-baseline justify-between gap-2 px-1 leading-tight">
                  <span className="truncate text-[11px] font-medium text-ink sm:text-[12.5px]">{slide.tag.label}</span>
                  <span className="shrink-0 text-[11px] text-muted sm:text-[12px]">{formatPrice(slide.tag.price)}</span>
                </figcaption>
              </div>
            </m.figure>

            {/* Round accent */}
            <m.div
              variants={pop}
              initial="hidden"
              animate={state}
              className={cn("absolute top-[4%] w-[22%] sm:w-[20%]", flip ? "left-[6%]" : "right-[6%]")}
            >
              <div className="relative aspect-square animate-drift overflow-hidden rounded-full bg-paper ring-[5px] ring-paper shadow-[0_20px_40px_-20px_rgba(37,37,37,0.35)] [animation-delay:-3s]">
                <Image
                  src={slide.accents[1].src}
                  alt={slide.accents[1].alt}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 140px, 23vw"
                  style={{ objectPosition: slide.accents[1].position }}
                  className="object-cover"
                />
              </div>
            </m.div>

            {/* Tiny hand-drawn marks — slow, few, decorative */}
            <m.div variants={pop} initial="hidden" animate={state} aria-hidden>
              <StarDoodle
                className={cn(
                  "absolute top-[2%] size-6 animate-drift text-ink sm:size-8",
                  flip ? "right-[18%]" : "left-[18%]",
                )}
              />
              <SparkleDoodle
                className={cn("absolute bottom-[30%] size-5 text-ink/70 sm:size-6", flip ? "left-[8%]" : "right-[6%]")}
              />
              <HeartDoodle
                className={cn(
                  "absolute top-[46%] size-4 animate-drift-slow text-paper [--drift-rotate:-12deg] sm:size-5",
                  flip ? "right-[12%]" : "left-[14%]",
                )}
              />
            </m.div>
          </div>
        </div>
      </div>
    </div>
  );
}
