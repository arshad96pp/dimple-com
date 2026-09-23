"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { primaryNav } from "@/data/site";
import { actions, useCartCount, useWishlist } from "@/lib/store";
import { cn } from "@/lib/utils";
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
            ? "border-line/80 bg-cream/85 shadow-[0_8px_30px_-18px_rgba(31,27,25,0.25)] backdrop-blur-md"
            : "border-transparent bg-cream",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1320px] items-center gap-4 px-4 transition-[height] duration-500 ease-out-soft sm:px-6 lg:px-10",
            scrolled ? "h-16" : "h-[72px] lg:h-20",
          )}
        >
          <Logo className="shrink-0" />

          <nav aria-label="Primary" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-1">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <NavItem href={link.href}>{link.label}</NavItem>
                </li>
              ))}
              <li>
                <CategoriesMenu categories={categories} />
              </li>
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1 lg:ml-0">
            <IconButton label="Search" onClick={actions.openSearch}>
              <Search className="size-5" strokeWidth={1.8} />
            </IconButton>
            <IconLink href="/account" label="Account" className="hidden lg:grid">
              <User className="size-5" strokeWidth={1.8} />
            </IconLink>
            <WishlistLink />
            <CartButton />
            <IconButton label="Open menu" onClick={actions.openMenu} className="lg:hidden">
              <Menu className="size-5" strokeWidth={1.8} />
            </IconButton>
          </div>
        </div>
      </header>
      <MobileMenu categories={categories} />
    </>
  );
}

function NavItem({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex h-10 items-center rounded-full px-3.5 text-[14.5px] font-medium text-ink-soft transition-colors duration-300 hover:text-ink xl:px-4"
    >
      {children}
      <span
        aria-hidden
        className="absolute inset-x-3.5 bottom-1.5 h-[2px] origin-left scale-x-0 rounded-full bg-coral transition-transform duration-500 ease-out-soft group-hover:scale-x-100 xl:inset-x-4"
      />
    </Link>
  );
}

function CategoriesMenu({ categories }: { categories: Category[] }) {
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
        aria-controls="categories-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[14.5px] font-medium text-ink-soft transition-colors duration-300 hover:text-ink xl:px-4"
      >
        Categories
        <ChevronDown
          aria-hidden
          className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="categories-menu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 w-[640px] -translate-x-1/2 pt-3"
          >
            <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-cream p-3 shadow-[0_24px_60px_-24px_rgba(31,27,25,0.35)]">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={category.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-xl p-2 transition-colors duration-300 hover:bg-cream-100"
                >
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-cream-200">
                    <Image
                      src={category.image.src}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-110"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{category.name}</span>
                    <span className="block truncate text-xs text-muted">{category.blurb}</span>
                  </span>
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const iconButtonClasses =
  "relative grid size-10 place-items-center rounded-full text-ink transition-[background-color,transform] duration-300 hover:bg-ink/[0.06] active:scale-90";

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

function CountBadge({ count, tone = "coral" }: { count: number; tone?: "coral" | "ink" }) {
  if (!count) return null;
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-0.5 right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] leading-none font-bold",
        tone === "coral" ? "bg-coral text-white" : "bg-ink text-cream",
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

function WishlistLink() {
  const count = useWishlist().length;
  return (
    <IconLink
      href="/wishlist"
      label={count ? `Wishlist, ${count} saved` : "Wishlist"}
      className="hidden sm:grid"
    >
      <Heart className="size-5" strokeWidth={1.8} />
      <CountBadge count={count} tone="ink" />
    </IconLink>
  );
}

function CartButton() {
  const count = useCartCount();
  return (
    <IconButton label={count ? `Open bag, ${count} items` : "Open bag"} onClick={actions.openCart}>
      <ShoppingBag className="size-5" strokeWidth={1.8} />
      <CountBadge count={count} />
    </IconButton>
  );
}
