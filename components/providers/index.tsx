"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "../ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "./theme-provider";
import QueryProvider from "./query-provider";

const TopLoader = () => {
  return (
    <NextTopLoader
      showSpinner={false}
      color={getComputedStyle(document.documentElement).getPropertyValue(
        "--primary"
      )}
    />
  );
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
        storageKey="admin-theme"
      >
        <QueryProvider>
          <TopLoader />
          <Toaster />
          {children}
        </QueryProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
