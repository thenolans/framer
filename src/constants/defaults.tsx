import { Wood } from "types";

export const DEFAULT_FRAME_THICKNESS = 1.5;
export const DEFAULT_WIDTH = 48;
export const DEFAULT_HEIGHT = 24;
export const DEFAULT_MATTING = 4;
export const DEFAULT_OVERLAP = 0.5;
export const DEFAULT_WOOD = Wood.PINE;

export const WoodBackgroundMap = {
  [Wood.OAK]: require("../assets/oak.png"),
  [Wood.PINE]: require("../assets/pine.png"),
  [Wood.WALNUT]: require("../assets/walnut.png"),
};
