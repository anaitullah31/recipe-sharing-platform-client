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
  Persons,
  SquareListUl,
  ScalesUnbalanced,
} from "@gravity-ui/icons";
import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const commonNavLinks = [
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
  ];

  const navLinksMap = {
    user: commonNavLinks,
    admin: [...commonNavLinks, ...adminNavLinks],
  };

  const navItems = navLinksMap[user?.role] || commonNavLinks;

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-border bg-surface-secondary px-4 py-5 lg:flex lg:flex-col">
      {/* Logo */}
      <Link href="/" className="mb-6 flex items-center gap-3 px-2">
        <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-lg font-bold text-accent-foreground shadow-sm">
          R
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">
            RecipeHub
          </h2>
          <p className="text-xs text-surface-secondary-foreground">
            Dashboard
          </p>
        </div>
      </Link>

      {/* Search */}
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-(--field-border) bg-(--field-background) px-3 py-2.5">
        <Magnifier className="size-4 text-surface-tertiary-foreground" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-surface-tertiary-foreground"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">
        <p className="mb-2 px-3 text-xs font-medium text-surface-tertiary-foreground">
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
                  ? "bg-surface text-accent shadow-sm ring-1 ring-border"
                  : "text-surface-secondary-foreground hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              <Icon
                className={`size-5 ${
                  active
                    ? "text-accent"
                    : "text-surface-tertiary-foreground group-hover:text-foreground"
                }`}
              />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-6 border-t border-separator pt-4">
          <p className="mb-2 px-3 text-xs font-medium text-surface-tertiary-foreground">
            Others
          </p>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-surface-secondary-foreground transition-all hover:bg-surface-hover hover:text-foreground"
          >
            <Gear className="size-5" />
            Settings
          </Link>

          <Link
            href="/support"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-surface-secondary-foreground transition-all hover:bg-surface-hover hover:text-foreground"
          >
            <CircleQuestion className="size-5" />
            Support
          </Link>
        </div>
      </nav>

      {/* User Box */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src={user?.image || "/assets/profile.png"}
            alt={user?.name || "User"}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {user?.name}
            </h3>
            <p className="truncate text-xs text-surface-tertiary-foreground">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
