// utils/validation.ts
// Utility functions for validating and formatting phone numbers and emails

/**
 * Formats a string of digits as (XXX) XXX-XXXX
 * Only allows 10 digits, with area code in parenthesis, space after, and dash after 6th digit.
 * Returns formatted string or empty string if invalid.
 */
export function formatPhoneNumber(input: string): string {
  // Remove all non-digit characters
  const digits = input.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length > 10) return formatPhoneNumber(digits.slice(0, 10));
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Validates a phone number: must be exactly 10 digits, only numbers allowed.
 */
export function isValidPhoneNumber(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  return digits.length === 10;
}

/**
 * Validates an email address using a simple regex.
 */
export function isValidEmail(email: string): boolean {
  // Basic email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
