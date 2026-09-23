"use client";

import { Children, useRef, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, FreeMode, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: ReactNode;
  /** Accessible name for the rail, e.g. "New arrivals". */
  label: string;
  /**
   * Slide widths *and* gaps as Tailwind classes. Swiper runs with
   * `slidesPerView: "auto"`, so the server-rendered layout already matches
   * the hydrated one — no jump when Swiper boots.
   */
  slideClassName: string;
  /** Momentum scrolling instead of snapping slide-by-slide. */
  freeMode?: boolean;
  /** Dots under the rail (hidden automatically when everything fits). */
  pagination?: boolean;
  /** Receives the arrow buttons so the section can place them in its header. */
  renderHeader?: (nav: ReactNode) => ReactNode;
  className?: string;
}

export function Carousel({
  children,
  label,
  slideClassName,
  freeMode = false,
  pagination = false,
  renderHeader,
  className,
}: CarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);

  // Wire the external controls before Swiper initialises its modules.
  const onBeforeInit = (swiper: SwiperInstance) => {
    if (typeof swiper.params.navigation === "object") {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
    if (typeof swiper.params.pagination === "object") {
      swiper.params.pagination.el = dotsRef.current;
    }
  };

  const nav = (
    <div className="hidden gap-2 md:flex">
      <ArrowButton ref={prevRef} label={`Previous — ${label}`} direction="prev" />
      <ArrowButton ref={nextRef} label={`Next — ${label}`} direction="next" />
    </div>
  );

  return (
    <div className={className}>
      {renderHeader?.(nav)}
      {/* Bleed to the viewport edge on mobile so slides peek in from the side */}
      <div className="-mx-4 sm:-mx-6 lg:mx-0">
        <Swiper
          modules={[Navigation, Pagination, A11y, ...(freeMode ? [FreeMode] : [])]}
          slidesPerView="auto"
          spaceBetween={0}
          freeMode={freeMode ? { enabled: true, sticky: false, momentumRatio: 0.6 } : false}
          navigation={{}}
          pagination={pagination ? { clickable: true, bulletElement: "button" } : false}
          watchOverflow
          grabCursor
          onBeforeInit={onBeforeInit}
          a11y={{ containerMessage: label, slideRole: "group" }}
          className="px-4! sm:px-6! lg:px-0!"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i} className={cn("flex!", slideClassName)}>
              {slide}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {pagination && <div ref={dotsRef} className="rail-pagination mt-8" />}
    </div>
  );
}

function ArrowButton({
  ref,
  label,
  direction,
}: {
  ref: React.Ref<HTMLButtonElement>;
  label: string;
  direction: "prev" | "next";
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-ink/12 bg-paper text-ink transition-[border-color,transform] duration-300 ease-out-soft hover:border-ink/40 active:scale-95"
    >
      <Icon className="size-[18px]" strokeWidth={1.6} aria-hidden />
    </button>
  );
}
