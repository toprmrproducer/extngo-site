# Extngo, project notes

> Read this file FIRST before touching code. Update it any time you change folder structure, add a component, or change deployment.

## What this is

Next.js 15 (App Router) marketing site + Shopify-backed storefront for **EXTNGO**, the retractable flat CAT6 ethernet cable reel. Brand color is orange `#E8431A` (`var(--accent)`). Fonts are Bricolage Grotesque (`--font-bricolage`, display) and Geist (`--font-geist`, body).

- Live (Vercel): https://extngo-eight.vercel.app
- GitHub: https://github.com/Abhinav-Chauhan1/Extngo
- Shopify store: https://extngo.myshopify.com (admin: `admin.shopify.com/store/extngo`)
- Custom domain: https://extngo.com

## Local path

Project root: `~/iCloud/website/extango/` (real path: `~/Library/Mobile Documents/com~apple~CloudDocs/website/extango/`). Per the iCloud rule, `node_modules` and `.next` are symlinks to `.nosync` siblings so iCloud doesn't sync them. After `git pull` on a new machine, run `npm install` to regenerate the `.nosync` folders.

## Stack

- Next.js 15.1 (App Router, RSC + selective `'use client'`)
- React 18.3
- TypeScript 5.6
- Tailwind 4 + custom CSS via `globals.css`
- `framer-motion` 12 (lazy-loaded via `LazyMotion`)
- `next/image` for optimized images
- Shopify Storefront Web Components (CDN script, no npm)

## Folder structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — fonts, Shopify script, ShopifyRoot, ChatbotWidget
│   ├── page.tsx                # Landing page — Hero, ProductDetail, WhoItsFor, Testimonials, Cta, Footer
│   ├── globals.css             # Global styles + CSS vars (--accent, --ink, etc.)
│   ├── sitemap.ts
│   ├── shop/                   # NEW — Shopify-backed storefront
│   │   ├── page.tsx            # /shop server component (metadata + layout)
│   │   └── ShopifyStorefront.tsx  # 'use client' — product cards, collection grid, modal
│   └── blog/                   # Blog list + article pages
├── components/
│   ├── NavBar.tsx              # Fixed nav; LINKS array includes /shop
│   ├── HeroStatic.tsx + HeroInteractive.tsx  # Split-paint hero for LCP
│   ├── ProductDetail.tsx       # Hero product callout
│   ├── ProductDifferences.tsx
│   ├── PinnedProduct.tsx
│   ├── WhoItsFor.tsx, Testimonials.tsx, Cta.tsx, Footer.tsx
│   ├── ChatbotWidget.tsx
│   ├── B2BContactModal.tsx
│   ├── shopify/
│   │   └── ShopifyRoot.tsx     # Mounts global <shopify-store> + <shopify-cart>
│   └── blog/                   # Blog UI primitives
├── lib/
│   └── motion.ts               # Shared framer-motion variants
└── types/
    └── shopify.d.ts            # JSX declarations for <shopify-*> custom elements
```

## Shopify integration

The Shopify Storefront Web Components live at `https://cdn.shopify.com/storefront/web-components.js`. Loaded via `next/script` (strategy `afterInteractive`) in `app/layout.tsx`. Once loaded, every `<shopify-*>` custom element registers and hydrates on its own.

### Global mount — `components/shopify/ShopifyRoot.tsx`
- Mounts `<shopify-store store-domain="extngo.myshopify.com" public-access-token="..." country="US" language="en" />` once for the whole app — provides the store context.
- Mounts `<shopify-cart id="main-cart" />` — single cart shared by every page. Any "add to cart" anywhere calls `document.getElementById('main-cart').addLine(event).showModal()`.
- Carries brand styling via CSS parts: primary button uses `#E8431A` pill, secondary button is outlined.

### Shop page — `app/shop/`
- `page.tsx` is a server component: page header + `<NavBar />` + `<ShopifyStorefront />` + `<Footer />`.
- `ShopifyStorefront.tsx` is a client component. Templates inside `<shopify-context>` are passed via `dangerouslySetInnerHTML` on `<template>` — required because Shopify's web components parse the template HTML at runtime, and React would otherwise interpret it as React children.
- Two product hero cards (50ft + 33ft handles), then a `frontpage` collection grid, then a quick-view `<dialog>` keyed off `id="product-modal"`.
- Buttons inline `onclick` to call `document.getElementById('main-cart').addLine(event).showModal()` (cart) or `document.querySelector('shopify-store').buyNow(event)` (checkout).

