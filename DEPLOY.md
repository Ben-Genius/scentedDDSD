# Deployment Guide

## Cloudflare (current)

Connect the GitHub repo in Cloudflare → Workers & Pages → Create → Import a repository.

- Build command: `bun run build`
- Deploy command (Workers): `npx wrangler deploy` (uses `wrangler.jsonc`, which serves `dist/` with SPA fallback)
- Output directory (Pages only): `dist`
- Build variable: `VITE_WHATSAPP_PHONE_NUMBER` (set under **Build** variables; Vite reads it at build time, not at runtime)

## Vercel (Recommended)

1. Connect your GitHub repository to Vercel.
2. Vercel will detect Vite.
3. Override Build Command (if needed): `bun run build` (or `npm run build` if not using Bun on Vercel image, but Vercel supports Bun).
   - If using Bun on Vercel: Settings > General > Install Command: `bun install`
4. Deploy.

## Netlify

1. Drag and drop `dist/` folder after building locally, or connect Git.
2. Build command: `bun run build`
3. Publish directory: `dist`

## Static Hosting

This is a Single Page Application (SPA). Ensure your host directs all routes to `index.html`.
