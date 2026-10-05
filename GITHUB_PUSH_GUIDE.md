# ORVYN GitHub Push Guide

## Source structure

```text
orvyn-store/
├── app/                 # Next.js routes and global styles
├── components/          # Reusable UI and client interactions
├── data/                # Catalog, store rules, and asset manifest
├── lib/                 # Catalog, cart, totals, storage, and shared types
├── public/              # Static favicon, routes, sitemap, and robots files
├── tests/               # Shopping logic tests
├── app.config.ts        # Webdev project metadata
├── next.config.ts       # Static export configuration
├── package.json         # Scripts and dependencies
├── pnpm-lock.yaml       # Locked dependency versions
├── pnpm-workspace.yaml  # pnpm lifecycle policy
├── tsconfig.json        # TypeScript configuration
├── vitest.config.ts     # Test configuration
├── README.md            # Project documentation
└── GITHUB_PUSH_GUIDE.md # This guide
```

## Push commands

```bash
git init
git add .
git commit -m "Build ORVYN storefront"
git branch -M main
git remote add origin https://github.com/Tasawar-Sarfraz/orvyn-store.git
git push -u origin main
```

Generated folders such as `node_modules`, `.next`, `out`, screenshots, and TypeScript cache files are intentionally excluded from the GitHub package.
