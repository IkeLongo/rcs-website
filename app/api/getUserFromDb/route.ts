import { NextResponse } from 'next/server';
import { ovhPool } from '@/lib/db/mysql';
import { User } from '@/types/types';
import { RowDataPacket } from 'mysql2';

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
    const [rows] = await ovhPool.execute<RowDataPacket[]>(
      `
      SELECT 
        id,
        email, 
        first_name, 
        last_name, 
        role_id,
        role_name,
        password_hash
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    // Map the result to the User type
    const users = rows as User[];

    // Debug: Log the database query result
    // console.log("Database Query Result:", rows);

    if (users.length > 0) {
      const user = users[0]; // Get the first matching user
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