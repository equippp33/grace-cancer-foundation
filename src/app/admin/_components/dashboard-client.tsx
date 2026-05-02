"use client";

import { useState, useMemo } from "react";

type Expression = {
  id: number;
  name: string;
  email: string;
  phone: string;
  amount: number;
  createdAt: Date;
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export function DashboardClient({ data }: { data: Expression[] }) {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");

  const filtered = useMemo(() => {
    return data.filter((e) => {
      // Search: name, email, phone
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.phone.includes(q);
        if (!match) return false;
      }

      // Date from
      if (dateFrom) {
        if (new Date(e.createdAt) < new Date(dateFrom)) return false;
      }

      // Date to — include full day
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        if (new Date(e.createdAt) > end) return false;
      }

      // Amount min
      if (amountMin && e.amount < Number(amountMin)) return false;

      // Amount max
      if (amountMax && e.amount > Number(amountMax)) return false;

      return true;
    });
  }, [data, search, dateFrom, dateTo, amountMin, amountMax]);

  const totalAmount = filtered.reduce((s, e) => s + e.amount, 0);
  const avgAmount = filtered.length ? Math.round(totalAmount / filtered.length) : 0;
  const highest = filtered.length ? Math.max(...filtered.map((e) => e.amount)) : 0;

  const hasFilters = search || dateFrom || dateTo || amountMin || amountMax;

  function clearFilters() {
    setSearch("");
    setDateFrom("");
    setDateTo("");
    setAmountMin("");
    setAmountMax("");
  }

  return (
    <>
      {/* Stats — reflect filtered data */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Expressions" value={String(filtered.length)} sub={`of ${data.length} total`} color="var(--color-navy)" />
        <StatCard label="Total Pledged" value={fmt(totalAmount)} color="var(--color-rose-primary)" />
        <StatCard label="Average Pledge" value={fmt(avgAmount)} color="var(--color-green-accent)" />
        <StatCard label="Highest Pledge" value={fmt(highest)} color="var(--color-blue-deep)" />
      </div>

      {/* Filter bar */}
      <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-3">
          {/* Search */}
          <div className="min-w-[200px] flex-1">
            <label className="mb-1 block text-xs font-medium text-gray-400 uppercase tracking-wide">
              Search
            </label>
            <div className="relative">
              <svg
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Name, email, phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pr-3 pl-9 text-sm focus:border-[var(--color-rose-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Date from */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400 uppercase tracking-wide">
              From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none transition-all"
            />
          </div>

          {/* Date to */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400 uppercase tracking-wide">
              To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none transition-all"
            />
          </div>

          {/* Amount min */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400 uppercase tracking-wide">
              Min ₹
            </label>
            <input
              type="number"
              placeholder="10000"
              value={amountMin}
              onChange={(e) => setAmountMin(e.target.value)}
              className="w-28 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none transition-all"
            />
          </div>

          {/* Amount max */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400 uppercase tracking-wide">
              Max ₹
            </label>
            <input
              type="number"
              placeholder="500000"
              value={amountMax}
              onChange={(e) => setAmountMax(e.target.value)}
              className="w-28 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none transition-all"
            />
          </div>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>

        {hasFilters && (
          <p className="mt-2 text-xs text-gray-400">
            Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of {data.length} expressions
          </p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-[var(--color-navy)]">
            Expressions of Support
          </h2>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
            {filtered.length} {hasFilters ? "matching" : "total"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/80 text-left">
                {["#", "Name", "Email", "Phone", "Amount", "Date"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-xs font-semibold tracking-wide text-gray-400 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                    {hasFilters ? "No expressions match your filters." : "No expressions yet."}
                  </td>
                </tr>
              )}
              {filtered.map((e, i) => (
                <tr key={e.id} className="transition-colors hover:bg-gray-50/60">
                  <td className="px-6 py-4 text-gray-300">{i + 1}</td>
                  <td className="px-6 py-4 font-medium text-[var(--color-navy)]">{e.name}</td>
                  <td className="px-6 py-4 text-gray-500">{e.email}</td>
                  <td className="px-6 py-4 text-gray-500">{e.phone}</td>
                  <td className="px-6 py-4 font-semibold text-emerald-600">{fmt(e.amount)}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(e.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="border-t border-gray-50 px-6 py-3 text-right text-xs text-gray-400">
            {hasFilters && "Filtered "}total pledged:{" "}
            <span className="font-semibold text-emerald-600">{fmt(totalAmount)}</span>
          </div>
        )}
      </div>
    </>
  );
}

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">{label}</p>
      <p className="mt-2 text-2xl font-bold" style={{ color }}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-300">{sub}</p>}
    </div>
  );
}
