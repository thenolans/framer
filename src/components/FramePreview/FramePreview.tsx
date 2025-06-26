import MountainPlaceholder from "assets/mountains.jpg";
import PineTexture from "assets/pine.png";
import classNames from "classnames";
import useFrameContext from "hooks/useFrameContext";
import { useState } from "react";
import calculateOverallDimensions from "utils/calculateOverallDimensions";
import calculatePaddingFromDimensions from "utils/calculatePaddingForDimensions";

export default function FramePreview() {
  const { width, height, matting, thickness, overlap } = useFrameContext();
  const [image, setImage] = useState<string | null>(null);
  const aspectRatio = `${width} / ${height}`;
  const sizeClasses =
    width >= height ? "w-full max-h-full" : "h-full max-w-full";
  const framePercent = calculatePaddingFromDimensions(thickness, width, height);
  const mattingPercent = calculatePaddingFromDimensions(matting, width, height);
  const { frameWidth, frameHeight } = calculateOverallDimensions(
    width,
    height,
    matting,
    thickness,
    overlap
  );

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
      className={classNames(
        "inline-block bg-cover relative translate-x-4",
        sizeClasses
      )}
      htmlFor="file-upload"
    >
      <div className="absolute -left-8 top-0 bottom-0 w-6 border-t border-b border-gray-400">
        <div className="h-[44%] border-l absolute left-1/2 border-gray-400" />
        <div className="h-[44%] border-l bottom-0 absolute left-1/2 border-gray-400" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2">
          {frameHeight}"
        </div>
      </div>
      <div className="absolute -top-8 left-0 right-0 h-6 border-l border-r border-gray-400">
        <div className="w-[44%] border-t absolute top-1/2 border-gray-400" />
        <div className="w-[44%] border-t right-0 absolute top-1/2 border-gray-400" />
        <div className="absolute left-1/2 top-1/2 -translate-1/2">
          {frameWidth}"
        </div>
      </div>
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
            className="absolute object-cover w-full h-full top-0 left-0 z-1 object-center cursor-pointer"
            src={image || MountainPlaceholder}
            alt=""
          />
        </div>
      </div>
    </label>
  );
}
