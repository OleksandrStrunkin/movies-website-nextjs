"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import Header from "@/components/Header";

const queryClient = new QueryClient();

export default function QueryClientProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
