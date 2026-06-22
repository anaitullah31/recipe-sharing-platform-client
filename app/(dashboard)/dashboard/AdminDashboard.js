import { Icon } from "@gravity-ui/uikit";
import Image from "next/image";
import ActivityItem from "./ActivityItem";
import HealthBar from "./HealthBar";
import Link from "next/link";
import StatCard from "./StatCard";
import { fetchSecureData } from "@/app/lib/core/server";
import {
  ArrowDownToLine,
  Calendar,
  ChartColumn,
  CircleExclamation,
  Heart,
  PersonPlus,
  Star,
} from "@gravity-ui/icons";

const AdminDashboard = async () => {
  const recipesData = await fetchSecureData("/recipes");
  const usersData = await fetchSecureData("/users");
  const reportsData = await fetchSecureData("/reports");
  const paymentsData = await fetchSecureData("/payments");

  const recipes = recipesData?.data || [];
  const users = usersData?.data || [];
  const reports = reportsData?.data || [];
  const payments = paymentsData?.data || [];

  const totalUsers = usersData?.stats?.totalUsers || users.length;
  const totalRecipes = recipes.length;
  const premiumUsers = users.filter((user) => user.plan === "premium").length;
  const unresolvedReports = reports.filter(
    (report) => report.status !== "resolved",
  ).length;

  const topRecipes = [...recipes]
    .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
    .slice(0, 3);

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  const activities = [
    ...recipes
      .filter((recipe) => recipe.isFeatured)
      .map((recipe) => ({
        icon: Star,
        title: `Recipe "${recipe.recipeName}" Featured`,
        text: `By Chef ${recipe.authorName || "Unknown"} • ${getTimeAgo(
          recipe.updatedAt || recipe.createdAt,
        )}`,
        date: recipe.updatedAt || recipe.createdAt,
      })),

    ...users
      .filter((user) => user.plan === "premium")
      .map((user) => ({
        icon: PersonPlus,
        title: "New Premium Member Joined",
        text: `${user.name || user.email} upgraded membership • ${getTimeAgo(
          user.updatedAt || user.createdAt,
        )}`,
        date: user.updatedAt || user.createdAt,
      })),

    ...reports.map((report) => ({
      icon: CircleExclamation,
      title: "New Report Filed",
      text: `${report.reason} report for ${report.recipeName} • ${getTimeAgo(
        report.createdAt,
      )}`,
      date: report.createdAt,
    })),

    ...payments.map((payment) => ({
      icon: ChartColumn,
      title:
        payment.paymentType === "premium"
          ? "Premium Payment Completed"
          : "Recipe Purchase Completed",
      text: `${payment.userEmail} paid $${payment.amount} • ${getTimeAgo(
        payment.createdAt,
      )}`,
      date: payment.createdAt,
    })),
  ]
    .filter((item) => item.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <section className="min-h-screen bg-background px-4 pt-16 pb-8 text-foreground sm:px-6 sm:py-10 lg:px-10 xl:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between lg:mb-12">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent sm:tracking-[0.25em]">
              Executive Suite
            </p>

            <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              Dashboard Overview
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:flex sm:items-center">
            <button className="inline-flex w-full items-center justify-center gap-2 border border-border bg-surface px-4 py-3 text-xs font-bold uppercase text-surface-secondary-foreground sm:w-auto">
              <Icon data={Calendar} size={14} />
              Last 30 Days
            </button>

            <button className="inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-accent px-5 py-3 text-xs font-bold uppercase text-accent-foreground sm:w-auto">
              <Icon data={ArrowDownToLine} size={14} />
              Export Data
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:mb-8 lg:grid-cols-4 lg:gap-6">
          <StatCard title="Total Users" value={totalUsers} growth="+12.5%" />
          <StatCard title="Total Recipes" value={totalRecipes} growth="+6.2%" />
          <StatCard
            title="Premium Members"
            value={premiumUsers}
            growth="+18.0%"
          />
          <StatCard
            title="Open Reports"
            value={unresolvedReports}
            growth="-2.1%"
            danger
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.75fr)] lg:gap-8">
          <div className="min-w-0 rounded-xl border border-border bg-surface p-5 sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mb-8">
              <h2 className="font-serif text-2xl">Engagement Trends</h2>

              <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase sm:gap-4">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  Recipe Views
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-link" />
                  Favorites
                </span>
              </div>
            </div>

            <div className="flex h-56 items-end gap-2 overflow-hidden border-b border-border pb-4 sm:h-64 sm:gap-3 lg:h-72 lg:gap-4">
              {[35, 42, 38, 54, 72, 45, 88, 50, 100, 48, 80].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex min-w-0 flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className="w-full rounded-t bg-accent/70"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ),
              )}
            </div>

            <div className="mt-5 flex flex-col justify-between gap-4 sm:mt-6 md:flex-row md:items-start">
              <p className="max-w-lg text-sm leading-6 text-surface-secondary-foreground">
                Engagement peaked during the latest featured recipe cycle,
                showing increased recipe views and favorite activity.
              </p>

              <Link
                href="/dashboard/all-recipes"
                className="shrink-0 text-xs font-bold uppercase text-accent"
              >
                View Full Report
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 lg:p-8">
            <h2 className="font-serif text-2xl">Content Health</h2>

            <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">
              <HealthBar
                label="Recipe Status"
                value={`${Math.round(
                  (recipes.filter((r) => r.status === "published").length /
                    (recipes.length || 1)) *
                    100,
                )}% Published`}
                percent={88}
              />

              <HealthBar
                label="Moderation Volume"
                value={`${Math.round(
                  (reports.filter((r) => r.status === "resolved").length /
                    (reports.length || 1)) *
                    100,
                )}% Resolved`}
                percent={94}
              />
            </div>

            <div className="mt-8 border-l-4 border-accent bg-surface-secondary p-4 sm:mt-10 sm:p-5">
              <p className="text-sm italic leading-6 text-surface-secondary-foreground">
                Moderation response time improved as reported recipes are
                reviewed and resolved by admins.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-2 lg:gap-8">
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-separator px-5 py-4 sm:px-6 sm:py-5">
              <h2 className="font-serif text-2xl">Platform Activity</h2>
              <span className="text-xl leading-none">...</span>
            </div>

            <div className="divide-y divide-separator">
              {activities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  icon={activity.icon}
                  title={activity.title}
                  text={activity.text}
                />
              ))}

              {activities.length === 0 && (
                <div className="px-5 py-8 text-sm text-surface-secondary-foreground sm:px-6">
                  No recent platform activity yet.
                </div>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-separator px-5 py-4 sm:px-6 sm:py-5">
              <h2 className="font-serif text-2xl">Top Performers</h2>
            </div>

            <div className="divide-y divide-separator">
              {topRecipes.map((recipe, index) => (
                <div
                  key={recipe._id}
                  className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:px-6"
                >
                  <div className="relative h-44 w-full shrink-0 overflow-hidden bg-surface-secondary sm:h-20 sm:w-24">
                    <Image
                      src={
                        recipe.recipeImage || "/assests/recipe-placeholder.png"
                      }
                      alt={recipe.recipeName || "Recipe"}
                      fill
                      sizes="(max-width: 640px) 100vw, 96px"
                      unoptimized
                      className="object-cover"
                    />

                    <span className="absolute left-2 top-2 bg-accent px-2 py-1 text-[10px] font-bold text-accent-foreground sm:left-1 sm:top-1">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="wrap-break-word font-serif text-xl leading-snug">
                      {recipe.recipeName}
                    </h3>

                    <p className="mt-1 text-xs text-surface-secondary-foreground">
                      By Chef {recipe.authorName || "Unknown"}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-surface-secondary-foreground">
                      <span className="flex items-center gap-1">
                        <Icon data={Heart} size={13} />
                        {recipe.likesCount || 0}
                      </span>

                      <span className="flex items-center gap-1">
                        <Icon data={ChartColumn} size={13} />
                        {recipe.preparationTime || 0}m
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {topRecipes.length === 0 && (
                <div className="px-5 py-8 text-sm text-surface-secondary-foreground sm:px-6">
                  No top recipes available yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
