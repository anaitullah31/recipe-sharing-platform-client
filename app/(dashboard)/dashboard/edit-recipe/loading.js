const EditRecipePageSkeleton = () => {
  return (
    <section className="min-h-screen bg-background px-6 py-12 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-8">
          <div className="h-3 w-32 bg-surface" />
          <div className="mt-4 h-12 w-80 bg-surface" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div className="border border-border bg-surface p-8">
              <div className="h-3 w-36 bg-surface-secondary" />
              <div className="mt-8 h-8 w-52 bg-surface-secondary" />
              <div className="mt-5 h-px w-full bg-border" />

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="h-10 bg-surface-secondary" />
                <div className="h-10 bg-surface-secondary" />
              </div>
            </div>

            <div className="border border-border bg-surface p-8">
              <div className="mb-8 flex items-center justify-between">
                <div className="h-3 w-28 bg-surface-secondary" />
                <div className="h-4 w-28 bg-surface-secondary" />
              </div>

              <div className="grid grid-cols-[1fr_120px_24px] gap-5">
                <div className="h-10 bg-surface-secondary" />
                <div className="h-10 bg-surface-secondary" />
                <div className="h-6 w-6 bg-surface-secondary" />
              </div>
            </div>

            <div className="border border-border bg-surface p-8">
              <div className="h-3 w-40 bg-surface-secondary" />

              <div className="mt-10 flex gap-5">
                <div className="h-8 w-5 bg-surface-secondary" />
                <div className="h-28 flex-1 bg-surface-secondary" />
              </div>

              <div className="mt-8 h-12 w-full border border-dashed border-border bg-surface-secondary" />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="border border-border bg-surface p-8">
              <div className="h-3 w-40 bg-surface-secondary" />
              <div className="mt-6 h-48 w-full border border-dashed border-accent/40 bg-surface-secondary" />
              <div className="mt-6 h-10 w-44 bg-surface-secondary" />
            </div>

            <div className="border border-border bg-surface p-8">
              <div className="h-3 w-36 bg-surface-secondary" />

              <div className="mt-8">
                <div className="h-3 w-32 bg-surface-secondary" />
                <div className="mt-3 h-11 w-full bg-surface-secondary" />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-5">
                <div>
                  <div className="h-3 w-20 bg-surface-secondary" />
                  <div className="mt-3 h-10 bg-surface-secondary" />
                </div>

                <div>
                  <div className="h-3 w-24 bg-surface-secondary" />
                  <div className="mt-3 h-10 bg-surface-secondary" />
                </div>
              </div>
            </div>

            <div className="h-12 w-full bg-accent/50" />
            <div className="mx-auto h-3 w-20 bg-surface-secondary" />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default EditRecipePageSkeleton;