import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { env } from "@/env.js";

export interface SessionData {
  isLoggedIn: boolean;
}

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), {
    password: env.SESSION_SECRET,
    cookieName: "gcf_admin_session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
    },
  });
}
