/**
 * Format a price value as Mexican Peso (MXN) currency
 * @param price - The price value to format (can be number or string)
 * @returns Formatted price string (e.g., "$45.00 MXN")
 */
export function formatPrice(
  price: number | string | null | undefined
): string {
  if (price === null || price === undefined) {
    return '$0.00 MXN';
  }

  const numericPrice = typeof price === 'string' ? parseFloat(price) : Number(price);

  if (isNaN(numericPrice)) {
    return '$0.00 MXN';
  }

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
