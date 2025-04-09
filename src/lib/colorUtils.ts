export const COLOR_LIST = [
  "255, 0, 30",
  "0, 150, 190",
  "124, 30, 55",
  "225, 135, 65",
  "255, 225, 20",
  "205, 120, 125",
  "45, 125, 30",
  "20, 50, 255",
] as const;

/**
 * ===============================================================================
 * Set Color to dynamic element based on the index
 * @param index
 * @returns
 */
const setColor = (index: number): (typeof COLOR_LIST)[number] => {
  // Normalize the index to be within the range of the COLOR_LIST array length
  const normalizedIndex =
    index < 0
      ? (index % COLOR_LIST.length) + COLOR_LIST.length
      : index % COLOR_LIST.length;

  return COLOR_LIST[normalizedIndex];
};

export default setColor;
