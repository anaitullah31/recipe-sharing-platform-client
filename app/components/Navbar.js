"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Avatar, Button, Drawer, Dropdown, Label } from "@heroui/react";
import { ArrowRightFromSquare, Bars, Gear, Persons } from "@gravity-ui/icons";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "../lib/auth-client";

export default function MainNavbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Browse Recipes",
      href: "/recipes",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];

  if(user?.email){
    navItems.push(
      {
      label: "Dashboard",
      href: "/dashboard",
    },
    )
  }

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
                        {!user ? (
                          <div className="flex flex-col gap-3">
                            <NextLink
                              href="/login"
                              className="flex h-10 w-full items-center justify-center border border-border text-sm font-semibold uppercase text-foreground no-underline rounded-md"
                            >
                              Login
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

                            <Button
                              onClick={handleLogout}
                              color="danger"
                              variant="light"
                            >
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

          {!user ? (
            <>
              <NextLink
                href="/login"
                className="font-semibold uppercase text-link transition hover:text-accent"
              >
                Login
              </NextLink>
            </>
          ) : (
            <Dropdown>
              <Dropdown.Trigger className="rounded-full">
                <Avatar>
                  <Avatar.Image
                    alt="Junior Garcia"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                  />
                  <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <div className="px-3 pt-3 pb-1">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <Avatar.Image
                        alt="Jane"
                        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                      />
                      <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                      <p className="text-sm leading-5 font-medium">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <Dropdown.Menu>
                  <Dropdown.Item id="dashboard" textValue="Dashboard">
                    <Label>Dashboard</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="profile" textValue="Profile">
                    <Label>Profile</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="settings" textValue="Settings">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Settings</Label>
                      <Gear className="size-3.5 text-muted" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="logout"
                    textValue="Logout"
                    variant="danger"
                    onClick={handleLogout}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Log Out</Label>
                      <ArrowRightFromSquare className="size-3.5 text-danger" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
      </header>
    </nav>
  );
}
