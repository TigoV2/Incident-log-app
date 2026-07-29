import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const list = protectedProcedure.query(async ({ ctx }) => {
  return ctx.prisma.incident.findMany({
    include: {
      createdBy: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});

const createIncidentSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim(),
  severity: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
  ]),
});

const create = protectedProcedure
  .input(createIncidentSchema)
  .mutation(async ({ input, ctx }) => {
    return ctx.prisma.incident.create({
      data: {
        title: input.title,
        description: input.description,
        severity: input.severity,
        createdById: ctx.session.user.id,
      },
    });
  });

const resolve = protectedProcedure
  .input(
    z.object({
      id: z.string().cuid(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const incident = await ctx.prisma.incident.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!incident) {
      throw new Error("Incident not found");
    }

    if (incident.status === "RESOLVED") {
      return incident;
    }

    return ctx.prisma.incident.update({
      where: {
        id: input.id,
      },
      data: {
        status: "RESOLVED",
        resolvedAt: new Date(),
      },
    });
  });

export const incidentRouter = createTRPCRouter({
  list,
  create,
  resolve,
});