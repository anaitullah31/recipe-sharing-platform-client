import { fetchData } from "@/app/lib/core/server";
import RecipeCard from "./RecipeCard";

const RecipePage = async () => {
  const recipesData = await fetchData("/recipes");
  const recipes = recipesData?.data || [];

  return (
    <div className="max-w-7xl mx-auto">
      <h2>Recipe</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
