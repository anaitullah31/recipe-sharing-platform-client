import Image from "next/image";
import { fetchSecureData } from "@/app/lib/core/server";
import RemoveRecipe from "./RemoveRecipe";
import DismissReport from "./DismissReport";
import { requireRole } from "@/app/lib/core/session";
import Pagination from "@/app/components/shared/Pagination";

const ManageReportsPage = async ({ searchParams }) => {
  await requireRole("admin");

  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 8;

  const data = await fetchSecureData(`/reports?page=${currentPage}&limit=${limit}`);
  const reports = data?.data || [];
  const pagination = data?.pagination || {};

  return (
    <section className="min-h-screen bg-background px-4 pt-16 pb-8 text-foreground sm:px-6 sm:py-10 lg:px-10 xl:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div>
            <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              Manage Reports
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-surface-secondary-foreground">
              Review and act upon community-reported content to maintain the
              culinary excellence and integrity of the RecipeHub platform.
            </p>
          </div>

           

          <div className="flex w-fit items-center rounded-lg border border-border bg-surface-secondary px-8 py-5">
            <div className="pr-8">
              <p className="font-serif text-4xl text-accent">
                {data?.stats?.pending || 0}
              </p>
              <p className="mt-1 text-xs text-surface-secondary-foreground">
                Pending
              </p>
            </div>

            <div className="h-10 w-px bg-separator" />

            <div className="pl-8">
              <p className="font-serif text-4xl text-surface-foreground">
                {data?.stats?.resolved || 0}
              </p>
              <p className="mt-1 text-xs text-surface-secondary-foreground">
                Resolved
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <div className="hidden grid-cols-[1.5fr_1.2fr_0.8fr_0.8fr_0.8fr_1fr] border-b border-separator bg-surface-secondary px-7 py-6 text-sm font-bold md:grid">
            <span>Recipe Name</span>
            <span>Reporter</span>
            <span>Reason</span>
            <span>Status</span>
            <span>Date Reported</span>
            <span className="text-right">Actions</span>
          </div>

          <div>
            {reports.map((report) => (
              <div
                key={report._id}
                className="grid gap-5 border-b border-separator px-7 py-6 last:border-b-0 md:grid-cols-[1.5fr_1.2fr_0.8fr_0.8fr_0.8fr_1fr] md:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded bg-surface-secondary">
                    {report.recipeImage ? (
                      <Image
                        src={report.recipeImage}
                        alt={report.recipeName || "Recipe image"}
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

                <p className="text-sm text-surface-secondary-foreground">
                  {report.userEmail}
                </p>

                <div>
                  <span className="inline-flex rounded bg-danger/10 px-3 py-1 text-[10px] font-semibold text-danger">
                    {report.reason}
                  </span>
                </div>

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

                <p className="text-sm text-surface-secondary-foreground">
                  {new Date(report.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>

                <div className="flex items-center gap-3 md:justify-end">
                  <DismissReport reportId={report._id} status={report.status} />

                  <RemoveRecipe
                    reportId={report.recipeId}
                    status={report.status}
                  />
                </div>
              </div>
            ))}
          </div>

          {reports.length === 0 && (
            <div className="px-7 py-16 text-center">
              <h3 className="font-serif text-2xl">No reports found</h3>
              <p className="mt-2 text-sm text-surface-secondary-foreground">
                There are no recipe reports available right now.
              </p>
            </div>
          )}

          {reports.length > 0 && (
            <Pagination
              pagination={pagination}
              itemName="reports"
              limitOptions={[5, 8, 10, 20]}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageReportsPage;
