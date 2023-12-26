export function manageDate(date: Date | string): Date {
  return typeof date === 'string' ? new Date(date) : date;
}
export function formatDate(date: Date) {
  return date.toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
