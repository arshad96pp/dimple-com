"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Check, Loader2, Lock, Sparkles, X } from "lucide-react";
import { site } from "@/data/site";
import { actions, cartSubtotal, useCart, useUI } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types";
import { GiftDoodle, HeartDoodle, StarDoodle } from "@/components/icons/Doodles";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Sheet } from "@/components/ui/Sheet";

type CheckoutStatus = "idle" | "processing" | "done";

export function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const items = useCart();
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [orderNumber, setOrderNumber] = useState("");

  const close = useCallback(() => {
    actions.closeCart();
    setStatus((s) => (s === "done" ? "idle" : s));
  }, []);

  const checkout = () => {
    setStatus("processing");
    // Demo only — replace with a redirect to your payment provider.
    window.setTimeout(() => {
      setOrderNumber(`DMP-${Math.floor(100000 + Math.random() * 900000)}`);
      actions.clearCart();
      setStatus("done");
    }, 1400);
  };

  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = cartSubtotal(items);

  return (
    <Sheet open={open} onClose={close} label="Shopping bag">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:px-6">
        <h2 className="text-lg font-semibold">
          Your bag {count > 0 && <span className="text-muted">({count})</span>}
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close bag"
          data-autofocus
          className="grid size-10 place-items-center rounded-full hover:bg-ink/5"
        >
          <X className="size-5" />
        </button>
      </div>

      {status === "done" ? (
        <OrderConfirmation orderNumber={orderNumber} onClose={close} />
      ) : items.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            illustration={<EmptyBagIllustration />}
            title="Your bag is feeling light"
            description="Fill it with something cute — our best sellers are a very good place to start."
            action={
              <Button href="/shop?collection=best-sellers" onClick={close} withArrow>
                Shop best sellers
              </Button>
            }
          />
        </div>
      ) : (
        <>
          <ShippingProgress subtotal={subtotal} />
          <ul className="flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-5 sm:px-6">
            {items.map((item) => (
              <CartLine key={item.id} item={item} onNavigate={close} />
            ))}
          </ul>
          <div className="shrink-0 border-t border-line bg-cream-100 px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
            <div className="flex items-baseline justify-between">
              <span className="text-[15px] font-medium">Subtotal</span>
              <span className="font-display text-xl font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Taxes included. Shipping calculated at checkout.</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Button variant="outline" onClick={close}>
                Continue shopping
              </Button>
              <Button onClick={checkout} disabled={status === "processing"} aria-live="polite">
                {status === "processing" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden /> Placing…
                  </>
                ) : (
                  <>
                    <Lock className="size-3.5" aria-hidden /> Checkout
                  </>
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </Sheet>
  );
}

function ShippingProgress({ subtotal }: { subtotal: number }) {
  const threshold = site.freeShippingThreshold;
  const remaining = Math.max(threshold - subtotal, 0);
  const progress = Math.min(subtotal / threshold, 1);
  return (
    <div className="shrink-0 border-b border-line px-5 py-4 sm:px-6">
      <p className="flex items-center gap-2 text-[13px] text-ink-soft">
        {remaining === 0 ? (
          <>
            <Sparkles className="size-4 text-coral" aria-hidden />
            <span>
              Yay — you&apos;ve unlocked <strong className="font-semibold text-ink">free shipping</strong>.
            </span>
          </>
        ) : (
          <span>
            You&apos;re <strong className="font-semibold text-ink">{formatPrice(remaining)}</strong> away from free shipping.
          </span>
        )}
      </p>
      <div
        className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-cream-200"
        role="progressbar"
        aria-label="Progress to free shipping"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div
          className="h-full origin-left rounded-full bg-coral transition-transform duration-700 ease-out-soft"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}

function CartLine({ item, onNavigate }: { item: CartItem; onNavigate: () => void }) {
  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/products/${item.slug}`}
        onClick={onNavigate}
        className="relative h-[104px] w-[84px] shrink-0 overflow-hidden rounded-xl bg-cream-200"
      >
        <Image src={item.image.src} alt={item.image.alt} fill sizes="84px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/products/${item.slug}`}
            onClick={onNavigate}
            className="font-display text-[15px] leading-snug font-medium hover:underline"
          >
            {item.name}
          </Link>
          <span className="shrink-0 font-display text-[15px] font-semibold">{formatPrice(item.price * item.quantity)}</span>
        </div>
        <span className="mt-0.5 text-xs text-muted">{formatPrice(item.price)} each</span>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper
            value={item.quantity}
            label={item.name}
            onChange={(q) => actions.setQuantity(item.id, q)}
          />
          <button
            type="button"
            onClick={() => actions.removeFromCart(item.id)}
            className="text-xs font-medium text-muted underline-offset-4 hover:text-coral-dark hover:underline"
          >
            Remove<span className="sr-only"> {item.name}</span>
          </button>
        </div>
      </div>
    </li>
  );
}

function OrderConfirmation({ orderNumber, onClose }: { orderNumber: string; onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center" role="status">
      <div className="relative mb-6">
        <span className="grid size-20 place-items-center rounded-full bg-mint">
          <Check className="size-9 text-ink" strokeWidth={2.4} aria-hidden />
        </span>
        <StarDoodle className="absolute -top-2 -right-4 size-6 text-butter" />
        <HeartDoodle className="absolute -bottom-1 -left-4 size-5 text-pink" />
      </div>
      <h3 className="text-2xl font-semibold">Order placed!</h3>
      <p className="mt-1 text-sm font-medium text-ink-soft">Order {orderNumber}</p>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
        This is a demo checkout, so no payment was taken — but in real life, we&apos;d be wrapping your parcel right now.
      </p>
      <Button onClick={onClose} className="mt-7" withArrow>
        Keep browsing
      </Button>
    </div>
  );
}

function EmptyBagIllustration() {
  return (
    <div className="relative grid size-32 place-items-center rounded-full bg-pink-100">
      <GiftDoodle className="size-16 -rotate-6" />
      <StarDoodle className="absolute top-3 right-2 size-5 text-butter" />
      <HeartDoodle className="absolute bottom-5 left-3 size-4 text-coral" />
    </div>
  );
}
