import { useState } from "react";

import FramePreview from "./components/FramePreview";
import Input from "./components/Input";

const FRAME_WIDTH = 1.5;
const WIDTH = 48;
const HEIGHT = 24;
const MATTING = 4;
const NOTCH_SIZE = 0.5;

function calculateOverallDimensions(
  width: number,
  height: number,
  matting: number,
  frame: number
) {
  const finalWidth = width + matting * 2 + frame * 2 - NOTCH_SIZE * 2;
  const finalHeight = height + matting * 2 + frame * 2 - NOTCH_SIZE * 2;
  return `${finalWidth}" x ${finalHeight}"`;
}

function App() {
  const [width, setWidth] = useState(WIDTH);
  const [height, setHeight] = useState(HEIGHT);
  const [matting, setMatting] = useState(MATTING);
  const [frame, setFrame] = useState(FRAME_WIDTH);

  return (
    <div className="p-4 sm:p-8 container mx-auto max-w-3xl space-y-8 min-h-screen h-screen max-h-screen overflow-hidden flex flex-col">
      <h1 className="mx-auto text-2xl font-bold text-orange-900">Framer</h1>
      <div className="sm:flex sm:justify-around grid grid-cols-2 gap-8">
        <div className="inline-flex flex-col items-center space-y-2 col-span-2">
          <div>Art Dimensions</div>
          <div className="flex space-x-2 items-center">
            <div>
              <Input
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                placeholder="Width"
              />
            </div>
            <div>X</div>
            <div>
              <Input
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                placeholder="Height"
              />
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col items-center space-y-2">
          <div>Matting</div>
          <div className="flex space-x-2 items-center">
            <Input
              value={matting}
              onChange={(e) => setMatting(Number(e.target.value))}
              placeholder="Size"
            />
          </div>
        </div>
        <div className="inline-flex flex-col items-center space-y-2">
          <div>Frame Width</div>
          <div className="flex space-x-2 items-center">
            <Input
              value={frame}
              onChange={(e) => setFrame(Number(e.target.value))}
              placeholder="Size"
            />
          </div>
        </div>
      </div>
      <div className="grow-1 overflow-hidden text-center">
        <FramePreview
          width={width}
          height={height}
          matting={matting}
          frame={frame}
        />
      </div>
      <div className="text-center">
        Overall Dimensions:{" "}
        {calculateOverallDimensions(width, height, matting, frame)}
      </div>
    </div>
  );
}

export default App;
