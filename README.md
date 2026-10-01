# Piers 2U website (pierstoyou.com)

Next.js 14 site for Karni-Pier LLC dba Piers 2U!, replacing the Webflow site. Built to deploy on Vercel.

## What's dynamic

| Feature | How it works |
| --- | --- |
| **Contact form** (`/contact`) | Posts to `/api/contact`, which emails the submission (with any photos attached) through Resend. Reply-to is set to the customer. Spam is filtered with a honeypot field, a minimum fill time and a link limit. |
| **Classifieds** (`/classifieds`) | Listings live in Vercel Blob. The page rebuilds as soon as a listing is saved. |
| **Classifieds admin** (`/admin`) | Password login. Scott can add, edit, reorder, mark sold and delete listings, and upload a photo from his phone. |

## Launch checklist

1. **Vercel project**: import this repo.
2. **Blob store**: Vercel → Storage → Create → Blob → connect it to the project. This adds `BLOB_READ_WRITE_TOKEN`.
3. **Environment variables** (Project → Settings → Environment Variables; see `.env.example`):
   - `ADMIN_PASSWORD`: Scott's admin password
   - `ADMIN_SESSION_SECRET`: output of `openssl rand -hex 32`
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`: where inquiries go (comma-separate multiple)
   - `CONTACT_FROM_EMAIL`: e.g. `Piers 2U Website <website@pierstoyou.com>`
4. **Resend**: add and verify `pierstoyou.com` (DNS records) so the form can send from it.
5. **Domain**: point `pierstoyou.com` / `www.pierstoyou.com` at Vercel.
6. **Smoke test**: send a contact form with a photo, then add and delete a test listing at `/admin`.

Until the first save in `/admin`, the classifieds page shows the listings copied from the old Webflow site (`src/lib/classifieds.ts`).

## For Scott: managing classifieds

1. Go to **pierstoyou.com/admin** and sign in.
2. **+ Add Listing**: add a photo (optional), title, description and price ("Call for quote" works), then save. New listings go to the top.
3. **Mark Sold / Mark For Sale**: moves an item between "Available Now" and "Recently Sold".
4. **↑ / ↓**: changes the order on the page.
5. **Edit / Delete**: delete asks you to confirm first.

Changes show up on the public page right away.

## Local development

```bash
cp .env.example .env.local   # set ADMIN_PASSWORD at minimum
npm install
npm run dev
```

Without `BLOB_READ_WRITE_TOKEN`, classifieds are stored in `.data/classifieds.json` and photos go to `public/uploads/` (both git-ignored). Without the Resend variables, the contact form returns an error telling visitors to call.
