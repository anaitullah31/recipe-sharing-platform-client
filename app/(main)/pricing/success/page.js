import Link from "next/link";
import { redirect } from "next/navigation";
import { Check } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { stripe } from "@/app/lib/stripe";

const PaymentSuccessPage = async ({ searchParams }) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (session.status === "open") {
    redirect("/");
  }

  const orderId = session.id;
  const customerEmail = session.customer_details?.email;
  const amount = (session.amount_total || 0) / 100;

  const paymentDate = new Date(session.created * 1000).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const productName =
    session.line_items?.data?.[0]?.description || "RecipeHub Purchase";

  const cardBrand =
    session.payment_intent?.charges?.data?.[0]?.payment_method_details?.card
      ?.brand || "Card";

  const cardLast4 =
    session.payment_intent?.charges?.data?.[0]?.payment_method_details?.card
      ?.last4 || "****";

  return (
    <section className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-4xl">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-accent text-accent-foreground">
            <Icon data={Check} size={24} />
          </div>
        </div>

        {/* Heading */}
        <div className="mt-8 text-center">
          <h1 className="font-serif text-5xl md:text-5xl">
            Payment Successful
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-surface-secondary-foreground">
            Thank you for your purchase. Your payment has been completed
            successfully and your order is now confirmed.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center justify-center rounded bg-accent px-8 py-4 text-xs font-bold uppercase text-accent-foreground hover:bg-accent-hover"
          >
            Go To Dashboard
          </Link>
        </div>

        {/* Summary Card */}
        <div className="mt-16 border border-border bg-surface p-10">
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Transaction Summary
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase text-surface-secondary-foreground">
                Order ID
              </p>

              <p className="mt-2 font-medium break-all">{orderId}</p>

              <div className="mt-5 border-b border-separator" />
            </div>

            <div>
              <p className="text-xs uppercase text-surface-secondary-foreground">
                Date
              </p>

              <p className="mt-2 font-medium">{paymentDate}</p>

              <div className="mt-5 border-b border-separator" />
            </div>

            <div>
              <p className="text-xs uppercase text-surface-secondary-foreground">
                Product
              </p>

              <p className="mt-2 font-medium text-accent">{productName}</p>

              <div className="mt-5 border-b border-separator" />
            </div>

            <div>
              <p className="text-xs uppercase text-surface-secondary-foreground">
                Amount
              </p>

              <p className="mt-2 font-medium">${amount.toFixed(2)}</p>

              <div className="mt-5 border-b border-separator" />
            </div>

            <div>
              <p className="text-xs uppercase text-surface-secondary-foreground">
                Customer Email
              </p>

              <p className="mt-2 font-medium">{customerEmail}</p>

              <div className="mt-5 border-b border-separator" />
            </div>

            <div>
              <p className="text-xs uppercase text-surface-secondary-foreground">
                Payment Method
              </p>

              <p className="mt-2 font-medium">
                {cardBrand.toUpperCase()} ending in {cardLast4}
              </p>

              <div className="mt-5 border-b border-separator" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccessPage;
