'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useStore } from '@/components/store-provider';

function CartIcon() {
  return <svg className="cart-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8.5h12l-1 11H7l-1-11Z" /><path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" /></svg>;
}

export function SiteHeader() {
  const pathname = usePathname(); const [open, setOpen] = useState(false); const { cart, wishlist } = useStore();
  const bagCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const nav = [['/shop', 'Shop'], ['/collections/focus', 'Collections'], ['/#finder', 'Find My Setup'], ['/about', 'About']];
  return <header className="site-header"><div className="container nav">
    <Link href="/" className="wordmark" aria-label="ORVYN home"><span className="wordmark-mark"><span>O</span></span><span>ORVYN</span></Link>
    <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary navigation">{nav.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
    <div className="nav-actions"><Link className="icon-btn" href="/shop" aria-label="Search products">⌕</Link><Link className="icon-btn" href="/wishlist" aria-label={`Wishlist, ${wishlist.length} saved`}>♡<sup className="nav-count">{wishlist.length}</sup></Link><Link className="icon-btn cart-action" href="/cart" aria-label={`Bag, ${bagCount} items`}><CartIcon /><sup className="nav-count">{bagCount}</sup></Link><button className="icon-btn mobile-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>☰</button></div>
  </div></header>;
}
