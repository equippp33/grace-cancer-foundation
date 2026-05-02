"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/session";
import { env } from "@/env.js";
import { db } from "@/server/db";
import { admins } from "@/server/db/schema";

export async function login(
  _prev: { error: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.username, username))
    .limit(1);

  const valid =
    admin !== undefined &&
    (await bcrypt.compare(password, admin.passwordHash));

  if (!valid) return { error: "Invalid username or password" };

  const session = await getSession();
  session.isLoggedIn = true;
  await session.save();
  redirect(`/${env.ADMIN_PATH}`);
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect(`/${env.ADMIN_PATH}/login`);
}
