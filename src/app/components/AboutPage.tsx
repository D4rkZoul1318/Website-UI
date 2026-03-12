import { useEffect, useRef, useState } from 'react';
import InfiniteMenu from './InfiniteMenu';

const font = 'Outfit, sans-serif';
const nearBlack = '#1A1A1A';
const grey = '#6B6B6B';
const bgColor = '#F9F9F7';
const warmBg = '#F2F0EB';
const cardBg = '#EEEEEA';
const accent = '#4A5240';

const photoItems = [
  { image: '/images/about/eagle.jpg', link: '', title: 'Crested Hawk-Eagle', description: 'Patience is just focus with nowhere to be.' },
  { image: '/images/about/shrike.jpg', link: '', title: 'Long-tailed Shrike', description: 'Small bird, very serious about it.' },
  { image: '/images/about/bee-eater.jpg', link: '', title: 'Green Bee-eater', description: "Nature's color palette > any Figma swatch." },
  { image: '/images/about/leopard.jpg', link: '', title: 'Leopard', description: 'Spent 20 minutes staring before I saw it.' },
  { image: '/images/about/macaques.jpg', link: '', title: 'Macaques', description: 'Three opinions, zero consensus.' },
  { image: '/images/about/peacock.jpg', link: '', title: 'Indian Peacock', description: 'The blue that made me reconsider every UI I had ever built.' },
];

const skills = [
  { category: 'Design', items: ['Figma', 'Photoshop', 'Maya', 'Blender', 'ZBrush', 'Substance Painter'] },
  { category: 'Prototyping', items: ['Figma Make', 'Unreal Engine'] },
  { category: 'AI', items: ['Claude', 'Gemini', 'ChatGPT', 'DALL·E', 'Midjourney'] },
  { category: 'Dev', items: ['Git', 'Vercel', 'Reaper'] },
  { category: 'Methods', items: ['UX Research', 'Wireframing', '3D Iconography', 'PBR Asset Creation'] },
];

const experience = [
  {
    role: '3D Modeler — Intern',
    company: 'UC Riverside, Dept. of Paleontology',
    duration: '6 months',
    bullets: [
      'Created scientifically accurate 3D fossil models in Blender and ZBrush for research and education.',
      'Delivered optimized assets for academic visualizations, enhancing accessibility for wider audiences.',
    ],
  },
  {
    role: '3D Generalist',
    company: 'Academic & Freelance',
    duration: '2021 – Present',
    bullets: [
      'Designed game-ready PBR assets in Unreal Engine for modular environments.',
      'Produced hard-surface assets in Maya/Substance Painter for academic films and short projects.',
      'Created workflows integrating 3D modeling and Photoshop refinement for visual consistency.',
    ],
  },
];

const education = [
  {
    degree: 'Bachelor of Visual Arts (B.Va), Distinction',
    major: 'Major — Animation',
    institution: 'Chitrakala Parishath, Bengaluru',
    year: '2021 – 2025',
  },
  {
    degree: 'Class XII',
    major: '',
    institution: 'Delhi Public School',
    year: '2020 – 2021',
  },
];

type PhotoItem = typeof photoItems[0];

