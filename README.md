# Dimple — gift & stationery storefront (frontend)

A Next.js 16 + Tailwind v4 + Swiper + Framer Motion storefront with static demo data, built so a real backend can be plugged in without touching UI components.

```bash
pnpm dev     # http://localhost:3000
pnpm build && pnpm start
```

## Where things live

| Path | What it is |
| --- | --- |
| `app/globals.css` | Design tokens (ivory base, six pastels, charcoal, berry accent), type and Swiper chrome. |
| `data/images.ts` | **Every image URL on the site**, grouped as `images.hero / categories / products / editorial / social`. Swap photography here only. |
| `data/heroSlides.ts` | The four hero campaigns (copy, CTAs, tone, images). |
| `data/products.ts` | 47 demo products (typed seeds → `Product`). Discounts are derived. |
| `data/categories.ts`, `testimonials.ts`, `socialPosts.ts` | Other demo content. |
| `data/merchandising.ts` | Presentation config: featured tabs, gift-finder recipients, trending notes, collage tiles. |
| `data/site.ts` | Brand name, nav, footer links, free-shipping threshold. |
| `lib/catalog.ts` | **Data access layer.** Async functions (`getProducts`, `searchProducts`, …). Replace their bodies with `fetch()` calls to go live. |
| `lib/store.ts` | Cart, wishlist and UI state (`useSyncExternalStore`, persisted to localStorage). |
| `types/index.ts` | Shared domain types. |
| `components/ui` | Primitives: `Button`, `Badge`, `Carousel` (Swiper rail), `Sheet` (accessible dialog), `SectionHeading`, `Reveal`… |
| `components/products` | `ProductCard`, `QuickAdd`, `WishlistButton`, `ProductGrid`, `ProductCarousel`, `QuickViewModal`, … |
| `components/hero`, `components/categories` | `HeroSlider`/`HeroSlide`, `CategoryShowcase`/`CategoryCard`. |
| `components/layout` | `AnnouncementBar`, `Header`, `MobileMenu`, `Footer`. |
| `components/sections` | One file per remaining home-page section. |

## Connecting a backend

1. Point the functions in `lib/catalog.ts` at your API and map responses to the types in `types/index.ts`.
2. Replace the `actions` in `lib/store.ts` that mutate the cart/wishlist with API calls (the UI reads through selectors, so components stay the same).
3. Swap the demo checkout in `components/cart/CartDrawer.tsx` for a redirect to your payment provider, and the newsletter/sign-in handlers for real endpoints.

Images are Unsplash placeholders (allowed in `next.config.ts` → `images.remotePatterns`); update that list if you move to your own CDN.
