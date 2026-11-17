# DotCom by Arshees – shared booking service (Starter)

Lets Starter websites show their **own** date/time picker and booking form instead of the Cal.com window.
Cal.com still does the real work behind the scenes (free times, no double-booking, confirmation emails).
No Cal.com keys are needed and no patient data is stored.

## One-time setup
1. Cloudflare → Workers & Pages → Create → Import a repository → this repo, root directory `booking-proxy`,
   deploy command `npx wrangler deploy`. Worker name: `dotcom-by-arshees-booking`.
2. (Optional) Storage → KV → create `dotcom-by-arshees-booking`, put its id in `wrangler.toml` (binding `BOOK`).

## For every new Starter website
1. In `wrangler.toml`, add the site to `SITES_JSON` — both `https://domain` and `https://www.domain`, each
   `{"main": "<doctor's Cal.com username>"}` (several doctors: one entry per doctor id from config.js).
2. Commit → Cloudflare redeploys by itself.
3. In the site's `config.js` set `booking.url` to `https://dotcom-by-arshees-booking.<account>.workers.dev`.
4. Book a test appointment on the live site, then cancel it in Cal.com.

If the service can't be reached, the site automatically falls back to the Cal.com calendar.
