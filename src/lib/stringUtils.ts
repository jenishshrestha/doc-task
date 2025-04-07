/**
 * ==============================================================================
 * Get the initials from a string.
 * @param {string} label - The string to get initials from.
 * ==============================================================================
 */
export const getInitials = (label?: string, fallback = "NA"): string => {
  if (!label) return fallback;
  return label
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};
