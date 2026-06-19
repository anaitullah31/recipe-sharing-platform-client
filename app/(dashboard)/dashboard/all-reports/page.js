import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { fetchData } from "@/app/lib/core/server";
import RemoveRecipe from "./RemoveRecipe";
import DismissReport from "./DismissReport";

const ManageReportsPage = async () => {
  const data = await fetchData("/reports");

  const reports = data?.data || [];

  return (
    <section className="min-h-screen bg-background px-6 py-16 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div>
            <h1 className="font-serif text-5xl leading-tight md:text-6xl">
              Manage Reports
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-surface-secondary-foreground">
              Review and act upon community-reported content to maintain the
              culinary excellence and integrity of the RecipeHub platform.
            </p>
          </div>

          <div className="flex w-fit items-center rounded-lg border border-border bg-surface-secondary px-8 py-5">
            <div className="pr-8">
              <p className="font-serif text-4xl text-accent">
                {data?.stats?.pending}
              </p>
              <p className="mt-1 text-xs text-surface-secondary-foreground">
                Pending
              </p>
            </div>

            <div className="h-10 w-px bg-separator" />

            <div className="pl-8">
              <p className="font-serif text-4xl text-surface-foreground">
                {data?.stats?.resolved}
              </p>
              <p className="mt-1 text-xs text-surface-secondary-foreground">
                Resolved Today
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          {/* TABLE HEADER */}
          <div className="hidden grid-cols-[1.5fr_1.2fr_0.8fr_0.8fr_0.8fr_1fr] border-b border-separator bg-surface-secondary px-7 py-6 text-sm font-bold md:grid">
            <span>Recipe Name</span>
            <span>Reporter</span>
            <span>Reason</span>
            <span>Status</span>
            <span>Date Reported</span>
            <span className="text-right">Actions</span>
          </div>

          {/* TABLE BODY */}
          <div>
            {reports.map((report) => (
              <div
                key={report._id}
                className="grid gap-5 border-b border-separator px-7 py-6 last:border-b-0 md:grid-cols-[1.5fr_1.2fr_0.8fr_0.8fr_0.8fr_1fr] md:items-center"
              >
                {/* Recipe */}
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded bg-surface-secondary">
                    {report.recipeImage ? (
                      <Image
                        src={report.recipeImage}
                        alt={report.recipeName}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-surface-secondary-foreground">
                        No Image
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-lg leading-tight">
                      {report.recipeName}
                    </h3>
                    <p className="mt-1 text-xs text-surface-secondary-foreground">
                      ID: #{report.recipeId}
                    </p>
                  </div>
                </div>

                {/* Reporter */}
                <p className="text-sm text-surface-secondary-foreground">
                  {report.userEmail}
                </p>

                {/* Reason */}
                <div>
                  <span className="inline-flex rounded bg-danger/10 px-3 py-1 text-[10px] font-semibold text-danger">
                    {report.reason}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span
                    className={`inline-flex rounded px-3 py-1 text-[10px] font-semibold uppercase ${
                      report.status === "resolved"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {report.status || "pending"}
                  </span>
                </div>

                {/* Date */}
                <p className="text-sm text-surface-secondary-foreground">
                  {new Date(report.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3 md:justify-end">
                  {/* <button className="cursor-pointer border border-border px-4 py-2 text-xs font-semibold text-surface-secondary-foreground transition hover:bg-surface-hover">
                    Dismiss
                  </button> */}
                  <DismissReport reportId={report._id}
                    status={report.status} />

                  <RemoveRecipe
                    reportId={report.recipeId}
                    status={report.status}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-separator bg-surface-secondary px-7 py-5 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-surface-secondary-foreground">
              Showing 1-{reports.length} of 24 reports
            </p>

            <div className="flex items-center gap-2">
              <button className="flex h-9 w-9 cursor-pointer items-center justify-center border border-border bg-surface transition hover:bg-surface-hover">
                <Icon data={ChevronLeft} size={14} />
              </button>

              <button className="flex h-9 w-9 cursor-pointer items-center justify-center bg-accent text-sm font-bold text-accent-foreground">
                1
              </button>

              <button className="flex h-9 w-9 cursor-pointer items-center justify-center border border-border bg-surface text-sm transition hover:bg-surface-hover">
                2
              </button>

              <button className="flex h-9 w-9 cursor-pointer items-center justify-center border border-border bg-surface transition hover:bg-surface-hover">
                <Icon data={ChevronRight} size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageReportsPage;
