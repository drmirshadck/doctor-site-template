/* DotCom by Arshees — shared booking service for STARTER websites (Cloudflare Worker).
 *
 * Starter sites have no helper of their own. This one small worker serves the own booking
 * screen (book.js) for all of them, using only each doctor's PUBLIC Cal.com username —
 * no Cal.com keys are needed or stored, and no patient data is kept.
 *
 * Var SITES_JSON: one entry per website origin -> its doctors' Cal.com usernames, e.g.
 *   {"https://drsample.com": {"main": "drsample-abc123"},
 *    "https://www.drsample.com": {"main": "drsample-abc123"},
 *    "https://clinic.com": {"anish": "anish-xyz", "sariga": "sariga-xyz"}}
 *   ("main" is the doctor id for one-doctor sites; with several doctors use the ids from config.js.)
 * KV binding BOOK (optional): limits bookings per connection.
 */
import { bookRoute, isBookPath } from "./book.js";

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const p = url.pathname.replace(/\/+$/, "") || "/";
    if (p === "/health") return new Response('{"ok":true}', { headers: { "Content-Type": "application/json" } });
    const sites = parse(env.SITES_JSON);
    const origin = req.headers.get("origin") || "";
    const site = Object.prototype.hasOwnProperty.call(sites, origin) ? sites[origin] : null;
    const cors = site ? { "Access-Control-Allow-Origin": origin, "Vary": "Origin", "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" } : null;
    if (req.method === "OPTIONS") return new Response(null, { status: cors ? 204 : 403, headers: cors || {} });
    let r;
    try {
      if (!site) throw Object.assign(new Error("Not allowed."), { status: 403, publicMessage: "Not allowed." });
      if (!isBookPath(p)) throw Object.assign(new Error("Not found."), { status: 404, publicMessage: "Not found." });
      r = await bookRoute(req, url, p, async id => {
        const u = Object.prototype.hasOwnProperty.call(site, id) ? site[id] : (id === "main" && Object.keys(site).length === 1 ? Object.values(site)[0] : "");
        return /^[a-z0-9._-]{2,80}$/i.test(String(u || "")) ? { key: "", username: u } : null;
      }, env.BOOK);
    } catch (e) {
      r = new Response(JSON.stringify({ error: e.publicMessage || "Something went wrong. Please try again." }), { status: e.status || 500, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
    }
    if (cors) for (const [k, v] of Object.entries(cors)) r.headers.set(k, v);
    return r;
  }
};
function parse(s) { try { const o = JSON.parse(s || "{}"); return o && typeof o === "object" ? o : {}; } catch (e) { return {}; } }
