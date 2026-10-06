/**
 * Utility helper functions to format and validate Senegal (+221) phone numbers.
 * Pattern expected: XX XXX XX XX (e.g. 77 123 45 67)
 */

export function formatSenegalLocalDigits(input: string): string {
  // Extract all numeric digits
  let digits = input.replace(/\D/g, '');

  // If user pasted or typed country code +221 or 221 at the start, strip 221
  if (digits.startsWith('221') && digits.length > 3) {
    digits = digits.slice(3);
  }

  // Max 9 digits for Senegal mobile numbers (e.g. 771234567)
  digits = digits.slice(0, 9);

  // Group into XX XXX XX XX
  const parts: string[] = [];
  if (digits.length > 0) {
    parts.push(digits.slice(0, 2));
  }
  if (digits.length > 2) {
    parts.push(digits.slice(2, 5));
  }
  if (digits.length > 5) {
    parts.push(digits.slice(5, 7));
  }
  if (digits.length > 7) {
    parts.push(digits.slice(7, 9));
  }

  return parts.join(' ');
}

export function extractLocalDigits(phoneString: string): string {
  if (!phoneString) return '';
  let cleaned = phoneString.replace(/^\+?221\s*/, '').trim();
  return formatSenegalLocalDigits(cleaned);
}

export function toFullSenegalPhone(localDigitsFormatted: string): string {
  const clean = localDigitsFormatted.trim();
  if (!clean) return '+221';
  return `+221 ${clean}`;
}

export function isValidSenegalPhone(localDigitsFormatted: string): boolean {
  const digitsOnly = localDigitsFormatted.replace(/\D/g, '');
  return digitsOnly.length === 9;
}
