
import { NextResponse } from 'next/server';
import pool from "@/app/libs/mysql"; // Ensure you have the correct import for your database pool

export async function GET() {
  try {
    console.log("Connecting to database:", process.env.DB_SCHEMA);
    
    const [rows] = await pool.execute('SELECT * FROM users LIMIT 1');

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);

    // Type assertion to ensure error is treated as an Error object
    const errorMessage = (error as Error).message || 'Unknown error';

    return NextResponse.json({ error: 'Database query failed', details: errorMessage }, { status: 500 });
  }
}