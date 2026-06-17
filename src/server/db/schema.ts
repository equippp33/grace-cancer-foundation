import { index, pgTableCreator, uniqueIndex } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name) => `grace-cancer-foundation_${name}`,
);

export const admins = createTable(
  "admin",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    username: d.varchar({ length: 64 }).notNull(),
    passwordHash: d.varchar({ length: 256 }).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => new Date())
      .notNull(),
  }),
  (t) => [uniqueIndex("admin_username_idx").on(t.username)],
);

export const expressions = createTable(
  "expression",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }).notNull(),
    email: d.varchar({ length: 256 }).notNull(),
    phone: d.varchar({ length: 20 }).notNull(),
    amount: d.integer().notNull(),
    organisation: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => new Date())
      .notNull(),
  }),
  (t) => [index("expression_created_idx").on(t.createdAt)],
);
