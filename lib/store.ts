"use client";

/**
 * Tiny external store built on `useSyncExternalStore`.
 *
 * Components subscribe through selectors, so toggling one product's wishlist
 * state re-renders only the cards that read it — not the whole page.
 * Cart and wishlist persist to localStorage for the demo; swap `persist`
 * for API calls when a backend exists.
 */
import { useSyncExternalStore } from "react";
import type { CartItem, Product } from "@/types";

type Listener = () => void;

function createStore<T>(initial: T) {
  let state = initial;
  const listeners = new Set<Listener>();
  return {
    initial,
    get: () => state,
    set(update: Partial<T> | ((prev: T) => Partial<T>)) {
      const patch = typeof update === "function" ? update(state) : update;
      state = { ...state, ...patch };
      listeners.forEach((l) => l());
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

type Store<T> = ReturnType<typeof createStore<T>>;

function useSelector<T, S>(store: Store<T>, selector: (state: T) => S): S {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.get()),
    () => selector(store.initial),
  );
}

/* ——— Shop state (persisted) ——— */

interface ShopState {
  cart: CartItem[];
  wishlist: string[];
}

const STORAGE_KEY = "dimple:shop:v1";
const shop = createStore<ShopState>({ cart: [], wishlist: [] });

if (typeof window !== "undefined") {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) shop.set(JSON.parse(saved) as ShopState);
  } catch {
    // Storage unavailable or corrupted — start fresh.
  }
  shop.subscribe(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(shop.get()));
    } catch {
      // Quota or privacy mode — the demo keeps working in memory.
    }
  });
}

export const useCart = () => useSelector(shop, (s) => s.cart);
export const useCartCount = () =>
  useSelector(shop, (s) => s.cart.reduce((n, item) => n + item.quantity, 0));
export const useWishlist = () => useSelector(shop, (s) => s.wishlist);
export const useIsWishlisted = (id: string) => useSelector(shop, (s) => s.wishlist.includes(id));

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

/* ——— UI state (ephemeral) ——— */

export type ToastTone = "default" | "success";

export interface Toast {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  quickView: Product | null;
  toasts: Toast[];
}

const ui = createStore<UIState>({
  cartOpen: false,
  searchOpen: false,
  menuOpen: false,
  quickView: null,
  toasts: [],
});

export const useUI = <S,>(selector: (s: UIState) => S) => useSelector(ui, selector);

let toastId = 0;

export const actions = {
  addToCart(product: Product, quantity = 1) {
    shop.set(({ cart }) => {
      const existing = cart.find((i) => i.id === product.id);
      return {
        cart: existing
          ? cart.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i))
          : [
              ...cart,
              {
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity,
              },
            ],
      };
    });
    actions.toast({ title: "Added to your bag", description: product.name, tone: "success" });
  },
  setQuantity(id: string, quantity: number) {
    shop.set(({ cart }) => ({
      cart:
        quantity <= 0
          ? cart.filter((i) => i.id !== id)
          : cart.map((i) => (i.id === id ? { ...i, quantity: Math.min(quantity, 20) } : i)),
    }));
  },
  removeFromCart(id: string) {
    shop.set(({ cart }) => ({ cart: cart.filter((i) => i.id !== id) }));
  },
  clearCart() {
    shop.set({ cart: [] });
  },
  toggleWishlist(product: Product) {
    const saved = shop.get().wishlist.includes(product.id);
    shop.set(({ wishlist }) => ({
      wishlist: saved ? wishlist.filter((id) => id !== product.id) : [...wishlist, product.id],
    }));
    actions.toast({
      title: saved ? "Removed from wishlist" : "Saved to wishlist",
      description: product.name,
    });
  },

  openCart: () => ui.set({ cartOpen: true, menuOpen: false, searchOpen: false, quickView: null }),
  closeCart: () => ui.set({ cartOpen: false }),
  openSearch: () => ui.set({ searchOpen: true, menuOpen: false }),
  closeSearch: () => ui.set({ searchOpen: false }),
  openMenu: () => ui.set({ menuOpen: true }),
  closeMenu: () => ui.set({ menuOpen: false }),
  openQuickView: (product: Product) => ui.set({ quickView: product }),
  closeQuickView: () => ui.set({ quickView: null }),

  toast({ title, description, tone = "default" }: Omit<Toast, "id" | "tone"> & { tone?: ToastTone }) {
    const id = ++toastId;
    ui.set(({ toasts }) => ({ toasts: [...toasts.slice(-2), { id, title, description, tone }] }));
    window.setTimeout(() => actions.dismissToast(id), 3200);
  },
  dismissToast(id: number) {
    ui.set(({ toasts }) => ({ toasts: toasts.filter((t) => t.id !== id) }));
  },
};
