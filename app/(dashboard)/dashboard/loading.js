const DashboardPageSkeleton = () => {
  return (
    <section className="min-h-screen bg-background px-6 py-12 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="h-3 w-32 bg-accent/40" />
            <div className="mt-4 h-10 w-80 bg-surface" />
          </div>

          <div className="flex gap-3">
            <div className="h-10 w-28 bg-surface" />
            <div className="h-10 w-32 bg-accent/40" />
          </div>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border border-border bg-surface p-6">
              <div className="h-3 w-28 bg-surface-secondary" />
              <div className="mt-6 h-8 w-16 bg-surface-secondary" />
            </div>
          ))}
        </div>

        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="border border-border bg-surface p-8">
            <div className="h-7 w-48 bg-surface-secondary" />
            <div className="mt-8 h-56 w-full bg-surface-secondary" />
            <div className="mt-8 h-px w-full bg-border" />
            <div className="mt-6 h-4 w-130 bg-surface-secondary" />
            <div className="mt-3 h-4 w-72 bg-surface-secondary" />
          </div>

          <div className="border border-border bg-surface p-8">
            <div className="h-7 w-44 bg-surface-secondary" />

            <div className="mt-8 space-y-7">
              <div>
                <div className="flex justify-between">
                  <div className="h-3 w-28 bg-surface-secondary" />
                  <div className="h-3 w-24 bg-surface-secondary" />
                </div>
                <div className="mt-4 h-2 w-full bg-surface-secondary" />
              </div>

              <div>
                <div className="flex justify-between">
                  <div className="h-3 w-36 bg-surface-secondary" />
                  <div className="h-3 w-24 bg-surface-secondary" />
                </div>
                <div className="mt-4 h-2 w-full bg-surface-secondary" />
              </div>

              <div className="h-20 w-full bg-surface-secondary" />
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="border border-border bg-surface">
            <div className="border-b border-border p-6">
              <div className="h-7 w-48 bg-surface-secondary" />
            </div>

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-border px-6 py-5"
              >
                <div className="h-9 w-9 bg-surface-secondary" />
                <div className="flex-1">
                  <div className="h-4 w-56 bg-surface-secondary" />
                  <div className="mt-3 h-3 w-72 bg-surface-secondary" />
                </div>
                <div className="h-5 w-5 bg-surface-secondary" />
              </div>
            ))}
          </div>

          <div className="border border-border bg-surface">
            <div className="border-b border-border p-6">
              <div className="h-7 w-44 bg-surface-secondary" />
            </div>

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-5 border-b border-border px-6 py-5"
              >
                <div className="h-16 w-16 bg-surface-secondary" />
                <div className="flex-1">
                  <div className="h-5 w-44 bg-surface-secondary" />
                  <div className="mt-3 h-3 w-36 bg-surface-secondary" />
                  <div className="mt-3 h-3 w-28 bg-surface-secondary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPageSkeleton;
