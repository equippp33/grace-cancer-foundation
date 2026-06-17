"use client";

import { useEffect, useState } from "react";

export function AnnouncementToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 z-40 -translate-x-1/2 px-4 w-full max-w-lg">
      <div className="animate-slide-in-up flex items-center gap-3 rounded-xl border border-[var(--color-rose-primary)]/20 bg-white px-4 py-2.5 shadow-2xl shadow-black/10">
        {/* Icon */}
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-rose-primary)]/10">
          <svg className="h-4 w-4 text-[var(--color-rose-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex flex-1 min-w-0 items-center gap-2 flex-wrap">
          <span className="rounded-full bg-[var(--color-rose-primary)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shrink-0">
            Latest Update
          </span>
          <p className="text-xs font-semibold text-[var(--color-navy)] truncate">
            Draft Fundraising Document is now live on NSE SSE
          </p>
          <a
            href="https://nsearchives.nseindia.com//web/mediaattachment/2026-06/SSE_GRACE_FOUNDATION_FRD_16th_June_2026.docx_20260617132229.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[var(--color-rose-primary)] hover:underline"
          >
            View
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setVisible(false)}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-500"
          aria-label="Dismiss"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
