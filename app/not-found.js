import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
      <section className="w-full max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.4em] text-accent">
          404 Error
        </p>

        <h1 className="mt-6 font-serif text-5xl font-bold sm:text-6xl md:text-7xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-surface-secondary-foreground sm:text-base">
          The page you are looking for does not exist, has been moved, or is
          temporarily unavailable.
        </p>

        <div className="mx-auto mt-10 flex h-40 w-40 items-center justify-center rounded-full border border-accent/40 bg-surface text-6xl font-bold text-accent sm:h-52 sm:w-52 sm:text-7xl">
          404
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wide text-accent-foreground transition hover:bg-accent-hover"
        >
          Back Home
        </Link>
      </section>
    </main>
  );
}
