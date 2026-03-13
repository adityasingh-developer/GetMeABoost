"use client";

import { useEffect, useState } from "react";

const SmoothScroll = ({ children }) => {
  const [LenisComponent, setLenisComponent] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadLenis = async () => {
      const mod = await import("lenis/react");
      if (isMounted) {
        setLenisComponent(() => mod.default || mod);
      }
    };

    loadLenis();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!LenisComponent) {
    return children;
  }

  const ReactLenis = LenisComponent;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.2,
        smoothTouch: true,
        smooth: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        infinite: false,
        autoResize: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
