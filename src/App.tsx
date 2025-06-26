import FramerLogo from "assets/logo.png";
import FramePreview from "components/FramePreview";
import Input from "components/Input";
import useFrameContext from "hooks/useFrameContext";

function App() {
  const {
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
  } = useFrameContext();

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
          <div>Frame Thickness</div>
          <div className="flex space-x-2 items-center">
            <Input
              value={thickness}
              onChange={(e) => setThickness(Number(e.target.value))}
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
        <FramePreview />
      </div>
    </div>
  );
}

export default App;
