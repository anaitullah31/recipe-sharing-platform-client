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
    <section className="min-h-screen bg-background px-4 pt-14 pb-8 text-foreground sm:px-6 sm:pt-16 sm:pb-10 lg:px-10 lg:pt-10 xl:px-16">
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs text-surface-secondary-foreground">
            Recipes <span className="mx-2">›</span>{" "}
            <span className="text-accent">New Recipe</span>
          </p>

          <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Create New Recipe
          </h1>
        </div>

        <form
          onSubmit={(e) => handleSubmit(e, "published")}
          className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-8"
        >
          <div className="space-y-6 lg:space-y-8">
            <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 lg:p-8">
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground lg:mb-8">
                Recipe Identity
              </p>

              <input
                name="recipeName"
                required
                placeholder="Recipe Title"
                className="w-full border-b border-border bg-transparent pb-4 font-serif text-2xl outline-none placeholder:text-surface-tertiary-foreground focus:border-accent sm:text-3xl"
              />

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:gap-6">
                <select
                  name="category"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-accent"
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
                  className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-accent"
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

            <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 lg:p-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                  Ingredients
                </p>

                <button
                  type="button"
                  onClick={addIngredient}
                  className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-accent"
                >
                  <Icon data={Plus} size={14} />
                  Add Ingredient
                </button>
              </div>

              <div className="space-y-5">
                {ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[minmax(0,1fr)_42px] gap-4 sm:grid-cols-[minmax(0,1fr)_140px_32px] sm:gap-5"
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
                      placeholder="Qty"
                      className="border-b border-border bg-transparent py-3 text-sm outline-none focus:border-accent"
                    />

                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="col-start-2 row-start-1 flex h-11 cursor-pointer items-center justify-center text-danger sm:col-start-auto sm:row-start-auto"
                    >
                      <Icon data={TrashBin} size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 lg:p-8">
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground lg:mb-8">
                Preparation Steps
              </p>

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4 sm:gap-5">
                    <span className="shrink-0 font-serif text-2xl text-accent/40 sm:text-3xl">
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
                className="mt-6 w-full cursor-pointer rounded-lg border border-dashed border-border py-4 text-sm transition hover:bg-surface-hover"
              >
                + Add Step
              </button>
            </div>
          </div>

          <aside className="space-y-6 xl:space-y-8">
            <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 lg:p-8">
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                Recipe Photography
              </p>

              <label className="relative flex min-h-56 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-accent/50 bg-surface-secondary text-center sm:min-h-64 xl:min-h-52">
                {preview ? (
                  <>
                    <Image
                      src={preview}
                      alt="Recipe Preview"
                      fill
                      sizes="(max-width: 1280px) 100vw, 360px"
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
                    <p className="mt-4 max-w-48 text-sm leading-6 text-surface-secondary-foreground">
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
                className="mt-5 w-full border-b border-border bg-transparent py-3 text-sm outline-none file:mr-4 file:cursor-pointer file:rounded file:border-0 file:bg-accent file:px-4 file:py-2 file:text-xs file:font-semibold file:text-accent-foreground hover:file:bg-accent-hover"
              />
            </div>

            <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 lg:p-8">
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                Kitchen Metrics
              </p>

              <label className="text-xs font-semibold">Complexity Level</label>

              <select
                name="difficultyLevel"
                className="mt-3 w-full rounded border border-border bg-surface-secondary px-4 py-3 text-sm outline-none focus:border-accent"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
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

            <div className="sticky bottom-0 z-10 -mx-4 border-t border-border bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 xl:static xl:mx-0 xl:border-0 xl:bg-transparent xl:p-0 xl:backdrop-blur-none">
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-accent px-6 py-4 text-xs font-bold uppercase text-accent-foreground shadow-lg transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 sm:py-5"
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
                className="mt-3 flex items-center justify-center py-3 text-xs font-bold uppercase text-surface-secondary-foreground"
              >
                Cancel
              </Link>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
};

export default AddRecipe;