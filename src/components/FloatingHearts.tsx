/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  swingSpeed: number;
  swingWidth: number;
  opacity: number;
  color: string;
}

interface FloatingHeartsProps {
  burst: boolean;
  themeColor?: 'pink' | 'lavender' | 'peach' | 'mint' | 'galaxy' | 'dark';
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ burst, themeColor = 'pink' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<HeartParticle[]>([]);
  const isBurstingRef = useRef<boolean>(false);

  // Map theme to cozy heart color sets
  const getColorPalette = (theme: string) => {
    switch (theme) {
      case 'lavender':
        return ['#C0B9DD', '#9A8EC9', '#E3DFFF', '#B287A3', '#D6C0D9'];
      case 'peach':
        return ['#FFB5A7', '#FCD5CE', '#FFCAD4', '#D8E2DC', '#ECE4DB'];
      case 'mint':
        return ['#B7E4C7', '#D8F3DC', '#74C69D', '#FFEAEA', '#FFCAD4'];
      case 'galaxy':
        return ['#B3C5FF', '#FCE2FF', '#D3C8FF', '#9AAFFF', '#FFD1E6'];
      case 'dark':
        return ['#F43F5E', '#BE123C', '#E11D48', '#FDA4AF', '#9F1239'];
      case 'pink':
      default:
        return ['#FF758F', '#FF8FA3', '#FFB3C1', '#FFCAD4', '#FF4D6D', '#FF0A54'];
    }
  };

  const createParticle = (width: number, height: number, forceBottom = false): HeartParticle => {
    const palette = getColorPalette(themeColor);
    const size = Math.random() * 12 + 8;
    return {
      x: Math.random() * width,
      y: forceBottom ? height + 20 : Math.random() * (height + 40),
      size: size,
      speed: Math.random() * 0.8 + 0.4,
      angle: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.02 + 0.01,
      swingWidth: Math.random() * 20 + 10,
      opacity: Math.random() * 0.6 + 0.2,
      color: palette[Math.floor(Math.random() * palette.length)]
    };
  };

  // Generate burst particles on state change
  useEffect(() => {
    if (burst && !isBurstingRef.current) {
      isBurstingRef.current = true;
      const canvas = canvasRef.current;
      if (canvas) {
        const { width, height } = canvas;
        const palette = getColorPalette(themeColor);
        // Create 60 particles heading upwards elegantly
        for (let i = 0; i < 75; i++) {
          particlesRef.current.push({
            x: width / 2 + (Math.random() * 120 - 60),
            y: height / 2 + (Math.random() * 120 - 60),
            size: Math.random() * 16 + 10,
            speed: Math.random() * 3 + 1.5,
            angle: Math.random() * Math.PI * 2,
            swingSpeed: Math.random() * 0.04 + 0.02,
            swingWidth: Math.random() * 40 + 10,
            opacity: 1,
            color: palette[Math.floor(Math.random() * palette.length)]
          });
        }
      }
    } else if (!burst) {
      isBurstingRef.current = false;
    }
  }, [burst, themeColor]);

  // Main animation engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial setup
    const initialCount = 40;
    particlesRef.current = Array.from({ length: initialCount }, () =>
      createParticle(canvas.width, canvas.height, false)
    );

    const drawHeart = (
      cContext: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      cContext.save();
      cContext.globalAlpha = alpha;
      cContext.fillStyle = color;
      cContext.beginPath();
      cContext.moveTo(x, y + size / 4);
      cContext.quadraticCurveTo(x, y, x - size / 2, y);
      cContext.quadraticCurveTo(x - size, y, x - size, y + size / 2);
      cContext.quadraticCurveTo(x - size, y + (size * 3) / 4, x - size / 2, y + size);
      cContext.lineTo(x, y + size * 1.25);
      cContext.lineTo(x + size / 2, y + size);
      cContext.quadraticCurveTo(x + size, y + (size * 3) / 4, x + size, y + size / 2);
      cContext.quadraticCurveTo(x + size, y, x + size / 2, y);
      cContext.quadraticCurveTo(x, y, x, y + size / 4);
      cContext.closePath();
      cContext.fill();
      cContext.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Wave tracking
        p.angle += p.swingSpeed;
        const currentX = p.x + Math.sin(p.angle) * p.swingWidth;

        // Draw individual heart
        drawHeart(ctx, currentX, p.y, p.size, p.color, p.opacity);

        // Move upwards
        p.y -= p.speed;

        // If burst, particles speed decays smoothly and spreads outwards
        if (p.speed > 2.5) {
          p.speed *= 0.98;
          p.opacity -= 0.005;
        }

        // Clip/wrap boundaries
        if (p.y < -30 || p.opacity <= 0) {
          // Replace or delete based on current size
          if (particles.length > 55) {
            particles.splice(i, 1);
          } else {
            particles[i] = createParticle(canvas.width, canvas.height, true);
          }
        }
      }

      // Add gentle drift background particles to maintain ambience
      if (particles.length < 35) {
        particles.push(createParticle(canvas.width, canvas.height, true));
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [themeColor]);

  return (
    <canvas
      id="floating-hearts-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
