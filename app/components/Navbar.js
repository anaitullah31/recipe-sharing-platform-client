"use client";

import { useState } from "react";
import NextLink from "next/link";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Bars } from "@gravity-ui/icons";
import ThemeToggle from "./ThemeToggle";

export default function MainNavbar() {
  const [isLoggedIn] = useState(false);

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Browse Recipes",
      href: "/recipes",
    },
  ];

  const navLinkClass =
    "text-sm font-semibold uppercase tracking-widest text-foreground no-underline transition-colors hover:text-accent";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-md">
      <header className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* ================= MOBILE LEFT ================= */}
        <div className="flex items-center md:hidden">
          <Drawer>
            <Button isIconOnly variant="light" className="text-foreground">
              <Bars />
            </Button>

            <Drawer.Backdrop>
              <Drawer.Content
                placement="left"
                className="bg-surface text-foreground"
              >
                <Drawer.Dialog>
                  <Drawer.CloseTrigger />

                  <Drawer.Body>
                    <nav className="flex flex-col gap-2 pt-6">
                      {navItems.map((item) => (
                        <NextLink
                          key={item.href}
                          href={item.href}
                          className="rounded-lg px-3 py-2 font-medium text-foreground transition hover:bg-surface-hover hover:text-accent"
                        >
                          {item.label}
                        </NextLink>
                      ))}

                      <div className="mt-4 border-t border-border pt-4">
                        {!isLoggedIn ? (
                          <div className="flex flex-col gap-3">
                            <NextLink
                              href="/login"
                              className="flex h-10 w-full items-center justify-center border border-border text-sm font-semibold uppercase text-foreground no-underline rounded-md"
                            >
                              Login
                            </NextLink>

                            <NextLink
                              href="/register"
                              className="flex h-10 w-full items-center justify-center bg-accent text-sm font-semibold uppercase text-accent-foreground no-underline rounded-md"
                            >
                              Register
                            </NextLink>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <NextLink
                              href="/dashboard"
                              className="text-foreground hover:text-accent"
                            >
                              Dashboard
                            </NextLink>

                            <NextLink
                              href="/profile"
                              className="text-foreground hover:text-accent"
                            >
                              Profile
                            </NextLink>

                            <Button color="danger" variant="light">
                              Logout
                            </Button>
                          </div>
                        )}
                      </div>
                    </nav>
                  </Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
        </div>

        {/* ================= DESKTOP LEFT ================= */}
        <ul className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <NextLink href={item.href} className={navLinkClass}>
                {item.label}
              </NextLink>
            </li>
          ))}
        </ul>

        {/* ================= LOGO ================= */}
        <NextLink
          href="/"
          className="
            absolute left-1/2
            flex -translate-x-1/2 flex-col items-center
            leading-none text-foreground

            md:static
            md:translate-x-0
            md:items-start
          "
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
            RecipeHub
          </span>

          <span className="font-serif text-3xl font-bold tracking-tight">
            Kitchen
          </span>
        </NextLink>

        {/* ================= MOBILE RIGHT ================= */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
        </div>

        {/* ================= DESKTOP RIGHT ================= */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          {!isLoggedIn ? (
            <>
              <NextLink
                href="/login"
                className="font-semibold uppercase text-link transition hover:text-accent"
              >
                Login
              </NextLink>

              <NextLink
                href="/register"
                className="font-semibold uppercase text-link transition hover:text-accent"
              >
                Register
              </NextLink>
            </>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  size="sm"
                  src="https://i.pravatar.cc/150?img=12"
                />
              </DropdownTrigger>

              <DropdownMenu aria-label="User Menu">
                <DropdownItem key="dashboard" href="/dashboard">
                  Dashboard
                </DropdownItem>

                <DropdownItem key="profile" href="/profile">
                  Profile
                </DropdownItem>

                <DropdownItem key="logout" color="danger">
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </header>
    </nav>
  );
}
