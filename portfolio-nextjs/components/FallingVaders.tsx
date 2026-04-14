'use client';

import { useEffect, useRef } from 'react';

interface Vader {
  x: number;
  y: number;
  size: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleOffset: number;
  alive: boolean;
  respawnTimer: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function FallingVaders({ onScore, onDamage }: { onScore?: (score: number) => void; onDamage?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const vaders: Vader[] = [];
    const sparks: Spark[] = [];
    const VADER_COUNT = 12;
    const RESPAWN_DELAY = 180; // frames (~3s)
    const img = new window.Image();
    img.src = '/img/vader.png';

    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createVaders = () => {
      vaders.length = 0;
      for (let i = 0; i < VADER_COUNT; i++) {
        vaders.push({
          x: Math.random() * canvas.width,
          y: -(Math.random() * canvas.height),
          size: 16 + Math.random() * 12,
          speed: 0.4 + Math.random() * 0.5,
          wobble: 0,
          wobbleSpeed: 0.005 + Math.random() * 0.01,
          wobbleOffset: Math.random() * Math.PI * 2,
          alive: true,
          respawnTimer: 0,
        });
      }
    };

    const explode = (v: Vader) => {
      const cx = v.x + v.wobble + v.size / 2;
      const cy = v.y + v.size / 2;
      const colors = ['#ff4444', '#ff8800', '#ffcc00', '#ffffff', '#ff6600'];
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        sparks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 30 + Math.random() * 20,
          maxLife: 30 + Math.random() * 20,
          size: 1.5 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      v.alive = false;
      v.respawnTimer = RESPAWN_DELAY;
      score++;
      onScore?.(score);
    };

    let frame = 0;
    let imgRatio = 1;
    let score = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (img.complete && img.naturalWidth > 0) {
        imgRatio = img.naturalHeight / img.naturalWidth;

        for (const v of vaders) {
          if (!v.alive) {
            v.respawnTimer--;
            if (v.respawnTimer <= 0) {
              v.alive = true;
              v.y = -v.size * imgRatio;
              v.x = Math.random() * canvas.width;
            }
            continue;
          }

          v.wobble = Math.sin(frame * v.wobbleSpeed + v.wobbleOffset) * 20;
          v.y += v.speed;

          if (v.y > canvas.height + v.size * imgRatio) {
            v.y = -v.size * imgRatio;
            v.x = Math.random() * canvas.width;
            score--;
            onScore?.(score);
            onDamage?.();
          }

          // Check mouse collision
          const vCx = v.x + v.wobble + v.size / 2;
          const vCy = v.y + (v.size * imgRatio) / 2;
          const dx = mouse.x - vCx;
          const dy = mouse.y - vCy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < v.size) {
            explode(v);
            continue;
          }

          ctx.globalAlpha = 1;
          ctx.drawImage(img, v.x + v.wobble, v.y, v.size, v.size * imgRatio);
        }
      }

      // Draw and update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05; // gravity
        s.life--;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = s.life / s.maxLife;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    createVaders();
    draw();

    let lastWidth = canvas.width;
    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', onMouseMove);
    parent?.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', () => {
      resize();
      // Only recreate vaders if width changed (avoid mobile address bar resize)
      if (canvas.width !== lastWidth) {
        lastWidth = canvas.width;
        createVaders();
      }
    });

    return () => {
      cancelAnimationFrame(animationId);
      parent?.removeEventListener('mousemove', onMouseMove);
      parent?.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full z-20"
      style={{ pointerEvents: 'none' }}
    />
  );
}
