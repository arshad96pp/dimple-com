import Image from "next/image";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";

const tones = ["bg-pink-100", "bg-mint-100", "bg-butter-100", "bg-lavender-100"];

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section aria-labelledby="testimonials-title" className="overflow-hidden py-20 sm:py-28">
      <Container>
        <Reveal className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-coral uppercase">
              <span aria-hidden className="h-px w-6 bg-current" />
              Reviews
            </p>
            <h2 id="testimonials-title" className="text-[2.4rem] leading-none font-semibold sm:text-6xl">
              Made People Smile
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-display text-5xl font-semibold tracking-[-0.05em]">4.9</span>
            <div>
              <span className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-butter text-butter" strokeWidth={0} />
                ))}
              </span>
              <p className="mt-1 text-sm text-muted">
                <span className="sr-only">Rated 4.9 out of 5 </span>from 12,480 verified reviews
              </p>
            </div>
          </div>
        </Reveal>

        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0">
          {testimonials.map((t, i) => (
            <Reveal
              as="li"
              key={t.id}
              delay={i * 0.07}
              className={cn(
                "flex w-[84%] shrink-0 snap-start flex-col rounded-3xl p-6 sm:w-[46%] sm:p-7 lg:w-auto",
                tones[i % tones.length],
                i % 2 === 1 && "lg:mt-10",
              )}
            >
              <figure className="flex h-full flex-col">
                <Quote className="size-7 fill-ink text-ink" strokeWidth={0} aria-hidden />
                <blockquote className="mt-5 flex-1 font-display text-[17px] leading-[1.45] font-medium tracking-[-0.015em] text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <Rating value={t.rating} className="mt-6" />
                <figcaption className="mt-4 flex items-center gap-3 border-t border-ink/10 pt-4">
                  <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-cream-200">
                    <Image src={t.avatar} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                  <span className="min-w-0 text-sm leading-tight">
                    <span className="block font-semibold text-ink">{t.name}</span>
                    <span className="block text-muted">{t.location}</span>
                    <span className="mt-0.5 block text-xs text-subtle">Bought {t.product}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
