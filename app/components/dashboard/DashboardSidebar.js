"use client";

import Link from "next/link";
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
} from "@gravity-ui/icons";
import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  //   const navItems = [
  //     { icon: ChartColumn, label: "Overview", href: "/dashboard" },
  //     { icon: CirclePlus, label: "Add Recipe", href: "/dashboard/add-recipe" },
  //     { icon: ListOl, label: "My Recipes", href: "/dashboard/my-recipes" },
  //     { icon: Bookmark, label: "Favorites", href: "/dashboard/favorites" },
  //     { icon: ShoppingCart, label: "Purchased", href: "/dashboard/my-purchased" },
  //     { icon: Person, label: "Profile", href: "/dashboard/profile" },
  //   ];

  const commonNavLinks = [
    { icon: ChartColumn, label: "Overview", href: "/dashboard" },
    { icon: Person, label: "Profile", href: "/dashboard/profile" },
    { icon: ShoppingCart, label: "Purchased", href: "/dashboard/my-purchased" },
    { icon: Bookmark, label: "Favorites", href: "/dashboard/favorites" },
    { icon: ListOl, label: "My Recipes", href: "/dashboard/my-recipes" },
    { icon: CirclePlus, label: "Add Recipe", href: "/dashboard/add-recipe" },
  ];

  const adminNavLinks = [
    { icon: Bookmark, label: "All Users", href: "/dashboard/all-users" },
    {
      icon: ListOl,
      label: "All Uploaded Recipes",
      href: "/dashboard/all-uploaded-recipes",
    },
    {
      icon: CirclePlus,
      label: "All Premium Members",
      href: "/dashboard/all-premium-members",
    },
    {
      icon: CirclePlus,
      label: "All Reports",
      href: "/dashboard/all-reports",
    },
  ];

  const navLinksMap = {
    user: commonNavLinks,
    admin: [...commonNavLinks, ...adminNavLinks],
  };

  const navItems = navLinksMap[user?.role] || commonNavLinks;

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-5 lg:flex lg:flex-col">
      {/* Logo */}
      <Link href="/" className="mb-6 flex items-center gap-3 px-2">
        <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-[var(--accent-foreground)] shadow-sm">
          R
        </div>
        <div>
          <h2 className="text-base font-bold text-[var(--foreground)]">
            RecipeHub
          </h2>
          <p className="text-xs text-[var(--surface-secondary-foreground)]">
            Dashboard
          </p>
        </div>
      </Link>

      {/* Search */}
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-[var(--field-border)] bg-[var(--field-background)] px-3 py-2.5">
        <Magnifier className="size-4 text-[var(--surface-tertiary-foreground)]" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--surface-tertiary-foreground)]"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">
        <p className="mb-2 px-3 text-xs font-medium text-[var(--surface-tertiary-foreground)]">
          Menu
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-[var(--surface)] text-[var(--accent)] shadow-sm ring-1 ring-[var(--border)]"
                  : "text-[var(--surface-secondary-foreground)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
              }`}
            >
              <Icon
                className={`size-5 ${
                  active
                    ? "text-[var(--accent)]"
                    : "text-[var(--surface-tertiary-foreground)] group-hover:text-[var(--foreground)]"
                }`}
              />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-6 border-t border-[var(--separator)] pt-4">
          <p className="mb-2 px-3 text-xs font-medium text-[var(--surface-tertiary-foreground)]">
            Others
          </p>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[var(--surface-secondary-foreground)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
          >
            <Gear className="size-5" />
            Settings
          </Link>

          <Link
            href="/support"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[var(--surface-secondary-foreground)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
          >
            <CircleQuestion className="size-5" />
            Support
          </Link>
        </div>
      </nav>

      {/* User Box */}
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src={user?.image || "/assets/profile.png"}
            alt={user?.name || "User"}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[var(--foreground)]">
              {user?.name}
            </h3>
            <p className="truncate text-xs text-[var(--surface-tertiary-foreground)]">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
