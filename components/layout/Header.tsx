"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { primaryNav } from "@/data/site";
import { actions, useCartCount, useWishlist } from "@/lib/store";
import { cn, toneClasses } from "@/lib/utils";
import type { Category } from "@/types";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";

export function Header({ categories }: { categories: Category[] }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // One observer instead of a scroll listener: compact once the top 80px leave view.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20" />
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-500 ease-out-soft",
          scrolled
            ? "border-line bg-cream/80 shadow-[0_10px_30px_-24px_rgba(37,37,37,0.35)] backdrop-blur-xl"
            : "border-transparent bg-cream",
        )}
      >
        <div
          className={cn(
            "mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center gap-4 px-4 transition-[height] duration-500 ease-out-soft sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10",
            scrolled ? "h-14 lg:h-16" : "h-16 lg:h-[76px]",
          )}
        >
          <Logo className="justify-self-start" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <NavItem href={link.href}>{link.label}</NavItem>
                </li>
              ))}
              <li>
                <CollectionsMenu categories={categories} />
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-0.5 justify-self-end">
            <IconButton label="Search" onClick={actions.openSearch}>
              <Search className="size-[19px]" strokeWidth={1.6} />
            </IconButton>
            <WishlistLink />
            <IconLink href="/account" label="Account" className="hidden lg:grid">
              <User className="size-[19px]" strokeWidth={1.6} />
            </IconLink>
            <CartButton />
            <IconButton label="Open menu" onClick={actions.openMenu} className="lg:hidden">
              <Menu className="size-5" strokeWidth={1.6} />
            </IconButton>
          </div>
        </div>
      </header>
      <MobileMenu categories={categories} />
    </>
  );
}

const navItemClasses =
  "group relative inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[14px] text-ink-soft transition-colors duration-300 hover:text-ink xl:px-4";

function NavItem({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={navItemClasses}>
      {children}
      <Underline />
    </Link>
  );
}

function Underline() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-3.5 bottom-2 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out-soft group-hover:scale-x-100 xl:inset-x-4"
    />
  );
}

function CollectionsMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      onBlur={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="collections-menu"
        onClick={() => setOpen((v) => !v)}
        className={navItemClasses}
      >
        Collections
        <ChevronDown aria-hidden className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="collections-menu"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 w-[680px] -translate-x-1/2 pt-3"
          >
            <div className="grid grid-cols-[1fr_1fr_200px] gap-1 rounded-[24px] border border-line bg-paper p-3 shadow-[0_30px_60px_-30px_rgba(37,37,37,0.3)]">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={category.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-2xl p-2 transition-colors duration-300 hover:bg-shell"
                >
                  <span className={cn("relative size-12 shrink-0 overflow-hidden rounded-xl", toneClasses[category.tone].soft)}>
                    <Image
                      src={category.image.src}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-110"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">{category.name}</span>
                    <span className="block truncate text-xs text-muted">{category.blurb}</span>
                  </span>
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="group col-start-3 row-span-4 row-start-1 flex flex-col justify-end rounded-2xl bg-blush-50 p-5"
              >
                <span className="eyebrow">Everything</span>
                <span className="mt-2 font-display text-xl leading-tight tracking-[-0.03em] text-ink">
                  Browse all little things
                </span>
                <ArrowRight
                  className="mt-4 size-5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const iconButtonClasses =
  "relative grid size-10 place-items-center rounded-full text-ink transition-[background-color,transform] duration-300 hover:bg-ink/[0.05] active:scale-90";

function IconButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={cn(iconButtonClasses, className)}>
      {children}
    </button>
  );
}

function IconLink({ href, label, className, children }: { href: string; label: string; className?: string; children: ReactNode }) {
  return (
    <Link href={href} aria-label={label} className={cn(iconButtonClasses, className)}>
      {children}
    </Link>
  );
}

function CountBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span
      aria-hidden
      className="absolute top-1 right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-blush px-1 text-[9.5px] leading-none font-semibold text-ink ring-2 ring-cream"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

function WishlistLink() {
  const count = useWishlist().length;
  return (
    <IconLink href="/wishlist" label={count ? `Wishlist, ${count} saved` : "Wishlist"} className="hidden sm:grid">
      <Heart className="size-[19px]" strokeWidth={1.6} />
      <CountBadge count={count} />
    </IconLink>
  );
}

function CartButton() {
  const count = useCartCount();
  return (
    <IconButton label={count ? `Open bag, ${count} items` : "Open bag"} onClick={actions.openCart}>
      <ShoppingBag className="size-[19px]" strokeWidth={1.6} />
      <CountBadge count={count} />
    </IconButton>
  );
}
