import { useEffect, useRef } from "react";

export default function PixelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const cols = 32;
    const rows = 24;
    const dotSize = 2;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const spacingX = w / cols;
      const spacingY = h / rows;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacingX + spacingX / 2;
          const y = j * spacingY + spacingY / 2;

          const wave =
            Math.sin(i * 0.3 + time * 0.02) *
            Math.cos(j * 0.3 + time * 0.015);
          const opacity = 0.08 + (wave + 1) * 0.12;

          const isAccent = wave > 0.7;

          if (isAccent) {
            ctx.fillStyle = `rgba(232, 115, 74, ${opacity * 1.5})`;
          } else {
            ctx.fillStyle = `rgba(240, 237, 232, ${opacity})`;
          }

          ctx.beginPath();
          ctx.rect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
          ctx.fill();
        }
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
