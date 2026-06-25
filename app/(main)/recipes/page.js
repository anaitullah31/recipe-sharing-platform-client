import { fetchSecureData } from "@/app/lib/core/server";
import RecipeCard from "./RecipeCard";
import Pagination from "@/app/components/shared/Pagination";
import RecipeFilters from "./RecipeFilters";
import Reveal from "@/app/components/animations/Reveal";

const RecipePage = async ({ searchParams }) => {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 8;

  const search = params?.search || "";
  const category = params?.category || "";
  const cuisineType = params?.cuisineType || "";
  const difficultyLevel = params?.difficultyLevel || "";
  const sortBy = params?.sortBy || "";

  const queryParams = new URLSearchParams();

  queryParams.set("page", currentPage.toString());
  queryParams.set("limit", limit.toString());

  if (search) queryParams.set("search", search);
  if (category) queryParams.set("category", category);
  if (cuisineType) queryParams.set("cuisineType", cuisineType);
  if (difficultyLevel) queryParams.set("difficultyLevel", difficultyLevel);
  if (sortBy) queryParams.set("sortBy", sortBy);

  const recipesData = await fetchSecureData(
    `/recipes?${queryParams.toString()}`,
  );

  const recipes = recipesData?.data || [];
  const pagination = recipesData?.pagination || {};

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <Reveal>
          <div className="text-center">
            <h1 className="mt-4 font-serif text-5xl leading-tight md:text-5xl">
              Culinary Collections
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-surface-secondary-foreground">
              Explore our curated library of professional techniques, seasonal
              inspirations, and signature plates from the world finest digital
              atelier.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <RecipeFilters
            search={search}
            category={category}
            cuisineType={cuisineType}
            difficultyLevel={difficultyLevel}
            sortBy={sortBy}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipes.map((recipe, index) => (
            <Reveal key={recipe._id} delay={index * 0.05}>
              <RecipeCard recipe={recipe} />
            </Reveal>
          ))}
        </div>

        {recipes.length === 0 && (
          <div className="mt-16 text-center">
            <h3 className="font-serif text-2xl">No recipes found</h3>
            <p className="mt-2 text-sm text-surface-secondary-foreground">
              Try changing your search or filter.
            </p>
          </div>
        )}

        {recipes.length > 0 && (
          <div className="mt-12 overflow-hidden border border-border bg-surface">
            <Pagination
              pagination={pagination}
              itemName="recipes"
              limitOptions={[8, 12, 16, 20]}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default RecipePage;
