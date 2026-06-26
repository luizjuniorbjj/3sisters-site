/**
 * Cloudflare Pages Function — HTTP 410 Gone for /groups/*
 *
 * The legacy WordPress site at this domain was compromised with an SEO spam
 * injection (the "ruay" doorway-page hack) that generated tens of thousands of
 * /groups/?ruay=<keyword> URLs. Those pages are dead on the new static site
 * (they already 404), but Google still has ~63k of them in its index from the
 * WordPress era.
 *
 * Returning 410 Gone (instead of a soft 404) tells Google these URLs are
 * permanently removed, so they are dropped from the index far faster than 404s.
 *
 * IMPORTANT — do NOT redirect this spam to the homepage or any real page:
 * that would pass the spam's signals into the live site. 410 is the correct,
 * non-manipulative signal. Keep /groups/ crawlable in robots.txt so Googlebot
 * can re-crawl and SEE the 410.
 *
 * This catch-all handles /groups/<anything> (incl. the trailing-slash base
 * /groups/?ruay=... that carries the spam query string). The sibling
 * functions/groups.js handles the bare /groups path.
 */

export function onRequest() {
  return new Response(
    "410 Gone — this URL no longer exists.\n" +
      "Visit https://3sistersservices.com/ for 3 Sisters Services.\n",
    {
      status: 410,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex",
        "cache-control": "public, max-age=3600",
      },
    }
  );
}
