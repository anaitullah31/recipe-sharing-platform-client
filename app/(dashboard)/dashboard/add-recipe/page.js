"use client";

import { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";

export default function AddRecipePage() {
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    let recipeImage = "";

    if (imageFile) {
      setUploading(true);

      const imageData = new FormData();
      imageData.append("image", imageFile);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const data = await res.json();
      recipeImage = data?.data?.url;

      setUploading(false);
    }

    const recipe = {
      recipeName: formData.get("recipeName"),
      recipeImage,
      category: formData.get("category"),
      cuisineType: formData.get("cuisineType"),
      difficultyLevel: formData.get("difficultyLevel"),
      preparationTime: formData.get("preparationTime"),
      ingredients: formData.get("ingredients"),
      instructions: formData.get("instructions"),
    };
  };

  return (
    <section className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-[var(--accent)]">
            RecipeHub Dashboard
          </p>
          <h1 className="text-3xl font-bold">Add New Recipe</h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--surface-tertiary-foreground)]">
            Share your favorite recipe with food lovers. Add details,
            ingredients, cooking steps, and a beautiful recipe image.
          </p>
        </div>

        <Form className="w-full max-w-3xl">
          <Fieldset>
            {/* <Fieldset.Legend>Add New Recipe</Fieldset.Legend>
            <Description>
              Share your favorite recipe with the community.
            </Description> */}

            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  isRequired
                  name="recipeName"
                  validate={(value) =>
                    value.length < 3
                      ? "Recipe name must be at least 3 characters"
                      : null
                  }
                >
                  <Label>Recipe Name</Label>
                  <Input placeholder="Chicken Biryani" />
                  <FieldError />
                </TextField>

                <div>
                  <Label className="mb-2 block">
                    Recipe Image<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="file"
                    className="w-full"
                    name="recipeImage"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                  />
                </div>

                <Select name="category" isRequired>
                  <Label>Category</Label>

                  <Select.Trigger>
                    <Select.Value placeholder="Select category" />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="breakfasts" textValue="Breakfast">
                        Breakfast
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item id="lunch" textValue="Lunch">
                        Lunch
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item id="dinner" textValue="Dinner">
                        Dinner
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item id="dessert" textValue="Dessert">
                        Dessert
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item id="snacks" textValue="Snacks">
                        Snacks
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item id="drinks" textValue="Drinks">
                        Drinks
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item id="vegetarian" textValue="Vegetarian">
                        Vegetarian
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item id="vegan" textValue="Vegan">
                        Vegan
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>

                <Select name="difficultyLevel" isRequired>
                  <Label>Difficulty Level</Label>

                  <Select.Trigger>
                    <Select.Value placeholder="Select difficulty" />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="easy" textValue="Easy">
                        Easy
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item id="medium" textValue="Medium">
                        Medium
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item id="hard" textValue="Hard">
                        Hard
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>

                <TextField isRequired name="cuisineType">
                  <Label>Cuisine Type</Label>
                  <Input placeholder="Bangladeshi, Italian, Chinese..." />
                  <FieldError />
                </TextField>

                <TextField isRequired name="preparationTime" type="number">
                  <Label>Preparation Time (Minutes)</Label>
                  <Input placeholder="30" />
                  <FieldError />
                </TextField>
              </div>

              <TextField
                isRequired
                name="ingredients"
                validate={(value) =>
                  value.length < 10 ? "Please provide ingredients" : null
                }
              >
                <Label>Ingredients</Label>
                <TextArea
                  rows={6}
                  placeholder={`Chicken - 500g Rice - 2 cups Onion - 2 pcs`}
                />
                <Description>Enter one ingredient per line.</Description>
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="instructions"
                validate={(value) =>
                  value.length < 20
                    ? "Instructions must be at least 20 characters"
                    : null
                }
              >
                <Label>Instructions</Label>
                <TextArea
                  rows={6}
                  placeholder={`Step 1: Prepare ingredients... Step 2: Cook... Step 3: Serve...`}
                />
                <Description>
                  Describe the cooking process step by step.
                </Description>
                <FieldError />
              </TextField>
            </FieldGroup>

            <Fieldset.Actions>
              <Button type="submit" color="primary">
                Add Recipe
              </Button>

              <Button type="reset" variant="secondary">
                Reset
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </div>
    </section>
  );
}
