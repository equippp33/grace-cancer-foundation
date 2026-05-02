import { redirect } from "next/navigation";
import Image from "next/image";
import { desc } from "drizzle-orm";
import type { Metadata } from "next";

import { getSession } from "@/lib/session";
import { env } from "@/env.js";
import { db } from "@/server/db";
import { expressions } from "@/server/db/schema";
import { logout } from "./actions";
import { DashboardClient } from "./_components/dashboard-client";

export const metadata: Metadata = { title: "Admin Dashboard — GCF" };

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isLoggedIn) redirect(`/${env.ADMIN_PATH}/login`);

  const data = await db
    .select()
    .from(expressions)
    .orderBy(desc(expressions.createdAt));

  // Serialize dates for the client component
  const serialized = data.map((e) => ({
    ...e,
    createdAt: new Date(e.createdAt),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between bg-[var(--color-navy)] px-6 py-4 shadow-md">
        <div className="flex items-center gap-4">
          <Image
            src="/website-logo-300x92.png"
            alt="GCF"
            width={140}
            height={43}
            className="h-8 w-auto brightness-0 invert"
          />
          <span className="text-white/30">|</span>
          <span className="text-sm font-medium text-white/80">
            Admin Dashboard
          </span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-lg px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            Sign Out
          </button>
        </form>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <DashboardClient data={serialized} />
      </main>
    </div>
  );
}
