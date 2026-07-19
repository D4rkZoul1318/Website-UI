import { useRef, useEffect, useState } from 'react';

const imgBgTexture = '/images/explorations/octopus-card/bg-texture.webp';
const imgOctopus = '/images/explorations/octopus-card/octopus.webp';
const imgStar = '/images/explorations/octopus-card/star.webp';

const CARD_W = 393;
const CARD_H = 852;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Rainbow spectrum gradient matching the Figma radial gradient color stops
const HOLO_GRADIENT =
  'linear-gradient(148deg,' +
  'rgba(224,175,255,1) 0%,' +
  'rgba(114,95,207,1) 14%,' +
  'rgba(44,110,201,1) 22%,' +
  'rgba(10,151,212,1) 33%,' +
  'rgba(20,168,175,1) 39%,' +
  'rgba(38,202,101,1) 49%,' +
  'rgba(87,213,48,1) 57%,' +
  'rgba(166,201,16,1) 67%,' +
  'rgba(206,196,0,1) 73%,' +
  'rgba(186,149,50,1) 79%,' +
  'rgba(167,101,101,1) 85%,' +
  'rgba(157,78,126,1) 89%,' +
  'rgba(137,30,177,1) 95%,' +
  'rgba(127,7,202,1) 100%)';

// Conic shimmer — approximates the matrix-transformed version from the Figma code
const CONIC_GRADIENT =
  'conic-gradient(from 90deg at 50% 50%,' +
  'rgb(255,255,255) 0%,rgb(223,223,223) 1.5%,rgb(128,128,128) 6%,' +
  'rgb(0,0,0) 12%,rgb(128,128,128) 18.4%,rgb(255,255,255) 24.8%,' +
  'rgb(128,128,128) 30%,rgb(0,0,0) 35.2%,rgb(128,128,128) 42.6%,' +
  'rgb(255,255,255) 50%,rgb(128,128,128) 56.4%,rgb(0,0,0) 60.3%,' +
  'rgb(128,128,128) 67.7%,rgb(255,255,255) 75%,rgb(128,128,128) 81.3%,' +
  'rgb(0,0,0) 87.7%,rgb(128,128,128) 93.8%,rgb(255,255,255) 100%)';

