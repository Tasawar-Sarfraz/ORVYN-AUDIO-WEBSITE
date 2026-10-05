import type { Metadata } from 'next';
import { CartClient } from '@/components/cart-client';
export const metadata: Metadata = { title: 'Your bag', description: 'Review your local ORVYN sample bag.' };
export default function CartPage() { return <main className="utility-layout container"><div className="page-head" style={{ paddingTop: 0, borderBottom: 0 }}><span className="eyebrow">Bag / Local shopping state</span><h1>Take a closer look.</h1><p>Quantities, sample prices, and delivery rules are recalculated in this browser.</p></div><CartClient /></main>; }
