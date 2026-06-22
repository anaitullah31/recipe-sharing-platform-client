"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@gravity-ui/uikit";
import ThemeToggle from "./ThemeToggle";
import { ArrowRightFromSquare, Bars, Xmark } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { handleLogout } from "../lib/core/client";

const protectedRoutes = ["/dashboard"];

const Navbar = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const logoutUser = async () => {
    try {
      await handleLogout();

      setOpen(false);

      if (isProtectedRoute) {
        router.replace("/login");
      } else {
        router.refresh();
      }
    } catch (error) {

    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Recipes", href: "/recipes" },
    { name: "Pricing", href: "/pricing" },
    ...(user ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 text-foreground backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-8 lg:gap-10">
            <Link href="/" className="font-serif text-2xl text-accent">
              RecipeHub
            </Link>

            <div className="hidden items-center gap-7 md:flex">
              {navLinks.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-6 text-sm transition ${
                      active
                        ? "font-semibold text-accent"
                        : "text-surface-secondary-foreground hover:text-accent"
                    }`}
                  >
                    {item.name}

                    {active && (
                      <span className="absolute bottom-4 left-0 h-px w-full bg-accent" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <div className="hidden md:block">
                <Drawer>
                  <Button className="relative h-9 w-9 overflow-hidden rounded-full p-0">
                    <span className="relative h-10 w-10 overflow-hidden rounded-full bg-surface-secondary">
                      <Image
                        src={user?.image || "/assests/profile.png"}
                        alt={user?.name || "Profile"}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                  </Button>

                  <Drawer.Backdrop>
                    <Drawer.Content placement="right">
                      <Drawer.Dialog className="relative flex h-full flex-col items-center px-6 py-10 text-center">
                        <Button
                          slot="close"
                          variant="light"
                          className="absolute right-4 top-4 min-w-0 px-2 text-xl"
                        >
                          ×
                        </Button>

                        <Drawer.Body className="flex w-full flex-col items-center pt-4">
                          <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-border bg-surface-secondary p-1">
                            <Image
                              src={user?.image || "/assests/profile.png"}
                              alt={user?.name || "Profile"}
                              fill
                              sizes="80px"
                              className="object-cover p-1"
                            />
                          </div>

                          <h3 className="mt-4 font-serif text-2xl text-foreground">
                            {user?.name || "Guest User"}
                          </h3>

                          <p className="mt-1 text-sm text-surface-secondary-foreground">
                            {user?.email || "Login to continue"}
                          </p>

                          {user?.plan === "premium" ? (
                            <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-linear-to-r from-amber-500 to-yellow-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-black shadow-md">
                              ⭐ Premium Member
                            </span>
                          ) : (
                            <span className="mt-3 inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                              Free Plan
                            </span>
                          )}
                        </Drawer.Body>

                        <Drawer.Footer>
                          <Button
                            className="rounded-md"
                            slot="close"
                            variant="secondary"
                          >
                            Cancel
                          </Button>

                          <Button
                            onPress={logoutUser}
                            className="rounded-md"
                            color="danger"
                          >
                            Logout
                          </Button>
                        </Drawer.Footer>
                      </Drawer.Dialog>
                    </Drawer.Content>
                  </Drawer.Backdrop>
                </Drawer>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-linear-to-r from-amber-500 to-yellow-500 px-4 py-3 text-sm font-bold text-black shadow-lg transition-all hover:scale-[1.02]"
              >
                🔑 Login
              </Link>
            )}

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface md:hidden"
              aria-label="Open menu"
            >
              <Icon data={Bars} size={20} />
            </button>
          </div>
        </nav>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-[86%] max-w-[320px] flex-col border-l border-border bg-[#211a18] px-5 py-6 text-white shadow-2xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-lg font-black text-accent-foreground">
              R
            </span>

            <span>
              <span className="block text-base font-bold leading-5">
                RecipeHub
              </span>
              <span className="text-xs font-medium text-white/70">Menu</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/90 hover:bg-white/10"
            aria-label="Close menu"
          >
            <Icon data={Xmark} size={20} />
          </button>
        </div>

        <nav className="mt-9 space-y-2">
          {navLinks.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-xl px-3 py-3 text-sm font-bold transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-6">
          {user ? (
            <>
              <button
                type="button"
                onClick={logoutUser}
                className="flex items-center gap-4 rounded-xl px-3 py-3 text-sm font-bold text-danger"
              >
                <Icon data={ArrowRightFromSquare} size={20} />
                Logout
              </button>

              <Link
                href="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 p-3"
              >
                <span className="relative h-10 w-10 overflow-hidden rounded-full bg-surface-secondary">
                  <Image
                    src={user?.image || "/assests/profile.png"}
                    alt={user?.name || "Profile"}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>

                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold">
                    {user?.name || "Guest User"}
                  </span>
                  <span className="block truncate text-xs text-white/70">
                    {user?.email || "Login to continue"}
                  </span>
                </span>
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-xl bg-linear-to-r from-amber-500 to-yellow-500 px-4 py-3 text-sm font-bold text-black shadow-lg transition-all hover:scale-[1.02]"
            >
              🔑 Login
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
