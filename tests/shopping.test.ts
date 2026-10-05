import { describe, expect, it } from 'vitest';
import { calculateTotals, snapshotCart } from '@/lib/totals';
import { filterProducts, recommendProducts } from '@/lib/catalog';

describe('ORVYN shopping logic', () => {
  it('matches the PKR 10,000 example with coupon and delivery', () => {
    const lines = [
      { productId: 'p-loop', variantId: 'loop-oxide', quantity: 1 },
      { productId: 'p-key', variantId: 'key-signal', quantity: 1 },
    ];
    const totals = calculateTotals(lines, 'ORVYN10');
    expect(totals.merchandiseSubtotal).toBe(1000000);
    expect(totals.discount).toBe(100000);
    expect(totals.delivery).toBe(50000);
    expect(totals.total).toBe(950000);
  });
  it('matches the PKR 22,500 example with free delivery after discount', () => {
    const lines = [
      { productId: 'p-fold', variantId: 'fold-signal', quantity: 1 },
      { productId: 'p-power', variantId: 'power-ink', quantity: 1 },
      { productId: 'p-key', variantId: 'key-signal', quantity: 1 },
    ];
    const totals = calculateTotals(lines, 'ORVYN10');
    expect(totals.merchandiseSubtotal).toBe(2250000);
    expect(totals.discount).toBe(225000);
    expect(totals.freeDelivery).toBe(true);
    expect(totals.delivery).toBe(0);
    expect(totals.total).toBe(2025000);
  });
  it('filters by query and excludes unavailable-only products from in-stock filter', () => {
    expect(filterProducts({ query: 'desk' }).length).toBeGreaterThan(0);
    expect(filterProducts({ availability: 'in-stock' }).every((product) => product.variants.some((variant) => variant.available))).toBe(true);
  });
  it('returns only eligible finder recommendations', () => {
    const results = recommendProducts('move', 'compactness', 10000);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(({ product }) => product.collections.includes('move') && product.variants.some((variant) => variant.available && variant.price <= 1000000))).toBe(true);
  });
  it('drops obsolete or unavailable lines from snapshots', () => {
    expect(snapshotCart([{ productId: 'missing', variantId: 'x', quantity: 1 }])).toEqual([]);
    expect(snapshotCart([{ productId: 'p-nest', variantId: 'nest-ink', quantity: 1 }])).toEqual([]);
  });
});
