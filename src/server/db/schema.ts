import { index, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name) => `grace-cancer-foundation_${name}`,
);

export const expressions = createTable(
  "expression",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }).notNull(),
    email: d.varchar({ length: 256 }).notNull(),
    phone: d.varchar({ length: 20 }).notNull(),
    amount: d.integer().notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => new Date())
      .notNull(),
  }),
  (t) => [index("expression_created_idx").on(t.createdAt)],
);
