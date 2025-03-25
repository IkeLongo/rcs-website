/**
 * Represents a user in the application.
 */
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password_hash: string;
  is_admin: boolean;
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