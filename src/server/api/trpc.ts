import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const createContext = async () => {
  return {
    session: null, // Replace with your actual session logic
  };
};

// export const createContext = async () => {
//   const session = await auth();

//   return {
//     session,
//     prisma,
//   };
// };

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;