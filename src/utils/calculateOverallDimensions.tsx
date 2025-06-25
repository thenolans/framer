export default function calculateOverallDimensions(
  width: number,
  height: number,
  matting: number,
  frame: number,
  overlap: number
) {
  const finalWidth = width + matting * 2 + frame * 2 - overlap * 2;
  const finalHeight = height + matting * 2 + frame * 2 - overlap * 2;
  return { frameWidth: finalWidth, frameHeight: finalHeight };
}
