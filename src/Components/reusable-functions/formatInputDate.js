export const formatInputDate = (date) => {
  const formattedDate = date
    ? new Date(date).toISOString().split("T")[0] // Format as yyyy-MM-dd
    : "";

  return formattedDate;
};
