import {
  DEFAULT_FRAME_THICKNESS,
  DEFAULT_HEIGHT,
  DEFAULT_MATTING,
  DEFAULT_OVERLAP,
  DEFAULT_WIDTH,
} from "constants/defaults";
import { createContext, ReactNode, useState } from "react";
import { FrameContext as FrameContextType } from "types";

type Props = {
  children: ReactNode;
};

export const FrameContext = createContext<FrameContextType>({
  width: DEFAULT_WIDTH,
  setWidth() {},
  height: DEFAULT_HEIGHT,
  setHeight() {},
  matting: DEFAULT_MATTING,
  setMatting() {},
  thickness: DEFAULT_FRAME_THICKNESS,
  setThickness() {},
  overlap: DEFAULT_OVERLAP,
  setOverlap() {},
});

export default function FrameContextProvider({ children }: Props) {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [matting, setMatting] = useState(DEFAULT_MATTING);
  const [thickness, setThickness] = useState(DEFAULT_FRAME_THICKNESS);
  const [overlap, setOverlap] = useState(DEFAULT_OVERLAP);

  return (
    <FrameContext.Provider
      value={{
        width,
        setWidth,
        height,
        setHeight,
        matting,
        setMatting,
        thickness,
        setThickness,
        overlap,
        setOverlap,
      }}
    >
      {children}
    </FrameContext.Provider>
  );
}
