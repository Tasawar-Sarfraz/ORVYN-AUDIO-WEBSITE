'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct, getVariant } from '@/data/catalog';
import { clampQuantity } from '@/lib/money';
import { readCart, readCompare, readWishlist, writeCart, writeCompare, writeWishlist } from '@/lib/storage';
import type { CartLine } from '@/lib/types';

interface StoreContextValue {
  cart: CartLine[]; hydrated: boolean; wishlist: string[]; compare: string[];
  addToCart: (productId: string, variantId: string, quantity?: number) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;
  isWishlisted: (productId: string) => boolean;
}
const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setCart(readCart()); setWishlist(readWishlist()); setCompare(readCompare()); setHydrated(true); }, []);
  useEffect(() => { if (hydrated) writeCart(cart); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) writeWishlist(wishlist); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) writeCompare(compare); }, [compare, hydrated]);
  const value = useMemo<StoreContextValue>(() => ({
    cart, hydrated, wishlist, compare,
    addToCart(productId, variantId, quantity = 1) {
      const product = getProduct(productId); const variant = product && getVariant(product, variantId); if (!product || !variant || !variant.available) return;
      setCart((current) => { const existing = current.find((line) => line.productId === productId && line.variantId === variantId); if (existing) return current.map((line) => line === existing ? { ...line, quantity: clampQuantity(line.quantity + quantity, variant.stock) } : line); return [...current, { productId, variantId, quantity: clampQuantity(quantity, variant.stock) }]; });
    },
    updateQuantity(productId, variantId, quantity) { const product = getProduct(productId); const variant = product && getVariant(product, variantId); if (!variant) return; setCart((current) => current.map((line) => line.productId === productId && line.variantId === variantId ? { ...line, quantity: clampQuantity(quantity, variant.stock) } : line)); },
    removeFromCart(productId, variantId) { setCart((current) => current.filter((line) => !(line.productId === productId && line.variantId === variantId))); },
    clearCart() { setCart([]); },
    toggleWishlist(productId) { setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]); },
    toggleCompare(productId) { setCompare((current) => current.includes(productId) ? current.filter((id) => id !== productId) : current.length < 3 ? [...current, productId] : current); },
    clearCompare() { setCompare([]); },
    isWishlisted(productId) { return wishlist.includes(productId); },
  }), [cart, compare, hydrated, wishlist]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export const useStore = () => { const value = useContext(StoreContext); if (!value) throw new Error('useStore must be used inside StoreProvider'); return value; };
