import { LineMask } from './LineMask';

const HERO_PHOTOS = [
  { src: '/images/about-photos/rocks.webp', alt: 'Sohum relaxing by a rocky stream' },
  { src: '/images/about-photos/cafe.webp', alt: 'Sohum at a café' },
  { src: '/images/about-photos/camera.webp', alt: 'Sohum shooting with a telephoto lens' },
  { src: '/images/about-photos/macaques.webp', alt: 'Macaques photographed on a riverside rock' },
];

function HeroPhotos() {
  return (
    <div className="vf-hero-photo-grid">
      {HERO_PHOTOS.map((photo) => (
        <div className="vf-hero-photo" key={photo.src}>
          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
        </div>
      ))}
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
            <LineMask delay={80}>Sohum&rsquo;s</LineMask>
            <LineMask delay={180}>Portfolio</LineMask>
          </h1>
          <p className="vf-hero-tagline">
            <LineMask delay={320}><span className="vf-italic">Designer by training. Naturalist by instinct.</span></LineMask>
          </p>
        </div>

        <div className="vf-hero-col-side">
          <HeroPhotos />
          <div>
            <p className="vf-frame-count">Frame &middot; 001 / 128</p>
            <p className="vf-hero-side-copy" style={{ marginTop: 12 }}>
              Multidisciplinary creative with 4+ years spanning UI/UX, 3D visual production, brand design, and AI-assisted workflows. My process starts with real problems and ends with interfaces that feel obvious in hindsight. When I&rsquo;m not in Figma, I&rsquo;m somewhere quiet with a 600mm lens.
            </p>
          </div>
        </div>
      </div>

      <div className="vf-hero-foot">
        <div className="vf-hero-foot-copy">
          <div className="vf-hero-foot-rule" />
          <p className="vf-hero-foot-text">
            I studied Animation at Chitrakala Parishath in Bengaluru before moving into product design, so I still think in composition, narrative and visual weight before I think in components.
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
