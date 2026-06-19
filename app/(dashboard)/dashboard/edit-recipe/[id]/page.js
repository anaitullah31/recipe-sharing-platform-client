import { fetchData } from "@/app/lib/core/server";
import EditRecipeForm from "./EditRecipeForm";

const EditRecipePage = async ({ params }) => {
  const { id } = await params;

  const data = await fetchData(`/recipes/${id}`);
  const recipe = data?.data;

  return <EditRecipeForm recipe={recipe} />;
};

export default EditRecipePage;
