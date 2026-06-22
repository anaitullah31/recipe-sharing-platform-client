const ManageUsersSkeleton = () => {
  return (
    <section className="min-h-screen bg-background px-6 py-12 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-10">
          <div className="h-12 w-80 bg-surface" />
          <div className="mt-5 h-4 w-130 bg-surface" />
          <div className="mt-3 h-4 w-90 bg-surface" />
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-border bg-surface p-6">
              <div className="h-3 w-40 bg-surface-secondary" />
              <div className="mt-5 h-8 w-16 bg-surface-secondary" />
            </div>
          ))}
        </div>

        <div className="overflow-hidden border border-border bg-surface">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-5">
            <div className="h-10 w-28 bg-surface-secondary" />
            <div className="h-10 w-36 bg-surface-secondary" />
            <div className="h-10 w-28 bg-surface-secondary" />
            <div className="h-10 w-80 bg-surface-secondary" />
            <div className="ml-auto h-10 w-44 bg-surface-secondary" />
          </div>

          <div className="grid grid-cols-[1.8fr_1fr_0.8fr_0.8fr_0.7fr_0.6fr_0.8fr] gap-6 border-b border-border px-6 py-5">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="h-3 bg-surface-secondary" />
            ))}
          </div>

          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="grid grid-cols-[1.8fr_1fr_0.8fr_0.8fr_0.7fr_0.6fr_0.8fr] items-center gap-6 border-b border-border px-6 py-5"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-16 bg-surface-secondary" />
                <div>
                  <div className="h-4 w-36 bg-surface-secondary" />
                  <div className="mt-3 h-3 w-44 bg-surface-secondary" />
                </div>
              </div>

              <div className="h-4 w-32 bg-surface-secondary" />
              <div className="h-5 w-20 bg-surface-secondary" />
              <div className="h-4 w-24 bg-surface-secondary" />
              <div className="h-5 w-5 bg-surface-secondary" />
              <div className="h-4 w-12 bg-surface-secondary" />

              <div className="flex gap-3">
                <div className="h-5 w-5 bg-surface-secondary" />
                <div className="h-5 w-5 bg-surface-secondary" />
                <div className="h-5 w-5 bg-surface-secondary" />
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between px-6 py-5">
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

export default ManageUsersSkeleton;