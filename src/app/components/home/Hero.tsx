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

      <div className="vf-hero-title-wrap">
        <h1 className="vf-hero-headline">
          <LineMask delay={80}>Sohum&rsquo;s</LineMask>
          <LineMask delay={180}>Portfolio</LineMask>
        </h1>
        <p className="vf-hero-tagline">
          <LineMask delay={320}><span className="vf-italic">Designer by training. Naturalist by instinct.</span></LineMask>
        </p>
      </div>

      <div className="vf-hero-grid">
        <div className="vf-hero-col-main">
          <p className="vf-frame-count">About</p>
          <p className="vf-hero-side-copy" style={{ marginTop: 12 }}>
            I think about products as systems in motion. Hierarchy, timing and behaviour matter more than static screens. My work lives at the intersection of product and interaction design: less concerned with how something looks the moment it&rsquo;s still, more with how it behaves the moment someone touches it.
          </p>
          <p className="vf-hero-side-copy" style={{ marginTop: 16 }}>
            That instinct comes from two unlikely places: years of animation, where timing and composition come before any tool, and wildlife photography, where you learn to watch quietly before you act. Both still shape how I design: observe first, move with intention second.
          </p>
          <div className="vf-hero-foot-ctas">
            <a href="#work" className="vf-btn-solid" data-testid="hero-cta-work">
              <span>Focus / Selected Work</span>
              <span className="arrow">→</span>
            </a>
            <a href="#contact" className="vf-link-underline" data-testid="hero-cta-contact">Or, get in touch</a>
          </div>
        </div>

        <div className="vf-hero-col-side">
          <HeroPhotos />
        </div>
      </div>

      <div className="vf-hero-scroll">
        <span className="vf-hero-scroll-rule" />
        Scroll &middot; Shutter open
      </div>
    </section>
  );
}
