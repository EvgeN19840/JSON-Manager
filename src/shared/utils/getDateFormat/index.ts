export const getDateFormat = (date: Date | string | null) => {
  if (!date) return "N/A";
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) return "Invalid Date";

  return parsedDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
};
