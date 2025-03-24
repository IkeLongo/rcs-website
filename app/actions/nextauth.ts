import { signInSchema } from '@/app/libs/definitions'
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { comparePassword } from '@/app/utils/password'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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

          user = result.user;

          // Compare the entered password with the hashed password from the database
          const isPasswordValid = await comparePassword(password, user.password_hash);

          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch (err) {
          console.error('Error fetching user:', err);
          throw new Error("An error occurred while verifying credentials.");
        }
      },
    }),
  ],
});