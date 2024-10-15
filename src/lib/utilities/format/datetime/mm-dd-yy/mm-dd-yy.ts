// Utility function to only return mm-dd-yy date format
export const mmDdYy = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};
