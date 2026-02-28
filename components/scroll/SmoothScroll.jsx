"use client";

import ReactLenis from "lenis/react";

const SmoothScroll = ({children}) => {
  return (
        <ReactLenis
        root
        options={{
            lerp: 0.05,
            duration: 2,
            smoothTouch: true,
            smooth: true,
            wheelMultiplier: 1,
            touchMultiplier: 1,
            infinite: false,
            autoResize: true,
            syncTouch: false,
        }}>
            {children}
        </ReactLenis>
  )
}

export default SmoothScroll