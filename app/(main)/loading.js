const HomePageSkeleton = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <section className="px-6 py-28 lg:px-24">
        <div className="mx-auto grid max-w-7xl animate-pulse gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="h-3 w-56 bg-accent/40" />

            <div className="mt-10 h-16 w-72 bg-surface" />
            <div className="mt-5 h-16 w-96 bg-accent/40" />
            <div className="mt-5 h-16 w-80 bg-accent/40" />

            <div className="mt-10 space-y-4 border-l border-accent/40 pl-6">
              <div className="h-4 w-105 bg-surface" />
              <div className="h-4 w-90 bg-surface" />
              <div className="h-4 w-75 bg-surface" />
            </div>

            <div className="mt-10 h-14 w-40 bg-accent/50" />
          </div>

          <div className="relative h-105">
            <div className="absolute right-0 top-0 h-72 w-130 bg-surface" />
            <div className="absolute bottom-0 left-10 h-64 w-80 -rotate-3 border-8 border-surface bg-surface-secondary" />
            <div className="absolute right-40 top-16 h-24 w-24 rotate-12 rounded-xl bg-accent/40" />
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20 lg:px-24">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-3 w-52 bg-accent/40" />
          <div className="mt-6 h-12 w-80 bg-surface" />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-border bg-surface p-5">
                <div className="h-56 w-full bg-surface-secondary" />
                <div className="mt-6 h-6 w-48 bg-surface-secondary" />
                <div className="mt-4 h-4 w-32 bg-surface-secondary" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePageSkeleton;
