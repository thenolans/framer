import FramerLogo from "assets/logo.png";
import FramePreview from "components/FramePreview";
import Input from "components/Input";
import {
  DEFAULT_FRAME_THICKNESS,
  DEFAULT_HEIGHT,
  DEFAULT_MATTING,
  DEFAULT_OVERLAP,
  DEFAULT_WIDTH,
} from "constants/defaults";
import { useState } from "react";

function App() {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [matting, setMatting] = useState(DEFAULT_MATTING);
  const [frame, setFrame] = useState(DEFAULT_FRAME_THICKNESS);
  const [overlap, setOverlap] = useState(DEFAULT_OVERLAP);

  return (
    <div className="px-4 py-8 container mx-auto max-w-3xl space-y-8 min-h-screen h-screen max-h-screen overflow-hidden flex flex-col">
      <img src={FramerLogo} alt="Framer" className="w-16 mx-auto" />
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
        <div className="inline-flex flex-col items-center space-y-2">
          <div>Overlap</div>
          <div className="flex space-x-2 items-center">
            <Input
              value={overlap}
              onChange={(e) => setOverlap(Number(e.target.value))}
              placeholder="overlap"
            />
          </div>
        </div>
      </div>
      <div className="grow-1 overflow-hidden text-center p-8">
        <FramePreview
          width={width}
          height={height}
          matting={matting}
          frame={frame}
          overlap={overlap}
        />
      </div>
      <div className="text-center text-xs text-gray-500 max-w-2xl mx-auto">
        Click the art to change the image to get a better sense of how it will
        look
      </div>
    </div>
  );
}

export default App;
