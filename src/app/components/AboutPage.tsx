import { useState } from 'react';
import InfiniteMenu from './InfiniteMenu';

const font = 'Outfit, sans-serif';
const nearBlack = '#1A1A1A';
const grey = '#6B6B6B';
const bgColor = '#F9F9F7';
const warmBg = '#F2F0EB';
const cardBg = '#EEEEEA';

const photoItems = [
  { image: '/images/about/eagle.jpg', link: '', title: 'Crested Hawk-Eagle', description: 'Patience is just focus with nowhere to be.' },
  { image: '/images/about/shrike.jpg', link: '', title: 'Long-tailed Shrike', description: 'Small bird, very serious about it.' },
  { image: '/images/about/bee-eater.jpg', link: '', title: 'Green Bee-eater', description: "Nature's color palette > any Figma swatch." },
  { image: '/images/about/leopard.jpg', link: '', title: 'Leopard', description: 'Spent 20 minutes staring before I saw it.' },
  { image: '/images/about/macaques.jpg', link: '', title: 'Macaques', description: 'Three opinions, zero consensus.' },
  { image: '/images/about/peacock.jpg', link: '', title: 'Indian Peacock', description: 'The blue that made me reconsider every UI I had ever built.' },
];

const skills = [
  { category: 'Design', items: ['Figma', 'Photoshop', 'Maya'] },
  { category: 'Prototyping', items: ['Figma Make'] },
  { category: 'AI', items: ['Claude', 'Gemini', 'ChatGPT'] },
  { category: 'Dev', items: ['Git', 'Vercel'] },
  { category: 'Methods', items: ['UX Research', 'Wireframing', '3D Iconography'] },
];

type PhotoItem = typeof photoItems[0];

export function AboutPage() {
  const [lightbox, setLightbox] = useState<PhotoItem | null>(null);

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh', fontFamily: font }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: bgColor, borderBottom: '1px solid #E8E6E0',
      }}>
        <a href="/" style={{ fontFamily: font, fontWeight: 600, fontSize: '16px', color: nearBlack, textDecoration: 'none' }}>
          Sohum Bhatnagar
        </a>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="/" style={{ fontFamily: font, fontSize: '14px', color: grey, textDecoration: 'none' }}>Work</a>
          <a href="/about" style={{ fontFamily: font, fontSize: '14px', color: nearBlack, fontWeight: 600, textDecoration: 'none' }}>About</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', paddingLeft: '48px', paddingRight: '48px', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', color: grey, textTransform: 'uppercase', marginBottom: '24px' }}>About</p>
        <h1 style={{ fontFamily: font, fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', color: nearBlack, lineHeight: 1.1, margin: '0 0 32px 0' }}>
          Designer by training.<br />Naturalist by instinct.
        </h1>
        <p style={{ fontFamily: font, fontWeight: 300, fontSize: 'clamp(16px, 2vw, 20px)', color: grey, lineHeight: 1.8, maxWidth: '600px', margin: 0 }}>
          I'm Sohum — a UI/UX designer based in Bangalore. My process starts with real problems and ends with interfaces that feel obvious in hindsight. When I'm not in Figma, I'm usually somewhere quiet with a 600mm lens waiting for the right moment.
        </p>
      </section>

      {/* Photography */}
      <section style={{ backgroundColor: warmBg, padding: '80px 48px' }}>
        <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', color: grey, textTransform: 'uppercase', marginBottom: '16px', textAlign: 'center' }}>Through the lens</p>
        <p style={{ fontFamily: font, fontWeight: 300, fontSize: '16px', color: grey, textAlign: 'center', marginBottom: '48px' }}>Drag to explore · Click to open</p>
        <div style={{ height: '600px', position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          <InfiniteMenu
            items={photoItems}
            scale={1.1}
            onItemClick={(item: PhotoItem) => setLightbox(item)}
          />
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: '80px 48px', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', color: grey, textTransform: 'uppercase', marginBottom: '40px' }}>Skills & Tools</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {skills.map(skill => (
            <div key={skill.category} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{ fontFamily: font, fontSize: '12px', color: grey, textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: '110px' }}>{skill.category}</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {skill.items.map(item => (
                  <span key={item} style={{ fontFamily: font, fontSize: '13px', color: nearBlack, backgroundColor: cardBg, borderRadius: 999, padding: '6px 16px' }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: '80px 48px', textAlign: 'center', borderTop: '1px solid #E8E6E0' }}>
        <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', color: grey, textTransform: 'uppercase', marginBottom: '24px' }}>Get in touch</p>
        <a href="mailto:sohum1311@gmail.com" style={{ fontFamily: font, fontSize: '16px', color: '#4A5240', border: '1px solid #4A5240', borderRadius: 999, padding: '10px 24px', textDecoration: 'none', display: 'inline-block' }}>
          sohum1311@gmail.com
        </a>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', inset: 0, zIndex: 999,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          cursor: 'zoom-out', padding: '40px',
        }}>
          <img src={lightbox.image} alt={lightbox.title} style={{ maxWidth: '90vw', maxHeight: '75vh', objectFit: 'contain', borderRadius: '8px' }} />
          <h3 style={{ fontFamily: font, fontWeight: 600, fontSize: '20px', color: '#FFFFFF', marginTop: '24px', marginBottom: '8px' }}>{lightbox.title}</h3>
          <p style={{ fontFamily: font, fontWeight: 300, fontSize: '15px', color: 'rgba(255,255,255,0.7)' }}>{lightbox.description}</p>
        </div>
      )}
    </div>
  );
}
