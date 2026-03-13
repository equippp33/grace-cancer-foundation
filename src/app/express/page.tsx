"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "@/trpc/react";

const AMOUNT_OPTIONS = [
  10000, 20000, 30000, 50000, 100000, 200000, 500000, 1000000,
];

export default function ExpressPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [success, setSuccess] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);

  const utils = api.useUtils();

  const createExpression = api.expression.create.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setAmount(10000);
      setCustomAmount("");
      setUseCustom(false);
      void utils.expression.getAll.invalidate();
      setTimeout(() => setSuccess(false), 4000);
    },
  });

  const { data: expressions } = api.expression.getAll.useQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = useCustom ? parseInt(customAmount) : amount;
    if (!finalAmount || finalAmount < 10000 || finalAmount % 10000 !== 0) {
      alert("Amount must be a multiple of ₹10,000 (minimum ₹10,000)");
      return;
    }
    createExpression.mutate({ name, email, phone, amount: finalAmount });
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="shrink-0 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-rose-primary)] to-[var(--color-rose-dark)]">
              <span className="text-lg font-bold text-white">G</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[var(--color-navy)]">
                Grace Cancer
              </span>
              <span className="block text-[10px] tracking-widest text-[var(--color-rose-primary)] uppercase">
                Foundation
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 transition-colors hover:text-[var(--color-rose-primary)]"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      {/* Main content - no scroll */}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Page title */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-yellow-accent)]/30 bg-[var(--color-yellow-accent)]/10 px-4 py-1.5">
            <svg
              className="h-4 w-4 text-[var(--color-yellow-accent)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span className="text-sm font-semibold text-[var(--color-yellow-accent)]">
              Social Stock Exchange (SSE)
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[var(--color-navy)] sm:text-4xl">
            Express Your Support
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
            Grace Cancer Foundation is registering under SEBI&apos;s Social
            Stock Exchange. Express your interest by pledging a contribution.
          </p>
        </div>

        {/* Form card - centered */}
        <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
          {success && (
            <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              <strong>Thank you!</strong> Your expression has been recorded
              successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Email row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/20 focus:outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9000011223"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/20 focus:outline-none"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Amount (multiples of ₹10,000){" "}
                <span className="text-red-400">*</span>
              </label>
              <div className="mb-2 grid grid-cols-4 gap-2">
                {AMOUNT_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => {
                      setAmount(opt);
                      setUseCustom(false);
                    }}
                    className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-all ${
                      !useCustom && amount === opt
                        ? "border-[var(--color-rose-primary)] bg-[var(--color-rose-primary)] text-white shadow-md"
                        : "border-gray-200 text-gray-600 hover:border-[var(--color-rose-primary)] hover:text-[var(--color-rose-primary)]"
                    }`}
                  >
                    {formatCurrency(opt)}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="custom"
                  checked={useCustom}
                  onChange={(e) => setUseCustom(e.target.checked)}
                  className="h-4 w-4 rounded accent-[var(--color-rose-primary)]"
                />
                <label htmlFor="custom" className="text-xs text-gray-500">
                  Custom amount
                </label>
              </div>
              {useCustom && (
                <input
                  type="number"
                  min={10000}
                  step={10000}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="e.g. 40000"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/20 focus:outline-none"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={createExpression.isPending}
              className="animate-pulse-glow w-full rounded-xl bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] px-6 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
            >
              {createExpression.isPending ? "Submitting..." : "Express"}
            </button>

            {createExpression.isError && (
              <p className="text-sm text-red-500">
                {createExpression.error.message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Floating chat-style expressions panel - bottom right */}
      <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
        {chatOpen ? (
          <div className="flex h-[420px] w-[340px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:w-[380px]">
            {/* Chat header */}
            <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Expressions of Support
                  </p>
                  <p className="text-[10px] text-white/70">
                    {expressions?.length ?? 0} people expressed
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Minimize"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Chat body - scrollable */}
            <div className="flex-1 overflow-y-auto">
              {!expressions?.length ? (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                    <svg
                      className="h-6 w-6 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">
                    No expressions yet.
                  </p>
                  <p className="text-xs text-gray-300">
                    Be the first to express!
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {expressions.map((exp, i) => (
                    <div
                      key={exp.id}
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50/50"
                    >
                      {/* Avatar */}
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
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

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[var(--color-navy)]">
                          {exp.name}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {new Date(exp.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      {/* Amount */}
                      <span className="shrink-0 rounded-full bg-[var(--color-green-accent)]/10 px-2.5 py-1 text-xs font-bold text-[var(--color-green-accent)]">
                        {formatCurrency(exp.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Collapsed bubble */
          <button
            onClick={() => setChatOpen(true)}
            className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] py-3 pr-5 pl-3 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">
              Expressions ({expressions?.length ?? 0})
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
