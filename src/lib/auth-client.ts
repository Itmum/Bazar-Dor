// import { createAuthClient } from "better-auth/react";
// export const authClient = createAuthClient({
//   /** The base URL of the server (optional if you're using the same domain) */
//   baseURL: process.env.BETTER_AUTH_URL,
// });

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Dynamically uses the current browser domain when running on Vercel,
  // falling back to BETTER_AUTH_URL or localhost
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.BETTER_AUTH_URL || "http://localhost:3001",
});
