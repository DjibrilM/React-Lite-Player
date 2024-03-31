import React, { useRef } from "react";
import { ForwardedRef } from "../../../../dist/cjs/types/types/video";
const useVideoRef = () => {
  const ref = useRef<ForwardedRef>(null);
  return ref;
};

export default useVideoRef;
