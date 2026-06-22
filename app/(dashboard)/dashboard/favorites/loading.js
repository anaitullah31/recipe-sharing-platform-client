const FavoritesPageSkeleton = () => {
  return (
    <section className="min-h-screen bg-background px-6 py-12 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-14">
          <div className="h-12 w-72 bg-surface" />
          <div className="mt-5 h-4 w-130 bg-surface" />
          <div className="mt-3 h-4 w-105 bg-surface" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            <div className="flex items-center justify-between px-6 py-6">
              <div className="h-7 w-48 bg-surface-secondary" />
              <div className="h-3 w-28 bg-surface-secondary" />
            </div>

            <div className="grid grid-cols-[1fr_180px_180px] gap-6 border-b border-border px-6 pb-4">
              <div className="h-3 w-20 bg-surface-secondary" />
              <div className="h-3 w-24 bg-surface-secondary" />
              <div className="h-3 w-20 bg-surface-secondary" />
            </div>

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="grid grid-cols-[1fr_180px_180px] items-center gap-6 border-b border-border px-6 py-6"
              >
                <div className="flex items-center gap-5">
                  <div className="h-16 w-20 bg-surface-secondary" />
                  <div className="h-6 w-44 bg-surface-secondary" />
                </div>

                <div className="h-4 w-24 bg-surface-secondary" />

                <div className="flex items-center gap-4">
                  <div className="h-11 w-24 bg-accent/40" />
                  <div className="h-5 w-5 bg-surface-secondary" />
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between px-6 py-5">
              <div className="h-3 w-44 bg-surface-secondary" />

              <div className="flex items-center gap-3">
                <div className="h-3 w-16 bg-surface-secondary" />
                <div className="h-9 w-14 bg-surface-secondary" />
                <div className="h-9 w-9 bg-surface-secondary" />
                <div className="h-9 w-9 bg-accent/40" />
                <div className="h-9 w-9 bg-surface-secondary" />
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg bg-accent/50 p-8">
              <div className="h-7 w-44 bg-background/40" />
              <div className="mt-6 h-4 w-56 bg-background/40" />
              <div className="mt-3 h-4 w-44 bg-background/40" />
              <div className="mt-8 h-12 w-full bg-background/50" />
            </div>

            <div className="rounded-lg bg-surface p-8">
              <div className="h-4 w-28 bg-surface-secondary" />

              <div className="mt-6 flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-6 w-20 rounded-full bg-surface-secondary"
                  />
                ))}
              </div>
            </div>

            <div className="h-64 rounded-lg bg-surface" />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default FavoritesPageSkeleton;
