/**
 * Phone Number Formatting Utility
 * Story 3.5: Transactions Table Widget
 * AC-3.5.2: Column formatting - Customer phone formatting
 *
 * Formats phone number from E.164 format to human-readable format
 * Example: "+521234567890" → "+52 123 456 7890"
 */
export function formatPhone(phone: string): string {
  // Remove any existing spaces
  const cleaned = phone.replace(/\s/g, '')

  // E.164 format: +[country code][number]
  // For Mexico (+52): +52 123 456 7890
  if (cleaned.startsWith('+52') && cleaned.length === 13) {
    const countryCode = cleaned.slice(0, 3) // +52
    const part1 = cleaned.slice(3, 6) // 123
    const part2 = cleaned.slice(6, 9) // 456
    const part3 = cleaned.slice(9, 13) // 7890
    return `${countryCode} ${part1} ${part2} ${part3}`
  }

  // For other country codes, use generic formatting
  // Handle common country codes: +1 (US/Canada), +54 (Argentina), etc.
  if (cleaned.startsWith('+')) {
    // Try to extract country code and number
    // Country codes can be 1-3 digits, but we need to be smart about it
    let countryCode: string
    let number: string

    // Common single-digit country codes
    if (cleaned.startsWith('+1')) {
      countryCode = '+1'
      number = cleaned.slice(2)
    }
    // Two-digit country codes (e.g., +52, +54)
    else if (cleaned.match(/^\+\d{2}/) && cleaned.length >= 12) {
      countryCode = cleaned.slice(0, 3)
      number = cleaned.slice(3)
    }
    // Three-digit country codes
    else if (cleaned.match(/^\+\d{3}/)) {
      countryCode = cleaned.slice(0, 4)
      number = cleaned.slice(4)
    } else {
      return phone // Unrecognized format
    }

    // Format based on number length (common patterns)
    let formatted: string
    if (number.length === 10) {
      // 10 digits: 123 456 7890
      formatted = `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`
    } else if (number.length === 11) {
      // 11 digits: 123 456 78901
      formatted = `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`
    } else {
      // Fallback: group every 3 digits
      formatted = number.match(/.{1,3}/g)?.join(' ') || number
    }

    return `${countryCode} ${formatted}`
  }

  // If format is not recognized, return as-is
  return phone
}
