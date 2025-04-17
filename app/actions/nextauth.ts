import { signInSchema } from '@/app/lib/definitions'
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import { comparePassword } from '@/app/utils/password'
import { User } from '@/types/types';
import pool from '@/app/lib/mysql';
import { getUserWithRoleQuery, getUserByEmailQuery, insertNewUser } from '@/app/lib/queries';

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
          console.log("API Response Status:", response.status);
          const result = await response.json();
          console.log("API Response Body:", result);

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
            role_id: user.role_id,
            role_name: user.role_name, // <- now this will go to your JWT/session callbacks
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

    // Facebook Provider
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      profile(profile) {
        console.log('Facebook Profile Response:', profile); // Log the profile response
        return {
          id: profile.id,
          email: profile.email || null,
          first_name: profile.first_name || profile.name || '',
          last_name: profile.last_name || '',
          role_id: 1,
          role_name: 'User', // Default role for Facebook users
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // Skip the signIn callback for the Credentials provider
      if (account?.provider === "credentials") {
        return true;
      }

      if (!profile?.email) {
        console.error('No profile email found.');
        // Optionally, redirect the user to a page where they can provide their email
        return false; // Prevent sign-in if no email is available
      }
    
      try {
        // Check if the user exists in the database
        const [rows] = await pool.execute(getUserByEmailQuery, [profile.email]);
    
        const users = rows as User[];
    
        if (users.length === 0) {
          // If the user does not exist, create a new user
          await pool.execute(insertNewUser,
            [
              profile.email,
              profile.first_name || profile.name || '',
              profile.last_name || '',
            ]
          );
        }
    
        return true;
      } catch (error) {
        console.error('Error during signIn callback:', error);
        return false;
      }
    },

    async jwt({ token, user, profile, account }) {
      // Handle the initial sign-in
      if (user) {
        // For the Credentials provider, the `user` object is already populated
        token.id = user.id;
        token.role_name = user.role_name; // Attach role_name to the token
      } else if (profile && account) {
        try {
          // Fetch the user from the database
          const [rows] = await pool.execute(getUserWithRoleQuery, [profile.email]);

          const users = rows as User[];

          if (users.length === 0) {
            throw new Error('No user found in the database.');
          }

          const dbUser = users[0];

          // Attach the user's ID and is_admin to the token
          token.id = dbUser.id;
          token.role_name = dbUser.role_name; // Attach role_name to the token
        } catch (error) {
          console.error('Error during jwt callback:', error);
        }
      }

      // Debug: Log the token to verify its contents
      // console.log("JWT Token:", token);

      return token;
    },

    async session({ session, token }) {
      // Attach `is_admin` to the session object
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub as string,
          role_id: token.role_id as number,
          role_name: token.role_name as string, // Attach role_name to the session
        };
      }

      // Debug: Log the session object to verify its contents
      // console.log("Session Object:", session);

      return session;
    },
  },
});