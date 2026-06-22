import { fetchSecureData } from "@/app/lib/core/server";
import { Funnel } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import Pagination from "@/app/components/shared/Pagination";
import { getUserSession } from "@/app/lib/core/session";
import SummaryCard from "./SummaryCard";

const PaymentHistoryPage = async ({ searchParams }) => {
  const params = await searchParams;
  const user = await getUserSession();

  const currentPage = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 8;

  const data = await fetchSecureData(
    `/payments?userEmail=${user?.email}&page=${currentPage}&limit=${limit}`,
  );

  const payments = data?.data || [];
  const pagination = data?.pagination || {};

  const stats = {
    totalSpent: payments.reduce(
      (total, payment) => total + (payment.amount || 0),
      0,
    ),
    premiumPayments: payments.filter(
      (payment) => payment.paymentType === "premium",
    ).length,
    recipePurchases: payments.filter(
      (payment) => payment.paymentType === "recipe",
    ).length,
  };

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  const getStatusClass = (status) => {
    if (status === "paid") return "bg-success/10 text-success";
    if (status === "failed") return "bg-danger/10 text-danger";
    return "bg-warning/10 text-warning";
  };

  return (
    <section className="min-h-screen bg-background px-4 pt-14 pb-8 text-foreground sm:px-6 sm:pt-16 sm:pb-10 lg:px-10 lg:pt-10 xl:px-16">
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div className="mb-8 grid gap-6 lg:mb-10 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div className="min-w-0">
            <h1 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Payment History
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-surface-secondary-foreground">
              View your premium membership payments and purchased recipe
              transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:w-155">
            <SummaryCard
              title="Total Spent"
              value={`$${Number(stats.totalSpent || 0).toFixed(2)}`}
              note="Your total payments"
            />
            <SummaryCard
              title="Premium Payments"
              value={stats.premiumPayments || 0}
              note="Membership transactions"
            />
            <SummaryCard
              title="Recipe Purchases"
              value={stats.recipePurchases || 0}
              note="Purchased recipes"
            />
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-border bg-surface-secondary p-5 lg:mb-8 lg:p-6">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
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

            <button className="inline-flex h-11 w-full items-center justify-center gap-2 border border-border bg-surface px-4 text-xs font-bold uppercase text-accent transition hover:bg-surface-hover lg:w-auto">
              <Icon data={Funnel} size={13} />
              Clear All
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="hidden grid-cols-[1.3fr_1.35fr_1.25fr_0.75fr_1.05fr_0.7fr] border-b border-separator bg-surface-secondary px-6 py-4 text-[10px] font-bold uppercase tracking-widest xl:grid">
            <span>User</span>
            <span>Transaction ID</span>
            <span>Service Type</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          {payments.map((payment) => {
            const serviceType =
              payment.paymentType === "premium"
                ? "Premium Membership"
                : "Recipe Purchase";

            const transactionId =
              payment.transactionId || payment.stripeSessionId || "N/A";

            return (
              <div
                key={payment._id}
                className="border-b border-separator px-5 py-5 last:border-b-0 sm:px-6 xl:grid xl:grid-cols-[1.3fr_1.35fr_1.25fr_0.75fr_1.05fr_0.7fr] xl:items-center xl:gap-4"
              >
                <div className="flex items-start justify-between gap-4 xl:hidden">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                      {serviceType}
                    </p>

                    <h3 className="mt-1 wrap-break-word font-serif text-xl leading-tight">
                      ${Number(payment.amount || 0).toFixed(2)}
                    </h3>

                    {payment.recipeName && (
                      <p className="mt-1 line-clamp-1 text-xs text-surface-secondary-foreground">
                        {payment.recipeName}
                      </p>
                    )}
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold capitalize ${getStatusClass(
                      payment.paymentStatus,
                    )}`}
                  >
                    {payment.paymentStatus || "pending"}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2 xl:hidden">
                  <div className="min-w-0">
                    <p className="font-bold uppercase text-surface-secondary-foreground">
                      Date
                    </p>
                    <p className="mt-1 text-sm">
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="font-bold uppercase text-surface-secondary-foreground">
                      Transaction
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold">
                      #{transactionId}
                    </p>
                  </div>

                  <div className="min-w-0 sm:col-span-2">
                    <p className="font-bold uppercase text-surface-secondary-foreground">
                      User
                    </p>
                    <p className="mt-1 break-all text-sm">
                      {payment.userEmail || user?.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="hidden min-w-0 xl:block">
                  <h3 className="text-sm font-bold">
                    {payment.userName || "Unknown User"}
                  </h3>
                  <p className="mt-1 break-all text-xs text-surface-secondary-foreground">
                    {payment.userEmail}
                  </p>
                </div>

                <p className="hidden break-all text-xs font-bold xl:block">
                  #{transactionId}
                </p>

                <div className="hidden text-sm xl:block">
                  <p>{serviceType}</p>
                  {payment.recipeName && (
                    <span className="mt-1 block text-xs text-surface-secondary-foreground">
                      {payment.recipeName}
                    </span>
                  )}
                </div>

                <p className="hidden text-sm font-bold xl:block">
                  ${Number(payment.amount || 0).toFixed(2)}
                </p>

                <p className="hidden text-sm text-surface-secondary-foreground xl:block">
                  {formatDate(payment.createdAt)}
                </p>

                <span
                  className={`hidden w-fit rounded-full px-3 py-1 text-[10px] font-bold capitalize xl:inline-flex ${getStatusClass(
                    payment.paymentStatus,
                  )}`}
                >
                  {payment.paymentStatus || "pending"}
                </span>
              </div>
            );
          })}

          {payments.length === 0 && (
            <div className="px-5 py-16 text-center sm:px-6">
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

export default PaymentHistoryPage;
