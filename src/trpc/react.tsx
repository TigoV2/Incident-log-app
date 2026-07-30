"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";

import type { AppRouter } from "@/server/api/root";

export const api = createTRPCReact<AppRouter>();

export function TRPCProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () => new QueryClient(),
  );

  const [client] = useState(() =>
    api.createClient({
        links: [
        httpBatchLink({
            url: "/api/trpc",
            transformer: superjson,
        }),
        ],
    }),
  );

  return (
    <api.Provider
      client={client}
      queryClient={queryClient}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </api.Provider>
  );
}