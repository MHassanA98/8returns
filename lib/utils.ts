export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function formatMoney(amount?: string | number | null, currency?: string | null) {
  if (amount == null) return '';
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'EUR' }).format(value);
  } catch {
    return `${value} ${currency || ''}`.trim();
  }
}


