import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';

export async function POST(request: Request) {
  const { email } = await request.json();

  // Debug: Log the submitted email and hashed password
  // console.log("API Received Email:", email);

  if (!email) {
    return NextResponse.json(
      { status: 'error', message: 'Email is required.' },
      { status: 400 }
    );
  }

  try {
    // Query the database for the user by email
    const [rows] = await pool.execute(
      `SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = ?`,
      [email]
    );

    // Debug: Log the database query result
    // console.log("Database Query Result:", rows);

    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0]; // Get the first matching user
      return NextResponse.json({
        status: 'success',
        message: 'User found successfully.',
        user,
      });
    } else {
      return NextResponse.json(
        { status: 'error', message: 'User not found.' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'An error occurred while retrieving the user.' },
      { status: 500 }
    );
  }
}