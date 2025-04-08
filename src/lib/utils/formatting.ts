/**
 * Utility functions for consistent formatting across the application
 */

/**
 * Formats a number as a price in MXN, with no decimal places
 * Uses a simple, consistent approach to avoid hydration mismatches
 * 
 * @param price - The price number to format
 * @returns Formatted price string with $ symbol
 */
export function formatPrice(price: number): string {
  return `$${price.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
}

/**
 * Formats a date into a localized format
 * 
 * @param date - Date to format
 * @param locale - Locale to use for formatting (defaults to es-MX)
 * @returns Formatted date string
 */
export function formatDate(date: Date, locale = 'es-MX'): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString(locale, options);
}