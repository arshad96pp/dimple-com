"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { HeroSlide as HeroSlideData } from "@/types";
import { HeroSlide } from "./HeroSlide";

const AUTOPLAY_MS = 5200;

export function HeroSlider({ slides }: { slides: HeroSlideData[] }) {
  const [active, setActive] = useState(0);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  const onBeforeInit = (swiper: SwiperInstance) => {
    if (typeof swiper.params.navigation === "object") {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
    if (typeof swiper.params.pagination === "object") {
      swiper.params.pagination.el = dotsRef.current;
    }
  };

  return (
    <section aria-roledescription="carousel" aria-label="Featured campaigns" className="px-2 sm:px-3 lg:px-4">
      <div className="relative mx-auto max-w-[1800px] overflow-hidden rounded-[28px] sm:rounded-[36px]">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination, A11y]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          loop
          autoplay={{ delay: AUTOPLAY_MS, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{}}
          pagination={{ clickable: true, bulletElement: "button" }}
          a11y={{ slideLabelMessage: "Campaign {{index}} of {{slidesLength}}" }}
          onBeforeInit={onBeforeInit}
          onSwiper={(swiper) => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) swiper.autoplay.stop();
          }}
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
          // Drive the active pill's fill from autoplay time, without re-rendering React.
          onAutoplayTimeLeft={(swiper, _ms, progress) => {
            swiper.el.style.setProperty("--hero-progress", String(1 - progress));
          }}
          className="lg:h-[clamp(620px,calc(100svh-150px),720px)]"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={slide.id}>
              <HeroSlide slide={slide} index={i} active={i === active} />
            </SwiperSlide>
          ))}

          <div
            slot="container-end"
            className="pointer-events-none absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-[1320px] items-center justify-center gap-6 px-5 sm:bottom-8 sm:px-10 lg:justify-start lg:px-14"
          >
            <div ref={dotsRef} className="hero-pagination pointer-events-auto" />
            <div className="pointer-events-auto hidden gap-2 lg:flex">
              <HeroArrow ref={prevRef} direction="prev" />
              <HeroArrow ref={nextRef} direction="next" />
            </div>
          </div>
        </Swiper>
      </div>
    </section>
  );
}

function HeroArrow({ ref, direction }: { ref: React.Ref<HTMLButtonElement>; direction: "prev" | "next" }) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      ref={ref}
      type="button"
      aria-label={direction === "prev" ? "Previous campaign" : "Next campaign"}
      className="grid size-12 place-items-center rounded-full bg-paper/70 text-ink backdrop-blur-md transition-[background-color,transform] duration-300 ease-out-soft hover:bg-paper active:scale-95"
    >
      <Icon className="size-[18px]" strokeWidth={1.6} aria-hidden />
    </button>
  );
}
