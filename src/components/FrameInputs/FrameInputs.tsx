import FramerLogo from "assets/logo.png";
import Input from "components/Input";
import WoodSelect from "components/WoodSelect/WoodSelect";
import useFrameContext from "hooks/useFrameContext";
import { ComponentPropsWithoutRef } from "react";

function InputContainer(props: ComponentPropsWithoutRef<"div">) {
  return <div className="flex space-x-2" {...props} />;
}

function EllipsisFill() {
  return (
    <div className="text-gray-400 overflow-hidden grow-1">
      ..........................................................................................
    </div>
  );
}

function Label(props: ComponentPropsWithoutRef<"div">) {
  return <div className="text-nowrap" {...props} />;
}

export default function FrameInputs() {
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
    <div className="space-y-16 px-4">
      <img src={FramerLogo} alt="Framer" className="w-16 lg:w-24 mx-auto" />
      <div className="space-y-4 max-w-sm w-full px-2">
        <InputContainer>
          <Label>Art Dimensions</Label>
          <EllipsisFill />
          <div className="flex items-center space-x-2">
            <Input
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
            <div className="-translate-y-2 text-gray-400" aria-hidden="true">
              X
            </div>
            <Input
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <Label>Thickness</Label>
          <EllipsisFill />
          <Input
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
            placeholder="Size"
          />
        </InputContainer>
        <InputContainer>
          <Label>Matting</Label>
          <EllipsisFill />
          <Input
            value={matting}
            onChange={(e) => setMatting(Number(e.target.value))}
            placeholder="Size"
          />
        </InputContainer>
        <InputContainer>
          <Label>Overlap</Label>
          <EllipsisFill />
          <Input
            value={overlap}
            onChange={(e) => setOverlap(Number(e.target.value))}
            placeholder="overlap"
          />
        </InputContainer>
        <WoodSelect />
      </div>
    </div>
  );
}
