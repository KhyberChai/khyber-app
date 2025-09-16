# Khyber Chai House – Mobile App

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Build
```bash
npm run build
```
The static site is in `dist/`.

## Deploy to GitHub Pages (subdomain like app.khyberchai.com)
1. Push this repo to GitHub.
2. Settings → Pages → Deploy from branch → pick `main` and `/ (root)` (Vite builds to `dist`).
3. Or use a GitHub Action for Pages – but easiest is Cloudflare Pages (below).

## Deploy to Cloudflare Pages
1. Create a new Pages project → Connect to GitHub → this repo.
2. Framework: `Vite` (or `None`) — Build command: `npm run build` — Output dir: `dist`.
3. After first deploy, go to **Pages → Custom domains** → Add `app.khyberchai.com`.

## DNS (Cloudflare)
- If hosting on **Cloudflare Pages** → Add a **CNAME** for `app` pointing to `<your-project>.pages.dev` (Proxied = ON).
- If hosting on **GitHub Pages** → Add a **CNAME** for `app` pointing to `YOUR-USER.github.io` (Proxy ON). In your GitHub repo, set Custom Domain to `app.khyberchai.com` (this creates/uses a `CNAME` file).
- Enable **SSL**: Cloudflare Dashboard → SSL/TLS → Mode **Full**. Optional: turn on **Always Use HTTPS** and **Automatic HTTPS Rewrites**.

The app already includes a simple PWA (service worker + manifest) injected at runtime.
