import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainNavbar from "./components/Navbar";

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MainNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
