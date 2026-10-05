import { STORE_CONFIG } from '@/data/store-config';
import { getProduct, getVariant } from '@/data/catalog';
import { clampQuantity, percentOf } from '@/lib/money';
import type { CartLine, CartSnapshotLine, Totals } from '@/lib/types';

export function snapshotCart(lines: CartLine[]): CartSnapshotLine[] {
  return lines.flatMap((line) => {
    const product = getProduct(line.productId);
    const variant = product && getVariant(product, line.variantId);
    if (!product || !variant || !variant.available) return [];
    const quantity = clampQuantity(line.quantity, variant.stock);
    return [{ productId: product.id, variantId: variant.id, quantity, productName: product.name, variantName: variant.finish, unitPrice: variant.price, lineTotal: variant.price * quantity, imageKey: variant.imageKey }];
  });
}

export function calculateTotals(lines: CartLine[], couponInput = ''): Totals {
  const snapshot = snapshotCart(lines);
  const merchandiseSubtotal = snapshot.reduce((sum, line) => sum + line.lineTotal, 0);
  const normalized = couponInput.trim().toUpperCase();
  const couponValid = normalized === STORE_CONFIG.couponCode;
  const discount = couponValid ? percentOf(merchandiseSubtotal, STORE_CONFIG.couponPercent) : 0;
  const discountedSubtotal = Math.max(merchandiseSubtotal - discount, 0);
  const freeDelivery = discountedSubtotal >= STORE_CONFIG.freeDeliveryThresholdMinor;
  const delivery = merchandiseSubtotal === 0 || freeDelivery ? 0 : STORE_CONFIG.deliveryMinor;
  const tax = percentOf(discountedSubtotal, STORE_CONFIG.taxPercent);
  return { merchandiseSubtotal, discount, discountedSubtotal, delivery, tax, total: discountedSubtotal + delivery + tax, couponCode: normalized, couponValid, freeDelivery };
}
