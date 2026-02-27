import pool from '@/lib/mysql';

export const getUserWithRoleQuery = `
  SELECT 
    User.id, 
    User.role_id, 
    Role.name AS role_name 
  FROM User
  JOIN Role ON User.role_id = Role.id
  WHERE User.email = ?
`;

export const getUserByEmailQuery = `
  SELECT
    id,
    email
  FROM User
  WHERE email = ?
`;

export const insertNewUser = `
  INSERT
  INTO User
    (email, first_name, last_name)
  VALUES (?, ?, ?)
`;

export const getWebsitesWithClientAndHostQuery = `
  SELECT 
    Website.id,
    Website.domain,
    Website.display_name,
    Website.hosting_cost,
    Website.homepage_screenshot_url,
    Website.last_edited_at,
    Website.created_at,
    Website.updated_at,
    
    CONCAT(User.first_name, ' ', User.last_name) AS clientName,
    WebsiteHost.name AS hostName,
    WebsiteStatus.name AS statusName
  FROM Website
  JOIN User ON Website.client_id = User.id
  JOIN WebsiteHost ON Website.host_id = WebsiteHost.id
  JOIN WebsiteStatus ON Website.status_id = WebsiteStatus.id
  ORDER BY Website.created_at DESC
`;

export const getWebsiteStatusOptionsQuery = `
  SELECT 
    id, 
    name, 
    display_name, 
    color 
  FROM WebsiteStatus
  ORDER BY display_name ASC;
`;