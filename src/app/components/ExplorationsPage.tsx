import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Masonry from './Masonry';
import { ScrollToTop } from './ScrollToTop';
import { PhotoBurst } from './PhotoBurst';
import { HolographicCard } from './HolographicCard';
import { Reveal } from './camera/Reveal';
import { Nav } from './home/Nav';
import { PillNav } from './home/PillNav';
import { Footer } from './home/Footer';

type LiveKind = 'rewind' | 'octopus';

/** Scales a fixed-size child (HolographicCard renders at a hardcoded
 * 393x852, matching its Figma source) down to fit inside whatever box this
 * wraps, so it fits the frame instead of overflowing it. Measures the
 * frame with ResizeObserver and applies a CSS scale transform — every
 * child inside HolographicCard is already positioned relative to its own
 * card element, so scaling it as a unit doesn't disturb that layout. */
function FitToFrame({ width, height, children }: { width: number; height: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width: cw, height: ch } = entry.contentRect;
      if (cw && ch) setScale(Math.min(cw / width, ch / height, 1));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width, height, transform: `scale(${scale})` }}>{children}</div>
    </div>
  );
}

/** The live/interactive build for a UI-UX thumbnail, revealed as a centered
 * overlay (blurred backdrop over the grid) once its thumbnail is clicked —
 * portaled to #fixed-ui-root like the lightbox below, for the same reason:
 * anything inside #root is trapped in ScrollSmoother's transformed
 * #smooth-content stacking context, so it would render at its position in
 * the page flow (below the grid) rather than fixed over the viewport. */
function LiveProjectPanel({ kind, onClose }: { kind: LiveKind; onClose: () => void }) {
  const label = kind === 'rewind' ? 'Rewind · Live Prototype' : 'Octopus Holographic Card · Interactive Component';
  return createPortal(
    <div className="explore-live-overlay" onClick={onClose}>
      <Reveal variant="scale" className="live-tile" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className={`live-tile__stage live-tile__stage--${kind === 'rewind' ? 'wide' : 'card'}`}>
          {kind === 'rewind' ? (
            <iframe
              src="https://rewind-it.vercel.app"
              title="Rewind: live prototype"
              loading="eager"
              allow="autoplay"
              className="live-tile__iframe"
            />
          ) : (
            <FitToFrame width={393} height={852}>
              <HolographicCard />
            </FitToFrame>
          )}
        </div>
        <div className="live-unit__bar">
          <span>{label}</span>
          <button onClick={onClose} type="button" aria-label="Close live preview">✕ Close</button>
        </div>
      </Reveal>
    </div>,
    document.getElementById('fixed-ui-root')!
  );
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
    url: '',
    title: 'Rewind',
    caption: 'Click to launch the live prototype.',
    category: 'UI/UX',
    height: 550,
    live: 'rewind' as const,
  },
  {
    id: 14,
    img: '/images/explorations/octopus-card/thumbnail.webp',
    url: '',
    title: 'Octopus Holographic Card',
    caption: 'Click to power on the interactive card.',
    category: 'UI/UX',
    height: 550,
    live: 'octopus' as const,
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
  const [activeLive, setActiveLive] = useState<LiveKind | null>(null);

  useEffect(() => { document.title = 'Explorations , Sohum Bhatnagar'; }, []);

  const filtered = active === 'All' ? allItems : allItems.filter(i => i.category === active);

  return (
    <div className="camera-theme">
      <Nav />

      <main>
        {/* Hero */}
        <section className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>00</b>: EXPLORATIONS</Reveal>
            <Reveal as="h1" style={{ maxWidth: '18ch' }}>3D, Graphic &amp; Visual Work</Reveal>
            <Reveal as="p" className="lede">
              Work outside the case studies: 3D renders, illustrations, catalogues, graphic design, and photography.
            </Reveal>

            <Reveal className="explore-filters">
              <PillNav
                items={categories.map((cat) => ({ label: cat, onClick: () => setActive(cat) }))}
                activeHref={active}
                className="vf-pillnav--tabs"
                baseColor="var(--ink)"
                pillTextColor="var(--paper)"
                hoveredPillTextColor="var(--terracotta)"
                theme="light"
                alwaysShowList
              />
            </Reveal>
          </div>
        </section>

        {/* Grid / Play canvas */}
        <section className="section">
          <div className="wrap-wide">
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
                  onItemClick={(item) => {
                    if (item.live) setActiveLive(item.live);
                    else if (item.url) window.open(item.url, '_blank', 'noopener');
                    else setLightbox(item.img);
                  }}
                />
              )}
            </PhotoBurst>
            {activeLive && (
              <LiveProjectPanel kind={activeLive} onClose={() => setActiveLive(null)} />
            )}
          </div>
        </section>
      </main>

      <Footer showEmailCta={false} showBehance={false} />

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
