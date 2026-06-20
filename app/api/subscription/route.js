import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/app/lib/stripe";

export async function POST(req) {
  try {
    const body = await req.json();
    const { paymentType, recipe, user } = body;

    const headersList = await headers();
    const origin = headersList.get("origin");

    let lineItems = [];
    let metadata = {};

    // Premium membership payment
    if (paymentType === "premium") {
      lineItems = [
        {
          price: process.env.STRIPE_PREMIUM_PRICE_ID,
          quantity: 1,
        },
      ];

      metadata = {
        paymentType: "premium",
        userId: user?.id || "",
        userEmail: user?.email || "",
      };
    }

    // Single recipe purchase payment
    if (paymentType === "recipe") {
      if (!recipe?._id || !recipe?.recipeName || !recipe?.price) {
        return NextResponse.json(
          { error: "Recipe id, name, and price are required" },
          { status: 400 },
        );
      }

      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: recipe.recipeName,
              description:
                "Full recipe guide with premium cooking instructions",
              images: recipe.recipeImage ? [recipe.recipeImage] : [],
            },
            unit_amount: Math.round(Number(recipe.price) * 100),
          },
          quantity: 1,
        },
      ];

      metadata = {
        paymentType: "recipe",
        userId: user?.id || "",
        userEmail: user?.email || "",
        recipeId: recipe._id,
        recipeName: recipe.recipeName,
      };
    }

    if (!lineItems.length) {
      return NextResponse.json(
        { error: "Invalid payment type" },
        { status: 400 },
      );
    }

    if (!lineItems || lineItems.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No items available for checkout",
        },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      ...(user?.email && {
        customer_email: user.email,
      }),

      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card"],

      metadata,

      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:
        paymentType === "recipe"
          ? `${origin}/recipes/${recipe._id}`
          : `${origin}/dashboard/subscription`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
