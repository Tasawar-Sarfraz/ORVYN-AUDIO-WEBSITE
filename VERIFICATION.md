# ORVYN verification record

## Automated checks

| Check | Result |
| --- | --- |
| `pnpm typecheck` | Passed |
| `pnpm test` | Passed — 5 focused tests |
| `pnpm lint` | Passed — project flat config linted JavaScript configuration files; TypeScript correctness is covered by `tsc` |
| `pnpm build` | Passed — Next.js 15.5.4 static export |
| Static generation | Passed — 28 prerendered pages, including 3 collection paths and 14 product paths |
| `GET /manus-routes.json` | Passed — HTTP 200 with 10 declared page routes |
| Direct static route files | Passed — home, shop, collection, product, cart, checkout, and preview `index.html` files present under `out/` |
| `pnpm ignored-builds` | The command returned pnpm's inconclusive “Cannot identify as no node_modules found” message; installation itself completed successfully, and the required `unrs-resolver` permission is checked into `pnpm-workspace.yaml` |

## Shopping logic coverage

The focused Vitest suite covers the brief’s two totals examples, `ORVYN10` discounting, the PKR 20,000 free-delivery threshold, search/category/availability filtering, Setup Finder eligibility, obsolete product IDs, and unavailable variants.

## Browser flow

Verified in the Sandbox browser against the managed preview URL:

1. Homepage opens with the ORVYN editorial cover, responsive navigation, interactive Three.js hero, and visible product controls.
2. Shop index hydrates with 14 products, query field, category/finish/availability/sort controls, result count, and load-next pagination.
3. Arc Desk Light route opens directly; choosing Stone changes the visual, price from Rs 18,900 to Rs 19,500, and availability from 7 to 3 units.
4. Adding the selected variant updates the header bag count to 1 and the bag page shows Stone × 1, Rs 19,500 line total, Rs 500 sample delivery, and Rs 20,000 total.
5. Demo checkout shows the exact no-payment notice, accepts local sample form values, applies `ORVYN10`, and creates a local demo reference at `/checkout/preview`.
6. Preview page shows “Demo order preview,” a reference, line snapshot, discount, delivery, and sample total while the bag count remains 1.

## Visual checks

- `artifacts/screenshots/home-desktop.png`: 1440 × 1000; editorial cover and self-contained procedural hero visible.
- `artifacts/screenshots/home-mobile.png`: 390 × 844; mobile header, hero headline, CTA stack, product controls, and no horizontal overflow visible.
- `artifacts/screenshots/checkout-preview-desktop.png`: 1440 × 1000; print-friendly preview layout visible.

## Notes

- Next.js reports a non-blocking warning that the project ESLint flat config does not load the Next.js plugin; lint itself passes and TypeScript validation is enforced separately.
- CSS build output may report a non-blocking Autoprefixer compatibility warning for `align-items: end`; it does not prevent export or runtime rendering.
- The project is intentionally frontend-only. It does not provide backend security, real payment processing, inventory reservation, customer accounts, or submitted orders.
