"use client";

import { AnimatePresence, m, type TargetAndTransition } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Side = "right" | "left" | "top" | "center";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  side?: Side;
  className?: string;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

const panelMotion: Record<Side, { initial: TargetAndTransition; animate: TargetAndTransition }> = {
  right: { initial: { x: "100%" }, animate: { x: 0 } },
  left: { initial: { x: "-100%" }, animate: { x: 0 } },
  top: { initial: { y: "-6%", opacity: 0 }, animate: { y: 0, opacity: 1 } },
  center: { initial: { y: 24, opacity: 0, scale: 0.98 }, animate: { y: 0, opacity: 1, scale: 1 } },
};

const panelPosition: Record<Side, string> = {
  right: "inset-y-0 right-0 h-dvh w-full max-w-[440px]",
  left: "inset-y-0 left-0 h-dvh w-[88%] max-w-[380px]",
  top: "inset-x-0 top-0 max-h-dvh",
  center: "inset-x-3 bottom-3 top-auto max-h-[92dvh] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[min(960px,calc(100vw-48px))] sm:-translate-x-1/2 sm:-translate-y-1/2",
};

/**
 * Accessible modal surface used by the cart, menu, search and quick view.
 * Handles focus trapping, Escape to close, scroll lock and focus restore.
 */
export function Sheet({ open, onClose, label, side = "right", className, children }: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      const panel = panelRef.current;
      (panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  const motionProps = panelMotion[side];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <m.div
            className="absolute inset-0 bg-ink/20 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden
          />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className={cn("absolute flex flex-col bg-cream shadow-[0_30px_80px_-30px_rgba(37,37,37,0.35)] outline-none", panelPosition[side], className)}
            initial={motionProps.initial}
            animate={motionProps.animate}
            exit={motionProps.initial}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
