import { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';

const font = 'Outfit, sans-serif';
const nearBlack = '#1A1A1A';
const grey = '#6B6B6B';
const bgColor = '#F9F9F7';
const cardBg = '#EEEEEA';
const warmBg = '#F2F0EB';
const radius = 12;

function FadeUp({ children, stagger = 0 }: { children: React.ReactNode; stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
        },
        { threshold: 0.1 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, stagger * 100);
    return () => clearTimeout(timer);
  }, [stagger]);
  return (
    <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <span style={{ fontSize: 12, color: grey, letterSpacing: 3, textTransform: 'uppercase' as const, fontFamily: font, fontWeight: 400 }}>{children}</span>;
}

function SectionHeading({ children }: { children: string }) {
  return <h2 style={{ fontSize: 48, fontWeight: 700, color: nearBlack, fontFamily: font, lineHeight: 1.15, margin: 0 }}>{children}</h2>;
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ backgroundColor: cardBg, borderRadius: radius, padding: '32px 28px', fontFamily: font }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: nearBlack, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 14, color: grey, marginTop: 8, fontWeight: 400 }}>{label}</div>
    </div>
  );
}

function BehanceIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9h5a2 2 0 0 1 0 4H3V9z" /><path d="M3 13h5.5a2.5 2.5 0 0 1 0 5H3v-5z" />
      <path d="M15 7h6" /><path d="M21 13.5a4 4 0 1 0-1 2.5h-5" />
    </svg>
  );
}

function SectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <FadeUp>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block', borderRadius: radius }} />
    </FadeUp>
  );
}

