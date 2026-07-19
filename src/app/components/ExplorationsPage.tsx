import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Masonry from './Masonry';
import { ScrollToTop } from './ScrollToTop';
import { PhotoBurst } from './PhotoBurst';
import { HolographicCard } from './HolographicCard';
import { Reveal, staggerDelay } from './camera/Reveal';
import { ROUTES } from '../routes';

function CardUnit() {
  const [powered, setPowered] = useState(false);
  return (
    <Reveal variant="scale" className="card-unit">
      <div className="card-unit__stage">
        {powered ? (
          <HolographicCard />
        ) : (
          <button
            className="live-unit__cover"
            type="button"
            aria-label="Power on the Octopus holographic card"
            // The stage is taller than most viewports, so this button (which
            // fills it via inset:0) is often taller than the viewport too.
            // Focusing an element larger than the viewport on click makes
            // Chromium's native "scroll focused element into view" snap the
            // ScrollSmoother wrapper's scrollTop back to 0 before mouseup
            // fires, moving the button out from under the cursor mid-click
            // and swallowing the click. Blocking the mousedown-triggered
            // focus (without blocking the click itself) avoids that jump.
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setPowered(true)}
          >
            <span className="power-ring" aria-hidden="true">⏻</span>
            <span className="live-unit__label">Power On — Try the Holographic Card</span>
            <span className="live-unit__sub">Move your cursor over it once it's on</span>
          </button>
        )}
      </div>
      <div className="live-unit__bar">
        <span>Octopus Holographic Card · Interactive Component</span>
      </div>
    </Reveal>
  );
}

function useScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return pct;
}

const allItems = [
  {
    id: 1,
    img: 'https://cdna.artstation.com/p/assets/images/images/088/801/282/large/sohum-group-8.jpg?1749204965',
    url: 'https://www.artstation.com/artwork/6L2NGw',
    title: 'Lamborghini Huracán',
    category: '3D',
    height: 600,
  },
  {
    id: 2,
    img: 'https://cdna.artstation.com/p/assets/images/images/089/857/486/large/sohum-knife-scene-ps-copy.jpg?1752143066',
    url: 'https://www.artstation.com/artwork/mAYEBd',
    title: 'Huntsman Knife',
    category: '3D',
    height: 500,
  },
  {
    id: 3,
    img: 'https://cdna.artstation.com/p/assets/images/images/090/415/182/large/sohum-newlevelsequence-0000.jpg?1753859721',
    url: 'https://www.artstation.com/artwork/dyV6QA',
    title: 'Ancient Temple Ruins',
    category: '3D',
    height: 550,
  },
  {
    id: 4,
    img: '/images/explorations/catalogue-01.webp',
    url: '',
    title: 'JAS Water Purifiers',
    category: 'Catalogue',
    height: 380,
  },
  {
    id: 5,
    img: '/images/explorations/graphic-01.webp',
    url: '',
    title: 'BMW Illustration',
    category: 'Graphic Design',
    height: 600,
  },
  {
    id: 6,
    img: '/images/explorations/graphic-02.webp',
    url: '',
    title: 'Polar Bear Low Poly',
    category: 'Graphic Design',
    height: 520,
  },
  {
    id: 7,
    img: '/images/explorations/graphic-03.webp',
    url: '',
    title: '3D Portfolio Banner',
    category: 'Graphic Design',
    height: 700,
  },
  {
    id: 8,
    img: '/images/explorations/rewind-01.webp',
    url: 'https://rewind-it.vercel.app',
    title: 'Rewind',
    category: 'UI/UX',
    height: 550,
  },
  {
    id: 9,
    img: '/images/about/eagle.webp',
    url: '',
    title: 'Crested Hawk-Eagle',
    caption: 'Patience is just focus with nowhere to be.',
    category: 'Photography',
    height: 380,
  },
  {
    id: 10,
    img: '/images/about/leopard.webp',
    url: '',
    title: 'Leopard',
    caption: 'Spent 20 minutes staring before I saw it.',
    category: 'Photography',
    height: 440,
  },
  {
    id: 11,
    img: '/images/about/peacock.webp',
    url: '',
    title: 'Indian Peacock',
    caption: 'The blue that made me reconsider every UI I had ever built.',
    category: 'Photography',
    height: 430,
  },
  {
    id: 12,
    img: '/images/about/bee-eater.webp',
    url: '',
    title: 'Green Bee-eater',
    caption: "Nature's color palette beats any Figma swatch.",
    category: 'Photography',
    height: 380,
  },
  {
    id: 13,
    img: '/images/about-photos/macaques.webp',
    url: '',
    title: 'Macaques on the Riverbank',
    caption: '',
    category: 'Photography',
    height: 340,
  },
];

