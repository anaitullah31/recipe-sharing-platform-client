const RecipesPageSkeleton = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <section className="px-6 py-16 lg:px-24">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="text-center">
            <div className="mx-auto h-12 w-96 bg-surface" />
            <div className="mx-auto mt-6 h-4 w-155 bg-surface" />
            <div className="mx-auto mt-3 h-4 w-120 bg-surface" />
          </div>

          <div className="mx-auto mt-12 flex max-w-5xl items-center gap-4 border border-border bg-surface px-5 py-4">
            <div className="h-5 flex-1 bg-surface-secondary" />
            <div className="h-5 w-24 bg-surface-secondary" />
            <div className="h-5 w-20 bg-surface-secondary" />
            <div className="h-5 w-24 bg-surface-secondary" />
            <div className="h-5 w-20 bg-surface-secondary" />
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-surface p-4">
                <div className="h-64 w-full bg-surface-secondary" />

                <div className="mt-5 flex justify-between">
                  <div className="h-3 w-20 bg-accent/40" />
                  <div className="h-3 w-24 bg-accent/40" />
                </div>

                <div className="mt-5 h-7 w-44 bg-surface-secondary" />
                <div className="mt-4 h-4 w-full bg-surface-secondary" />
                <div className="mt-3 h-4 w-3/4 bg-surface-secondary" />

                <div className="mt-8 flex items-end justify-between">
                  <div className="h-4 w-16 bg-surface-secondary" />
                  <div>
                    <div className="h-3 w-12 bg-surface-secondary" />
                    <div className="mt-2 h-6 w-16 bg-surface-secondary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecipesPageSkeleton;
