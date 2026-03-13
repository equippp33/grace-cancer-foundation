import { z } from "zod";
import { desc } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { expressions } from "@/server/db/schema";

export const expressionRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(10, "Invalid phone number"),
        amount: z
          .number()
          .min(10000, "Minimum amount is ₹10,000")
          .refine((v) => v % 10000 === 0, "Amount must be a multiple of ₹10,000"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(expressions).values({
        name: input.name,
        email: input.email,
        phone: input.phone,
        amount: input.amount,
      });
      return { success: true };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select({
        id: expressions.id,
        name: expressions.name,
        amount: expressions.amount,
        createdAt: expressions.createdAt,
      })
      .from(expressions)
      .orderBy(desc(expressions.createdAt))
      .limit(50);
  }),
});
