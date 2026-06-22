const PaymentSuccessSkeleton = () => {
  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6 lg:px-16">
      <div className="mx-auto max-w-4xl animate-pulse">
        <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="h-10 w-10 rounded bg-accent/50" />
          <div className="mt-8 h-12 w-full max-w-md bg-surface" />
          <div className="mt-6 h-4 w-full max-w-xl bg-surface" />
          <div className="mt-3 h-4 w-full max-w-md bg-surface" />
          <div className="mt-10 h-12 w-full max-w-44 bg-accent/50" />
        </section>

        <section className="mx-auto mt-16 w-full max-w-4xl border border-border bg-surface p-6 sm:p-8 lg:p-10">
          <div className="h-4 w-full max-w-48 bg-accent/40" />

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border-b border-border pb-6">
                <div className="h-3 w-full max-w-28 bg-surface-secondary" />
                <div className="mt-5 h-5 w-full max-w-sm bg-surface-secondary" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default PaymentSuccessSkeleton;