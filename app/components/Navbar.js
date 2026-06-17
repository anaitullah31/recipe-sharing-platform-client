"use client";

import { useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@heroui/react";
import { Bars } from "@gravity-ui/icons";

export default function MainNavbar() {
  const [isDark, setIsDark] = useState(false);
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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-200 bg-white/95 backdrop-blur-md dark:bg-black/80">
      <header className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* ================= MOBILE LEFT ================= */}
        <div className="flex items-center md:hidden">
          <Drawer>
            <Button isIconOnly variant="light">
              <Bars />
            </Button>

            <Drawer.Backdrop>
              <Drawer.Content placement="left">
                <Drawer.Dialog>
                  <Drawer.CloseTrigger />
                  <Drawer.Body>
                    <nav className="flex flex-col gap-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          underline="none"
                          className="rounded-lg px-3 py-2 hover:bg-default-100"
                        >
                          {item.label}
                        </Link>
                      ))}

                      <div className="mt-4 border-t pt-4">
                        {!isLoggedIn ? (
                          <div className="flex flex-col gap-3">
                            <Button
                              as={Link}
                              href="/login"
                              variant="bordered"
                              fullWidth
                              className="uppercase"
                            >
                              Login
                            </Button>

                            <Button
                              as={Link}
                              href="/register"
                              color="primary"
                              fullWidth
                              className="uppercase"
                            >
                              Register
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <Link href="/dashboard">Dashboard</Link>

                            <Link href="/profile">Profile</Link>

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

        {/* ================= DESKTOP LEFT NAV ================= */}
        <ul className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                underline="none"
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-widest
                  text-black
                  transition-colors
                  hover:text-emerald-600
                  hover:no-underline
                  dark:text-white
                "
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          underline="none"
          className="
            absolute left-1/2 -translate-x-1/2
            flex flex-col items-center leading-none
            text-black
            dark:text-white

            md:static
            md:translate-x-0
            md:items-start
          "
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
            RecipeHub
          </span>

          <span className="font-serif text-3xl font-bold tracking-tight">
            Kitchen
          </span>
        </Link>

        {/* ================= MOBILE RIGHT ================= */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="text-sm font-medium md:hidden uppercase"
        >
          {isDark ? "Dark" : "Light"}
        </button>

        {/* ================= DESKTOP RIGHT ================= */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-sm font-medium uppercase"
          >
            {isDark ? "Dark" : "Light"}
          </button>

          {!isLoggedIn ? (
            <>
              <Button
                as={Link}
                href="/login"
                variant="light"
                className="font-semibold uppercase"
              >
                Login
              </Button>

              <Button
                as={Link}
                href="/register"
                color="primary"
                radius="full"
                className="font-semibold uppercase"
              >
                Register
              </Button>
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

              <DropdownMenu aria-label="User menu">
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
