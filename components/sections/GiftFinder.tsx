"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import type { Recipient } from "@/data/merchandising";
import type { Product, RecipientTag } from "@/types";
import { cn, toneClasses } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";

interface GiftFinderProps {
  recipients: Recipient[];
  picks: Record<RecipientTag, Product[]>;
}

export function GiftFinder({ recipients, picks }: GiftFinderProps) {
  const [selected, setSelected] = useState<RecipientTag>(recipients[0].id);
  const current = recipients.find((r) => r.id === selected) ?? recipients[0];

  return (
    <section id="gift-finder" aria-labelledby="giftfinder-title" className="scroll-mt-20 bg-shell py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="giftfinder-title"
            eyebrow="Gift finder"
            title="Who Are You Shopping For?"
            description="Pick a person, we'll do the thinking. (You can take the credit.)"
            align="center"
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div role="group" aria-label="Choose who the gift is for" className="grid grid-cols-3 gap-x-2.5 gap-y-5 sm:gap-x-4 lg:grid-cols-6">
            {recipients.map((recipient) => {
              const active = recipient.id === selected;
              return (
                <button
                  key={recipient.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(recipient.id)}
                  className="group flex flex-col items-center text-center focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      "relative block aspect-[4/5] w-full overflow-hidden rounded-[18px] ring-offset-4 ring-offset-shell transition-[box-shadow,transform] duration-500 ease-out-soft group-focus-visible:ring-2 group-focus-visible:ring-ink sm:rounded-[22px]",
                      toneClasses[recipient.tone].soft,
                      active ? "ring-[1.5px] ring-ink" : "group-hover:-translate-y-1",
                    )}
                  >
                    <Image
                      src={recipient.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 16vw, 31vw"
                      style={{ objectPosition: recipient.image.position }}
                      className={cn(
                        "object-cover transition-[transform,opacity] duration-700 ease-out-soft group-hover:scale-[1.04]",
                        !active && "opacity-90 group-hover:opacity-100",
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-2 right-2 grid size-6 place-items-center rounded-full bg-paper text-ink transition-[opacity,transform] duration-300 sm:top-2.5 sm:right-2.5 sm:size-7",
                        active ? "scale-100 opacity-100" : "scale-75 opacity-0",
                      )}
                    >
                      <Check className="size-3.5" strokeWidth={2.2} />
                    </span>
                  </span>
                  <span
                    className={cn(
                      "mt-3 font-display text-[13px] leading-tight tracking-[-0.02em] transition-colors sm:text-base",
                      active ? "text-ink" : "text-ink-soft",
                    )}
                  >
                    {recipient.label}
                  </span>
                  <span className="mt-0.5 hidden text-[12.5px] text-muted sm:block">{recipient.note}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16" aria-live="polite">
          <div className="mb-6 flex items-end justify-between gap-4">
            <p className="font-display text-xl tracking-[-0.03em] sm:text-2xl">
              {current.id === "just-because" ? "Picked just because" : `Picked ${current.label.toLowerCase()}`}
            </p>
            <p className="text-sm text-muted">{picks[selected].length} ideas</p>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <m.ul
              key={selected}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 lg:gap-5"
            >
              {picks[selected].map((product) => (
                <li key={product.id} className="flex">
                  <ProductCard product={product} sizes="(min-width: 1024px) 23vw, 46vw" />
                </li>
              ))}
            </m.ul>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
