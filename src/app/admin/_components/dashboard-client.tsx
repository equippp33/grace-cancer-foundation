"use client";

import { useState, useMemo } from "react";
import { api } from "@/trpc/react";

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
  const [rows, setRows] = useState<Expression[]>(data);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  const [editTarget, setEditTarget] = useState<Expression | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Expression | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", amount: "" });

  const updateMutation = api.expression.update.useMutation({
    onSuccess: (_, vars) => {
      setRows((prev) =>
        prev.map((r) =>
          r.id === vars.id
            ? { ...r, name: vars.name, email: vars.email, phone: vars.phone, amount: vars.amount }
            : r,
        ),
      );
      setEditTarget(null);
    },
  });

  const deleteMutation = api.expression.delete.useMutation({
    onSuccess: (_, vars) => {
      setRows((prev) => prev.filter((r) => r.id !== vars.id));
      setDeleteTarget(null);
    },
  });

  function openEdit(e: Expression) {
    setEditTarget(e);
    setEditForm({
      name: e.name,
      email: e.email,
      phone: e.phone,
      amount: String(e.amount),
    });
  }

  function submitEdit() {
    if (!editTarget) return;
    updateMutation.mutate({
      id: editTarget.id,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      amount: Number(editForm.amount),
    });
  }

  const filtered = useMemo(() => {
    return rows.filter((e) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.phone.includes(q);
        if (!match) return false;
      }
      if (dateFrom && new Date(e.createdAt) < new Date(dateFrom)) return false;
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        if (new Date(e.createdAt) > end) return false;
      }
      if (amountMin && e.amount < Number(amountMin)) return false;
      if (amountMax && e.amount > Number(amountMax)) return false;
      return true;
    });
  }, [rows, search, dateFrom, dateTo, amountMin, amountMax]);

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
      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Expressions" value={String(filtered.length)} sub={`of ${rows.length} total`} color="var(--color-navy)" />
        <StatCard label="Total Pledged" value={fmt(totalAmount)} color="var(--color-rose-primary)" />
        <StatCard label="Average Pledge" value={fmt(avgAmount)} color="var(--color-green-accent)" />
        <StatCard label="Highest Pledge" value={fmt(highest)} color="var(--color-blue-deep)" />
      </div>

      {/* Filter bar */}
      <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[200px] flex-1">
            <label className="mb-1 block text-xs font-medium text-gray-400 uppercase tracking-wide">Search</label>
            <div className="relative">
              <svg className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input type="text" placeholder="Name, email, phone…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pr-3 pl-9 text-sm focus:border-[var(--color-rose-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400 uppercase tracking-wide">From</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none transition-all" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400 uppercase tracking-wide">To</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none transition-all" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400 uppercase tracking-wide">Min ₹</label>
            <input type="number" placeholder="10000" value={amountMin} onChange={(e) => setAmountMin(e.target.value)} className="w-28 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none transition-all" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400 uppercase tracking-wide">Max ₹</label>
            <input type="number" placeholder="500000" value={amountMax} onChange={(e) => setAmountMax(e.target.value)} className="w-28 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[var(--color-rose-primary)] focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none transition-all" />
          </div>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>
        {hasFilters && (
          <p className="mt-2 text-xs text-gray-400">
            Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of {rows.length} expressions
          </p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-[var(--color-navy)]">Expressions of Support</h2>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
            {filtered.length} {hasFilters ? "matching" : "total"}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/80 text-left">
                {["#", "Name", "Email", "Phone", "Amount", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-xs font-semibold tracking-wide text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-gray-400">
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
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(e)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        title="Edit"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteTarget(e)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
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

      {/* Edit modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-5 text-lg font-semibold text-[var(--color-navy)]">Edit Expression</h3>
            <div className="space-y-4">
              <Field label="Name" value={editForm.name} onChange={(v) => setEditForm((f) => ({ ...f, name: v }))} />
              <Field label="Email" type="email" value={editForm.email} onChange={(v) => setEditForm((f) => ({ ...f, email: v }))} />
              <Field label="Phone" value={editForm.phone} onChange={(v) => setEditForm((f) => ({ ...f, phone: v }))} />
              <Field label="Amount (₹)" type="number" value={editForm.amount} onChange={(v) => setEditForm((f) => ({ ...f, amount: v }))} />
            </div>
            {updateMutation.error && (
              <p className="mt-3 text-xs text-red-500">{updateMutation.error.message}</p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditTarget(null)} className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={submitEdit}
                disabled={updateMutation.isPending}
                className="rounded-xl bg-[var(--color-navy)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                {updateMutation.isPending ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Delete expression?</h3>
            <p className="text-sm text-gray-500">
              This will permanently remove <span className="font-medium text-gray-700">{deleteTarget.name}</span>&apos;s expression of {fmt(deleteTarget.amount)}.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate({ id: deleteTarget.id })}
                disabled={deleteMutation.isPending}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">{label}</p>
      <p className="mt-2 text-2xl font-bold" style={{ color }}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-300">{sub}</p>}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[var(--color-navy)] focus:bg-white focus:ring-2 focus:ring-[var(--color-navy)]/10 focus:outline-none transition-all"
      />
    </div>
  );
}