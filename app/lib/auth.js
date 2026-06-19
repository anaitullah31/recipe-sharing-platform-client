import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware } from "better-auth/api";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db();

export const auth = betterAuth({
  //...other options
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  user: {
    additionalFields: {
      role: {
        default: "user",
      },
      plan: {
        default: "free",
      },
      status: {
        default: "active",
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-in/email") return;

      const email = ctx.body?.email;

      if (!email) return;

      const user = await db.collection("user").findOne({ email });

      if (user?.status === "blocked") {
        throw new APIError("FORBIDDEN", {
          message: "Your account has been blocked. Please contact support.",
        });
      }
    }),
  },
});
