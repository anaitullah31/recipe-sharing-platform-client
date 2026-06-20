"use client";

import { useRouter } from "next/navigation";

const PlanUpgradeButton = ({ user }) => {
   const router = useRouter();

  const handleUpgradePlan = async () => {
    if (!user?.email) {
      router.push("/login");
      return;
    }

    if (user?.plan === "premium") {
      return;
    }

    const res = await fetch("/api/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentType: "premium",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <button
      onClick={handleUpgradePlan}
      disabled={user?.plan === "premium"}
      className={`mt-10 flex w-full items-center justify-center rounded px-6 py-4 text-xs font-bold uppercase shadow-lg transition ${
        user?.plan === "premium"
          ? "cursor-not-allowed bg-gray-400 text-white opacity-70"
          : "cursor-pointer bg-accent text-accent-foreground hover:bg-accent-hover"
      }`}
    >
      {user?.plan === "premium" ? "Premium Already Active" : "Upgrade To Elite"}
    </button>
  );
};

export default PlanUpgradeButton;
