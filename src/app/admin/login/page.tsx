"use client";

import { useActionState } from "react";
import Image from "next/image";
import { login } from "../actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-navy)] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/website-logo-300x92.png"
            alt="Grace Cancer Foundation"
            width={200}
            height={62}
            className="mx-auto h-12 w-auto brightness-0 invert"
          />
          <p className="mt-3 text-sm text-gray-400">Admin Portal</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <h1 className="mb-6 font-serif text-xl font-bold text-[var(--color-navy)]">
            Sign In
          </h1>

          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {state.error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 uppercase">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[var(--color-navy)] transition-all focus:border-[var(--color-rose-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 uppercase">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[var(--color-navy)] transition-all focus:border-[var(--color-rose-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-rose-primary)]/10 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] py-3 text-sm font-bold text-white shadow-md transition-all hover:brightness-110 disabled:opacity-50"
            >
              {isPending ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