export default function BobRides() {
  useEffect(() => { document.title = 'BOB Rides — Sohum Bhatnagar'; }, []);
  return (
    <div style={{ backgroundColor: bgColor, fontFamily: font, minHeight: '100vh' }}>

      {/* Navbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(249,249,247,0.8)', zIndex: 1000, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: font }}>
        <a onClick={() => (window.location.href = '/')} style={{ fontSize: 24, fontWeight: 700, color: nearBlack, textDecoration: 'none', cursor: 'pointer' }}>SB</a>
        <div style={{ display: 'flex', gap: 24 }}>
          {[['Home', '/#home'], ['About', '/#about'], ['Projects', '/#projects'], ['Chill', '/#chill']].map(([label, href]) => (
            <a key={label} href={href} onClick={(e) => { e.preventDefault(); window.location.href = href; }} style={{ fontFamily: font, fontSize: '14px', color: nearBlack, textDecoration: 'none', cursor: 'pointer' }}>{label}</a>
          ))}
        </div>
      </div>

      <a href="/" style={{ fontFamily: font, fontSize: '14px', color: grey, textDecoration: 'none', display: 'inline-block', padding: '24px 80px 0' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = nearBlack)}
        onMouseLeave={(e) => (e.currentTarget.style.color = grey)}>
        ← Back to Portfolio
      </a>

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 32px 80px' }}>
        <FadeUp stagger={0}><SectionLabel>Icon Design & UI/UX · 2025</SectionLabel></FadeUp>
        <FadeUp stagger={1}><h1 style={{ fontSize: 64, fontWeight: 700, color: nearBlack, fontFamily: font, lineHeight: 1.1, margin: '20px 0 0' }}>BOB Rides</h1></FadeUp>
        <FadeUp stagger={2}><p style={{ fontSize: 24, fontWeight: 300, color: grey, fontFamily: font, maxWidth: 700, lineHeight: 1.5, margin: '24px 0 0' }}>Designing a 3D vehicle icon system and dark-mode UI for a taxi aggregator that consolidates Uber, Ola, and Rapido into one app.</p></FadeUp>
        <div style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap' }}>
          {['3D icon system', 'Dark-mode native', 'Multi-app aggregator'].map((pill, i) => (
            <FadeUp key={pill} stagger={3 + i}>
              <span style={{ display: 'inline-block', padding: '10px 24px', border: '1px solid #B0B0B0', borderRadius: 999, fontSize: 14, color: grey, fontFamily: font, fontWeight: 400 }}>{pill}</span>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Hero image */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <SectionImage src="/images/bob/hero.png" alt="BOB Rides Hero" />
      </section>

      {/* Problem */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp><SectionLabel>Problem</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>The Challenge</SectionHeading></FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start', marginTop: 48 }}>
          <FadeUp><p style={{ fontSize: 18, color: grey, fontFamily: font, lineHeight: 1.7, fontWeight: 400, margin: 0 }}>Ride-hailing apps in India — Uber, Rapido, Ola, Namma Yatri — all use flat, generic vehicle silhouettes that offer zero brand differentiation. Users switch between 3 apps to compare prices, adding friction to every ride decision. BOB Rides needed a visual identity strong enough to stand apart, while keeping icons legible at 24px in a dark-mode-native interface.</p></FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[{ value: '3+', label: 'Apps users open before booking a ride' }, { value: '0', label: 'Indian ride apps with 3D icon systems' }, { value: '24px', label: 'Minimum icon size for tab navigation' }].map((stat, i) => (
              <FadeUp key={stat.label} stagger={i}><StatCard value={stat.value} label={stat.label} /></FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <SectionImage src="/images/bob/problem-statement.png" alt="Problem Statement" />
      </section>

      {/* Our Process */}
      <section style={{ backgroundColor: warmBg, padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeUp><SectionLabel>Process</SectionLabel></FadeUp>
          <FadeUp stagger={1}><SectionHeading>How We Got There</SectionHeading></FadeUp>
          <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/our-process.png" alt="Our Process" /></div>
        </div>
      </section>

      {/* Objectives */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp><SectionLabel>Strategy</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>Objectives & Goals</SectionHeading></FadeUp>
        <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/objectives-goals.png" alt="Objectives and Goals" /></div>
      </section>

      {/* Business Challenges */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <FadeUp><SectionLabel>Research</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>Business Challenges</SectionHeading></FadeUp>
        <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/business-challenges.png" alt="Business Challenges" /></div>
      </section>

      {/* Competitor Analysis */}
      <section style={{ backgroundColor: warmBg, padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeUp><SectionLabel>Research</SectionLabel></FadeUp>
          <FadeUp stagger={1}><SectionHeading>Competitor Analysis</SectionHeading></FadeUp>
          <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/competitor-analysis.png" alt="Competitor Analysis" /></div>
        </div>
      </section>

      {/* Product Users */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp><SectionLabel>Research</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>Product Users</SectionHeading></FadeUp>
        <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/product-users.png" alt="Product Users" /></div>
      </section>

      {/* User Persona */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <FadeUp><SectionLabel>Research</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>User Persona</SectionHeading></FadeUp>
        <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/user-persona.png" alt="User Persona" /></div>
      </section>

      {/* User Needs */}
      <section style={{ backgroundColor: warmBg, padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeUp><SectionLabel>Research</SectionLabel></FadeUp>
          <FadeUp stagger={1}><SectionHeading>User Needs</SectionHeading></FadeUp>
          <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/user-needs.png" alt="User Needs" /></div>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp><SectionLabel>Design</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>Features & Functionalities</SectionHeading></FadeUp>
        <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/features-functionalities.png" alt="Features and Functionalities" /></div>
      </section>

      {/* Product User Challenges */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <FadeUp><SectionLabel>Design</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>Product User Challenges</SectionHeading></FadeUp>
        <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/product-user-challenges.png" alt="Product User Challenges" /></div>
      </section>

      {/* Unique Features */}
      <section style={{ backgroundColor: warmBg, padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeUp><SectionLabel>Design</SectionLabel></FadeUp>
          <FadeUp stagger={1}><SectionHeading>Unique Features</SectionHeading></FadeUp>
          <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/unique-features.png" alt="Unique Features" /></div>
        </div>
      </section>

      {/* Task Mapping */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp><SectionLabel>Design</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>Task Mapping</SectionHeading></FadeUp>
        <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/task-mapping.png" alt="Task Mapping" /></div>
      </section>

      {/* Eisenhower Matrix */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <FadeUp><SectionLabel>Design</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>Eisenhower Matrix</SectionHeading></FadeUp>
        <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/eisen-hover-matrix.png" alt="Eisenhower Matrix" /></div>
      </section>

      {/* 5 Why */}
      <section style={{ backgroundColor: warmBg, padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeUp><SectionLabel>Analysis</SectionLabel></FadeUp>
          <FadeUp stagger={1}><SectionHeading>5 Why Analysis</SectionHeading></FadeUp>
          <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/5-why-analysis.png" alt="5 Why Analysis" /></div>
        </div>
      </section>

      {/* RCA */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp><SectionLabel>Analysis</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>Root Cause Analysis</SectionHeading></FadeUp>
        <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/root-cause-analysis.png" alt="Root Cause Analysis" /></div>
      </section>

      {/* Sketches */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <FadeUp><SectionLabel>Design</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>Sketches</SectionHeading></FadeUp>
        <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/sketches.png" alt="Sketches" /></div>
      </section>

      {/* Major Screens */}
      <section style={{ backgroundColor: warmBg, padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeUp><SectionLabel>Outcome</SectionLabel></FadeUp>
          <FadeUp stagger={1}><SectionHeading>Major Screens</SectionHeading></FadeUp>
          <div style={{ marginTop: 48 }}><SectionImage src="/images/bob/major-screens.png" alt="Major Screens" /></div>
        </div>
      </section>

      {/* Outcome stats */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
        <FadeUp><SectionHeading>What We Built</SectionHeading></FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48, textAlign: 'left' }}>
          {[{ value: '3D', label: 'First Indian ride app with 3D icon system' }, { value: 'Dark', label: 'Native dark-mode UI built from ground up' }, { value: '1 app', label: 'Uber, Ola & Rapido compared in one screen' }].map((stat, i) => (
            <FadeUp key={stat.label} stagger={1 + i}><StatCard value={stat.value} label={stat.label} /></FadeUp>
          ))}
        </div>
      </section>

      {/* Thank You */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <SectionImage src="/images/bob/thank-you.png" alt="Thank You" />
      </section>

      {/* Footer */}
      <footer style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: font, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={{ fontSize: 14, color: grey, fontWeight: 400 }}>© 2025 Sohum Bhatnagar</span>
        <span style={{ fontSize: 12, color: '#A0A0A0', fontStyle: 'italic', fontWeight: 400 }}>Designed in Figma. Built with intent.</span>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a href="https://www.linkedin.com/in/sohum-bhatnagar-9b2301276/" target="_blank" rel="noopener noreferrer" style={{ color: grey, transition: 'color 200ms' }} onMouseEnter={(e) => (e.currentTarget.style.color = nearBlack)} onMouseLeave={(e) => (e.currentTarget.style.color = grey)} aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="https://www.behance.net/sohumbhatnagar" target="_blank" rel="noopener noreferrer" style={{ color: grey, transition: 'color 200ms' }} onMouseEnter={(e) => (e.currentTarget.style.color = nearBlack)} onMouseLeave={(e) => (e.currentTarget.style.color = grey)} aria-label="Behance"><BehanceIcon /></a>
        </div>
      </footer>

    </div>
  );
}
