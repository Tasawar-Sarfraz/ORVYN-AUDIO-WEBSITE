import Link from 'next/link';

export function Footer() { return <footer className="footer container"><div><div className="wordmark"><span className="wordmark-mark"><span>O</span></span><span>ORVYN</span></div><p className="muted">The Product Issue — useful objects, precisely edited.</p></div><div className="footer-links"><Link href="/shop">Shop</Link><Link href="/collections/focus">Collections</Link><Link href="/about">About</Link><span className="mono">PKR / DEMO STORE</span></div></footer>; }
