/**
 * Represents a user in the application.
 */
export interface User {
  id: string; // Primary key
  email: string; // User's email address
  first_name: string; // User's first name
  last_name: string; // User's last name
  role_id: number;
  role_name: string; // User's role name (e.g., 'admin', 'user')
  password_hash: string; // Include for internal use only
}

/**
 * Represents a generic API response structure.
 */
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}

/**
 * Represents a session user object.
 */
export interface SessionUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}