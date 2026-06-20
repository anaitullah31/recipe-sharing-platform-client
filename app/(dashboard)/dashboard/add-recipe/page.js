import { redirect } from "next/navigation";
import { getRecipesByUserEmail } from "@/app/lib/api/recipes";
import { getUserSession } from "@/app/lib/core/session";
import AddRecipe from "./AddRecipe";

const AddRecipePage = async () => {
  const user = await getUserSession();

  if (!user?.email) {
    redirect("/login");
  }

  const recipes = await getRecipesByUserEmail(user.email);

  const isFreeUser = user?.plan === "free";
  const freeRecipeLimit = 2;

  if (isFreeUser && recipes.length >= freeRecipeLimit) {
    redirect("/pricing?reason=recipe-limit");
  }

  return <AddRecipe user={user} />;
};

export default AddRecipePage;