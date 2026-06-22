const ManageReportsSkeleton = () => {
  return (
    <section className="min-h-screen bg-background px-6 py-12 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="h-12 w-80 bg-surface" />
            <div className="mt-6 h-4 w-130 bg-surface" />
            <div className="mt-3 h-4 w-110 bg-surface" />
          </div>

          <div className="flex h-28 w-64 items-center justify-around rounded-lg border border-border bg-surface">
            <div>
              <div className="h-8 w-8 bg-surface-secondary" />
              <div className="mt-3 h-3 w-16 bg-surface-secondary" />
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="h-8 w-10 bg-surface-secondary" />
              <div className="mt-3 h-3 w-16 bg-surface-secondary" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <div className="grid grid-cols-[1.5fr_1.2fr_1fr_0.8fr_1fr_1fr] gap-6 border-b border-border px-8 py-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-3 bg-surface-secondary" />
            ))}
          </div>

          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="grid grid-cols-[1.5fr_1.2fr_1fr_0.8fr_1fr_1fr] items-center gap-6 border-b border-border px-8 py-6"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-16 rounded bg-surface-secondary" />
                <div>
                  <div className="h-4 w-36 bg-surface-secondary" />
                  <div className="mt-3 h-3 w-44 bg-surface-secondary" />
                </div>
              </div>

              <div className="h-4 w-36 bg-surface-secondary" />
              <div className="h-6 w-28 rounded bg-surface-secondary" />
              <div className="h-6 w-20 rounded bg-surface-secondary" />
              <div className="h-4 w-24 bg-surface-secondary" />

              <div className="flex gap-3">
                <div className="h-9 w-20 bg-surface-secondary" />
                <div className="h-9 w-24 bg-surface-secondary" />
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between px-8 py-5">
            <div className="h-3 w-44 bg-surface-secondary" />

            <div className="flex items-center gap-3">
              <div className="h-9 w-24 bg-surface-secondary" />
              <div className="h-9 w-9 bg-surface-secondary" />
              <div className="h-9 w-9 bg-accent/40" />
              <div className="h-9 w-9 bg-surface-secondary" />
              <div className="h-9 w-9 bg-surface-secondary" />
              <div className="h-9 w-9 bg-surface-secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageReportsSkeleton;