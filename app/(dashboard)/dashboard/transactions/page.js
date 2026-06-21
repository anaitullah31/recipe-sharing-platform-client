import { fetchData } from "@/app/lib/core/server";
import { ArrowDown, Funnel } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import Pagination from "@/app/components/shared/Pagination";

const TransactionsHistoryPage = async ({ searchParams }) => {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 8;

  const data = await fetchData(`/payments?page=${currentPage}&limit=${limit}`);

  const payments = data?.data || [];
  const pagination = data?.pagination || {};
  const stats = data?.stats || {};

  return (
    <section className="min-h-screen bg-background px-6 py-12 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="font-serif text-5xl">Transaction Ledger</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-surface-secondary-foreground">
              Review and oversee all financial activities within the RecipeHub
              ecosystem. Access detailed records of subscriptions and recipe
              purchases.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <SummaryCard
              title="Gross Revenue"
              value={`$${Number(stats.grossRevenue || 0).toFixed(2)}`}
              note="+12.4% vs last period"
            />
            <SummaryCard
              title="Active Subscriptions"
              value={stats.activeSubscriptions || 0}
              note="Premium members"
            />
            <SummaryCard
              title="Successful Payments"
              value={stats.successfulPayments || 0}
              note="Paid transactions"
              danger
            />
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 border border-border bg-surface-secondary p-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-surface-secondary-foreground">
                Date Range
              </label>
              <input
                type="text"
                defaultValue="Oct 01, 2023 - Oct 31, 2023"
                className="mt-2 h-11 w-full border border-border bg-surface px-4 text-sm outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-surface-secondary-foreground">
                Status
              </label>
              <select className="mt-2 h-11 w-full border border-border bg-surface px-4 text-sm outline-none focus:border-accent">
                <option>All Statuses</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-surface-secondary-foreground">
                Service Type
              </label>
              <select className="mt-2 h-11 w-full border border-border bg-surface px-4 text-sm outline-none focus:border-accent">
                <option>All Services</option>
                <option>Premium Membership</option>
                <option>Recipe Purchase</option>
              </select>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 text-xs font-semibold text-accent">
            <Icon data={Funnel} size={13} />
            Clear All
          </button>
        </div>

        <div className="overflow-hidden border border-border bg-surface">
          <div className="hidden grid-cols-[1.4fr_1.4fr_1.2fr_0.8fr_1.1fr_0.7fr] border-b border-separator bg-surface-secondary px-6 py-4 text-xs font-bold uppercase tracking-widest md:grid">
            <span>User</span>
            <span>Transaction ID</span>
            <span>Service Type</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          {payments.map((payment) => (
            <div
              key={payment._id}
              className="grid gap-4 border-b border-separator px-6 py-5 last:border-b-0 md:grid-cols-[1.4fr_1.4fr_1.2fr_0.8fr_1.1fr_0.7fr] md:items-center"
            >
              <div className="min-w-0">
                <h3 className="text-sm font-bold">
                  {payment.userName || "Unknown User"}
                </h3>
                <p className="mt-1 break-all text-xs text-surface-secondary-foreground">
                  {payment.userEmail}
                </p>
              </div>

              <p className="break-all text-xs font-bold">
                #{payment.transactionId || payment.stripeSessionId}
              </p>

              <div className="text-sm">
                <p>
                  {payment.paymentType === "premium"
                    ? "Premium Membership"
                    : "Recipe Purchase"}
                </p>
                {payment.recipeName && (
                  <span className="mt-1 block text-xs text-surface-secondary-foreground">
                    {payment.recipeName}
                  </span>
                )}
              </div>

              <p className="text-sm font-bold">
                ${Number(payment.amount || 0).toFixed(2)}
              </p>

              <p className="text-sm text-surface-secondary-foreground">
                {new Date(payment.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <span
                className={`w-fit rounded-full px-3 py-1 text-[10px] font-bold capitalize ${
                  payment.paymentStatus === "paid"
                    ? "bg-success/10 text-success"
                    : payment.paymentStatus === "failed"
                      ? "bg-danger/10 text-danger"
                      : "bg-warning/10 text-warning"
                }`}
              >
                {payment.paymentStatus}
              </span>
            </div>
          ))}

          {payments.length === 0 && (
            <div className="px-6 py-16 text-center">
              <h3 className="font-serif text-2xl">No payments found</h3>
              <p className="mt-2 text-sm text-surface-secondary-foreground">
                There are no transactions available right now.
              </p>
            </div>
          )}

          {payments.length > 0 && (
            <Pagination
              pagination={pagination}
              itemName="payments"
              limitOptions={[5, 8, 10, 20]}
            />
          )}
        </div>
      </div>
    </section>
  );
};

const SummaryCard = ({ title, value, note, danger }) => {
  return (
    <div className="border border-border bg-surface-secondary p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-surface-secondary-foreground">
        {title}
      </p>
      <h3 className={`mt-3 font-serif text-3xl ${danger ? "text-danger" : ""}`}>
        {value}
      </h3>
      <p className="mt-3 text-xs text-surface-secondary-foreground">{note}</p>
    </div>
  );
};

export default TransactionsHistoryPage;
