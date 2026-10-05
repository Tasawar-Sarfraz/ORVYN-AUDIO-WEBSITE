'use client';

import Link from 'next/link';
import { useStore } from '@/components/store-provider';
import { getProduct } from '@/data/catalog';
import { ProductCard } from '@/components/product-card';
export function WishlistClient() { const { wishlist, hydrated } = useStore(); const products = wishlist.flatMap((id) => { const product = getProduct(id); return product ? [product] : []; }); if (!hydrated) return <div className="empty">Loading saved objects…</div>; return products.length ? <div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <div className="empty"><h2>No saved objects.</h2><p>Use Save on any product to keep it close.</p><Link className="btn btn-primary" href="/shop">Browse the issue</Link></div>; }
