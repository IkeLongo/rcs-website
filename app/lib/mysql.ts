import "server-only";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;


export const ovhPool = mysql.createPool({
  host: process.env.OVH_DB_HOST,
  port: Number(process.env.OVH_DB_PORT),
  user: process.env.OVH_DB_USER,
  password: process.env.OVH_DB_PASS,
  database: process.env.OVH_DB_SCHEMA,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "Z",
  dateStrings: true,
});

export async function withTx<T>(fn: (conn: mysql.PoolConnection) => Promise<T>) {
  const conn = await ovhPool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}