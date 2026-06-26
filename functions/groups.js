/**
 * Cloudflare Pages Function — HTTP 410 Gone for the bare /groups path.
 *
 * Companion to functions/groups/[[path]].js (which covers /groups/<sub-paths>).
 * Most of the legacy spam lives at /groups/?ruay=<keyword> — i.e. the /groups
 * path itself with a query string — so this base handler is the critical one.
 *
 * See functions/groups/[[path]].js for the full rationale (legacy WordPress
 * "ruay" SEO-spam hack → 410 to purge ~63k URLs from Google's index).
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
