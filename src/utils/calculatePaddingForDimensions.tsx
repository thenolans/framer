export default function calculatePaddingFromDimensions(
  dimension: number,
  width: number,
  height: number
) {
  if (!width || !height || !dimension) return 0;

  const calculatedPercent = ((dimension / Math.max(width, height)) * 100) / 2;

  return calculatedPercent > 1 ? calculatedPercent : 1;
}
