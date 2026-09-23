"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial, Tone } from "@/types";
import { cn, toneClasses } from "@/lib/utils";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const avatarTones: Tone[] = ["blush", "mint", "butter", "lavender", "sky", "peach"];

const initials = (name: string) =>
  name
    .split(/\s+|&/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section aria-labelledby="testimonials-title" className="overflow-hidden bg-shell py-20 sm:py-28">
      <Container>
        <Reveal>
          <Carousel
            label="Customer reviews"
            pagination
            slideClassName="w-[88%] pr-3 min-[480px]:w-[70%] sm:w-1/2 sm:pr-4 lg:w-1/3 lg:pr-5"
            renderHeader={(nav) => (
              <SectionHeading
                id="testimonials-title"
                eyebrow="Reviews"
                title="Happy Things, Happy People"
                description={
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex gap-0.5" aria-hidden>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="size-3.5 fill-[#f0b43c] text-[#f0b43c]" strokeWidth={0} />
                      ))}
                    </span>
                    4.9 average from 12,480 verified reviews
                  </span>
                }
                aside={nav}
              />
            )}
          >
            {testimonials.map((t, i) => (
              <figure key={t.id} className="flex w-full flex-col rounded-[24px] border border-line/80 bg-paper p-6 sm:p-7">
                <Rating value={t.rating} />
                <blockquote className="mt-5 flex-1 font-display text-[17px] leading-[1.5] tracking-[-0.02em] text-ink sm:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span
                    className={cn(
                      "relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full text-sm font-medium text-ink",
                      toneClasses[avatarTones[i % avatarTones.length]].bg,
                    )}
                  >
                    {t.avatar ? (
                      <Image src={t.avatar} alt="" fill sizes="44px" className="object-cover" />
                    ) : (
                      <span aria-hidden>{initials(t.name)}</span>
                    )}
                  </span>
                  <span className="min-w-0 text-sm leading-tight">
                    <span className="block font-medium text-ink">{t.name}</span>
                    <span className="mt-0.5 block truncate text-[13px] text-muted">
                      {t.location} · {t.product}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </Reveal>
      </Container>
    </section>
  );
}
