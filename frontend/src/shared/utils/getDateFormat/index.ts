export const getDateFormat = (dateString: string | null): string | null => {
  if (!dateString) return "N/A";
 
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString(); 
};
