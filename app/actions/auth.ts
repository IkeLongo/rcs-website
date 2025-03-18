"use server";

import { SignupFormSchema, FormState } from '@/app/libs/definitions'
import bcryptjs from 'bcryptjs';
import { createSession } from '@/app/libs/session'
import { redirect } from 'next/navigation';
import { deleteSession } from '@/app/libs/session'

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { firstName, lastName, email, password } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  let userId: string | undefined;

  // 3. Insert the user into the database
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // TO-DO: Update this to your site URL
    const response = await fetch(`${baseUrl}/api/insert_user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, hashedPassword }),
    });

    const result = await response.json();

    if (!response.ok || !result.userId) {
      return { status: 'error', message: 'An error occurred while creating your account.' };
    }

    userId = result.userId;
  } catch (err) {
    console.error('Database Error during insert:', err);
    return { status: 'error', message: 'An error occurred while creating your account.' };
  }

  // 4. Create user session (separate try/catch block optional here)
  if (userId) {
    try {
      await createSession(userId);
    } catch (err) {
      console.error('Session Error:', err);
      return { status: 'error', message: 'User created, but session could not be started.' };
    }
  } else {
    return { status: 'error', message: 'User ID is undefined after insertion.' };
  }

  // 5. OPTIONAL: Show success message *before* redirect
  // If you want to return a success state BEFORE redirect, you can return here.
  // This could be used if the form client wants to show a flash message before navigating.
  return { status: 'success', message: 'User created successfully!', userId };

  // 6. Redirect happens AFTER message sent back to client (or move this above if you want silent redirect)
  // If you want an immediate redirect, just remove the return above and uncomment this:
  //redirect('/profile'); 
}

export async function logout() {
  deleteSession()
  redirect('/login')
}