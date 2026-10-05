import type { Metadata } from 'next';
import { WishlistClient } from '@/components/wishlist-client';
export const metadata: Metadata = { title: 'Wishlist', description: 'Saved ORVYN objects.' };
export default function WishlistPage() { return <main className="utility-layout container"><div className="page-head" style={{ paddingTop: 0, borderBottom: 0 }}><span className="eyebrow">Saved / Your shortlist</span><h1>Worth keeping.</h1><p>Products saved locally in this browser. No account required.</p></div><WishlistClient /></main>; }
