'use client';

import { useEffect, useRef, useState, forwardRef } from 'react';
import Image from 'next/image';

interface ParallaxPhotoProps {
  damageKey?: number;
}

const ParallaxPhoto = forwardRef<HTMLDivElement, ParallaxPhotoProps>(
  function ParallaxPhoto({ damageKey = 0 }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [showDamage, setShowDamage] = useState(false);
    const [gyroX, setGyroX] = useState(0);
    const [gyroY, setGyroY] = useState(0);
    const [hasGyro, setHasGyro] = useState(false);

    const shakeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (damageKey > 0) {
        setShowDamage(true);
        // Force animation restart
        const el = shakeRef.current;
        if (el) {
          el.classList.remove('animate-shake');
          void el.offsetWidth; // trigger reflow
          el.classList.add('animate-shake');
        }
        const timer = setTimeout(() => setShowDamage(false), 400);
        return () => clearTimeout(timer);
      }
    }, [damageKey]);

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

    // Gyroscope for mobile parallax
    useEffect(() => {
      const isMobile = window.matchMedia('(pointer: coarse)').matches;
      if (!isMobile) return;

      const handleOrientation = (e: DeviceOrientationEvent) => {
        const gamma = e.gamma || 0; // left-right tilt (-90 to 90)
        const beta = e.beta || 0;   // front-back tilt (-180 to 180)
        // Normalize to -1 to 1 range, clamped
        setGyroX(Math.max(-1, Math.min(1, gamma / 30)));
        setGyroY(Math.max(-1, Math.min(1, (beta - 45) / 30))); // 45 = natural holding angle
        setHasGyro(true);
      };

      // iOS 13+ requires permission
      const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
      if (typeof DOE.requestPermission === 'function') {
        DOE.requestPermission().then((permission) => {
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, { passive: true });
          }
        }).catch(() => {});
      } else {
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
      }

      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, []);

    // Use gyro on mobile, mouse on desktop
    const tiltX = hasGyro ? gyroX : mouseX;
    const tiltY = hasGyro ? gyroY : mouseY;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
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
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className="relative shrink-0 w-[620px] h-[680px] overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background layer - d2 */}
        <Image
          src="/img/d2.jpg"
          alt=""
          fill
          priority
          className="object-cover z-0 transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${tiltX * -8}px, ${scrollOffset * 0.3 + tiltY * -8}px)`,
          }}
        />
        {/* Foreground layer - Diogo (damage effects apply here only) */}
        <div
          ref={shakeRef}
          className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${tiltX * 15}px, ${scrollOffset * -0.5 + tiltY * 10}px)`,
          }}
        >
          <Image
            src={showDamage ? '/img/d3.png' : '/img/df.png'}
            alt="Diogo Bittencourt"
            width={520}
            height={520}
            priority
            className="object-contain scale-125"
          />
          {/* Red damage overlay — same PNG so it follows the silhouette exactly */}
          <Image
            src={showDamage ? '/img/d3.png' : '/img/df.png'}
            alt=""
            width={520}
            height={520}
            aria-hidden
            className={`absolute object-contain scale-125 pointer-events-none transition-opacity duration-200 ${
              showDamage ? 'opacity-60' : 'opacity-0'
            }`}
            style={{
              filter: 'brightness(0.3) sepia(1) saturate(10) hue-rotate(-10deg)',
            }}
          />
        </div>
      </div>
    );
  }
);

export default ParallaxPhoto;