export function AboutPage() {
  const [lightbox, setLightbox] = useState<PhotoItem | null>(null);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const useFadeIn = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
        { threshold: 0.15 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);
    return { ref, visible };
  };

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
          <a
            href="/"
            style={{ fontFamily: font, fontSize: '14px', color: grey, textDecoration: 'none', transition: 'color 200ms ease', position: 'relative', paddingBottom: '4px' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = nearBlack;
              (e.currentTarget.querySelector('.underline') as HTMLElement).style.transform = 'scaleX(1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = grey;
              (e.currentTarget.querySelector('.underline') as HTMLElement).style.transform = 'scaleX(0)';
            }}
          >
            Work
            <span className="underline" style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: '-2px',
              height: '1.5px',
              backgroundColor: '#4A5240',
              transform: 'scaleX(0)',
              transition: 'transform 200ms ease',
              display: 'block',
            }} />
          </a>
          <a
            href="/about"
            style={{ fontFamily: font, fontSize: '14px', color: nearBlack, fontWeight: 600, textDecoration: 'none', position: 'relative', paddingBottom: '4px' }}
          >
            About
            <span style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: '-2px',
              height: '1.5px',
              backgroundColor: '#4A5240',
              transform: 'scaleX(1)',
              transition: 'transform 200ms ease',
              display: 'block',
            }} />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', paddingLeft: '48px', paddingRight: '48px', maxWidth: '960px', margin: '0 auto' }}>
        <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: grey, textTransform: 'uppercase', marginBottom: '24px' }}>About</p>
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 500ms ease, transform 500ms ease',
        }}>
          <h1 style={{ fontFamily: font, fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', color: nearBlack, lineHeight: 1.1, margin: '0 0 32px 0' }}>
            Designer by training.<br />Naturalist by instinct.
          </h1>
        </div>
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 500ms ease, transform 500ms ease, transitionDelay 150ms',
        }}>
          <p style={{ fontFamily: font, fontWeight: 300, fontSize: 'clamp(16px, 2vw, 20px)', color: grey, lineHeight: 1.8, maxWidth: '640px', margin: 0 }}>
            Multidisciplinary creative with 4+ years spanning UI/UX, 3D visual production, brand design, and AI-assisted workflows. My process starts with real problems and ends with interfaces that feel obvious in hindsight. When I'm not in Figma, I'm somewhere quiet with a 600mm lens.
          </p>
        </div>
      </section>

      {/* Experience */}
      {(() => {
        const { ref, visible } = useFadeIn();
        return (
          <section ref={ref} style={{ padding: '80px 48px', maxWidth: '960px', margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 500ms ease, transform 500ms ease' }}>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: grey, textTransform: 'uppercase', marginBottom: '48px' }}>
              Experience
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {experience.map((exp) => (
                <div key={exp.role} style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: '200px', flex: '0 0 200px' }}>
                    <p style={{ fontFamily: font, fontSize: '13px', color: grey, margin: '0 0 4px 0' }}>{exp.duration}</p>
                    <p style={{ fontFamily: font, fontSize: '13px', color: grey, margin: 0 }}>{exp.company}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: font, fontWeight: 600, fontSize: '16px', color: nearBlack, margin: '0 0 16px 0' }}>{exp.role}</p>
                    <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ fontFamily: font, fontWeight: 300, fontSize: '15px', color: grey, lineHeight: 1.7 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Education */}
      {(() => {
        const { ref, visible } = useFadeIn();
        return (
          <section ref={ref} style={{ padding: '64px 48px 80px', maxWidth: '960px', margin: '0 auto', borderTop: '1px solid #E8E6E0', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 500ms ease, transform 500ms ease' }}>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: grey, textTransform: 'uppercase', marginBottom: '48px' }}>
              Education
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {education.map((ed) => (
                <div key={ed.institution} style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: '200px', flex: '0 0 200px' }}>
                    <p style={{ fontFamily: font, fontSize: '13px', color: grey, margin: 0 }}>{ed.year}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: font, fontWeight: 600, fontSize: '16px', color: nearBlack, margin: '0 0 4px 0' }}>{ed.degree}</p>
                    {ed.major && <p style={{ fontFamily: font, fontSize: '14px', color: grey, margin: '0 0 4px 0' }}>{ed.major}</p>}
                    <p style={{ fontFamily: font, fontSize: '14px', color: grey, margin: 0 }}>{ed.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Skills */}
      {(() => {
        const { ref, visible } = useFadeIn();
        return (
          <section ref={ref} style={{ padding: '64px 48px 80px', maxWidth: '960px', margin: '0 auto', borderTop: '1px solid #E8E6E0', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 500ms ease, transform 500ms ease' }}>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: grey, textTransform: 'uppercase', marginBottom: '40px' }}>
              Skills & Tools
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {skills.map(skill => (
                <div key={skill.category} style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                  <span style={{ fontFamily: font, fontSize: '12px', color: grey, textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: '120px', paddingTop: '6px' }}>
                    {skill.category}
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {skill.items.map(item => (
                      <span key={item} style={{ fontFamily: font, fontSize: '13px', color: nearBlack, backgroundColor: cardBg, borderRadius: 999, padding: '6px 16px' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Photography — InfiniteMenu */}
      {(() => {
        const { ref, visible } = useFadeIn();
        return (
          <section ref={ref} style={{ backgroundColor: warmBg, padding: '80px 0', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 500ms ease, transform 500ms ease' }}>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: grey, textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>
              Through the lens
            </p>
            <p style={{ fontFamily: font, fontWeight: 300, fontSize: '15px', color: grey, textAlign: 'center', marginBottom: '40px' }}>
              Drag to explore · Click to open
            </p>
            <div style={{ height: '700px', width: '100%', position: 'relative' }}>
              <InfiniteMenu
                items={photoItems}
                scale={1.2}
                onItemClick={(item: PhotoItem) => setLightbox(item)}
              />
            </div>
          </section>
        );
      })()}

      {/* Contact */}
      {(() => {
        const { ref, visible } = useFadeIn();
        return (
          <section ref={ref} style={{ padding: '64px 48px 80px', textAlign: 'center', borderTop: '1px solid #E8E6E0', backgroundColor: warmBg, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 500ms ease, transform 500ms ease' }}>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: grey, textTransform: 'uppercase', marginBottom: '32px' }}>
              Get in touch
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="mailto:sohum1311@gmail.com"
                style={{ fontFamily: font, fontSize: '15px', color: accent, border: `1px solid ${accent}`, borderRadius: 999, padding: '10px 24px', textDecoration: 'none', display: 'inline-block', transition: 'background 200ms' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = accent; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = accent; }}
              >
                sohum1311@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/sohum-bhatnagar-9b2301276/" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: font, fontSize: '15px', color: accent, border: `1px solid ${accent}`, borderRadius: 999, padding: '10px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'background 200ms' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = accent; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = accent; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
              <a href="https://www.behance.net/sohumbhatnagar" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: font, fontSize: '15px', color: accent, border: `1px solid ${accent}`, borderRadius: 999, padding: '10px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'background 200ms' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = accent; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = accent; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9h5a2 2 0 0 1 0 4H3V9z"/><path d="M3 13h5.5a2.5 2.5 0 0 1 0 5H3v-5z"/><path d="M15 7h6"/><path d="M21 13.5a4 4 0 1 0-1 2.5h-5"/>
                </svg>
                Behance
              </a>
            </div>
          </section>
        );
      })()}

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', inset: 0, zIndex: 999,
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          cursor: 'zoom-out', padding: '40px',
        }}>
          <img src={lightbox.image} alt={lightbox.title} style={{ maxWidth: '90vw', maxHeight: '78vh', objectFit: 'contain', borderRadius: '8px' }} />
          <h3 style={{ fontFamily: font, fontWeight: 600, fontSize: '20px', color: '#FFFFFF', marginTop: '28px', marginBottom: '8px' }}>{lightbox.title}</h3>
          <p style={{ fontFamily: font, fontWeight: 300, fontSize: '15px', color: 'rgba(255,255,255,0.65)' }}>{lightbox.description}</p>
        </div>
      )}
    </div>
  );
}
