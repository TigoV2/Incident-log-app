import { z } from "zod";
import { prisma } from "@/lib/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

const list = publicProcedure.query(async () => {
  return prisma.incident.findMany({
    include: {
      createdBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});

const createIncidentSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string(),
  severity: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
  ]),
});

const create = publicProcedure
  .input(createIncidentSchema)
  .mutation(async ({ input, ctx }) => {
    return prisma.incident.create({
      data: {
        title: input.title,
        description: input.description,
        severity: input.severity,
        createdById: ctx.session.user.id,
      },
    });
  });

const resolve = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    return prisma.incident.update({
      where: {
        id: input.id,
      },
      data: {
        status: "RESOLVED",
      },
    });
  });

export const incidentRouter = createTRPCRouter({
  list,
  create,
  resolve,
});

export const appRouter = createTRPCRouter({
  incident: incidentRouter,
});