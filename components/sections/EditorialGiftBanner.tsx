import Image from "next/image";
import { Gift, PenLine, Sparkles } from "lucide-react";
import { images } from "@/data/images";
import { HeartDoodle, StarDoodle } from "@/components/icons/Doodles";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";

const perks = [
  { icon: Gift, label: "Gift wrap on request" },
  { icon: PenLine, label: "Handwritten notes" },
  { icon: Sparkles, label: "Picks under ₹999" },
];

export function EditorialGiftBanner() {
  return (
    <section aria-labelledby="gift-edit-title" className="py-6 sm:py-10">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-peach-50 via-blush-50 to-blush-50 sm:rounded-[36px]">
          <div className="grid items-center lg:grid-cols-2">
            <div className="relative z-10 px-6 pt-14 pb-10 sm:px-12 sm:pt-20 lg:px-16 lg:py-24 xl:px-24">
              <Reveal>
                <p className="eyebrow">The gifting edit</p>
                <h2
                  id="gift-edit-title"
                  className="mt-5 text-[2.75rem] leading-[0.98] tracking-[-0.05em] text-ink sm:text-6xl xl:text-[5.2rem]"
                >
                  Small Gift.
                  <br />
                  <span className="relative inline-block">
                    Big Feeling.
                    <HeartDoodle className="absolute -top-2 -right-7 size-6 rotate-12 text-[#ef9fb2] sm:-right-9 sm:size-8" />
                  </span>
                </h2>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft sm:text-lg">
                  From tiny surprises to thoughtful keepsakes, find something worth wrapping.
                </p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {perks.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full bg-paper/80 px-3.5 py-2 text-[13px] text-ink-soft"
                    >
                      <Icon className="size-4 text-berry" strokeWidth={1.6} aria-hidden />
                      {label}
                    </li>
                  ))}
                </ul>
                <Button href="/shop?category=gifts" size="lg" className="mt-10" withArrow>
                  Shop Gift Picks
                </Button>
              </Reveal>
            </div>

            <div className="relative px-4 pb-4 sm:px-6 sm:pb-6 lg:py-6 lg:pr-6 lg:pl-0">
              <ImageReveal
                src={images.editorial.gift.src}
                alt={images.editorial.gift.alt}
                sizes="(min-width: 1024px) 48vw, 100vw"
                style={{ objectPosition: images.editorial.gift.position }}
                wrapperClassName="aspect-[4/5] w-full rounded-[22px] sm:aspect-[5/4] lg:aspect-[4/5] lg:rounded-[28px] xl:aspect-[5/6]"
              />

              {/* Gift tag detail */}
              <Reveal
                delay={0.35}
                className="absolute right-8 bottom-8 w-[42%] max-w-[210px] sm:right-12 sm:bottom-12 lg:right-auto lg:-left-10 lg:bottom-16"
              >
                <div className="animate-drift-slow rounded-[18px] bg-paper p-2 pb-3 shadow-[0_24px_50px_-24px_rgba(37,37,37,0.4)] [--drift-rotate:-5deg]">
                  <div className="relative aspect-square overflow-hidden rounded-[13px] bg-blush-50">
                    <Image
                      src={images.editorial.giftDetail.src}
                      alt={images.editorial.giftDetail.alt}
                      fill
                      sizes="210px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 px-1 text-[12px] leading-snug text-ink-soft">
                    <span className="font-medium text-ink">&ldquo;For no reason at all.&rdquo;</span>
                    <br />— every note, handwritten
                  </p>
                </div>
              </Reveal>
              <StarDoodle aria-hidden className="absolute top-10 right-10 size-8 animate-drift text-paper sm:size-10" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
