const PricingPageSkeleton = () => {
  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6 lg:px-16">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mx-auto h-3 w-32 bg-accent/40" />
          <div className="mx-auto mt-6 h-12 w-full max-w-2xl bg-surface" />
          <div className="mx-auto mt-6 h-4 w-full max-w-xl bg-surface" />
          <div className="mx-auto mt-3 h-4 w-full max-w-md bg-surface" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {[1, 2].map((card) => (
            <div
              key={card}
              className={`relative border bg-surface p-6 sm:p-8 lg:p-10 ${
                card === 2 ? "border-accent" : "border-border"
              }`}
            >
              {card === 2 && (
                <div className="absolute left-1/2 top-0 h-7 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/50" />
              )}

              <div className="h-9 w-full max-w-sm bg-surface-secondary" />
              <div className="mt-6 h-8 w-32 bg-surface-secondary" />

              <div className="mt-10 h-4 w-full max-w-md bg-surface-secondary" />
              <div className="mt-3 h-4 w-full max-w-sm bg-surface-secondary" />

              <div className="mt-10 space-y-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="h-4 w-4 rounded-full bg-accent/40" />
                    <div className="h-4 w-full max-w-xs bg-surface-secondary" />
                  </div>
                ))}
              </div>

              <div className="mt-12 h-12 w-full bg-accent/40" />
              <div className="mx-auto mt-6 h-3 w-full max-w-48 bg-surface-secondary" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PricingPageSkeleton;
