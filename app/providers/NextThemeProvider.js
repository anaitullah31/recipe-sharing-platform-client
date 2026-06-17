// app/providers.tsx
"use client";

import { ThemeProvider } from "next-themes";

export function NextThemeProvider({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
