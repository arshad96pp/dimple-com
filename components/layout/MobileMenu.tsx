"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Truck, User, X } from "lucide-react";
import { primaryNav, site } from "@/data/site";
import { actions, useUI } from "@/lib/store";
import { cn, formatPrice, toneClasses } from "@/lib/utils";
import type { Category } from "@/types";
import { socialLinks } from "@/components/icons/BrandIcons";
import { Logo } from "@/components/ui/Logo";
import { Sheet } from "@/components/ui/Sheet";

export function MobileMenu({ categories }: { categories: Category[] }) {
  const open = useUI((s) => s.menuOpen);

  return (
    <Sheet open={open} onClose={actions.closeMenu} label="Menu" side="right" className="max-w-[420px]">
      <div className="flex h-16 shrink-0 items-center justify-between px-5">
        <Logo />
        <button
          type="button"
          onClick={actions.closeMenu}
          aria-label="Close menu"
          data-autofocus
          className="grid size-10 place-items-center rounded-full hover:bg-shell"
        >
          <X className="size-5" strokeWidth={1.6} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-8">
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {primaryNav.map((link) => (
              <li key={link.href} className="border-b border-line last:border-0">
                <Link
                  href={link.href}
                  onClick={actions.closeMenu}
                  className="group flex items-center justify-between py-3.5 font-display text-[1.6rem] tracking-[-0.04em] text-ink"
                >
                  {link.label}
                  <ArrowRight
                    className="size-5 text-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink"
                    strokeWidth={1.6}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="eyebrow mt-8 mb-3">Collections</p>
        <ul className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={category.href}
                onClick={actions.closeMenu}
                className={cn(
                  "flex items-center gap-2.5 rounded-2xl p-2 text-[13px] leading-tight font-medium text-ink",
                  toneClasses[category.tone].soft,
                )}
              >
                <span className="relative size-10 shrink-0 overflow-hidden rounded-xl bg-paper">
                  <Image src={category.image.src} alt="" fill sizes="40px" className="object-cover" />
                </span>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-2">
          <Link
            href="/account"
            onClick={actions.closeMenu}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/12 py-3 text-sm font-medium"
          >
            <User className="size-4" strokeWidth={1.6} /> Account
          </Link>
          <Link
            href="/wishlist"
            onClick={actions.closeMenu}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/12 py-3 text-sm font-medium"
          >
            <Heart className="size-4" strokeWidth={1.6} /> Wishlist
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-butter-50 p-4">
          <Truck className="size-5 shrink-0 text-ink" strokeWidth={1.6} />
          <p className="text-sm text-ink-soft">
            Free shipping above <strong className="font-semibold text-ink">{formatPrice(site.freeShippingThreshold)}</strong>{" "}
            & gift wrapping on every order.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-line px-5 py-4">
        <span className="text-xs text-muted">Say hi {site.handle}</span>
        <div className="flex gap-1">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid size-9 place-items-center rounded-full text-ink hover:bg-shell"
            >
              <Icon className="size-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </Sheet>
  );
}
