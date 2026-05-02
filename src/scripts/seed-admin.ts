import { db } from "@/server/db";
import { admins } from "@/server/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

const USERNAME = "gcfadmin";
const PASSWORD = "GCFAdmin#05_01";

const existing = await db
  .select()
  .from(admins)
  .where(eq(admins.username, USERNAME));

if (existing.length > 0) {
  const hash = await bcrypt.hash(PASSWORD, 12);
  await db
    .update(admins)
    .set({ passwordHash: hash })
    .where(eq(admins.username, USERNAME));
  console.log("Admin password updated.");
} else {
  const hash = await bcrypt.hash(PASSWORD, 12);
  await db.insert(admins).values({ username: USERNAME, passwordHash: hash });
  console.log("Admin user created.");
}

process.exit(0);
