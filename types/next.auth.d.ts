import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extended User type to include `is_admin`.
   */
  interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role_id: number; // Add the role_id property
    role_name: string; // Add the role_name property
  }

  /**
   * Extended Session type to include the extended User type.
   */
  interface Session {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      is_admin: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * Extended JWT type to include `is_admin`.
   */
  interface JWT {
    is_admin: boolean;
  }
}