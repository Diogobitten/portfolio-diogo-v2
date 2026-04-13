'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ParallaxPhoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = 1 - (rect.bottom / (windowH + rect.height));
      setScrollOffset(progress * 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize to -1 to 1 range from center
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseX(x);
    setMouseY(y);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative shrink-0 w-[620px] h-[680px] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background layer - d2 (moves slower, opposite to mouse) */}
      <Image
        src="/img/d2.jpg"
        alt=""
        fill
        priority
        className="object-cover z-0 transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${mouseX * -8}px, ${scrollOffset * 0.3 + mouseY * -8}px)`,
        }}
      />
      {/* Foreground layer - Diogo (moves faster, follows mouse slightly) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${mouseX * 15}px, ${scrollOffset * -0.5 + mouseY * 10}px)`,
        }}
      >
        <Image
          src="/img/df.png"
          alt="Diogo Bittencourt"
          width={520}
          height={520}
          priority
          className="object-contain scale-125"
        />
      </div>
    </div>
  );
}
