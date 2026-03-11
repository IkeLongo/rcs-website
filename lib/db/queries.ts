import { ovhPool } from '@/lib/db/mysql';

export const getUserWithRoleQuery = `
  SELECT 
    id, 
    role_id, 
    role_name
  FROM users
  WHERE email = ?
`;

export const getUserByEmailQuery = `
  SELECT
    id,
    email
  FROM users
  WHERE email = ?
`;

export const insertNewUser = `
  INSERT INTO users
    (email, first_name, last_name)
  VALUES (?, ?, ?)
`;

export const getWebsitesWithClientAndHostQuery = `
  SELECT 
    website.id,
    website.domain,
    website.display_name,
    website.hosting_cost,
    website.homepage_screenshot_url,
    website.last_edited_at,
    website.created_at,
    website.updated_at,
    
    CONCAT(users.first_name, ' ', users.last_name) AS clientName,
    websiteHost.name AS hostName,
    websiteStatus.name AS statusName
  FROM website
  JOIN users ON website.client_id = users.id
  JOIN websiteHost ON website.host_id = websiteHost.id
  JOIN websiteStatus ON website.status_id = websiteStatus.id
  ORDER BY website.created_at DESC
`;

export const getWebsiteStatusOptionsQuery = `
  SELECT 
    id, 
    name, 
    display_name, 
    color 
  FROM websiteStatus
  ORDER BY display_name ASC;
`;