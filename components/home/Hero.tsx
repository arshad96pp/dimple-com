"use client";

import Image from "next/image";
import { m, type Variants } from "framer-motion";
import { Star } from "lucide-react";
import { IMAGES } from "@/data/images";
import { formatPrice } from "@/lib/utils";
import { GiftDoodle, HeartDoodle, PencilDoodle, SmileDoodle, SparkleDoodle, SquiggleDoodle, StarDoodle } from "@/components/icons/Doodles";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};

const avatars = [IMAGES.avatarAnanya, IMAGES.avatarKabir, IMAGES.avatarMeera];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid items-center gap-12 pt-8 pb-16 sm:pt-12 lg:grid-cols-12 lg:gap-8 lg:pt-10 lg:pb-24">
        {/* Copy */}
        <m.div variants={stagger} initial="hidden" animate="show" className="relative z-10 lg:col-span-6">
          <m.p
            variants={rise}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 py-1.5 pr-3.5 pl-1.5 text-[10px] font-semibold tracking-[0.1em] whitespace-nowrap text-ink-soft uppercase min-[360px]:text-[11px] sm:pr-4 sm:tracking-[0.16em]"
          >
            <SmileDoodle className="size-6 text-butter" />
            Make every day a little cuter
          </m.p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.3rem,11.2vw,3.75rem)] leading-[0.95] font-semibold tracking-[-0.055em] text-ink sm:text-7xl md:text-[5.5rem] lg:text-[4.1rem] xl:text-[5rem] 2xl:text-[5.4rem]"
          >
            <m.span variants={rise} className="block">
              Little Things.
            </m.span>
            <m.span variants={rise} className="relative block w-fit">
              Big <span className="text-coral">Smiles.</span>
              <SquiggleDoodle className="absolute -bottom-[0.14em] left-[34%] h-[0.16em] w-[62%] text-butter" />
            </m.span>
          </h1>

          <m.p variants={rise} className="mt-7 max-w-md text-[17px] leading-relaxed text-muted sm:text-lg">
            Discover playful stationery, thoughtful gifts and everyday essentials made to brighten your world.
          </m.p>

          <m.div variants={rise} className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
            <Button href="/shop?collection=new" size="lg" withArrow>
              Shop New Arrivals
            </Button>
            <Button href="/shop?category=gifts" size="lg" variant="outline">
              Explore Gifts
            </Button>
          </m.div>

          <m.div variants={rise} className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {avatars.map((src) => (
                <span key={src} className="relative size-10 overflow-hidden rounded-full border-2 border-cream bg-cream-200">
                  <Image src={src} alt="" fill sizes="40px" className="object-cover" />
                </span>
              ))}
            </div>
            <div className="text-sm leading-tight">
              <p className="flex items-center gap-1 font-semibold text-ink">
                <Star className="size-3.5 fill-butter text-butter" strokeWidth={0} aria-hidden /> 4.9
                <span className="font-normal text-muted">/ 5 average</span>
              </p>
              <p className="text-muted">from 12,000+ happy gifters</p>
            </div>
          </m.div>
        </m.div>

        {/* Campaign composition */}
        <m.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-[440px] sm:max-w-[520px] lg:col-span-6 lg:max-w-[560px] lg:justify-self-end"
        >
          <div className="relative aspect-[10/11]">
            {/* Sun disc behind the arch */}
            <m.div
              variants={pop}
              aria-hidden
              className="absolute top-[4%] right-[-2%] aspect-square w-[70%] rounded-full bg-butter"
            />

            {/* Main arch image */}
            <m.div
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.1, ease }}
              className="absolute top-0 right-[6%] h-[94%] w-[70%] overflow-hidden rounded-t-full rounded-b-[28px] bg-cream-200"
            >
              <Image
                src={IMAGES.heroMain}
                alt="A person holding out a gift wrapped in kraft paper and candy-stripe twine"
                fill
                preload
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 370px, 70vw"
                className="object-cover object-[50%_55%]"
              />
            </m.div>

            {/* Rotating badge */}
            <m.div variants={pop} className="absolute top-[6%] left-[2%] size-[27%] min-w-[92px]">
              <div className="relative size-full rounded-full bg-coral text-white shadow-[0_14px_30px_-14px_rgba(217,90,65,0.8)]">
                <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
                  <defs>
                    <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                  </defs>
                  <text className="fill-current text-[10.5px] font-semibold tracking-[0.22em] uppercase">
                    <textPath href="#badge-circle">New drop • Pastel desk edit •</textPath>
                  </text>
                </svg>
                <StarDoodle className="absolute inset-[34%] text-butter" />
              </div>
              <span className="sr-only">New drop: the Pastel Desk Edit</span>
            </m.div>

            {/* Polaroid product card */}
            <m.figure
              variants={rise}
              className="absolute bottom-[3%] left-0 w-[40%] min-w-[140px]"
            >
              <div className="animate-float-slow rounded-2xl bg-white p-2 pb-3 shadow-[0_24px_50px_-24px_rgba(31,27,25,0.45)] [--float-rotate:-5deg]">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-pink-100">
                  <Image
                    src={IMAGES.heroTreats}
                    alt="Stack of pastel macarons"
                    fill
                    sizes="(min-width: 1024px) 220px, 40vw"
                    className="object-cover object-[50%_60%]"
                  />
                </div>
                <figcaption className="mt-2 flex flex-col px-1 leading-tight sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
                  <span className="text-[12px] font-semibold text-ink sm:text-[13px]">Sweet Nothings Tin</span>
                  <span className="text-[12px] font-medium text-muted">{formatPrice(749)}</span>
                </figcaption>
              </div>
            </m.figure>

            {/* Floating doodles — slow, small, decorative */}
            <m.div variants={pop} aria-hidden className="absolute top-[38%] -left-[3%] w-[11%]">
              <HeartDoodle className="w-full animate-float text-pink [--float-rotate:-12deg]" />
            </m.div>
            <m.div variants={pop} aria-hidden className="absolute -top-[2%] right-[34%] w-[8%]">
              <SparkleDoodle className="w-full animate-float-slow text-ink" />
            </m.div>
            <m.div variants={pop} aria-hidden className="absolute right-0 bottom-[14%] w-[17%]">
              <GiftDoodle className="w-full animate-float [--float-rotate:8deg] [animation-delay:-2s]" />
            </m.div>
            <m.div variants={pop} aria-hidden className="absolute right-[30%] -bottom-[1%] w-[24%]">
              <PencilDoodle className="w-full animate-float-slow [--float-rotate:-14deg] [animation-delay:-4s]" />
            </m.div>
            <m.div variants={pop} aria-hidden className="absolute top-[28%] right-[-1%] w-[7%]">
              <StarDoodle className="w-full animate-float text-lavender [animation-delay:-3s]" />
            </m.div>
          </div>
        </m.div>
      </Container>
    </section>
  );
}
