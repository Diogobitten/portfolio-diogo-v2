'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    checkMobile();

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || isMobile) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    animate();

    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-9999 h-2.5 w-2.5 rounded-full bg-white"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-9999 h-8 w-8 rounded-full border border-white/50"
      />
    </>
  );
}
