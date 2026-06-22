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
  Pencil,
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
    <section className="min-h-screen bg-background px-6 py-10 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Executive Suite
            </p>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl">
              Dashboard Overview
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-3 text-xs font-bold uppercase text-surface-secondary-foreground">
              <Icon data={Calendar} size={14} />
              Last 30 Days
            </button>

            <button className="inline-flex cursor-pointer items-center gap-2 bg-accent px-5 py-3 text-xs font-bold uppercase text-accent-foreground">
              <Icon data={ArrowDownToLine} size={14} />
              Export Data
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-4">
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

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.75fr]">
          <div className="border border-border bg-surface p-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-serif text-2xl">Engagement Trends</h2>

              <div className="flex items-center gap-4 text-[10px] font-bold uppercase">
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

            <div className="flex h-72 items-end gap-4 border-b border-border pb-4">
              {[35, 42, 38, 54, 72, 45, 88, 50, 100, 48, 80].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className="w-full rounded-t bg-accent/70"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ),
              )}
            </div>

            <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row">
              <p className="max-w-lg text-sm leading-6 text-surface-secondary-foreground">
                Engagement peaked during the latest featured recipe cycle,
                showing increased recipe views and favorite activity.
              </p>

              <Link
                href="/dashboard/all-recipes"
                className="text-xs font-bold uppercase text-accent"
              >
                View Full Report
              </Link>
            </div>
          </div>

          <div className="border border-border bg-surface p-8">
            <h2 className="font-serif text-2xl">Content Health</h2>

            <div className="mt-8 space-y-8">
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

            <div className="mt-10 border-l-4 border-accent bg-surface-secondary p-5">
              <p className="text-sm italic leading-6 text-surface-secondary-foreground">
                Moderation response time improved as reported recipes are
                reviewed and resolved by admins.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-separator px-6 py-5">
              <h2 className="font-serif text-2xl">Platform Activity</h2>
              <span className="text-xl">...</span>
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
                <div className="px-6 py-8 text-sm text-surface-secondary-foreground">
                  No recent platform activity yet.
                </div>
              )}
            </div>
          </div>

          <div className="border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-separator px-6 py-5">
              <h2 className="font-serif text-2xl">Top Performers</h2>
            </div>

            <div className="divide-y divide-separator">
              {topRecipes.map((recipe, index) => (
                <div key={recipe._id} className="flex gap-4 px-6 py-5">
                  <div className="relative h-20 w-24 overflow-hidden bg-surface-secondary">
                    <Image
                      src={
                        recipe.recipeImage || "/assests/recipe-placeholder.png"
                      }
                      alt={recipe.recipeName}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute left-1 top-1 bg-accent px-2 py-1 text-[10px] font-bold text-accent-foreground">
                      #{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl">{recipe.recipeName}</h3>
                    <p className="text-xs text-surface-secondary-foreground">
                      By Chef {recipe.authorName || "Unknown"}
                    </p>

                    <div className="mt-3 flex items-center gap-4 text-xs text-surface-secondary-foreground">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminDashboard;
