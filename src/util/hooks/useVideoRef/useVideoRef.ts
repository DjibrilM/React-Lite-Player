import { useRef } from "react";
import { ForwardedRef } from "../../../types/video";


const useVideoRef = () => {
  const ref = useRef<ForwardedRef>(null);
  return ref;
};

export default useVideoRef;
