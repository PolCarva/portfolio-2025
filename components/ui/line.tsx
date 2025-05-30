"use client";
import { useRef, useEffect } from "react";

interface MouseEvent {
  movementY: number;
  clientX: number;
}

export default function Line() {
  const path = useRef<SVGPathElement>(null);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId: number | null = null;

  useEffect(() => {
    setPath(progress);
  }, []);

  const setPath = (progress: number) => {
    const width = window.innerWidth * 1;
    path.current?.setAttributeNS(
      null,
      "d",
      `M0 250 Q${width * x} ${250 + progress}, ${width} 250`
    );
  };

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { movementY, clientX } = e;
    const pathBound = path.current?.getBoundingClientRect();

    if (pathBound) {
      x = (clientX - pathBound.left) / pathBound.width;
      progress += movementY;
      setPath(progress);
    }
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time += 0.2;
    setPath(newProgress);

    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div className="w-full translate-y-px">
      <div className="relative w-full h-px">
        <div
          onMouseEnter={manageMouseEnter}
          onMouseMove={(e) => manageMouseMove(e)}
          onMouseLeave={manageMouseLeave}
          className="relative z-10 h-10 w-full top-[-40px]"
        />
        <svg className="absolute w-full h-[500px] top-[-250px]">
          <path
            ref={path}
            className="stroke-current text-white stroke-[1px] fill-none"
          />
        </svg>
      </div>
    </div>
  );
}