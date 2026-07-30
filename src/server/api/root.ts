import { createTRPCRouter } from "./trpc";
import { incidentRouter } from "./routers/incidents";
import { usersRouter } from "./routers/users";

export const appRouter = createTRPCRouter({
  incident: incidentRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;