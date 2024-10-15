// Utility function to return default locale date format
export const defaultLocale = (date: Date) => {
  return new Intl.DateTimeFormat().format(date);
};
