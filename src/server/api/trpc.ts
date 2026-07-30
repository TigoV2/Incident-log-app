import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const createContext = async () => {
  const session = await auth();

  return {
    session,
    prisma,
  };
};

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: {
        ...ctx.session,
        user: ctx.session.user,
      },
    },
  });
});

const isAdmin = t.middleware(({ ctx, next }) => {
  if (ctx.session?.user.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admins only",
    });
  }

  return next();
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const adminProcedure = protectedProcedure.use(isAdmin);