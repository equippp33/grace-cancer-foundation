"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { api } from "@/trpc/react";

export default function ExpressPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [chatOpen, setChatOpen] = useState(true);
  const [feedItems, setFeedItems] = useState<Array<{ id: number; name: string; amount: number; createdAt: Date; animKey: number }>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const feedIndexRef = useRef(0);
  const animKeyRef = useRef(0);
  const burstDoneRef = useRef(false);

  const utils = api.useUtils();

  const { data: expressions } = api.expression.getAll.useQuery(undefined, {
    refetchInterval: 5000,
  });

  const expressionsRef = useRef(expressions);
  expressionsRef.current = expressions;

  const createExpression = api.expression.create.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setAmount("");
      setError("");
      void utils.expression.getAll.invalidate();
      setTimeout(() => setSuccess(false), 4000);
    },
  });

  // Continuously feed expressions one by one, looping forever
  useEffect(() => {
    if (!expressions?.length) return;

    const addNext = () => {
      const list = expressionsRef.current;
      if (!list?.length) return;

      const idx = feedIndexRef.current % list.length;
      const exp = list[idx]!;
      animKeyRef.current += 1;

      setFeedItems((prev) => {
        const next = [
          ...prev,
          { ...exp, createdAt: new Date(exp.createdAt), animKey: animKeyRef.current },
        ];
        if (next.length > 50) return next.slice(-50);
        return next;
      });

      feedIndexRef.current += 1;
    };

    // Initial burst — show a few quickly on first load
    if (!burstDoneRef.current) {
      burstDoneRef.current = true;
      const burst = Math.min(expressions.length, 5);
      for (let i = 0; i < burst; i++) {
        setTimeout(() => addNext(), i * 200);
      }
    }

    // Keep adding one every 3 seconds forever
    const interval = setInterval(addNext, 3000);
    return () => clearInterval(interval);
  }, [expressions]);

  // Auto-scroll to bottom when new items appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [feedItems.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parsed = parseInt(amount);
    if (!parsed || parsed < 10000) {
      setError("Minimum amount is ₹10,000");
      return;
    }
    if (parsed % 10000 !== 0) {
      setError("Amount must be a multiple of ₹10,000");
      return;
    }
    createExpression.mutate({ name, email, phone, amount: parsed });
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="shrink-0 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/">
            <Image
              src="/website-logo-300x92.png"
              alt="Grace Cancer Foundation"
              width={180}
              height={55}
              className="h-9 w-auto sm:h-10"
              priority
            />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-500 transition-all hover:border-gray-300 hover:text-[var(--color-navy)]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Home
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 sm:px-6">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5">
          <svg
            className="h-3.5 w-3.5 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-xs font-semibold text-amber-700">
            Social Stock Exchange (SSE)
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-center font-serif text-3xl font-bold text-[var(--color-navy)] sm:text-4xl">
          Express Your Support
        </h1>
        <p className="mb-8 max-w-md text-center text-sm leading-relaxed text-gray-500">
          Grace Cancer Foundation is listing on SEBI&apos;s Social Stock
          Exchange. Pledge your contribution for a cancer-free world.
        </p>

        {/* Form card */}
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
            {success && (
              <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Your expression has been recorded!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[var(--color-navy)] placeholder-gray-400 transition-all focus:border-[var(--color-rose-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none"
                />
              </div>

              {/* Email & Phone row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[var(--color-navy)] placeholder-gray-400 transition-all focus:border-[var(--color-rose-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 uppercase">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9000011223"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[var(--color-navy)] placeholder-gray-400 transition-all focus:border-[var(--color-rose-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none"
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Amount (in multiples of ₹10,000)
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm font-semibold text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    required
                    min={10000}
                    step={10000}
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setError("");
                    }}
                    placeholder="10000"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-8 text-sm text-[var(--color-navy)] placeholder-gray-400 transition-all focus:border-[var(--color-rose-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none"
                  />
                </div>
                {error && (
                  <p className="mt-1.5 text-xs text-red-500">{error}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={createExpression.isPending}
                className="mt-2 w-full rounded-xl bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-md shadow-[var(--color-rose-primary)]/20 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-[var(--color-rose-primary)]/25 disabled:opacity-50"
              >
                {createExpression.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Express"
                )}
              </button>

              {createExpression.isError && (
                <p className="text-center text-xs text-red-500">
                  {createExpression.error.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Floating chat-style expressions panel */}
      <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
        {chatOpen ? (
          <div className="flex h-[400px] w-[320px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:w-[360px]">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-rose-primary)]/10">
                    <svg className="h-4 w-4 text-[var(--color-rose-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-green-accent)] opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--color-green-accent)]" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-navy)]">
                    Live Expressions
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {expressions?.length ?? 0} supporters
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
                aria-label="Minimize"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body — live feed style */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              {!expressions?.length ? (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <svg className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">No expressions yet</p>
                  <p className="text-xs text-gray-300">Be the first to express!</p>
                </div>
              ) : (
                <div className="flex flex-col justify-end min-h-full">
                  {feedItems.map((exp, i) => (
                    <div
                      key={exp.animKey}
                      className="animate-slide-in-up flex items-center gap-3 px-4 py-2.5"
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{
                          backgroundColor: [
                            "var(--color-rose-primary)",
                            "var(--color-green-accent)",
                            "var(--color-blue-deep)",
                            "var(--color-yellow-accent)",
                          ][i % 4],
                        }}
                      >
                        {exp.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <p className="truncate text-sm font-semibold text-[var(--color-navy)]">
                            {exp.name}
                          </p>
                          <span className="shrink-0 text-[10px] text-gray-300">
                            {getTimeAgo(exp.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          expressed{" "}
                          <span className="font-bold text-emerald-600">
                            {formatCurrency(exp.amount)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="group flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-2.5 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-rose-primary)]/10">
              <svg className="h-4 w-4 text-[var(--color-rose-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-green-accent)] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-green-accent)]" />
              </span>
            </div>
            <span className="text-sm font-medium text-[var(--color-navy)]">
              {expressions?.length ?? 0} Expressions
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}
