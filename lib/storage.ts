import type { CartLine, DemoPreview } from '@/lib/types';

const CART_KEY = 'orvyn:cart:v1';
const WISHLIST_KEY = 'orvyn:wishlist:v1';
const COMPARE_KEY = 'orvyn:compare:v1';
const PREVIEW_KEY = 'orvyn:preview:v1';

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { const value = JSON.parse(window.localStorage.getItem(key) ?? 'null'); return value ?? fallback; } catch { return fallback; }
}
function writeJSON(key: string, value: unknown) { try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage may be blocked */ } }

export const readCart = () => readJSON<CartLine[]>(CART_KEY, []).filter((line) => line && typeof line.productId === 'string' && typeof line.variantId === 'string' && Number.isFinite(line.quantity));
export const writeCart = (lines: CartLine[]) => writeJSON(CART_KEY, lines);
export const readWishlist = () => readJSON<string[]>(WISHLIST_KEY, []).filter((id) => typeof id === 'string');
export const writeWishlist = (ids: string[]) => writeJSON(WISHLIST_KEY, ids);
export const readCompare = () => readJSON<string[]>(COMPARE_KEY, []).filter((id) => typeof id === 'string').slice(0, 3);
export const writeCompare = (ids: string[]) => writeJSON(COMPARE_KEY, ids.slice(0, 3));
export const writePreview = (preview: DemoPreview) => { try { window.sessionStorage.setItem(PREVIEW_KEY, JSON.stringify(preview)); } catch { /* session storage may be blocked */ } };
export const readPreview = () => { if (typeof window === 'undefined') return null; try { return JSON.parse(window.sessionStorage.getItem(PREVIEW_KEY) ?? 'null') as DemoPreview | null; } catch { return null; } };
