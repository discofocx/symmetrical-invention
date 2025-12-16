/**
 * Contact form validation utilities
 * Shared between client and server for consistent validation
 */

// ===== Error Messages (Spanish) =====
export const VALIDATION_MESSAGES = {
  name: {
    required: 'El nombre es requerido',
    min: 'El nombre debe tener al menos 2 caracteres',
    max: 'El nombre es demasiado largo',
    format: 'El nombre solo puede contener letras y espacios',
    noUrl: 'El nombre no puede contener URLs',
    fullName: 'Por favor, ingresa tu nombre completo',
  },
  email: {
    required: 'El correo electrónico es requerido',
    invalid: 'Correo electrónico inválido',
  },
  phone: {
    required: 'El teléfono es requerido',
    invalid: 'Ingresa un número mexicano válido (10 dígitos)',
  },
  message: {
    required: 'El mensaje es requerido',
    min: 'El mensaje debe tener al menos 10 caracteres',
    max: 'El mensaje es demasiado largo (máximo 2000 caracteres)',
    tooManyUrls: 'El mensaje contiene demasiados enlaces',
  },
} as const;

// ===== Patterns =====
export const PATTERNS = {
  // Letters, spaces, accents, apostrophes, and hyphens (common in names)
  name: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s''-]+$/,
  // Common URL patterns to detect
  url: /(https?:\/\/|www\.|\.com|\.net|\.org|\.mx|\.io|\.co|\.ru|\.cn)/i,
  // Standard email pattern
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
} as const;

// ===== Utility Functions =====

/**
 * Normalize phone number by removing all non-digit characters
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Check if text contains URL patterns
 */
export function containsUrl(text: string): boolean {
  return PATTERNS.url.test(text);
}

/**
 * Count number of URLs in text
 */
export function countUrls(text: string): number {
  return (text.match(/https?:\/\/|www\./gi) || []).length;
}

// ===== Validation Functions =====
// Each returns null if valid, or an error message string if invalid

/**
 * Validate name field
 * - Min 2 characters
 * - Max 100 characters
 * - Only letters, spaces, accents, apostrophes, hyphens
 * - Must contain a space (full name)
 * - No URLs
 */
export function validateName(name: string): string | null {
  const trimmed = name.trim();

  if (!trimmed) {
    return VALIDATION_MESSAGES.name.required;
  }

  if (trimmed.length < 2) {
    return VALIDATION_MESSAGES.name.min;
  }

  if (trimmed.length > 100) {
    return VALIDATION_MESSAGES.name.max;
  }

  if (!PATTERNS.name.test(trimmed)) {
    return VALIDATION_MESSAGES.name.format;
  }

  if (containsUrl(trimmed)) {
    return VALIDATION_MESSAGES.name.noUrl;
  }

  if (!trimmed.includes(' ')) {
    return VALIDATION_MESSAGES.name.fullName;
  }

  return null;
}

/**
 * Validate email field
 */
export function validateEmail(email: string): string | null {
  const trimmed = email.trim();

  if (!trimmed) {
    return VALIDATION_MESSAGES.email.required;
  }

  if (!PATTERNS.email.test(trimmed)) {
    return VALIDATION_MESSAGES.email.invalid;
  }

  return null;
}

/**
 * Validate Mexican phone number
 * Accepts:
 * - 10 digits (local format)
 * - 12 digits starting with 52 (country code)
 */
export function validateMexicanPhone(phone: string): string | null {
  const normalized = normalizePhone(phone);

  if (!normalized) {
    return VALIDATION_MESSAGES.phone.required;
  }

  // 10 digits without country code
  if (normalized.length === 10) {
    return null;
  }

  // 12 digits with country code 52
  if (normalized.length === 12 && normalized.startsWith('52')) {
    return null;
  }

  return VALIDATION_MESSAGES.phone.invalid;
}

/**
 * Validate message field
 * - Min 10 characters
 * - Max 2000 characters
 * - Max 2 URLs allowed
 */
export function validateMessage(message: string): string | null {
  const trimmed = message.trim();

  if (!trimmed) {
    return VALIDATION_MESSAGES.message.required;
  }

  if (trimmed.length < 10) {
    return VALIDATION_MESSAGES.message.min;
  }

  if (trimmed.length > 2000) {
    return VALIDATION_MESSAGES.message.max;
  }

  if (countUrls(trimmed) > 2) {
    return VALIDATION_MESSAGES.message.tooManyUrls;
  }

  return null;
}

/**
 * Validate all required form fields
 * Returns object with field names as keys and error messages as values
 * Empty object means all fields are valid
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validateMexicanPhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const messageError = validateMessage(data.message);
  if (messageError) errors.message = messageError;

  return errors;
}
