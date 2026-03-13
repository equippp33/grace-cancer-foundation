import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update. We key on the DATABASE_URL so a changed URL gets a fresh connection.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
  connUrl: string | undefined;
};

// If the URL changed (or no cached connection), create a new one
if (!globalForDb.conn || globalForDb.connUrl !== env.DATABASE_URL) {
  // End the old connection if it exists
  if (globalForDb.conn) {
    void globalForDb.conn.end();
  }
  globalForDb.conn = postgres(env.DATABASE_URL, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });
  globalForDb.connUrl = env.DATABASE_URL;
}

const conn = globalForDb.conn;

export const db = drizzle(conn, { schema });
