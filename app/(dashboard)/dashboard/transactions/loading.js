const PaymentHistorySkeleton = () => {
  return (
    <section className="min-h-screen bg-background px-6 py-12 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="h-12 w-80 bg-surface" />
            <div className="mt-5 h-4 w-105 bg-surface" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-36 w-52 border border-border bg-surface p-6"
              >
                <div className="h-3 w-24 bg-surface-secondary" />
                <div className="mt-6 h-8 w-28 bg-surface-secondary" />
                <div className="mt-5 h-3 w-32 bg-surface-secondary" />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 border border-border bg-surface p-6">
          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <div className="mb-3 h-3 w-24 bg-surface-secondary" />
                <div className="h-12 w-full bg-surface-secondary" />
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border bg-surface">
          <div className="grid grid-cols-5 gap-6 border-b border-border px-6 py-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-3 bg-surface-secondary" />
            ))}
          </div>

          {[1, 2, 3].map((row) => (
            <div
              key={row}
              className="grid grid-cols-5 gap-6 border-b border-border px-6 py-6"
            >
              <div>
                <div className="h-4 w-28 bg-surface-secondary" />
                <div className="mt-3 h-3 w-36 bg-surface-secondary" />
              </div>

              <div className="h-4 w-44 bg-surface-secondary" />
              <div>
                <div className="h-4 w-32 bg-surface-secondary" />
                <div className="mt-3 h-3 w-24 bg-surface-secondary" />
              </div>
              <div className="h-4 w-20 bg-surface-secondary" />
              <div className="h-6 w-14 rounded-full bg-surface-secondary" />
            </div>
          ))}

          <div className="flex items-center justify-between px-6 py-5">
            <div className="h-3 w-40 bg-surface-secondary" />

            <div className="flex gap-3">
              <div className="h-9 w-16 bg-surface-secondary" />
              <div className="h-9 w-9 bg-surface-secondary" />
              <div className="h-9 w-9 bg-accent/40" />
              <div className="h-9 w-9 bg-surface-secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentHistorySkeleton;
