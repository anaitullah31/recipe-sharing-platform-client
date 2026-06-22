import { fetchSecureData } from "@/app/lib/core/server";
import EditRecipeForm from "./EditRecipeForm";
import { getUserSession } from "@/app/lib/core/session";

const EditRecipePage = async ({ params }) => {
  const { id } = await params;

  const data = await fetchSecureData(`/recipes/${id}`);
  const recipe = data?.data;
  const user = await getUserSession();

  return <EditRecipeForm user={user} recipe={recipe} />;
};

export default EditRecipePage;
