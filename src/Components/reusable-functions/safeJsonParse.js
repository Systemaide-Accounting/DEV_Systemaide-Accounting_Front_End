export const safeJsonParse = (jsonString) => {
  try {
    // Check if jsonString is parseable
    if (!jsonString) return;
    if (typeof jsonString !== "string") return;

    return JSON.parse(jsonString);
  } catch (error) {
    // Return the original string if parsing fails
    return jsonString;
  }
};
