import { signInSchema } from '@/app/lib/definitions'
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { comparePassword } from '@/app/utils/password'
import { User } from '@/types/types';
import pool from '@/app/lib/mysql';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Credentials Provider
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Ensure credentials are defined and properly typed
        if (!credentials || typeof credentials.email !== "string" || typeof credentials.password !== "string") {
          throw new Error("Invalid credentials.");
        }

        // Validate credentials using signInSchema
        const { email, password } = await signInSchema.parseAsync(credentials);

        // Debug: Log the submitted email and password
        // console.log("Submitted Email:", email);
        // console.log("Submitted Password (raw):", password);

        let user = null;

        // Call the getUserFromDb API endpoint
        try {
          const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Update this to your site URL
          const response = await fetch(`${baseUrl}/api/getUserFromDb`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });

          // Debug: Log the response status and body
          // console.log("API Response Status:", response.status);
          const result = await response.json();
          // console.log("API Response Body:", result);

          if (!response.ok || !result.user) {
            throw new Error("Invalid credentials.");
          }

          const user: User = result.user; // Explicitly type the user object

          // Compare the entered password with the hashed password from the database
          const isPasswordValid = await comparePassword(password, user.password_hash);

          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }
          
          // Return only the data you want in the session / JWT
          return {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            is_admin: user.is_admin, // <- now this will go to your JWT/session callbacks
          };
        } catch (err) {
          console.error('Error fetching user:', err);
          throw new Error("An error occurred while verifying credentials.");
        }
      },
    }),

    // Google Provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile email found.');
      }
    
      try {
        // Check if the user exists in the database
        const [rows] = await pool.execute(
          `SELECT id, email FROM users WHERE email = ?`,
          [profile.email]
        );
    
        const users = rows as User[];
    
        if (users.length === 0) {
          // If the user does not exist, create a new user
          await pool.execute(
            `INSERT INTO users (email, first_name, last_name) VALUES (?, ?, ?)`,
            [profile.email, profile.given_name || profile.name, profile.family_name || ""]
          );
        } else {
          // If the user exists, update their information
          await pool.execute(
            `UPDATE users SET first_name = ?, last_name = ? WHERE email = ?`,
            [profile.given_name || profile.name, profile.family_name || "", profile.email]
          );
        }
    
        return true;
      } catch (error) {
        console.error('Error during signIn callback:', error);
        return false;
      }
    },

    async jwt({ token, user, account, profile }) {
      if (profile) {
        try {
          // Fetch the user from the database
          const [rows] = await pool.execute(
            `SELECT id, is_admin FROM users WHERE email = ?`,
            [profile.email]
          );

          const users = rows as User[];

          if (users.length === 0) {
            throw new Error('No user found in the database.');
          }

          const dbUser = users[0];

          // Attach the user's ID and is_admin to the token
          token.id = dbUser.id;
          token.is_admin = dbUser.is_admin;
        } catch (error) {
          console.error('Error during jwt callback:', error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Attach `is_admin` to the session object
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub as string,
          is_admin: token.is_admin as boolean, // Ensure TypeScript knows this is a boolean
        };
      }
      return session;
    },
  },
});