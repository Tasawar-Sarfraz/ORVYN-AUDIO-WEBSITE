import type { Product } from '@/lib/types';

export function ProductMedia({ product, variantId, compact = false }: { product: Product; variantId?: string; compact?: boolean }) {
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants.find((item) => item.available) ?? product.variants[0];
  const shape = product.category === 'Audio' ? 'round' : product.category === 'Everyday carry' ? 'soft' : product.tags.includes('charge') ? 'flat' : product.tags.includes('light') ? 'soft' : product.tags.includes('laptop') ? 'bar' : '';
  return <div className={`product-visual ${compact ? 'compact' : ''}`} role="img" aria-label={`${product.imageAlt}, ${variant.finish} finish`}><div className={`visual-shape ${variant.tone} ${shape}`} /></div>;
}
