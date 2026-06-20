import { fetchData } from "../core/server";

export const getRecipesByUserEmail = async (userEmail) => {
  const data = await fetchData(`/recipes?authorEmail=${userEmail}`);

  const recipes = data?.data || data || [];
  return recipes;
};
