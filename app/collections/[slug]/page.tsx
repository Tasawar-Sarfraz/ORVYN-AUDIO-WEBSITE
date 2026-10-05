import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CatalogBrowser } from '@/components/catalog-browser';
import { COLLECTIONS, getCollectionProducts } from '@/data/catalog';
import type { CollectionSlug } from '@/lib/types';

export function generateStaticParams() { return Object.keys(COLLECTIONS).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const collection = COLLECTIONS[slug as CollectionSlug]; return collection ? { title: `${collection.name} collection`, description: collection.detail } : {}; }
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const collection = COLLECTIONS[slug as CollectionSlug]; if (!collection) notFound(); return <main><section className="page-head container"><span className="eyebrow">Collection / {collection.number} of 03</span><h1>{collection.name}.</h1><p>{collection.detail} {getCollectionProducts(collection.slug).length} objects make up this spread.</p></section><section className="section container" style={{ paddingTop: 30 }}><div className="story" style={{ marginBottom: 40 }}><div className="story-copy"><span className="section-kicker eyebrow">The spread</span><h2>{collection.intro}</h2></div><div className="story-panel" style={{ minHeight: 290 }}><div><span className="eyebrow" style={{ color: '#d8d3c9' }}>{collection.number} / {collection.name}</span><h3>Make room<br />for what works.</h3></div><div className="story-material" /></div></div><Suspense fallback={<div className="empty">Loading the collection index…</div>}><CatalogBrowser collection={collection.slug} /></Suspense></section></main>; }
