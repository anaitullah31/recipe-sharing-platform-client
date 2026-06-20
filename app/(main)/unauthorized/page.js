import Link from "next/link";
import { Lock } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";

const UnauthorizedPage = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2070')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg border border-border bg-surface p-12 text-center shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-surface-secondary">
          <Icon data={Lock} size={24} className="text-accent" />
        </div>

        <h1 className="mt-8 font-serif text-5xl text-foreground">
          Restricted Access
        </h1>

        <p className="mx-auto mt-6 max-w-md leading-8 text-surface-secondary-foreground">
          It appears you have reached a sanctuary reserved for our administration.
          Your current role does not have the necessary permissions to view
          this digital atelier.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded bg-accent px-8 py-3 text-xs font-bold uppercase text-accent-foreground transition hover:bg-accent-hover"
          >
            Go To Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-border px-8 py-3 text-xs font-bold uppercase text-foreground transition hover:bg-surface-hover"
          >
            Contact Support
          </Link>
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-surface-tertiary-foreground">
          HTTP ERROR 403 • FORBIDDEN
        </p>
      </div>
    </section>
  );
};

export default UnauthorizedPage;