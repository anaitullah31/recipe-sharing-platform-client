const ProfilePageSkeleton = () => {
  return (
    <section className="min-h-screen bg-background px-6 py-12 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-12 flex items-center gap-6">
          <div className="h-32 w-32 rounded-lg bg-surface" />

          <div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-80 bg-surface" />
              <div className="h-6 w-28 rounded-full bg-accent/40" />
            </div>

            <div className="mt-5 h-4 w-130 bg-surface" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div className="border border-border bg-surface p-8">
              <div className="h-7 w-52 bg-surface-secondary" />
              <div className="mt-6 h-px w-full bg-border" />

              <div className="mt-10">
                <div className="h-3 w-24 bg-surface-secondary" />
                <div className="mt-6 h-4 w-40 bg-surface-secondary" />
                <div className="mt-5 h-px w-full bg-border" />
              </div>

              <div className="mt-10">
                <div className="h-3 w-28 bg-surface-secondary" />
                <div className="mt-6 h-4 w-44 bg-surface-secondary" />
                <div className="mt-5 h-px w-full bg-border" />
              </div>
            </div>

            <div className="border border-border bg-surface p-8">
              <div className="h-7 w-60 bg-surface-secondary" />
              <div className="mt-6 h-px w-full bg-border" />

              <div className="mt-8 h-52 w-full border border-dashed border-accent/40 bg-surface-secondary" />
              <div className="mt-4 h-3 w-40 bg-surface-secondary" />
            </div>

            <div className="h-12 w-36 bg-accent/50" />
          </div>

          <aside className="space-y-8">
            <div className="border border-border bg-surface p-8">
              <div className="h-3 w-28 bg-surface-secondary" />
              <div className="mt-5 flex items-center justify-between">
                <div className="h-8 w-56 bg-surface-secondary" />
                <div className="h-8 w-8 rounded-full bg-accent/40" />
              </div>

              <div className="mt-6 h-6 w-44 rounded-full bg-surface-secondary" />

              <div className="mt-8 space-y-5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="h-3 w-56 bg-surface-secondary" />
                ))}
              </div>

              <div className="mt-8 h-12 w-full border border-accent/40 bg-surface-secondary" />
              <div className="mx-auto mt-5 h-3 w-56 bg-surface-secondary" />
            </div>

            <div className="border border-border bg-surface p-8">
              <div className="h-7 w-32 bg-surface-secondary" />

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="h-24 bg-background" />
                <div className="h-24 bg-background" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ProfilePageSkeleton;
