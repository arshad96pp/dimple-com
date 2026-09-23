"use client";

import { Children, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselTrackProps {
  header: ReactNode;
  label: string;
  children: ReactNode;
  slideClassName?: string;
}

/**
 * Native scroll-snap rail: swipe on touch, drag with a mouse, arrows on desktop.
 * Edge detection uses IntersectionObserver instead of a scroll listener.
 */
export function CarouselTrack({ header, label, children, slideClassName }: CarouselTrackProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [edges, setEdges] = useState({ start: true, end: false });
  const slides = Children.toArray(children);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild || !track.lastElementChild) return;
    const first = track.firstElementChild;
    const last = track.lastElementChild;
    const observer = new IntersectionObserver(
      (entries) => {
        setEdges((prev) => {
          const next = { ...prev };
          for (const entry of entries) {
            if (entry.target === first) next.start = entry.intersectionRatio > 0.95;
            if (entry.target === last) next.end = entry.intersectionRatio > 0.95;
          }
          return next.start === prev.start && next.end === prev.end ? prev : next;
        });
      },
      { root: track, threshold: [0, 0.95, 1] },
    );
    observer.observe(first);
    observer.observe(last);
    return () => observer.disconnect();
  }, [slides.length]);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  };

  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = { active: true, startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!drag.current.active || !track) return;
    const delta = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(delta) > 6) {
      drag.current.moved = true;
      track.setPointerCapture(e.pointerId);
      track.style.scrollSnapType = "none";
    }
    if (drag.current.moved) track.scrollLeft = drag.current.startScroll - delta;
  };
  const endDrag = (e: PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!drag.current.active || !track) return;
    drag.current.active = false;
    if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    track.style.scrollSnapType = "";
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0 flex-1">{header}</div>
        <div className="mb-8 hidden shrink-0 gap-2 sm:mb-12 md:flex">
          {([-1, 1] as const).map((dir) => {
            const disabled = dir === -1 ? edges.start : edges.end;
            const Icon = dir === -1 ? ChevronLeft : ChevronRight;
            return (
              <button
                key={dir}
                type="button"
                onClick={() => scrollByPage(dir)}
                disabled={disabled}
                aria-label={dir === -1 ? `Previous ${label}` : `Next ${label}`}
                className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:bg-transparent disabled:hover:text-ink"
              >
                <Icon className="size-5" aria-hidden />
              </button>
            );
          })}
        </div>
      </div>

      <ul
        ref={trackRef}
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          // Swallow the click that ends a drag so it doesn't open a product.
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:gap-5 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:gap-6 lg:px-0"
      >
        {slides.map((slide, i) => (
          <li
            key={i}
            className={cn(
              "flex shrink-0 snap-start basis-[46%] sm:basis-[31%] lg:basis-[calc((100%-72px)/4)]",
              slideClassName,
            )}
          >
            {slide}
          </li>
        ))}
      </ul>
    </div>
  );
}
