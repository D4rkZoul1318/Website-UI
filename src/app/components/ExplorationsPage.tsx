import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import Masonry from './Masonry';
import { ScrollToTop } from './ScrollToTop';
import { PhotoBurst } from './PhotoBurst';

const font = 'Outfit, sans-serif';
const nearBlack = '#1A1A1A';
const grey = '#6B6B6B';
const bgColor = '#F9F9F7';
const accent = '#4A5240';

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

const categories = ['All', '3D', 'Graphic Design', 'Catalogue', 'UI/UX', 'Photography'];

function initialFilter() {
  const requested = new URLSearchParams(window.location.search).get('filter');
  return requested && categories.includes(requested) ? requested : 'All';
}

export function ExplorationsPage() {
  const [active, setActive] = useState(initialFilter);
  const [loaded, setLoaded] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => { document.title = 'Explorations — Sohum Bhatnagar'; }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filtered = active === 'All' ? allItems : allItems.filter(i => i.category === active);

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh', fontFamily: font }}>
      <Navbar />
      <button
        onClick={() => window.history.back()}
        style={{
          position: 'fixed', top: '80px', left: '40px', zIndex: 99,
          fontFamily: font, fontSize: '14px', color: grey,
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          transition: 'color 200ms',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = nearBlack)}
        onMouseLeave={e => (e.currentTarget.style.color = grey)}
      >
        ← Back
      </button>
      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', paddingLeft: '48px', paddingRight: '48px', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{
          fontFamily: font, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: grey, textTransform: 'uppercase', marginBottom: '24px',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 400ms ease, transform 400ms ease',
        }}>
          Explorations
        </p>
        <h1 style={{
          fontFamily: font, fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', color: nearBlack, lineHeight: 1.1, margin: '0 0 24px 0',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 400ms ease 100ms, transform 400ms ease 100ms',
        }}>
          3D, Graphic & Visual Work
        </h1>
        <p style={{
          fontFamily: font, fontWeight: 300, fontSize: 'clamp(16px, 2vw, 20px)', color: grey, lineHeight: 1.8, maxWidth: '560px', margin: '0 0 48px 0',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 400ms ease 200ms, transform 400ms ease 200ms',
        }}>
          Work outside the case studies — 3D renders, illustrations, catalogues, and graphic design.
        </p>

        {/* Filter pills */}
        <div style={{
          display: 'flex', gap: '10px', flexWrap: 'wrap',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 400ms ease 300ms, transform 400ms ease 300ms',
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily: font, fontSize: '13px', fontWeight: active === cat ? 600 : 400,
                color: active === cat ? '#FFFFFF' : nearBlack,
                backgroundColor: active === cat ? accent : '#EEEEEA',
                border: 'none', borderRadius: 999, padding: '11px 20px', cursor: 'pointer',
                transition: 'background 200ms, color 200ms',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section style={{ padding: '0 48px 120px', maxWidth: '1200px', margin: '0 auto' }}>
        <PhotoBurst active={active === 'Photography'}>
          <Masonry
            items={filtered}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.97}
            blurToFocus={true}
            stagger={0.06}
            onItemClick={(item) => item.url ? window.open(item.url, '_blank', 'noopener') : setLightbox(item.img)}
          />
        </PhotoBurst>
      </section>

      <ScrollToTop />

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out',
            animation: 'fadeIn 200ms ease',
          }}
        >
          <img
            src={lightbox}
            alt="Preview"
            style={{
              maxWidth: '90vw', maxHeight: '90vh',
              borderRadius: '12px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
              objectFit: 'contain',
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: '24px', right: '32px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#FFFFFF', fontSize: '28px', lineHeight: 1,
              fontFamily: font, opacity: 0.7, transition: 'opacity 200ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
