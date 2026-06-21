"use client";

import { clientMutation } from "@/app/lib/core/client";
import { Camera, Plus, Sparkles, TrashBin } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddRecipe = ({ user }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [recipeImage, setRecipeImage] = useState("");
  const [preview, setPreview] = useState("");

  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [steps, setSteps] = useState([""]);

  const handleImageUpload = async (e) => {
    const image = e.target.files?.[0];
    if (!image) return;

    setPreview(URL.createObjectURL(image));
    setRecipeImage("");
    setUploadingImage(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.success) {
        setRecipeImage(data.data.url);
      } else {
        alert(data.error?.message || "Image upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const updateStep = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const handleSubmit = async (e, status = "published") => {
    e.preventDefault();

    if (!user?.email) {
      router.push("/login");
      return;
    }

    if (uploadingImage) {
      alert("Image is still uploading. Please wait.");
      return;
    }

    if (!recipeImage) {
      alert("Please upload recipe image first");
      return;
    }

    const form = e.currentTarget;

    const recipeData = {
      recipeName: form.recipeName.value,
      recipeImage,
      category: form.category.value,
      cuisineType: form.cuisineType.value,
      difficultyLevel: form.difficultyLevel.value,
      preparationTime: Number(form.preparationTime.value),
      price: Number(form.price.value || 0),

      ingredients: ingredients
        .filter((item) => item.name.trim())
        .map((item) => `${item.quantity} ${item.name}`.trim()),

      instructions: steps.filter((step) => step.trim()).join(". "),

      authorId: user.id,
      authorName: user.name,
      authorEmail: user.email,

      status,
      isFeatured: false,
      likesCount: 0,
      likedBy: [],
    };

    try {
      setLoading(true);

      const data = await clientMutation("/recipes", recipeData, "POST");

      if (data.success) {
        router.push("/dashboard/my-recipes");
        router.refresh();
      } else {
        alert(data.message || "Failed to add recipe");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-background px-6 py-12 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs text-surface-secondary-foreground">
            Recipes <span className="mx-2">›</span>{" "}
            <span className="text-accent">New Recipe</span>
          </p>

          <h1 className="mt-2 font-serif text-4xl md:text-5xl">
            Create New Recipe
          </h1>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e, "published")}
          className="grid gap-8 lg:grid-cols-[1fr_360px]"
        >
          <div className="space-y-8">
            <div className="border border-border bg-surface p-8">
              <p className="mb-8 text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                Recipe Identity
              </p>

              <input
                name="recipeName"
                required
                placeholder="Recipe Title"
                className="w-full border-b border-border bg-transparent pb-4 font-serif text-2xl outline-none placeholder:text-surface-tertiary-foreground focus:border-accent"
              />

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <select
                  name="category"
                  required
                  className="border-b border-border bg-transparent py-3 text-sm outline-none focus:border-accent"
                >
                  <option value="">Select Category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Snack">Snack</option>
                  <option value="Beverage">Beverage</option>
                </select>

                <select
                  name="cuisineType"
                  required
                  className="border-b border-border bg-transparent py-3 text-sm outline-none focus:border-accent"
                >
                  <option value="">Select Cuisine Type</option>
                  <option value="Bangladeshi">Bangladeshi</option>
                  <option value="Indian">Indian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Thai">Thai</option>
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Japanese">Japanese</option>
                  <option value="French">French</option>
                  <option value="American">American</option>
                  <option value="Mediterranean">Mediterranean</option>
                </select>
              </div>
            </div>

            <div className="border border-border bg-surface p-8">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                  Ingredients
                </p>

                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-accent"
                >
                  <Icon data={Plus} size={14} />
                  Add Ingredient
                </button>
              </div>

              <div className="space-y-5">
                {ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_120px_24px] gap-5"
                  >
                    <input
                      value={item.name}
                      onChange={(e) =>
                        updateIngredient(index, "name", e.target.value)
                      }
                      placeholder="Ingredient name"
                      className="border-b border-border bg-transparent py-3 text-sm outline-none focus:border-accent"
                    />

                    <input
                      value={item.quantity}
                      onChange={(e) =>
                        updateIngredient(index, "quantity", e.target.value)
                      }
                      placeholder="Quantity"
                      className="border-b border-border bg-transparent py-3 text-sm outline-none focus:border-accent"
                    />

                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="cursor-pointer text-danger"
                    >
                      <Icon data={TrashBin} size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border bg-surface p-8">
              <p className="mb-8 text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                Preparation Steps
              </p>

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-5">
                    <span className="font-serif text-3xl text-accent/40">
                      {index + 1}
                    </span>

                    <textarea
                      value={step}
                      onChange={(e) => updateStep(index, e.target.value)}
                      placeholder="Describe this step..."
                      className="min-h-24 flex-1 resize-none border-b border-border bg-transparent py-3 text-sm outline-none focus:border-accent"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addStep}
                className="mt-6 w-full cursor-pointer border border-dashed border-border py-4 text-sm hover:bg-surface-hover"
              >
                + Add Step
              </button>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="border border-border bg-surface p-8">
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                Recipe Photography
              </p>

              <label className="relative flex min-h-52 cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-accent/50 bg-surface-secondary text-center">
                {preview ? (
                  <>
                    <Image
                      src={preview}
                      alt="Recipe Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />

                    {uploadingImage && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-bold text-white">
                        Uploading image...
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Icon data={Camera} size={42} className="text-accent" />
                    <p className="mt-4 text-sm text-surface-secondary-foreground">
                      Upload your recipe image here
                    </p>
                  </>
                )}
              </label>

              <input
                name="recipeImage"
                type="file"
                accept="image/*"
                required
                onChange={handleImageUpload}
                className="mt-5 w-full border-b border-border bg-transparent py-3 text-sm outline-none file:mr-4 file:cursor-pointer file:border-0 file:bg-accent file:px-4 file:py-2 file:text-xs file:font-semibold file:text-accent-foreground hover:file:bg-accent-hover"
              />
            </div>

            <div className="border border-border bg-surface p-8">
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                Kitchen Metrics
              </p>

              <label className="text-xs font-semibold">Complexity Level</label>

              <select
                name="difficultyLevel"
                className="mt-3 w-full border border-border bg-surface-secondary px-4 py-3 text-sm outline-none focus:border-accent"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold">Prep Time</label>
                  <input
                    name="preparationTime"
                    type="number"
                    required
                    placeholder="45"
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">Menu Price</label>
                  <input
                    name="price"
                    type="number"
                    placeholder="24"
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-accent px-6 py-5 text-xs font-bold uppercase text-accent-foreground shadow-lg hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Icon data={Sparkles} size={16} />
              {uploadingImage
                ? "Uploading Image..."
                : loading
                  ? "Publishing..."
                  : "Publish to RecipeHub"}
            </button>

            <Link
              href="/dashboard/my-recipes"
              className="flex items-center justify-center py-3 text-xs font-bold uppercase text-surface-secondary-foreground"
            >
              Cancel
            </Link>
          </aside>
        </form>
      </div>
    </section>
  );
};

export default AddRecipe;
