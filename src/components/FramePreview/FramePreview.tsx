import classNames from "classnames";
import { useState } from "react";
const PineTexture = require("../../assets/pine.jpg");

type Props = {
  width: number;
  height: number;
  matting: number;
  frame: number;
};

const PLACEHOLDER_SRC =
  "https://placehold.co/600x400/EEE/31343C?text=Click+to+upload+an+image";

function calculatePaddingFromDimensions(
  dimension: number,
  width: number,
  height: number
) {
  if (!width || !height || !dimension) return 0;

  const calculatedPercent = ((dimension / Math.max(width, height)) * 100) / 2;

  return calculatedPercent > 1 ? calculatedPercent : 1;
}

export default function FramePreview({ width, height, matting, frame }: Props) {
  const [image, setImage] = useState<string | null>(null);
  const aspectRatio = `${width} / ${height}`;
  const sizeClasses =
    width >= height ? "w-full max-h-full" : "h-full max-w-full";
  const framePercent = calculatePaddingFromDimensions(frame, width, height);
  const mattingPercent = calculatePaddingFromDimensions(matting, width, height);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <label
      style={{
        aspectRatio,
        backgroundImage: `url(${PineTexture})`,
        padding: `${framePercent}%`,
      }}
      className={classNames("inline-block bg-cover", sizeClasses)}
      htmlFor="file-upload"
    >
      <div
        style={{ padding: `${mattingPercent}%` }}
        className="w-full h-full bg-white"
      >
        <div className="relative w-full h-full">
          <input
            onChange={handleChange}
            className="hidden"
            id="file-upload"
            type="file"
          />
          <img
            className="absolute object-cover w-full h-full top-0 left-0 z-1 object-center"
            src={image || PLACEHOLDER_SRC}
            alt=""
          />
        </div>
      </div>
    </label>
  );
}
