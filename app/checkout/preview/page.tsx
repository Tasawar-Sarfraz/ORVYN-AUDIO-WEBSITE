import type { Metadata } from 'next';
import { PreviewClient } from '@/components/preview-client';
export const metadata: Metadata = { title: 'Demo order preview', description: 'Local preview of a sample ORVYN order.' };
export default function CheckoutPreviewPage() { return <main className="utility-layout container"><PreviewClient /></main>; }
