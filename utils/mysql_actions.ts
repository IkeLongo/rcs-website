import { RowDataPacket } from 'mysql2';
import pool from '@/lib/mysql';
import {
  getWebsitesWithClientAndHostQuery,
  getWebsiteStatusOptionsQuery,
} from '@/lib/queries'; // or inline it if preferred
import { color } from 'framer-motion';

export async function getWebsitesWithClientAndHost() {
  const [rows] = await pool.query<RowDataPacket[]>(getWebsitesWithClientAndHostQuery);

  return rows.map((row) => ({
    id: row.id,
    display_name: row.display_name,
    clientName: row.clientName,
    host: row.hostName,
    status: row.statusName,
    hostingCost: parseFloat(row.hosting_cost), // Convert to a number
  }));
}

export async function getWebsiteStatusOptions() {
  const [rows] = await pool.query<RowDataPacket[]>(getWebsiteStatusOptionsQuery);
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    display_name: row.display_name,
    color: row.color,
  }));
}