### Real product handles (live data, queried via Storefront API)
- 50ft / 15m — `extngo-retractable-ethernet-cable-50-feet-15-meter-cat6-flat-internet-extension-cord-reel-portable-1-gbps-data-speed-swiftly-setup-extend-networks-male-female-rj-45-connector-utp-extender` — $79.99 USD
- 33ft / 10m — `retractable-network-cable-extender-33-feet-10-meter-cat-6-ethernet-cable-flat-portable-1-gbps-data-speed-swiftly-setup-temp-networks-cascadable-male-female-rj45-connector-utp-cable-reel` — $69.99 USD
- Collection: `frontpage` (the only collection currently in the store)

### Tokens
- Public access token: hard-coded in `src/components/shopify/ShopifyRoot.tsx`. This is a Shopify Storefront API public access token — designed to be exposed client-side. Rotate in Shopify admin → Headless channel → Storefront API.
- Private access token (server-side only): **NOT in repo.** Get from Shopify admin → Headless channel → Storefront API → "Private access token". Store in `.env.local` as `SHOPIFY_PRIVATE_ACCESS_TOKEN=...`. Never commit.

### TypeScript
`src/types/shopify.d.ts` declares JSX intrinsics for every Shopify custom element. Keep it in sync if you start using more components (e.g. `shopify-search-context`).

## Patterns to follow

- Match the brand: orange `#E8431A` + ink `#1A1A1A` + Bricolage display + Geist body. Pills are `border-radius: 999px`. Drop shadows on primary CTAs use `rgba(232,67,26,.28-.4)`.
- Heavy components (anything below the fold) are lazy-loaded via `next/dynamic`. Keep that pattern.
- Animations use the shared variants in `lib/motion.ts`; don't reinvent.
- For new Shopify product surfaces, follow the `ShopifyStorefront.tsx` pattern: template HTML in `dangerouslySetInnerHTML`, client onclick to the global `main-cart`.

## Dev / build / deploy

```bash
npm install            # creates node_modules; then mv node_modules node_modules.nosync && ln -s node_modules.nosync node_modules
npm run dev            # localhost:3000
npm run build && npm start
```

### Production: Netlify (primary, last rewired 5 Jun 2026 evening)

- Production URL: https://extngo-cable-385.netlify.app
- Site ID: `51a6cbd4-1727-4e68-8e1d-ca501099bd10`
- Team: `toprmrproducer's team`
- Linked repo: `toprmrproducer/extngo-site`, branch `main` (fresh non-fork repo, single contributor)
- Build approach: local from `/tmp/extngo-build` to dodge the iCloud `.next.nosync` symlink that breaks Next standalone tracing. `rsync` source out of iCloud, `npm install`, `netlify deploy --prod` from there.
- Build command: `npm run build`, publish dir: `.next`, Node 20
- Plugin: `@netlify/plugin-nextjs` declared in `netlify.toml`
- **Build server-side, not locally.** Local `next build` hangs at "Collecting build traces" because iCloud-stat'ing every node_module file deadlocks the trace collector. The Netlify build runner doesn't have iCloud so the build completes in ~75s.
- Trigger a manual rebuild from local: `rsync -a --exclude node_modules* --exclude .next* --exclude .git "<iCloud path>/" /tmp/extngo-build/ && cd /tmp/extngo-build && npm install && netlify deploy --prod`.
- Once the Netlify GitHub App is installed on `toprmrproducer/extngo-site` (30 sec, Shreyas does it from app.netlify.com), pushes auto-deploy and the rsync step goes away.
- The site does NOT have GitHub App auto-deploy on push set up (no `installation_id`). To get automatic deploys on every push, install the Netlify GitHub App on the repo. For now, push then trigger a build via the API command above.

### TypeScript gotcha for Netlify builds

`tsconfig.json` must exclude `node_modules.nosync` and `.next.nosync`. Otherwise `next build` tries to typecheck files inside symlink targets and fails on `fastq/test/example.ts` and similar. Source of truth:

