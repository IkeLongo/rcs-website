import { NextResponse } from 'next/server';
import { ovhPool } from '@/lib/db/mysql';
import { ResultSetHeader } from 'mysql2';
import { RowDataPacket } from 'mysql2';

export async function POST(request: Request) {
  const { firstName, lastName, email, hashedPassword } = await request.json();

  try {
    // Fetch the role_id and role_name for 'user' from the roles table
    const [roles] = await ovhPool.execute<RowDataPacket[]>(
      `SELECT id, name FROM roles WHERE name = ? LIMIT 1`,
      ['user']
    );
    const role = Array.isArray(roles) && roles.length > 0 ? roles[0] : null;
    if (!role) {
      return NextResponse.json(
        { message: 'User role not found.' },
        { status: 500 }
      );
    }
    const roleId = role.id;
    const roleName = role.name;

    // Insert the user with role_id and role_name
    const [result] = await ovhPool.execute<ResultSetHeader>(
      `INSERT INTO users (first_name, last_name, email, password_hash, role_id, role_name) VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, hashedPassword, roleId, roleName]
    );

    const userId = result.insertId?.toString();

    if (!userId) {
      return NextResponse.json(
        {
          message: 'An error occurred while creating your account.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'User created successfully',
      userId,
    });
  } catch (error: any) {
    console.error('Database Error:', error);
    // Log error details
    if (error) {
      console.log('Error details:', {
        code: error.code,
        errno: error.errno,
        sql: error.sql,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
        message: error.message,
      });
    }

    // Check for duplicate entry error (either by code or message)
    if (
      error.code === 'ER_DUP_ENTRY' ||
      error?.message?.includes('Duplicate entry')
    ) {
      return NextResponse.json(
        {
          message: 'A user account already exists with that email.',
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        message: 'An unexpected error occurred while creating your account.',
      },
      { status: 500 }
    );
  }
}