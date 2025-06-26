import { FrameContext } from "contexts/frameContext";
import { useContext } from "react";

export const useFrameContext = () => useContext(FrameContext);

export default useFrameContext;