```json
"include": ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx", ".next/types/**/*.ts"],
"exclude": ["node_modules", "node_modules.nosync", ".next", ".next.nosync"]
```

### Legacy: Vercel

The original Vercel project at https://extngo-eight.vercel.app is wired to `Abhinav-Chauhan1/Extngo` upstream (Abhinav's account, Shreyas does not have access). It still serves traffic but does not receive the changes Shreyas pushes to `toprmrproducer/Extngo`. Plan: once Bakir verifies the Netlify site, transfer GitHub repo ownership to him so he can connect his own Vercel or keep Netlify.

## Routes

- `/` — landing
- `/shop` — Shopify storefront (added 4 Jun 2026)
- `/blog`, `/blog/[slug]` — blog
- `/sitemap.xml` — generated from `src/app/sitemap.ts`

## Buy Now flow (zero redirect, all via Storefront Web Components)

Every Buy Now CTA on the site is wired to the global `<shopify-cart id="main-cart">` mounted in `ShopifyRoot`. Clicks open the cart in place; the user stays on the marketing page until they hit CHECKOUT inside the cart modal. No `extngo.com/products/...` redirects, no Amazon affiliate links.

### How it works
- `ShopifyRoot` mounts two **hidden `<shopify-context>` triggers**, one per Shopify SKU. Each trigger's `<template>` contains a sr-only `<button data-shopify-buy="KEY">` whose inline `onclick` runs `document.getElementById('main-cart').addLine(event).showModal()`. Because the trigger lives inside a product context, the cart knows which product to add.
- `src/lib/shopify-buy.ts` exposes `buyShopify(key: BuyKey)`. It dispatches a click to the matching hidden trigger. Any visible Buy Now button on the site calls `buyShopify('cable50ft' | 'cable33ft' | 'cableBlue')`.
- `cableBlue` falls back to `window.location.href = '/shop'` (no Shopify SKU yet for the Blue Edition).

### Adding a new SKU
1. Add the handle in `PRODUCT_HANDLES` (src/lib/shopify-buy.ts).
2. Add the matching `<shopify-context>` trigger block in `ShopifyRoot.tsx`.
3. Add the new key to the `BuyKey` union.
4. Use `buyShopify('newKey')` from any component.

### Where the visible buttons live
HeroStatic, HeroSafe (Hero variants), ProductDetail, ProductDifferences (3 cards), Cta, WhoItsFor (desktop + mobile), Footer (Product column entries), products/blue/page (hero CTA + bottom CTA), and the `/shop` template-driven cards.

## Gotchas

- `<body>` carries `suppressHydrationWarning` in `app/layout.tsx`. Don't remove it. Browser extensions (Brave especially) inject a `style` attribute on body and cause a React hydration warning otherwise. If you ever need to debug a real body-level mismatch, temporarily remove the prop, reproduce, and restore.
- **Stale browser chunk after a dev restart**: this project lives in iCloud Drive. After a Next dev restart, the browser's disk cache can keep serving the previous `_next/static/chunks/app/page.js` even though the dev server has a fresh one. Symptom: SSR HTML is correct but client renders the old tree and React fires a hydration warning. Fix: hard refresh (Cmd+Shift+R in Brave) or in Playwright `await page.evaluate('() => location.reload()')` after re-navigating. Confirm with `fetch('/_next/static/chunks/app/page.js', { cache: 'reload' })` then `.text()` to see if your latest string is in the chunk.
- **Blue Edition is not for sale yet**. CTAs across `ProductDifferences` (Blue card) and `/products/blue` are disabled "Coming Soon" buttons. When Blue ships on Shopify, add the handle to `PRODUCT_HANDLES` in `src/lib/shopify-buy.ts`, mount its `<shopify-context>` trigger in `ShopifyRoot`, restore `buyKey: 'cableBlue'` on the Blue product entry in `ProductDifferences`, and swap the disabled buttons on `/products/blue` back to `<button onClick={() => buyShopify('cableBlue')}>`. Remove the `comingSoon` flag.

## Recent changes

- **4 Jun 2026** — Project relocated to `~/iCloud/website/extango/` (was `~/Desktop/extango/Extngo/`). Added Shopify Storefront Web Components: global store/cart in `ShopifyRoot`, new `/shop` page with both real products + frontpage collection + quick-view modal. NavBar gained a "Shop" link. PROJECT.md written.
