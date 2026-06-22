"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
      <section className="w-full max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.4em] text-danger">
          Application Error
        </p>

        <h1 className="mt-6 font-serif text-4xl font-bold sm:text-5xl md:text-6xl">
          Something Went Wrong
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-surface-secondary-foreground sm:text-base">
          An unexpected error occurred while processing your request. Please try
          again or return to the homepage.
        </p>

        <div className="mx-auto mt-10 flex h-40 w-40 items-center justify-center rounded-full border border-danger/30 bg-surface text-5xl font-bold text-danger sm:h-52 sm:w-52 sm:text-6xl">
          !
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex cursor-pointer items-center justify-center bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wide text-accent-foreground transition hover:bg-accent-hover"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center border border-border bg-surface px-8 py-4 text-xs font-bold uppercase tracking-wide transition hover:bg-surface-hover"
          >
            Back Home
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="mx-auto mt-10 max-w-2xl overflow-auto rounded border border-border bg-surface p-4 text-left text-xs text-danger">
            {error.message}
          </div>
        )}
      </section>
    </main>
  );
}
