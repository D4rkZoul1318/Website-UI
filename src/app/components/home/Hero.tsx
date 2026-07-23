import { LineMask } from './LineMask';

function ApertureDial() {
  const sectors = [0, 60, 120, 180, 240, 300];
  return (
    <div className="vf-dial-wrap">
      <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
        <circle cx="120" cy="120" r="118" stroke="var(--ink)" strokeWidth="1" />
        <circle cx="120" cy="120" r="102" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 4" opacity="0.55" />
        <g className="aperture-spin" style={{ transformOrigin: '120px 120px' }}>
          {sectors.map((deg, i) => (
            <path
              key={deg}
              d="M120 120 L120 22 A98 98 0 0 1 204.85 71 Z"
              fill="var(--ink)"
              opacity={0.06 + i * 0.015}
              transform={`rotate(${deg} 120 120)`}
            />
          ))}
          {sectors.map((deg) => (
            <line key={deg} x1="120" y1="120" x2="120" y2="22" stroke="var(--ink)" strokeWidth="1" opacity="0.35" transform={`rotate(${deg} 120 120)`} />
          ))}
        </g>
        <circle cx="120" cy="120" r="6" fill="var(--ink)" />
      </svg>
      <div className="vf-dial-label">
        <span>F 2.8</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="vf-hero" data-testid="hero-section">
      <div className="vf-hero-ghost" aria-hidden="true">00</div>

      <div className="vf-wrap">
        <div className="vf-hero-meta-row">
          <div className="vf-hero-meta-left">
            <span className="vf-meta-text">00 &nbsp;/&nbsp; HOME &nbsp;&middot;&nbsp; VIEWFINDER</span>
            <span className="vf-meta-rule" />
            <span className="vf-meta-text">F/2.8 &middot; 1/250 &middot; ISO 200</span>
          </div>
          <div className="vf-hero-meta-right">
            <span className="vf-blink" style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--terracotta)', borderRadius: '50%' }} />
            <span className="vf-meta-text">REC &middot; Portfolio 2025</span>
          </div>
        </div>
      </div>

      <div className="vf-hero-grid">
        <div className="vf-hero-col-main">
          <h1 className="vf-hero-headline">
            <LineMask delay={80}>Sohum</LineMask>
            <LineMask delay={180}>Bhatnagar</LineMask>
            <LineMask delay={280}><span className="vf-italic">is looking.</span></LineMask>
          </h1>
        </div>

        <div className="vf-hero-col-side">
          <ApertureDial />
          <div>
            <p className="vf-frame-count">Frame &middot; 001 / 128</p>
            <p className="vf-hero-side-copy" style={{ marginTop: 12 }}>
              Designer, photographer, and storyteller interested in how people interact with systems.
            </p>
          </div>
        </div>
      </div>

      <div className="vf-hero-foot">
        <div className="vf-hero-foot-copy">
          <div className="vf-hero-foot-rule" />
          <p className="vf-hero-foot-text">
            Multidisciplinary work spanning UI/UX, 3D visual production, brand design, and AI-assisted workflows — I design complex digital products end-to-end, from the first sketch to the shipped system.
          </p>
        </div>
        <div className="vf-hero-foot-ctas">
          <a href="#work" className="vf-btn-solid" data-testid="hero-cta-work">
            <span>Focus / Selected Work</span>
            <span className="arrow">→</span>
          </a>
          <a href="#contact" className="vf-link-underline" data-testid="hero-cta-contact">Or, get in touch</a>
        </div>
      </div>

      <div className="vf-hero-scroll">
        <span className="vf-hero-scroll-rule" />
        Scroll &middot; Shutter open
      </div>
    </section>
  );
}
