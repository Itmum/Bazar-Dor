// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient(process.env.MONGODB_URL as string);
// const db = client.db("bazar-dor");

// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     },
//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     },
//   },
//   database: mongodbAdapter(db, {
//     client,
//   }),
// });

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// Ensure MongoDB URL is loaded
const uri = process.env.MONGODB_URL as string;

// Reuse the MongoClient connection across serverless invocations on Vercel
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
};

let client: MongoClient;
if (process.env.NODE_ENV === "development") {
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri);
  }
  client = globalForMongo._mongoClient;
} else {
  client = new MongoClient(uri);
}

const db = client.db("bazar-dor");

export const auth = betterAuth({
  // Tell Better Auth your base URL in production
  baseURL: process.env.BETTER_AUTH_URL,

  // Explicitly allow requests from Vercel deployment URLs and local development
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.BETTER_AUTH_URL || "",
    "https://*.vercel.app", // Wildcard to allow all Vercel previews & production
  ],

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
