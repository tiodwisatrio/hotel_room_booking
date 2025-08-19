import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// This file augments NextAuth's types to include custom fields.
// It must be placed in a file like src/types/next-auth.d.ts or similar.

declare module "next-auth" {
  /**
   * The extended `User` interface in the session.
   * We need to add the `role` property here.
   */
  interface Session {
    user: {
      role?: string; // Add the custom role field
    } & DefaultSession["user"];
  }

  /**
   * The extended `User` interface when returned from a provider.
   */
  interface User extends DefaultUser {
    role?: string; // Add the custom role field
  }
}

declare module "next-auth/jwt" {
  /**
   * The extended `JWT` interface to include the role.
   */
  interface JWT {
    role?: string; // Add the custom role field
  }
}
