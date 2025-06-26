import FrameInputs from "components/FrameInputs/FrameInputs";
import FramePreview from "components/FramePreview";

function App() {
  return (
    <div className="px-2 py-8 min-h-screen flex flex-col container mx-auto lg:max-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 lg:grow-1 lg:overflow-hidden">
        <div className="flex items-center justify-center px-4">
          <FrameInputs />
        </div>
        <div className="flex items-center justify-center overflow-hidden p-8">
          <FramePreview />
        </div>
      </div>
    </div>
  );
}

export default App;
