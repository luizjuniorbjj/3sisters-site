'use client';

/**
 * ChatWidget — floating website chat for 3 Sisters Services.
 *
 * Talks to the SAME-ORIGIN Pages Function /api/chat, which proxies to the
 * clawtobusiness public bot (BusinessChatService for "3-sisters-services").
 * Isolated, anonymous, AbuseGuard-protected — safe for public use.
 *
 * Design: matches the site (Tailwind, blue-600 primary, Outfit/Inter).
 * Positioned above MobileStickyCta on small screens.
 */

import { useEffect, useRef, useState } from 'react';

type Msg = { role: 'user' | 'bot'; text: string };

const AGENT_NAME = '3S Assistant';
const AGENT_ROLE = 'Cleaning Assistant';
const GREETING =
  "Hi! 👋 I can help you book a cleaning, get a custom quote, or answer questions about 3 Sisters Services. How can I help?";
const PLACEHOLDER = 'Ask me to book a cleaning...';
const SID_KEY = '3s_chat_sid';
const MSGS_KEY = '3s_chat_msgs';
const OPEN_KEY = '3s_chat_open';

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const sidRef = useRef('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // session_id + conversation + open-state live in sessionStorage: they persist
    // across page navigations and reloads within the same browser session (so the
    // chat "follows" the visitor between pages and stays open with its history),
    // and clear automatically when the visitor closes the browser.
    const gen = () =>
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 's_' + Date.now().toString(36) + Math.random().toString(36).slice(2);
    try {
      let s = sessionStorage.getItem(SID_KEY) || '';
      if (!s) {
        s = gen();
        sessionStorage.setItem(SID_KEY, s);
      }
      sidRef.current = s;

      const savedMsgs = sessionStorage.getItem(MSGS_KEY);
      if (savedMsgs) {
        const parsed = JSON.parse(savedMsgs);
        if (Array.isArray(parsed) && parsed.length) setMsgs(parsed);
      }
      if (sessionStorage.getItem(OPEN_KEY) === '1') setOpen(true);
    } catch {
      sidRef.current = gen();
    }
  }, []);

  // Persist conversation + open-state so the widget survives page navigation.
  useEffect(() => {
    try {
      sessionStorage.setItem(MSGS_KEY, JSON.stringify(msgs));
    } catch {
      /* ignore */
    }
  }, [msgs]);

  useEffect(() => {
    try {
      sessionStorage.setItem(OPEN_KEY, open ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  async function send() {
    const raw = input.trim();
    if (!raw || busy) return;
    setInput('');
    setMsgs((m) => [...m, { role: 'user', text: raw }]);
    setBusy(true);
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: raw, session_id: sidRef.current, lang: 'en' }),
      });
      const d = await r.json();
      // session_id is client-generated and STABLE — do NOT overwrite with the
      // backend echo (the demo endpoint re-hashes it each call, which would break
      // conversation continuity and visitor isolation).
      setMsgs((m) => [...m, { role: 'bot', text: d.response || 'Sorry, please try again.' }]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: 'bot', text: "We're having a brief connection issue — please try again." },
      ]);
    } finally {
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  return (
    <div className="fixed right-5 bottom-20 lg:bottom-6 z-[60] font-inter">
      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label={`${AGENT_NAME} chat`}
          className="absolute bottom-[72px] right-0 w-[min(360px,calc(100vw-32px))] max-h-[520px] flex flex-col rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-blue-600 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 font-outfit font-bold text-white">
              3S
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-outfit font-bold text-white leading-tight">{AGENT_NAME}</div>
              <div className="flex items-center gap-1.5 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Online · {AGENT_ROLE}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50 p-4 flex flex-col gap-2.5 min-h-[260px]">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'self-end max-w-[86%]' : 'self-start max-w-[86%]'}>
                <div
                  className={
                    m.role === 'user'
                      ? 'rounded-[14px_4px_14px_14px] bg-blue-600 px-3.5 py-2.5 text-sm text-white'
                      : 'rounded-[4px_14px_14px_14px] bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm'
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {busy && (
              <div className="self-start">
                <div className="rounded-[4px_14px_14px_14px] bg-white px-4 py-3 shadow-sm flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={500}
              placeholder={PLACEHOLDER}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              className="flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/40 transition"
              aria-label="Type your message"
            />
            <button
              type="button"
              onClick={send}
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white disabled:opacity-40 hover:brightness-110 transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16}>
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat with 3S Assistant'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:scale-105 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={22} height={22}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={24} height={24}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
