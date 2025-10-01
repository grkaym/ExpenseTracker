import { format } from 'date-fns';

// Get a value converted to 2 digits
export function formatCurrency(value) {
  const num = Number(value);
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Format date to YMD
export function toYMD(d) {
  return format(d, 'yyyy-MM-dd');
}

// Format date to DateString
export function toDateString(d) {
  const date = d instanceof Date ? d : new Date(d);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
}
