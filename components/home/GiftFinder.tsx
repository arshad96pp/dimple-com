"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { Coffee, Flower2, HeartHandshake, PencilRuler, Sparkles, ToyBrick, type LucideIcon } from "lucide-react";
import type { Recipient } from "@/data/merchandising";
import type { Product, RecipientTag } from "@/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";

const icons: Record<RecipientTag, LucideIcon> = {
  her: Flower2,
  him: Coffee,
  besties: HeartHandshake,
  kids: ToyBrick,
  desk: PencilRuler,
  "just-because": Sparkles,
};

interface GiftFinderProps {
  recipients: Recipient[];
  picks: Record<RecipientTag, Product[]>;
}

export function GiftFinder({ recipients, picks }: GiftFinderProps) {
  const [selected, setSelected] = useState<RecipientTag>(recipients[0].id);
  const current = recipients.find((r) => r.id === selected) ?? recipients[0];

  return (
    <section aria-labelledby="giftfinder-title" className="bg-cream-100 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="giftfinder-title"
            eyebrow="Gift finder"
            title="Who Are You Shopping For?"
            description="Tell us who it's for and we'll do the thinking. (You can take the credit.)"
            align="center"
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div role="group" aria-label="Choose a recipient" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
            {recipients.map((recipient) => {
              const Icon = icons[recipient.id];
              const active = recipient.id === selected;
              return (
                <button
                  key={recipient.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(recipient.id)}
                  className={cn(
                    "group relative flex flex-col items-start rounded-2xl p-4 text-left transition-[background-color,color,transform,box-shadow] duration-400 ease-out-soft sm:p-5",
                    active
                      ? "bg-ink text-cream shadow-[0_18px_40px_-20px_rgba(31,27,25,0.6)] lg:-translate-y-1"
                      : cn(recipient.tone, "text-ink hover:-translate-y-0.5"),
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-full transition-[background-color,transform] duration-400 group-hover:rotate-[-8deg]",
                      active ? "bg-butter text-ink" : "bg-cream/80",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="mt-6 font-display text-lg leading-tight font-semibold tracking-[-0.02em] sm:mt-8">
                    {recipient.label}
                  </span>
                  <span className={cn("mt-0.5 text-[13px]", active ? "text-cream/65" : "text-muted")}>{recipient.note}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-14" aria-live="polite">
          <p className="mb-6 font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
            Picked {current.label.toLowerCase().startsWith("just") ? "just because" : current.label.toLowerCase()}
            <span className="text-coral">.</span>
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <m.ul
              key={selected}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-4"
            >
              {picks[selected].map((product) => (
                <li key={product.id} className="flex">
                  <ProductCard product={product} className="w-full" />
                </li>
              ))}
            </m.ul>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
