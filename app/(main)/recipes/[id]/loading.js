const RecipeDetailsSkeleton = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="grid min-h-115 animate-pulse lg:grid-cols-[42%_58%]">
        <div className="bg-surface px-6 py-12 lg:px-16">
          <div className="h-3 w-28 bg-surface-secondary" />

          <div className="mt-12 h-3 w-20 bg-accent/40" />
          <div className="mt-6 h-12 w-64 bg-surface-secondary" />
          <div className="mt-3 h-12 w-48 bg-surface-secondary" />

          <div className="mt-8 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-accent/40" />
            <div>
              <div className="h-4 w-32 bg-surface-secondary" />
              <div className="mt-2 h-3 w-28 bg-surface-secondary" />
            </div>
          </div>

          <div className="mt-12 h-px w-full bg-border" />

          <div className="mt-8 flex gap-5">
            <div className="h-4 w-10 bg-surface-secondary" />
            <div className="h-4 w-10 bg-surface-secondary" />
            <div className="h-4 w-10 bg-surface-secondary" />
            <div className="ml-auto h-4 w-5 bg-surface-secondary" />
          </div>

          <div className="mt-8 h-px w-full bg-border" />

          <div className="mt-8 h-12 w-80 bg-accent/40" />
          <div className="mx-auto mt-4 h-3 w-56 bg-surface-secondary" />
        </div>

        <div className="h-115 bg-surface-secondary" />
      </section>

      <section className="px-6 py-12 lg:px-16">
        <div className="mx-auto grid max-w-5xl animate-pulse gap-10 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-6">
            <div className="rounded border border-border bg-surface p-6">
              <div className="h-6 w-32 bg-surface-secondary" />

              <div className="mt-8 space-y-5">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full border border-border" />
                    <div className="h-3 w-52 bg-surface-secondary" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded bg-surface p-6">
              <div className="h-3 w-36 bg-surface-secondary" />

              <div className="mt-8 grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item}>
                    <div className="h-7 w-20 bg-accent/40" />
                    <div className="mt-2 h-3 w-16 bg-surface-secondary" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-10 flex flex-wrap gap-8">
              <div className="h-4 w-24 bg-surface-secondary" />
              <div className="h-4 w-28 bg-surface-secondary" />
              <div className="h-4 w-28 bg-surface-secondary" />
            </div>

            <div className="space-y-10">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex gap-8">
                  <div className="h-12 w-16 bg-accent/30" />
                  <div className="flex-1">
                    <div className="h-6 w-28 bg-surface-secondary" />
                    <div className="mt-5 h-4 w-full bg-surface-secondary" />
                    <div className="mt-3 h-4 w-2/3 bg-surface-secondary" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 h-14 w-72 border-l-4 border-accent bg-surface" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecipeDetailsSkeleton;