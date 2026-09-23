"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check, X } from "lucide-react";
import { actions, useUI } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Toaster() {
  const toasts = useUI((s) => s.toasts);
  // Keep clear of the cart drawer's checkout buttons while it's open.
  const cartOpen = useUI((s) => s.cartOpen);
  return (
    <div
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed inset-x-0 z-[70] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:bottom-6",
        cartOpen ? "top-4 sm:top-auto sm:left-6 sm:items-start" : "bottom-4 sm:right-6 sm:items-end",
      )}
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <m.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.2 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-line bg-paper py-2.5 pr-2 pl-2.5 text-ink shadow-[0_18px_40px_-20px_rgba(37,37,37,0.3)]"
          >
            <span
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-full",
                toast.tone === "success" ? "bg-mint" : "bg-blush",
              )}
            >
              <Check className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{toast.title}</p>
              {toast.description && <p className="truncate text-xs text-muted">{toast.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => actions.dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="grid size-8 shrink-0 place-items-center rounded-full text-subtle hover:bg-shell hover:text-ink"
            >
              <X className="size-4" />
            </button>
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
