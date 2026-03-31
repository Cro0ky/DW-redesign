"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";

import { createQueryClient } from "@/lib/query/query-client";

let queryClientRef: ReturnType<typeof createQueryClient> | null = null;

export function getQueryClientRef() {
  return queryClientRef;
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(createQueryClient);

  useEffect(() => {
    queryClientRef = client;
    return () => {
      queryClientRef = null;
    };
  }, [client]);

  return (
    <Tooltip.Provider delayDuration={400} skipDelayDuration={200}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </Tooltip.Provider>
  );
}
