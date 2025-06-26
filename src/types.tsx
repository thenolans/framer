import { Dispatch, SetStateAction } from "react";

export type FrameContext = {
  thickness: number;
  setThickness: Dispatch<SetStateAction<number>>;
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
  height: number;
  setHeight: Dispatch<SetStateAction<number>>;
  matting: number;
  setMatting: Dispatch<SetStateAction<number>>;
  overlap: number;
  setOverlap: Dispatch<SetStateAction<number>>;
};
