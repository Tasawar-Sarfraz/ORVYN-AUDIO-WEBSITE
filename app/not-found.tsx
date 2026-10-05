import Link from 'next/link';
export default function NotFound() { return <main className="utility-layout container"><span className="eyebrow">404 / Out of issue</span><h1>That page<br />was not edited.</h1><p className="muted">The object or spread you requested is not in this issue.</p><Link className="btn btn-primary" href="/shop">Return to the index</Link></main>; }
