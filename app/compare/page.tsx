import type { Metadata } from 'next';
import { CompareClient } from '@/components/compare-client';
export const metadata: Metadata = { title: 'Compare products', description: 'Compare up to three ORVYN objects.' };
export default function ComparePage() { return <main className="utility-layout container"><div className="page-head" style={{ paddingTop: 0, borderBottom: 0 }}><span className="eyebrow">Comparison / Up to 03</span><h1>Put them<br />side by side.</h1><p>Compare the useful details without losing the editorial context.</p></div><CompareClient /></main>; }
