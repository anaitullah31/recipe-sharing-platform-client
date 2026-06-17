import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextThemeProvider } from "./providers/NextThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RecipeHub - Recipe Sharing Platform",
  description: "A Recipe Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background text-foreground`}
    >
      <body className="min-h-full flex flex-col">
        <main>
          <NextThemeProvider>{children}</NextThemeProvider>
        </main>
      </body>
    </html>
  );
}
