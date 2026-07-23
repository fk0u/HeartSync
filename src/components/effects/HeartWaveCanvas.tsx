import React, { useRef, useEffect } from 'react';

interface HeartWaveCanvasProps {
  bpm?: number;
  className?: string;
}

export const HeartWaveCanvas: React.FC<HeartWaveCanvasProps> = ({ bpm = 72, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let x = 0;
    const points: number[] = [];

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 300;
      canvas.height = canvas.parentElement?.clientHeight || 60;
    };
    resize();
    window.addEventListener('resize', resize);

    const speed = (bpm / 60) * 1.5;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw subtle grid line
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();

      // ECG wave generation
      x = (x + speed) % w;

      // PQRST ECG pulse formula
      let y = centerY;
      const normalizedX = (x / w) * 10;
      const cycle = normalizedX % 2;

      if (cycle > 0.8 && cycle < 0.9) {
        y -= 6; // P wave
      } else if (cycle >= 0.9 && cycle < 0.95) {
        y += 8; // Q wave
      } else if (cycle >= 0.95 && cycle < 1.05) {
        y -= 24; // R wave (spike)
      } else if (cycle >= 1.05 && cycle < 1.1) {
        y += 12; // S wave
      } else if (cycle >= 1.2 && cycle < 1.45) {
        y -= 8; // T wave
      }

      points.push(y);
      if (points.length > w) points.shift();

      // Render ECG line with neon glow
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#10b981';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let i = 0; i < points.length; i++) {
        if (i === 0) ctx.moveTo(i, points[i]);
        else ctx.lineTo(i, points[i]);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [bpm]);

  return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
};
