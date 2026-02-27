import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
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
    const [rows] = await pool.execute<RowDataPacket[]>(
      `
      SELECT 
        User.id, 
        User.email, 
        User.first_name, 
        User.last_name, 
        User.role_id,
        User.password_hash,
        Role.name AS role_name
      FROM User
      JOIN Role ON User.role_id = Role.id
      WHERE User.email = ?
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