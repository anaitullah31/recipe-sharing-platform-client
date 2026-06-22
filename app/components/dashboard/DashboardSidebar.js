"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  ChartColumn,
  CirclePlus,
  ListOl,
  Person,
  ShoppingCart,
  Magnifier,
  Gear,
  CircleQuestion,
  Persons,
  SquareListUl,
  ScalesUnbalanced,
  TagDollar,
  ArrowRightFromSquare,
  Bars,
  Xmark,
} from "@gravity-ui/icons";
import { authClient } from "@/app/lib/auth-client";
import ThemeToggle from "../ThemeToggle";
import SidebarContent from "./SidebarContent";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);

  const userNavLinks = [
    { icon: ChartColumn, label: "Dashboard", href: "/dashboard" },
    { icon: Person, label: "Profile", href: "/dashboard/profile" },
    { icon: ShoppingCart, label: "Purchased", href: "/dashboard/my-purchased" },
    { icon: Bookmark, label: "Favorites", href: "/dashboard/favorites" },
    { icon: ListOl, label: "My Recipes", href: "/dashboard/my-recipes" },
    { icon: CirclePlus, label: "Add Recipe", href: "/dashboard/add-recipe" },
  ];

  const adminNavLinks = [
    { icon: Persons, label: "Manage Users", href: "/dashboard/all-users" },
    {
      icon: SquareListUl,
      label: "Manage Recipes",
      href: "/dashboard/all-recipes",
    },
    {
      icon: ScalesUnbalanced,
      label: "Manage Reports",
      href: "/dashboard/all-reports",
    },
    { icon: TagDollar, label: "Transactions", href: "/dashboard/transactions" },
  ];

  const navItems = user?.role === "admin" ? adminNavLinks : userNavLinks;

  return (
    <>
      {/* Mobile Top Button */}
      {/* Mobile Top Bar */}
      <div className="fixed left-4 right-4 top-4 z-40 flex items-center justify-between lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-border bg-surface p-3 shadow-sm"
        >
          <Bars className="size-5 text-foreground" />
        </button>

        <div className="rounded-xl border border-border bg-surface p-2 shadow-sm">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-border bg-surface-secondary px-4 py-5 lg:flex">
        <SidebarContent
          user={user}
          pathname={pathname}
          setOpen={setOpen}
          authClient={authClient}
        />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-border bg-surface-secondary px-4 py-5 shadow-xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          user={user}
          pathname={pathname}
          setOpen={setOpen}
          authClient={authClient}
        />
      </aside>
    </>
  );
}
