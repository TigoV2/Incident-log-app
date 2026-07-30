import bcrypt from "bcrypt";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["USER", "ADMIN"]),
});

export const usersRouter = createTRPCRouter({
  list: adminProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
      },
    });
  }),

  create: adminProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      const passwordHash = await bcrypt.hash(input.password, 12);

      return ctx.prisma.user.create({
        data: {
          email: input.email,
          passwordHash,
          role: input.role,
        },
      });
    }),

deactivate: adminProcedure
  .input(
    z.object({
      id: z.string().cuid(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (input.id === ctx.session.user.id) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You cannot deactivate your own account.",
      });
    }

    return ctx.prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        active: false,
      },
    });
  }),
});