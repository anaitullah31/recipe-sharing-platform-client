"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@gravity-ui/uikit";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";

const PaginationContent = ({
  pagination,
  itemName = "items",
  limitOptions = [6, 8, 10, 12, 20],
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const total = pagination?.total || 0;
  const currentPage = pagination?.page || 1;
  const limit = pagination?.limit || 8;
  const totalPages = pagination?.totalPages || 1;
  const hasPrevPage = pagination?.hasPrevPage;
  const hasNextPage = pagination?.hasNextPage;

  const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  const createPageUrl = (page, newLimit = limit) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page);
    params.set("limit", newLimit);

    return `${pathname}?${params.toString()}`;
  };

  const handleLimitChange = (e) => {
    router.push(createPageUrl(1, e.target.value));
  };

  return (
    <div className="flex flex-col gap-4 border-t border-separator bg-surface-secondary px-6 py-5 md:flex-row md:items-center md:justify-between">
      <p className="text-xs text-surface-secondary-foreground">
        Showing {startItem}-{endItem} of {total} {itemName}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-surface-secondary-foreground">
            Per page:
          </span>

          <select
            value={limit}
            onChange={handleLimitChange}
            className="h-9 border border-border bg-surface px-3 text-xs outline-none"
          >
            {limitOptions.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-background text-foreground"
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {hasPrevPage ? (
            <Link
              href={createPageUrl(currentPage - 1)}
              className="flex h-9 w-9 items-center justify-center border border-border bg-surface transition hover:bg-surface-hover"
            >
              <Icon data={ChevronLeft} size={14} />
            </Link>
          ) : (
            <button
              disabled
              className="flex h-9 w-9 cursor-not-allowed items-center justify-center border border-border bg-surface opacity-40"
            >
              <Icon data={ChevronLeft} size={14} />
            </button>
          )}

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;

            return (
              <Link
                key={page}
                href={createPageUrl(page)}
                className={`flex h-9 w-9 items-center justify-center text-sm font-bold transition ${
                  currentPage === page
                    ? "bg-accent text-accent-foreground"
                    : "border border-border bg-surface hover:bg-surface-hover"
                }`}
              >
                {page}
              </Link>
            );
          })}

          {hasNextPage ? (
            <Link
              href={createPageUrl(currentPage + 1)}
              className="flex h-9 w-9 items-center justify-center border border-border bg-surface transition hover:bg-surface-hover"
            >
              <Icon data={ChevronRight} size={14} />
            </Link>
          ) : (
            <button
              disabled
              className="flex h-9 w-9 cursor-not-allowed items-center justify-center border border-border bg-surface opacity-40"
            >
              <Icon data={ChevronRight} size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Pagination = (props) => {
  return (
    <Suspense fallback={null}>
      <PaginationContent {...props} />
    </Suspense>
  );
};

export default Pagination;
