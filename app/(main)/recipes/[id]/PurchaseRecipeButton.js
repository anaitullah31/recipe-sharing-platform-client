"use client";
const PurchaseRecipeButton = ({ recipe, user }) => {
    
  const handleRecipePurchase = async () => {
    const res = await fetch("/api/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentType: "recipe",
        user: {
          id: user.id,
          email: user.email,
        },
        recipe: {
          _id: recipe._id,
          recipeName: recipe.recipeName,
          recipeImage: recipe.recipeImage,
          price: recipe.price,
        },
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };
  return (
    <button
      onClick={handleRecipePurchase}
      className="mt-8 flex w-full cursor-pointer max-w-md items-center justify-between rounded bg-accent px-6 py-4 text-sm font-bold text-accent-foreground shadow-lg transition hover:bg-accent-hover"
    >
      <span>Purchase Full Recipe Guide</span>
      <span className="rounded bg-(--surface)/20 px-3 py-1">
        ${recipe?.price}
      </span>
    </button>
  );
};

export default PurchaseRecipeButton;