// Rainbow border — a conic gradient (not linear) so it can spin clockwise
// as a genuine rotation of the ring itself, driven by the --ohc-border-angle
// custom property below, instead of a static diagonal sweep.
const RAINBOW_BORDER =
  'conic-gradient(from var(--ohc-border-angle, 0deg),' +
  '#e0afff,#a78ef0,#6b5fd4,#2c6ec9,#0a97d4,#14a8af,#26ca65,#57d530,#cec400,#b87d4c,#9d4e96,#8707ca,#e0afff)';

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Jura:wght@400&family=Kode+Mono:wght@500&display=swap');

  /* Registering the angle as a typed property is what lets the browser
     interpolate it smoothly between 0deg and 360deg — animating a plain
     custom property (unregistered) can only ever snap between values. */
  @property --ohc-border-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }
  @keyframes ohcBorderSpin {
    to { --ohc-border-angle: 360deg; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ohc-border-spin { animation: none !important; }
  }
`;

// ─────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────
export function HolographicCard() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const octopusRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  // Animation state — all in refs, zero setState during RAF
  const s = useRef({
    mouseX: 0, mouseY: 0,
    tiltX: 0, tiltY: 0,
    scale: 1,
    lightX: 50, lightY: 50,
    parX: 0, parY: 0,
    hovering: false,
    rafId: 0,
  });

  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // RAF loop
  useEffect(() => {
    const st = s.current;

    function tick() {
      st.rafId = requestAnimationFrame(tick);
      if (!cardRef.current || !octopusRef.current || !lightRef.current) return;
      if (reduced) return;

      // ── Tilt ──
      const tX = st.hovering ? -st.mouseY * 13 : 0;
      const tY = st.hovering ? st.mouseX * 18 : 0;
      st.tiltX = lerp(st.tiltX, tX, 0.09);
      st.tiltY = lerp(st.tiltY, tY, 0.09);

      // ── Scale ──
      st.scale = lerp(st.scale, st.hovering ? 1.045 : 1, 0.07);

      // ── Light ──
      const lX = st.hovering ? (st.mouseX * 0.5 + 0.5) * 100 : 50;
      const lY = st.hovering ? (st.mouseY * 0.5 + 0.5) * 100 : 50;
      st.lightX = lerp(st.lightX, lX, 0.10);
      st.lightY = lerp(st.lightY, lY, 0.10);

      // ── Parallax ──
      st.parX = lerp(st.parX, st.hovering ? -st.mouseX * 9 : 0, 0.07);
      st.parY = lerp(st.parY, st.hovering ? -st.mouseY * 7 : 0, 0.07);

      // ── Apply DOM mutations ──
      cardRef.current.style.transform =
        `rotateX(${st.tiltX}deg) rotateY(${st.tiltY}deg) scale(${st.scale})`;
      octopusRef.current.style.transform =
        `translate(${st.parX}px, ${st.parY}px)`;
      lightRef.current.style.background =
        `radial-gradient(circle 160px at ${st.lightX}% ${st.lightY}%,` +
        `rgba(255,255,255,0.40) 0%,rgba(255,255,255,0.10) 50%,transparent 75%)`;
    }

    st.rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(st.rafId);
  }, [reduced]);

  // ── Event handlers ──
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = wrapperRef.current?.getBoundingClientRect();
    if (!r) return;
    s.current.mouseX = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    s.current.mouseY = (e.clientY - r.top - r.height / 2) / (r.height / 2);
  };
  const onEnter = () => { s.current.hovering = true; };
  const onLeave = () => { s.current.hovering = false; s.current.mouseX = 0; s.current.mouseY = 0; };

  // ── Shared absolute styles ──
  const abs: React.CSSProperties = { position: 'absolute' };
  const noPtr: React.CSSProperties = { pointerEvents: 'none' };

  return (
    <>
      <style>{FONT_STYLE}</style>

      {/* ── Perspective wrapper ── */}
      <div
        ref={wrapperRef}
        style={{ perspective: '1200px' }}
        onMouseMove={onMouseMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* ── Card shell ── */}
        <div
          ref={cardRef}
          className="ohc-shimmer"
          style={{
            ...abs,
            position: 'relative',
            width: CARD_W,
            height: CARD_H,
            borderRadius: 30,
            backgroundColor: '#151515',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            cursor: 'pointer',
            overflow: 'hidden',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >

          {/* ════════════════════════════
              HOLOGRAPHIC GRADIENT LAYER — full-bleed, so the dynamic
              foil covers the whole card instead of leaving a flat
              static-colored margin around a smaller inset patch.
          ════════════════════════════ */}
          <div style={{
            ...abs, inset: 0,
            opacity: 0.88,
            borderRadius: 26,
            overflow: 'hidden',
            ...noPtr,
          }}>
            {/* 1 — Spectrum radial gradient (static) */}
            <div style={{
              ...abs, inset: 0,
              background: HOLO_GRADIENT,
            }} />

            {/* 2 — Conic shimmer  [difference] (static) */}
            <div style={{
              ...abs,
              top: '50%', left: '50%',
              width: '220%', height: '220%',
              transform: 'translate(-50%,-50%) rotate(20deg)',
              mixBlendMode: 'difference',
              backgroundImage: CONIC_GRADIENT,
              opacity: 0.55,
              ...noPtr,
            }} />

            {/* 3 — Conic shimmer  [screen] (static) */}
            <div style={{
              ...abs,
              top: '50%', left: '50%',
              width: '220%', height: '220%',
              transform: 'translate(-50%,-50%) rotate(20deg)',
              mixBlendMode: 'screen',
              backgroundImage: CONIC_GRADIENT,
              opacity: 0.55,
              ...noPtr,
            }} />

            {/* 4 — Contour texture  [darken] */}
            <div style={{
              ...abs, inset: 0,
              mixBlendMode: 'darken',
              opacity: 0.19,
              backgroundImage: `url('${imgBgTexture}')`,
              backgroundSize: '767px 767px',
              backgroundPosition: 'top left',
              backdropFilter: 'blur(20px)',
              ...noPtr,
            }} />
          </div>

          {/* ════════════════════════════
              RAINBOW BORDER RING — the only dynamic color on the card;
              spins clockwise via the animated --ohc-border-angle property.
          ════════════════════════════ */}
          <div className="ohc-border-spin" style={{
            ...abs, inset: 0,
            borderRadius: 30,
            padding: 5,
            background: RAINBOW_BORDER,
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box,' +
              'linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude' as React.CSSProperties['maskComposite'],
            boxSizing: 'border-box',
            zIndex: 20,
            animation: reduced ? 'none' : 'ohcBorderSpin 6s linear infinite',
            ...noPtr,
          } as React.CSSProperties} />

          {/* ════════════════════════════
              STAR BADGE
          ════════════════════════════ */}
          {/* Ellipse glow ring */}
          <div style={{
            ...abs,
            left: 47.55, top: 147.3,
            width: 42.302, height: 42.302,
            zIndex: 5, ...noPtr,
          }}>
            <svg
              width="42.302" height="42.302"
              viewBox="0 0 42.3025 42.3025"
              fill="none"
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              <circle cx="21.1512" cy="21.1512" r="20.6512" stroke="url(#ellipseGrad)" />
              <defs>
                <linearGradient
                  id="ellipseGrad"
                  x1="7.71508" y1="37.9677"
                  x2="34.5874" y2="4.33475"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E2D6BC" />
                  <stop offset="1" stopColor="#7E5D14" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Star icon */}
          <img
            src={imgStar}
            alt=""
            style={{
              ...abs,
              left: 48.99, top: 148.74,
              width: 39.415, height: 39.415,
              display: 'block',
              zIndex: 6,
              ...noPtr,
            }}
          />

          {/* ════════════════════════════
              TITLE — OCTOPUS (3 layers for golden emboss)
          ════════════════════════════ */}
          {/* Layer 1 — gold shadow */}
          <p style={{
            ...abs,
            left: 81.26, top: 197.89,
            margin: 0,
            fontFamily: "'Jura', sans-serif",
            fontSize: 50,
            fontWeight: 400,
            lineHeight: 'normal',
            color: '#c59418',
            whiteSpace: 'nowrap',
            zIndex: 5,
          }}>OCTOPUS</p>

          {/* Layer 2 — darker gold */}
          <p style={{
            ...abs,
            left: 83.52, top: 197.89,
            margin: 0,
            fontFamily: "'Jura', sans-serif",
            fontSize: 50,
            fontWeight: 400,
            lineHeight: 'normal',
            color: '#cea40a',
            whiteSpace: 'nowrap',
            zIndex: 6,
          }}>OCTOPUS</p>

          {/* Layer 3 — black top */}
          <p style={{
            ...abs,
            left: 85.38, top: 197.89,
            margin: 0,
            fontFamily: "'Jura', sans-serif",
            fontSize: 50,
            fontWeight: 400,
            lineHeight: 'normal',
            color: '#000000',
            whiteSpace: 'nowrap',
            zIndex: 7,
          }}>OCTOPUS</p>

          {/* ════════════════════════════
              OCTOPUS IMAGE  (parallax target)
          ════════════════════════════ */}
          <div
            ref={octopusRef}
            style={{
              ...abs,
              left: '9.93%',
              right: '9.93%',
              top: 292.9,
              aspectRatio: '295 / 263.87',
              overflow: 'hidden',
              willChange: 'transform',
              zIndex: 4,
              ...noPtr,
            }}
          >
            <img
              src={imgOctopus}
              alt="Octopus"
              style={{
                display: 'block',
                width: '100%',
                height: '106.11%',
                maxWidth: 'none',
                objectFit: 'fill',
              }}
            />
          </div>

          {/* ════════════════════════════
              BOTTOM STATS BAR
          ════════════════════════════ */}
          {/* WANDERER */}
          <p style={{
            ...abs,
            left: 39.9, top: 699.67,
            margin: 0,
            fontFamily: "'Kode Mono', monospace",
            fontSize: 20,
            fontWeight: 500,
            color: '#515151',
            whiteSpace: 'nowrap',
            zIndex: 5,
          }}>WANDERER</p>

          {/* Divider 1 */}
          <div style={{
            ...abs,
            left: 145.11, top: 687.53,
            width: 2, height: 49.416,
            transform: 'rotate(-0.46deg)',
            zIndex: 5,
            ...noPtr,
          }}>
            <svg width="2" height="51.4177" viewBox="0 0 2 51.4177" fill="none" style={{ display: 'block' }}>
              <path d="M1 1V50.4177" stroke="#636363" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>

          {/* 3 HEARTS */}
          <p style={{
            ...abs,
            left: 153.14, top: 699.67,
            margin: 0,
            fontFamily: "'Kode Mono', monospace",
            fontSize: 20,
            fontWeight: 500,
            color: '#515151',
            whiteSpace: 'nowrap',
            zIndex: 5,
          }}>3 HEARTS</p>

          {/* Divider 2 */}
          <div style={{
            ...abs,
            left: 266.36, top: 687.53,
            width: 2, height: 49.416,
            transform: 'rotate(-0.46deg)',
            zIndex: 5,
            ...noPtr,
          }}>
            <svg width="2" height="51.4177" viewBox="0 0 2 51.4177" fill="none" style={{ display: 'block' }}>
              <path d="M1 1V50.4177" stroke="#636363" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>

          {/* MYTHIC */}
          <p style={{
            ...abs,
            left: 282.2, top: 699.67,
            margin: 0,
            fontFamily: "'Kode Mono', monospace",
            fontSize: 20,
            fontWeight: 500,
            color: '#515151',
            whiteSpace: 'nowrap',
            zIndex: 5,
          }}>MYTHIC</p>

          {/* ════════════════════════════
              DYNAMIC LIGHT OVERLAY
          ════════════════════════════ */}
          <div
            ref={lightRef}
            style={{
              ...abs, inset: 0,
              borderRadius: 30,
              mixBlendMode: 'overlay',
              zIndex: 18,
              ...noPtr,
            }}
          />

        </div>
        {/* end card shell */}
      </div>
    </>
  );
}
