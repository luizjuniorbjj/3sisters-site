/**
 * Cloudflare Pages Function — POST /api/chat
 *
 * Bridges the website chat widget (3sistersservices.com) to the clawtobusiness
 * public chat endpoint. The browser calls this SAME-ORIGIN route, and this
 * Function forwards the message server-side to the demo-chat endpoint — so there
 * is ZERO CORS (the backend never sees a cross-origin browser request).
 *
 * The bot is the per-business BusinessChatService for "3-sisters-services":
 * isolated to this business, anonymous visitor, with AbuseGuard + prompt-level
 * security rules. No auth, no secrets handled here.
 *
 * Mirrors the proxy pattern of functions/api/contact.js.
 */

const UPSTREAM = 'https://clawtobusiness.com/api/b/3-sisters-services/demo-chat';

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequestPost({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ response: 'Invalid request.' }, 400);
  }

  const message = String((body && body.message) || '').slice(0, 500).trim();
  if (!message) return json({ response: 'Please type a message.' }, 400);

  const payload = {
    message,
    session_id: String((body && body.session_id) || '').slice(0, 64),
    lang: String((body && body.lang) || 'en').slice(0, 5),
  };

  // Forward the visitor's real IP so the backend's rate-limit / abuse-guard
  // bucket per visitor instead of per (constant) Cloudflare egress IP.
  const visitorIp = request.headers.get('CF-Connecting-IP') || '';

  try {
    const r = await fetch(UPSTREAM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(visitorIp ? { 'X-Forwarded-For': visitorIp } : {}),
      },
      body: JSON.stringify(payload),
    });
    const data = await r.json().catch(() => ({}));
    // demo-chat returns { response, session_id, lead_captured }
    return json({
      response:
        (data && data.response) ||
        "Sorry, I had a brief problem. Please try again.",
      session_id: (data && data.session_id) || payload.session_id,
    });
  } catch {
    // Degrade gracefully — never surface a hard error to the visitor.
    return json({
      response:
        "We're having a brief connection issue — please try again in a moment, or call (657) 737-7171.",
      session_id: payload.session_id,
    });
  }
}
// Non-POST methods get an automatic 405 from Pages (no handler exported).
