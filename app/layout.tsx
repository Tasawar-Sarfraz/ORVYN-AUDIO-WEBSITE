import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/components/store-provider';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: { default: 'ORVYN — The Product Issue', template: '%s — ORVYN' },
  description: 'Better objects for the everyday: audio, desk technology, and carry essentials edited by ORVYN.',
  metadataBase: new URL('https://orvyn.local'),
  openGraph: { title: 'ORVYN — The Product Issue', description: 'Useful premium objects, precisely edited.', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body suppressHydrationWarning><StoreProvider><div className="site-shell"><SiteHeader />{children}<Footer /></div></StoreProvider></body></html>;
}
