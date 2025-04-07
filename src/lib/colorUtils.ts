export const COLORS_CLASSES = [
  "section-red",
  "section-blue",
  "section-orange",
  "section-dark-red",
  "section-yellow",
  "section-pink",
  "section-green",
  "section-dark-blue",
] as const;

export const getColorClass = (
  index: number,
): (typeof COLORS_CLASSES)[number] => {
  // Normalize the index to be within the range of the COLORS array length
  const normalizedIndex =
    index < 0
      ? (index % COLORS_CLASSES.length) + COLORS_CLASSES.length
      : index % COLORS_CLASSES.length;

  return COLORS_CLASSES[normalizedIndex];
};
