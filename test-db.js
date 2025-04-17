import pool from './app/lib/mysql'; // Import the connection pool from db.ts

async function testMySQLConnection() {
  try {
    // Run a simple query to test the connection
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('✅ Database Connection Successful:', rows);
  } catch (error) {
    console.error('❌ Database Connection Failed:', error);
  } finally {
    await pool.end(); // Close the connection pool after testing
  }
}

testMySQLConnection();

