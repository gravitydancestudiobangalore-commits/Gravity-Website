# Gravity Dance Academy website

Multi-page site for Gravity Dance Academy (Rajajinagar & Hebbal, Bengaluru). React + TypeScript + Vite + Tailwind v4 + React Router, animations with `motion`. No backend: the join form opens WhatsApp with a prefilled message.

## Pages
`/` Home · `/classes` Classes, timings & fees (branch switch) · `/achievements` · `/gallery` (videos + photos) · `/about` (Shekar Master) · `/branches` · `/join` (free demo form)

## Run
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static output in dist/
npm run preview   # serve the built dist/ locally to test it
```

## Edit content
Almost everything is in `src/data.ts`: phones, branches, batches, fees, achievements, photos, videos.
- **Fees:** each batch has `fee` (₹/month) and `adm` (₹1,500 admission applies). `PLANS` = Western dance fee by classes per week. Set `SHOW_FEES = false` to hide prices.
- **Add a YouTube clip:** add `{ id, title, vertical }` to `VIDEOS` and save its thumbnail as `public/images/gravity/yt/<id>.webp`.
- **Add a photo:** put a 640px and a 1280px WebP in `public/images/gravity/` named `<name>-640.webp` / `<name>-1280.webp`, then add it with `img('<name>')`. If it crops badly, give a focus point: `img('<name>', '50% 20%')`.
- **Check nothing is hidden or broken:** paste `scripts/visibility-audit.js` into the browser console on any page.

## Deploy (on the academy's own account)
The site is a plain static folder (`dist/`), so it works on any of these. Create the account with the academy's Gmail.

| Host | Commercial use on free plan | Page links work via |
|---|---|---|
| Netlify | Yes | `public/_redirects` (included) |
| Cloudflare Pages | Yes | `public/_redirects` (included) |
| Vercel | Hobby plan is non-commercial; Pro is paid | `vercel.json` (included) |

Settings on any host: build command `npm run build`, output folder `dist`, project folder `Code-file`.

**After the site has its final address** (e.g. `https://gravitydanceacademy.in`), edit `.env`:
```
VITE_SITE_URL=https://gravitydanceacademy.in
```
then rebuild and redeploy. This makes the WhatsApp/Instagram link-preview card point to the right place.

## Going live
- Done: Google indexing allowed (noindex removed, `robots.txt` allows all) and footer credit set to "Website by Bipin · +91 91083 16234".
- To do: connect the owner's domain, and set `VITE_SITE_URL` in `.env` to it.
- Update the Google Business Profile (hours 6:30 AM – 9:30 PM, photos, website link).