const categories = ['All', '3D', 'Graphic Design', 'Catalogue', 'UI/UX', 'Photography', 'Play'];

function initialFilter() {
  const requested = new URLSearchParams(window.location.search).get('filter');
  return requested && categories.includes(requested) ? requested : 'All';
}

export function ExplorationsPage() {
  const [active, setActive] = useState(initialFilter);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const scrollPct = useScrollProgress();

  useEffect(() => { document.title = 'Explorations — Sohum Bhatnagar'; }, []);

  const filtered = active === 'All' ? allItems : allItems.filter(i => i.category === active);

  return (
    <div className="camera-theme">
      {createPortal(
        <>
          <header className="topbar">
            <span className="mark">EXPLORATIONS</span>
            <a className="focus-cue" href={ROUTES.home}>
              <span className="arrow" aria-hidden="true">←</span><span>Back to Home</span>
            </a>
          </header>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${scrollPct}%` }} /></div>
        </>,
        document.getElementById('fixed-ui-root')!
      )}

      <main>
        {/* Hero */}
        <section className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>00</b> — EXPLORATIONS</Reveal>
            <Reveal as="h1" style={{ maxWidth: '18ch' }}>3D, Graphic &amp; Visual Work</Reveal>
            <Reveal as="p" className="lede">
              Work outside the case studies — 3D renders, illustrations, catalogues, graphic design, and photography.
            </Reveal>

            <Reveal className="explore-filters">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`explore-pill${active === cat ? ' active' : ''}`}
                  style={{ transitionDelay: `${staggerDelay(i)}ms` }}
                >
                  {cat}
                </button>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Grid / Play canvas */}
        <section className="section">
          <div className="wrap-wide">
            {active === 'UI/UX' && <CardUnit />}
            <PhotoBurst active={active === 'Photography' || active === 'Play'}>
              {active === 'Play' ? (
                <div className="explore-play-canvas">
                  <p>Click and drag anywhere in this space.</p>
                </div>
              ) : (
                <Masonry
                  items={filtered}
                  animateFrom="bottom"
                  scaleOnHover={true}
                  hoverScale={0.97}
                  blurToFocus={true}
                  stagger={0.06}
                  onItemClick={(item) => item.url ? window.open(item.url, '_blank', 'noopener') : setLightbox(item.img)}
                />
              )}
            </PhotoBurst>
          </div>
        </section>
      </main>

      <ScrollToTop />

      {/* Lightbox — portaled to #fixed-ui-root like the topbar/progress-track,
          since anything inside #root is trapped in ScrollSmoother's
          transformed #smooth-content stacking context: no z-index value set
          in here can ever render above elements portaled out of it. */}
      {lightbox && createPortal(
        <div
          onClick={() => setLightbox(null)}
          className="explore-lightbox"
        >
          <img
            src={lightbox}
            alt="Preview"
            onClick={e => e.stopPropagation()}
          />
          <button onClick={() => setLightbox(null)} aria-label="Close preview">✕</button>
        </div>,
        document.getElementById('fixed-ui-root')!
      )}
    </div>
  );
}
