import Image from "next/image";
import Link from "next/link";
import QuickAction from "./QuickAction";
import UserStatCard from "./UserStatCard";
import { fetchSecureData } from "@/app/lib/core/server";
import { BookOpen, Box, Heart, Plus, ThumbsUp } from "@gravity-ui/icons";

const UserDashboard = async ({ user }) => {
  const recipesData = await fetchSecureData(
    `/recipes?authorEmail=${user?.email}`,
  );
  const favoritesData = await fetchSecureData(
    `/favorites?userEmail=${user?.email}`,
  );

  const myRecipes = recipesData?.data || [];
  const favorites = favoritesData?.data || [];

  const totalLikes = myRecipes.reduce(
    (total, recipe) => total + (recipe.likesCount || 0),
    0,
  );

  const isPremium = user?.plan === "premium";

  return (
    <section className="min-h-screen bg-background px-4 pt-14 pb-8 text-foreground sm:px-6 sm:pt-16 sm:pb-10 lg:px-10 lg:pt-10 xl:px-16">
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div className="mb-8 max-w-3xl sm:mb-10 lg:mb-12">
          <h1 className="font-serif text-3xl leading-[1.12] sm:text-4xl md:text-5xl">
            Welcome back,{" "}
            <span className="italic text-accent">{user?.name || "Chef"}.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-surface-secondary-foreground">
            Your kitchen is ready. Today feels like a perfect day for exploring
            recipes, managing your creations, or saving your next favorite dish.
          </p>

          {isPremium && (
            <span className="mt-5 inline-flex rounded-full bg-accent px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
              Premium Member
            </span>
          )}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-10 xl:grid-cols-3 xl:gap-6">
          <UserStatCard
            icon={BookOpen}
            title="Recipes"
            value={myRecipes.length}
            text="Active drafts and published"
          />
          <UserStatCard
            icon={Heart}
            title="Favorites"
            value={favorites.length}
            text="Saved across all collections"
          />
          <UserStatCard
            icon={ThumbsUp}
            title="Likes Received"
            value={totalLikes}
            text="Total community appreciation"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr] xl:gap-8">
          <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 lg:p-8">
            <div className="mb-3">
              <span className="rounded bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase text-accent">
                {isPremium ? "Gold Member" : "Free Member"}
              </span>
            </div>

            <h2 className="font-serif text-2xl leading-tight sm:text-3xl">
              {isPremium
                ? "Elite Culinary Access"
                : "Start Your Culinary Journey"}
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-surface-secondary-foreground">
              {isPremium
                ? "Your premium status unlocks priority booking, unlimited recipe submissions, and exclusive masterclass access."
                : "Upgrade to premium to unlock unlimited recipe submissions, premium badges, and exclusive culinary experiences."}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/dashboard/my-purchased"
                className="inline-flex w-full items-center justify-center bg-accent px-6 py-3 text-xs font-bold uppercase text-accent-foreground transition hover:bg-accent-hover sm:w-auto"
              >
                Manage Membership
              </Link>

              <Link
                href="/dashboard/profile"
                className="inline-flex w-full items-center justify-center border border-border px-6 py-3 text-xs font-bold uppercase transition hover:bg-surface-hover sm:w-auto"
              >
                View Benefits
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1 xl:gap-5">
            <QuickAction
              title="New Creation"
              text="Draft a new recipe or guide"
              href="/dashboard/add-recipe"
              icon={Plus}
            />
            <QuickAction
              title="Digital Pantry"
              text="Review your saved favorite recipes"
              href="/dashboard/favorites"
              icon={Box}
            />
            <QuickAction
              title="My Recipes"
              text="Manage your published recipes"
              href="/dashboard/my-recipes"
              icon={BookOpen}
            />
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface sm:mt-10">
          <div className="flex flex-col gap-3 border-b border-separator px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl leading-tight sm:text-3xl">
              Recent Activity
            </h2>

            <Link
              href="/dashboard/my-recipes"
              className="text-xs font-bold uppercase text-accent"
            >
              View All History
            </Link>
          </div>

          <div className="divide-y divide-separator">
            {myRecipes.slice(0, 3).map((recipe, index) => (
              <div
                key={recipe._id}
                className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6 lg:px-8"
              >
                <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-surface-secondary sm:h-14 sm:w-20 sm:aspect-auto">
                  <Image
                    src={
                      recipe.recipeImage || "/assests/recipe-placeholder.png"
                    }
                    alt={recipe.recipeName || "Recipe"}
                    fill
                    sizes="(max-width: 640px) 100vw, 80px"
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="wrap-break-word text-sm font-semibold leading-5">
                    {index === 0 ? "Updated" : "Created"} “{recipe.recipeName}”
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-surface-secondary-foreground">
                    {recipe.status === "published"
                      ? "Published to your recipe collection"
                      : "Saved as draft"}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-surface-secondary-foreground">
                  Recent
                </span>
              </div>
            ))}

            {myRecipes.length === 0 && (
              <div className="px-5 py-8 text-sm text-surface-secondary-foreground sm:px-6 lg:px-8">
                No recent activity yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
