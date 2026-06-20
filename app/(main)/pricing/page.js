import Link from "next/link";
import { Icon } from "@gravity-ui/uikit";
import { Check, ListCheckLock, Medal } from "@gravity-ui/icons";
import { fetchData } from "@/app/lib/core/server";
import PlanUpgradeButton from "./PlanUpgradeButton";
import { getUserSession } from "@/app/lib/core/session";

const PricingPage = async () => {
  const plansData = await fetchData("/plans");
  const plans = plansData?.data || [];
  const user = await getUserSession();

  const freePlan = plans.find((plan) => plan.slug === "free");
  const premiumPlan = plans.find((plan) => plan.slug === "premium");

  return (
    <section className="min-h-screen bg-background px-6 py-20 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Membership
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-tight md:text-5xl">
            Choose Your Culinary Journey
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-surface-secondary-foreground">
            Whether you are mastering the basics or refining professional
            techniques, we have a path tailored to your passion.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {plans.map((plan) => {
            const isPremium = plan.slug === "premium";

            return (
              <div
                key={plan._id}
                className={`relative bg-surface p-10 ${
                  isPremium ? "border-2 border-accent" : "border border-border"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                    {plan.badge}
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-4xl">{plan.name}</h2>

                  {isPremium && (
                    <Icon data={Medal} size={18} className="text-accent" />
                  )}
                </div>

                <p className="mt-3 font-serif text-3xl">
                  ${plan.price}
                  <span className="text-sm font-normal uppercase">
                    {" "}
                    / {plan.billingCycle}
                  </span>
                </p>

                <p className="mt-8 text-sm leading-6 text-surface-secondary-foreground">
                  {isPremium
                    ? "The definitive experience for epicureans who demand precision and exclusivity."
                    : "For the curious home cook starting their exploration of global flavors."}
                </p>

                {isPremium && (
                  <p className="mt-8 text-xs font-bold text-accent">
                    Everything in Free, plus:
                  </p>
                )}

                <ul
                  className={
                    isPremium
                      ? "mt-6 space-y-5 text-sm"
                      : "mt-8 space-y-5 text-sm"
                  }
                >
                  {plan.features?.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Icon
                        data={isPremium ? ListCheckLock : Check}
                        size={16}
                        className="text-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {isPremium ? (
                  <PlanUpgradeButton user={user} />
                ) : (
                  <Link
                    href="/register"
                    className="mt-16 flex w-full items-center justify-center border border-accent px-6 py-4 text-xs font-bold uppercase text-accent transition hover:bg-accent hover:text-accent-foreground"
                  >
                    Get Started For Free
                  </Link>
                )}

                <p className="mt-4 text-center text-xs text-surface-secondary-foreground">
                  {isPremium
                    ? "Billed one time. Return anytime."
                    : "No credit card required."}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20">
          <h2 className="text-center font-serif text-5xl">Compare Plans</h2>

          <div className="mt-10 overflow-hidden border border-border bg-surface">
            <table className="w-full text-sm">
              <thead className="bg-surface-secondary">
                <tr className="border-b border-separator">
                  <th className="px-6 py-5 text-left">Feature</th>
                  <th className="px-6 py-5 text-center">
                    {freePlan?.name || "Free"}
                  </th>
                  <th className="px-6 py-5 text-center">
                    {premiumPlan?.name || "Premium"}
                  </th>
                </tr>
              </thead>

              <tbody>
                {[
                  [
                    "Recipe submissions",
                    `${freePlan?.recipeLimit || 0} recipes`,
                    premiumPlan?.recipeLimit === -1
                      ? "Unlimited"
                      : premiumPlan?.recipeLimit,
                  ],
                  [
                    "Favorites",
                    `${freePlan?.favoriteLimit || 0} saves`,
                    premiumPlan?.favoriteLimit === -1
                      ? "Unlimited"
                      : premiumPlan?.favoriteLimit,
                  ],
                  [
                    "Premium badge",
                    freePlan?.premiumBadge ? "Yes" : "No",
                    premiumPlan?.premiumBadge ? "Yes" : "No",
                  ],
                  [
                    "Ad-free experience",
                    freePlan?.adFree ? "Yes" : "No",
                    premiumPlan?.adFree ? "Yes" : "No",
                  ],
                  [
                    "Masterclass access",
                    freePlan?.masterclassAccess ? "Yes" : "No",
                    premiumPlan?.masterclassAccess ? "Yes" : "No",
                  ],
                  [
                    "Priority support",
                    freePlan?.prioritySupport ? "Yes" : "No",
                    premiumPlan?.prioritySupport ? "Yes" : "No",
                  ],
                ].map(([feature, free, premium]) => (
                  <tr key={feature} className="border-b border-separator">
                    <td className="px-6 py-5">{feature}</td>
                    <td className="px-6 py-5 text-center text-surface-secondary-foreground">
                      {free}
                    </td>
                    <td className="px-6 py-5 text-center font-semibold text-accent">
                      {premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
