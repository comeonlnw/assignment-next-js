import { useMemo } from "react";
import { useWindowSize } from "./useWindowSize";

const useIsMobile = () => {
  const { width } = useWindowSize();

  const MOBILE_BREAKPOINT = 768;

  const isMobileByWidth = width !== undefined && width < MOBILE_BREAKPOINT;

  const isMobileByUserAgent = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const userAgent = navigator.userAgent || navigator.vendor;
    return /android|ipad|iphone|ipod|blackberry|windows phone/i.test(userAgent);
  }, []);

  const isMobile = isMobileByUserAgent || isMobileByWidth;

  return isMobile;
};

export default useIsMobile;
