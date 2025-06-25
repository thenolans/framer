import { NOTCH_SIZE } from "../constants";

export default function calculateOverallDimensions(
  width: number,
  height: number,
  matting: number,
  frame: number
) {
  const finalWidth = width + matting * 2 + frame * 2 - NOTCH_SIZE * 2;
  const finalHeight = height + matting * 2 + frame * 2 - NOTCH_SIZE * 2;
  return { frameWidth: finalWidth, frameHeight: finalHeight };
}
