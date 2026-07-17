import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';

gsap.registerPlugin(Observer, Physics2DPlugin);

const INK = '#1A1A1A';
const ACCENT = '#4A5240';
const PALETTE = [INK, ACCENT, '#8A8A82'];

/** One of three small camera-motif shapes: a bokeh ring, a focus reticle
 * cross, or a viewfinder corner bracket. Kept to the site's own ink/accent
 * tones rather than arbitrary color — this is a restrained stand-in for
 * literal confetti, not a copy of it. */
function randomShapeSVG(color: string): string {
  const shapes = [
    `<circle cx="12" cy="12" r="9" fill="none" stroke="${color}" stroke-width="2.5"/>`,
    `<g stroke="${color}" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/></g>`,
    `<path d="M3 9V3H9M15 3H21V9M21 15V21H15M9 21H3V15" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  ];
  return shapes[Math.floor(Math.random() * shapes.length)];
}

interface PhotoBurstProps {
  active: boolean; // only wires up the interaction when true (Photography filter selected)
  children: React.ReactNode;
}

export function PhotoBurst({ active, children }: PhotoBurstProps) {
  const proxyRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reticleRef = useRef<SVGCircleElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const prefersReducedRef = useRef(false);

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!active || prefersReducedRef.current) return;
    const proxy = proxyRef.current;
    const svg = svgRef.current;
    if (!proxy || !svg) return;

    const svgPoint = (clientX: number, clientY: number) => {
      const rect = svg.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const observer = Observer.create({
      target: proxy,
      type: 'pointer,touch',
      onPress(e) {
        const p = svgPoint(e.x, e.y);
        startRef.current = p;
        draggingRef.current = true;
        gsap.set(reticleRef.current, { attr: { cx: p.x, cy: p.y }, opacity: 1, scale: 0.6, transformOrigin: `${p.x}px ${p.y}px` });
        gsap.set(lineRef.current, { attr: { x1: p.x, y1: p.y, x2: p.x, y2: p.y }, opacity: 1 });
      },
      onDrag(e) {
        const p = svgPoint(e.x, e.y);
        gsap.set(lineRef.current, { attr: { x2: p.x, y2: p.y } });
        const dist = Math.hypot(p.x - startRef.current.x, p.y - startRef.current.y);
        gsap.set(reticleRef.current, { scale: Math.min(0.6 + dist / 150, 1.8) });
      },
      onDragEnd(e) {
        const p = svgPoint(e.x, e.y);
        const dist = Math.hypot(p.x - startRef.current.x, p.y - startRef.current.y);
        burst(startRef.current.x, startRef.current.y, dist);
        draggingRef.current = false;
        gsap.to([reticleRef.current, lineRef.current], { opacity: 0, duration: 0.2 });
      },
      onRelease(e) {
        if (!draggingRef.current) return;
        // A press with negligible movement (no onDragEnd fired) — treat as a tap-burst.
        const p = svgPoint(e.x, e.y);
        burst(p.x, p.y, 60);
        draggingRef.current = false;
        gsap.to([reticleRef.current, lineRef.current], { opacity: 0, duration: 0.2 });
      },
    });

    function burst(x: number, y: number, strength: number) {
      const count = Math.round(gsap.utils.clamp(4, 14, strength / 12));
      const speed = gsap.utils.mapRange(0, 300, 80, 320, strength);
      for (let i = 0; i < count; i++) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        g.innerHTML = randomShapeSVG(color);
        g.setAttribute('transform', `translate(${x - 12}, ${y - 12})`);
        g.style.opacity = '0.9';
        svg!.appendChild(g);
        const angle = Math.random() * Math.PI * 2;
        gsap.to(g, {
          physics2D: { angle: angle * (180 / Math.PI), velocity: gsap.utils.random(speed * 0.6, speed), gravity: 900 },
          rotation: gsap.utils.random(-180, 180),
          duration: 0.9 + Math.random() * 0.5,
          ease: 'none',
          onComplete: () => g.remove(),
        });
        gsap.to(g, { opacity: 0, duration: 0.4, delay: 0.6, ease: 'power1.out' });
      }
    }

    return () => observer.kill();
  }, [active]);

  return (
    <div style={{ position: 'relative' }}>
      {children}
      {active && !prefersReducedRef.current && (
        <>
          <div
            ref={proxyRef}
            style={{ position: 'absolute', inset: 0, zIndex: 5, cursor: 'crosshair', touchAction: 'none' }}
            aria-hidden="true"
          />
          <svg ref={svgRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 6, overflow: 'visible' }}>
            <line ref={lineRef} stroke={INK} strokeWidth={1.5} strokeDasharray="4 4" opacity={0} />
            <circle ref={reticleRef} r={14} fill="none" stroke={ACCENT} strokeWidth={1.5} opacity={0} />
          </svg>
          <div
            style={{
              position: 'absolute', top: -34, right: 0, fontFamily: 'monospace', fontSize: 11,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8A82', pointerEvents: 'none',
            }}
          >
            click + drag to scatter
          </div>
        </>
      )}
    </div>
  );
}
