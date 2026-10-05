# ORVYN — The Product Issue

ORVYN is a frontend-only concept store built as an editorial product publication. It presents premium audio, desk technology, and everyday carry using local typed fixtures, browser-only shopping state, and a demo checkout.

## Stack

- Next.js `15.5.4` App Router with TypeScript
- React `19.1.1` / React DOM `19.1.1`
- Three.js `0.179.1`
- `@react-three/fiber` `9.3.0`
- `@react-three/drei` `10.7.6`
- TypeScript `5.8.3`
- pnpm `11.0.0`

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local URL shown by Next.js. The app does not require API keys, a database, authentication, or a backend service.

## Verify and export

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

The production build is a static export in `out/`. Serve that directory with any static host or static server, for example:

```bash
python3 -m http.server 4173 --directory out
```

Do not use `next start` for the exported static delivery; the exported `out/` directory is the intended artifact.

## Scope notes

Cart, wishlist, comparison, and non-sensitive preferences persist in versioned `localStorage`. The current-tab demo preview is stored in `sessionStorage`; names, email, phone, and addresses are not persisted. The checkout never collects card details, calls payment services, sends messages, or submits a real order. Sample prices are in PKR. Delivery, coupon, and tax rules are configurable fixtures and are not real commitments.

## Asset notes

Concept visuals are original local CSS/SVG-style illustrations and procedural React Three Fiber geometry. See `ASSET_MANIFEST.md`. No external stock asset or production domain is required.
