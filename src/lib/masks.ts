/**
 * Formats a raw phone string into a Brazilian phone mask:
 * (XX) XXXXX-XXXX or (XX) XXXX-XXXX (with optional country code +55)
 */
export function formatPhoneBR(value: string): string {
  if (!value) return '';

  const hasPlus = value.startsWith('+');
  const digitsOnly = value.replace(/\D/g, '');

  if (!digitsOnly) return hasPlus ? '+' : '';

  let countryPrefix = '';
  let mainDigits = digitsOnly;

  if (digitsOnly.startsWith('55') && digitsOnly.length > 10) {
    countryPrefix = '+55 ';
    mainDigits = digitsOnly.slice(2);
  } else if (hasPlus && digitsOnly.length > 10) {
    countryPrefix = `+${digitsOnly.slice(0, 2)} `;
    mainDigits = digitsOnly.slice(2);
  }

  const truncated = mainDigits.slice(0, 11);

  if (truncated.length <= 2) {
    return `${countryPrefix}(${truncated}`;
  }
  if (truncated.length <= 6) {
    return `${countryPrefix}(${truncated.slice(0, 2)}) ${truncated.slice(2)}`;
  }
  if (truncated.length <= 10) {
    return `${countryPrefix}(${truncated.slice(0, 2)}) ${truncated.slice(2, 6)}-${truncated.slice(6)}`;
  }

  return `${countryPrefix}(${truncated.slice(0, 2)}) ${truncated.slice(2, 7)}-${truncated.slice(7)}`;
}
