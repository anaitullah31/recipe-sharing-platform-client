import Image from "next/image";
import Link from "next/link";
import QuickAction from "./QuickAction";
import UserStatCard from "./UserStatCard";
import { fetchData } from "@/app/lib/core/server";
import { BookOpen, Box, Heart, Plus, ThumbsUp } from "@gravity-ui/icons";

const UserDashboard = async ({ user }) => {
  const recipesData = await fetchData(`/recipes?authorEmail=${user?.email}`);
  const favoritesData = await fetchData(`/favorites?userEmail=${user?.email}`);

  const myRecipes = recipesData?.data || [];
  const favorites = favoritesData?.data || [];

  const totalLikes = myRecipes.reduce(
    (total, recipe) => total + (recipe.likesCount || 0),
    0,
  );

  const isPremium = user?.plan === "premium";

  return (
    <section className="min-h-screen bg-background px-6 py-10 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">
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

        <div className="mb-10 grid gap-6 md:grid-cols-3">
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

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="border border-border bg-surface p-8">
            <div className="mb-3">
              <span className="rounded bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase text-accent">
                {isPremium ? "Gold Member" : "Free Member"}
              </span>
            </div>

            <h2 className="font-serif text-3xl">
              {isPremium
                ? "Elite Culinary Access"
                : "Start Your Culinary Journey"}
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-surface-secondary-foreground">
              {isPremium
                ? "Your premium status unlocks priority booking, unlimited recipe submissions, and exclusive masterclass access."
                : "Upgrade to premium to unlock unlimited recipe submissions, premium badges, and exclusive culinary experiences."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard/my-purchased"
                className="bg-accent px-6 py-3 text-xs font-bold uppercase text-accent-foreground"
              >
                Manage Membership
              </Link>

              <Link
                href="/dashboard/profile"
                className="border border-border px-6 py-3 text-xs font-bold uppercase hover:bg-surface-hover"
              >
                View Benefits
              </Link>
            </div>
          </div>

          <div className="space-y-5">
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

        <div className="mt-10 border border-border bg-surface p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-3xl">Recent Activity</h2>
            <Link
              href="/dashboard/my-recipes"
              className="text-xs font-bold uppercase text-accent"
            >
              View All History
            </Link>
          </div>

          <div className="divide-y divide-separator">
            {myRecipes.slice(0, 3).map((recipe, index) => (
              <div key={recipe._id} className="flex items-center gap-4 py-5">
                <div className="relative h-12 w-16 overflow-hidden bg-surface-secondary">
                  <Image
                    src={
                      recipe.recipeImage || "/assests/recipe-placeholder.png"
                    }
                    alt={recipe.recipeName}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold">
                    {index === 0 ? "Updated" : "Created"} “{recipe.recipeName}”
                  </h3>
                  <p className="text-xs text-surface-secondary-foreground">
                    {recipe.status === "published"
                      ? "Published to your recipe collection"
                      : "Saved as draft"}
                  </p>
                </div>

                <span className="text-xs text-surface-secondary-foreground">
                  Recent
                </span>
              </div>
            ))}

            {myRecipes.length === 0 && (
              <div className="py-8 text-sm text-surface-secondary-foreground">
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
