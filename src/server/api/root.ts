import { createTRPCRouter } from "./trpc";
import { incidentRouter } from "./routers/incidents";

export const appRouter = createTRPCRouter({
  incident: incidentRouter,
});

export type AppRouter = typeof appRouter;