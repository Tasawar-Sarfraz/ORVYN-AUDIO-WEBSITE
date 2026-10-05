import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CatalogBrowser } from '@/components/catalog-browser';

export const metadata: Metadata = { title: 'Shop the edit', description: 'Browse the ORVYN product index.' };
export default function ShopPage() { return <main><section className="page-head container"><span className="eyebrow">ORVYN / Product index</span><h1>The full issue.</h1><p>Audio, desk technology, and everyday carry, edited into a smaller and more useful catalog.</p></section><section className="section container" style={{ paddingTop: 30 }}><Suspense fallback={<div className="empty">Loading the product index…</div>}><CatalogBrowser /></Suspense></section></main>; }
