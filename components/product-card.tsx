'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatPKR } from '@/data/store-config';
import { useStore } from '@/components/store-provider';
import type { Product } from '@/lib/types';
import { ProductMedia } from '@/components/product-media';

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, toggleCompare, isWishlisted, compare, addToCart } = useStore(); const [added, setAdded] = useState(false); const variant = product.variants.find((item) => item.available) ?? product.variants[0];
  return <article className="product-card"><Link href={`/product/${product.slug}`} className="product-card-media"><ProductMedia product={product} variantId={variant.id} /></Link><div className="product-card-body"><div><span className="eyebrow muted">{product.eyebrow}</span><Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link><span className="mono muted">{variant.available ? `${variant.stock} available` : 'Sample unavailable'}</span></div><div className="product-card-price">{formatPKR(variant.price)}</div></div><div className="filters"><button className="chip" onClick={() => toggleWishlist(product.id)} aria-pressed={isWishlisted(product.id)}>{isWishlisted(product.id) ? 'Saved' : 'Save'}</button><button className="chip" onClick={() => toggleCompare(product.id)} aria-pressed={compare.includes(product.id)} disabled={!compare.includes(product.id) && compare.length >= 3}>{compare.includes(product.id) ? 'Compared' : 'Compare'}</button><button className="chip" onClick={() => { addToCart(product.id, variant.id); setAdded(true); window.setTimeout(() => setAdded(false), 1200); }} disabled={!variant.available}>{added ? 'Added' : 'Quick add'}</button></div></article>;
}
