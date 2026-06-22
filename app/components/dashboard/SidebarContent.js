"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  ChartColumn,
  CirclePlus,
  ListOl,
  Person,
  ShoppingCart,
  Persons,
  SquareListUl,
  ScalesUnbalanced,
  TagDollar,
  ArrowRightFromSquare,
  Xmark,
} from "@gravity-ui/icons";
import { handleLogout } from "@/app/lib/core/client";

const protectedRoutes = ["/dashboard"];

const SidebarContent = ({ user, pathname, setOpen }) => {
  const router = useRouter();

  const userNavLinks = [
    { icon: ChartColumn, label: "Dashboard", href: "/dashboard" },
    { icon: Person, label: "Profile", href: "/dashboard/profile" },
    { icon: ShoppingCart, label: "Purchased", href: "/dashboard/my-purchased" },
    { icon: Bookmark, label: "Favorites", href: "/dashboard/favorites" },
    { icon: ListOl, label: "My Recipes", href: "/dashboard/my-recipes" },
    { icon: CirclePlus, label: "Add Recipe", href: "/dashboard/add-recipe" },
  ];

  const adminNavLinks = [
    { icon: ChartColumn, label: "Dashboard", href: "/dashboard" },
    { icon: Person, label: "Profile", href: "/dashboard/profile" },
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

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
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
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between px-2">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-3"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-lg font-bold text-accent-foreground shadow-sm">
            R
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-foreground">
              RecipeHub
            </h2>
            <p className="truncate text-xs text-surface-secondary-foreground">
              Dashboard
            </p>
          </div>
        </Link>

        <button
          onClick={() => setOpen(false)}
          className="rounded-lg p-2 text-foreground hover:bg-surface-hover lg:hidden"
          type="button"
        >
          <Xmark className="size-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden pr-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-surface text-accent shadow-sm ring-1 ring-border"
                  : "text-surface-secondary-foreground hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              <Icon className="size-5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 border-t border-separator pt-4">
        <button
          onClick={logoutUser}
          type="button"
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-danger transition-all hover:bg-danger/10"
        >
          <ArrowRightFromSquare className="size-5 shrink-0" />
          Logout
        </button>

        <div className="rounded-2xl border border-border bg-surface p-3 shadow-sm">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src={user?.image || "/assets/profile.png"}
              alt={user?.name || "User"}
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-foreground">
                {user?.name || "User"}
              </h3>
              <p className="truncate text-xs text-surface-tertiary-foreground">
                {user?.email || "No email"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarContent;