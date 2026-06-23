import { useRef, useEffect } from "react";
import "./MagnetLines.css";

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineWidth = "1vmin",
  lineHeight = "6vmin",
  baseAngle = -10,
  className = "",
  style = {},
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll("span");

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r =
          ((Math.acos(b / c) * 180) / Math.PI) *
          (pointer.y > centerY ? 1 : -1);

        item.style.setProperty("--rotate", `${r}deg`);
      });
    };

    window.addEventListener("pointermove", onPointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [rows, columns]);

  const neonCyan = "#00FFD1";
  const neonOrange = "#FF6B35";

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => {
    const color = i % 2 === 0 ? neonCyan : neonOrange;
    return (
      <span
        key={i}
        style={{
          "--rotate": `${baseAngle}deg`,
          backgroundColor: color,
          width: lineWidth,
          height: lineHeight,
          opacity: i % 2 === 0 ? 0.12 : 0.15,
        } as React.CSSProperties}
      />
    );
  });

  return (
    <div
      ref={containerRef}
      className={`magnetLines-container ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style,
      }}
    >
      {spans}
    </div>
  );
}
