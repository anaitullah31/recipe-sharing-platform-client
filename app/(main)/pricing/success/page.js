import Link from "next/link";
import { redirect } from "next/navigation";
import { Check } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { stripe } from "@/app/lib/stripe";
import { serverMutation } from "@/app/lib/core/server";

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

  const metadata = session.metadata || {};
  const paymentType = metadata.paymentType;

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

  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;

  const paymentData = {
    userId: metadata.userId,
    userName: metadata.userName,
    userEmail: metadata.userEmail || customerEmail,

    amount,
    currency: session.currency,
    paymentStatus: session.payment_status,
    paymentMode: session.mode,
    transactionId: paymentIntent,
    stripeSessionId: session.id,
    paymentType,
  };

  if (session.status === "complete" && session.payment_status === "paid") {
    await serverMutation(
      "/payments",
      {
        ...paymentData,

        plan: paymentType === "premium" ? "premium" : undefined,

        recipeId: paymentType === "recipe" ? metadata.recipeId : undefined,
        recipeName: paymentType === "recipe" ? metadata.recipeName : undefined,
      },
      "POST",
    );
  }

  return (
    <section className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-accent text-accent-foreground">
            <Icon data={Check} size={24} />
          </div>
        </div>

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

        <div className="mt-16 border border-border bg-surface p-10">
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Transaction Summary
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <SummaryItem label="Order ID" value={orderId} />
            <SummaryItem label="Date" value={paymentDate} />
            <SummaryItem label="Product" value={productName} accent />
            <SummaryItem label="Amount" value={`$${amount.toFixed(2)}`} />
            <SummaryItem label="Customer Email" value={customerEmail} />
            <SummaryItem
              label="Payment Status"
              value={session.payment_status}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const SummaryItem = ({ label, value, accent }) => {
  return (
    <div>
      <p className="text-xs uppercase text-surface-secondary-foreground">
        {label}
      </p>

      <p
        className={`mt-2 break-all font-medium ${accent ? "text-accent" : ""}`}
      >
        {value || "N/A"}
      </p>

      <div className="mt-5 border-b border-separator" />
    </div>
  );
};

export default PaymentSuccessPage;
