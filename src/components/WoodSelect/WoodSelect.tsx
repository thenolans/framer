import classNames from "classnames";
import { WoodBackgroundMap } from "constants/defaults";
import useFrameContext from "hooks/useFrameContext";
import { Wood } from "types";

const WOOD_OPTIONS = [Wood.PINE, Wood.OAK, Wood.WALNUT];

export default function WoodSelect() {
  const { wood, setWood } = useFrameContext();
  return (
    <div className="text-center">
      <div className="inline-flex space-x-2">
        {WOOD_OPTIONS.map((w) => (
          <label key={w}>
            <div
              className={classNames(
                "border p-1 cursor-pointer",
                wood === w ? "border-amber-800" : "border-transparent"
              )}
            >
              <div
                style={{
                  backgroundImage: `url(${WoodBackgroundMap[w]})`,
                }}
                className="w-6 h-6"
              />
            </div>
            <input
              className="sr-only"
              checked={wood === w}
              type="radio"
              onChange={() => setWood(w)}
              name="wood"
              value={w}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
