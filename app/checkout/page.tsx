import type { Metadata } from 'next';
import { CheckoutClient } from '@/components/checkout-client';
export const metadata: Metadata = { title: 'Demo checkout', description: 'Frontend-only ORVYN demo checkout.' };
export default function CheckoutPage() { return <main className="utility-layout container"><div className="page-head" style={{ paddingTop: 0, borderBottom: 0 }}><span className="eyebrow">Checkout / Frontend demo</span><h1>Make it exact.</h1><p>Enter sample details to render a local demo order preview. There is no payment and no real order submission.</p></div><CheckoutClient /></main>; }
