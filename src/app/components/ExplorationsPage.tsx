import { useState, useEffect } from 'react';
import Masonry from './Masonry';
import { ScrollToTop } from './ScrollToTop';

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
    img: '/images/explorations/catalogue-01.png',
    url: '',
    title: 'JAS Water Purifiers',
    category: 'Catalogue',
    height: 380,
  },
  {
    id: 5,
    img: '/images/explorations/graphic-01.png',
    url: '',
    title: 'BMW Illustration',
    category: 'Graphic Design',
    height: 600,
  },
  {
    id: 6,
    img: '/images/explorations/graphic-02.png',
    url: '',
    title: 'Polar Bear Low Poly',
    category: 'Graphic Design',
    height: 520,
  },
  {
    id: 7,
    img: '/images/explorations/graphic-03.png',
    url: '',
    title: '3D Portfolio Banner',
    category: 'Graphic Design',
    height: 700,
  },
];

const categories = ['All', '3D', 'Graphic Design', 'Catalogue'];

export function ExplorationsPage() {
  const [active, setActive] = useState('All');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filtered = active === 'All' ? allItems : allItems.filter(i => i.category === active);

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh', fontFamily: font }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(249, 249, 247, 0.85)', borderBottom: '1px solid #E5E5E3',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ fontFamily: font, fontWeight: 500, fontSize: '20px', color: nearBlack, textDecoration: 'none' }}>SB</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <a href="/"
              style={{ fontFamily: font, fontSize: '16px', color: grey, textDecoration: 'none', position: 'relative', paddingBottom: '4px', transition: 'color 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = nearBlack; (e.currentTarget.querySelector('span') as HTMLElement).style.transform = 'scaleX(1)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = grey; (e.currentTarget.querySelector('span') as HTMLElement).style.transform = 'scaleX(0)'; }}>
              Home
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: '-2px', height: '1.5px', backgroundColor: accent, transform: 'scaleX(0)', transition: 'transform 200ms ease', display: 'block' }} />
            </a>
            <a href="/about"
              style={{ fontFamily: font, fontSize: '16px', color: grey, textDecoration: 'none', position: 'relative', paddingBottom: '4px', transition: 'color 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = nearBlack; (e.currentTarget.querySelector('span') as HTMLElement).style.transform = 'scaleX(1)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = grey; (e.currentTarget.querySelector('span') as HTMLElement).style.transform = 'scaleX(0)'; }}>
              About
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: '-2px', height: '1.5px', backgroundColor: accent, transform: 'scaleX(0)', transition: 'transform 200ms ease', display: 'block' }} />
            </a>
            <a href="/explorations"
              style={{ fontFamily: font, fontSize: '16px', color: nearBlack, fontWeight: 400, textDecoration: 'none', position: 'relative', paddingBottom: '4px' }}>
              Explorations
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: '-2px', height: '1.5px', backgroundColor: accent, transform: 'scaleX(1)', transition: 'transform 200ms ease', display: 'block' }} />
            </a>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginLeft: '8px', borderLeft: '1px solid #E5E5E3', paddingLeft: '16px' }}>
              <a href="https://www.linkedin.com/in/sohum-bhatnagar-9b2301276/" target="_blank" rel="noopener noreferrer"
                style={{ color: grey, transition: 'color 200ms', display: 'flex', alignItems: 'center' }}
                onMouseEnter={e => (e.currentTarget.style.color = nearBlack)} onMouseLeave={e => (e.currentTarget.style.color = grey)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://www.behance.net/sohumbhatnagar" target="_blank" rel="noopener noreferrer"
                style={{ color: grey, transition: 'color 200ms', display: 'flex', alignItems: 'center' }}
                onMouseEnter={e => (e.currentTarget.style.color = nearBlack)} onMouseLeave={e => (e.currentTarget.style.color = grey)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9h5a2 2 0 0 1 0 4H3V9z"/><path d="M3 13h5.5a2.5 2.5 0 0 1 0 5H3v-5z"/><path d="M15 7h6"/><path d="M21 13.5a4 4 0 1 0-1 2.5h-5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
{/* Back button */}
      <div style={{ position: 'fixed', top: '80px', left: '40px', zIndex: 99 }}>
        <button
          onClick={() => window.history.back()}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: font, fontSize: '14px', color: grey,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            transition: 'color 200ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = nearBlack)}
          onMouseLeave={e => (e.currentTarget.style.color = grey)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
      </div>
      {/* Back button */}
      <div style={{ position: 'fixed', top: '80px', left: '40px', zIndex: 99 }}>
        <button
          onClick={() => window.history.back()}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: font, fontSize: '14px', color: grey,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            transition: 'color 200ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = nearBlack)}
          onMouseLeave={e => (e.currentTarget.style.color = grey)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
      </div>
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
                border: 'none', borderRadius: 999, padding: '8px 20px', cursor: 'pointer',
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
        <Masonry
          items={filtered}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.97}
          blurToFocus={true}
          stagger={0.06}
        />
      </section>

      <ScrollToTop />
    </div>
  );
}
