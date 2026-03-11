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
      <div style={{ width: '100%', overflow: 'hidden', borderRadius: radius }}>
        <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
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
          {[['Home', '/'], ['About', '/#about'], ['Projects', '/#projects'], ['Chill', '/#chill']].map(([label, href]) => (
            <a key={label} href={href} onClick={(e) => { e.preventDefault(); window.location.href = href; }} style={{ fontFamily: font, fontSize: '14px', color: nearBlack, textDecoration: 'none', cursor: 'pointer' }}>{label}</a>
          ))}
        </div>
      </div>

      <a href="/#projects" style={{ fontFamily: font, fontSize: '14px', color: grey, textDecoration: 'none', display: 'inline-block', padding: '80px 80px 0', marginTop: 4 }}
        onMouseEnter={(e) => (e.currentTarget.style.color = nearBlack)}
        onMouseLeave={(e) => (e.currentTarget.style.color = grey)}>
        ← Back to Projects
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
            {[{ value: '3+', label: 'Apps users open before booking a ride' }, { value: '<4', label: 'Indian ride apps with 3D icon systems' }, { value: '24px', label: 'Minimum icon size for tab navigation' }].map((stat, i) => (
              <FadeUp key={stat.label} stagger={i}><StatCard value={stat.value} label={stat.label} /></FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <FadeUp>
          <div style={{ backgroundColor: cardBg, borderRadius: radius, padding: '48px 56px' }}>
            <h3 style={{ fontSize: 32, fontWeight: 700, color: nearBlack, fontFamily: font, margin: '0 0 32px', lineHeight: 1.2 }}>Problem Statement</h3>
            <p style={{ fontSize: 20, color: grey, fontFamily: font, lineHeight: 1.8, fontWeight: 400, margin: '0 0 24px' }}>
              Ride-hailing apps in the Indian market rely almost entirely on flat, generic vehicle icons that prioritize function over identity. Across Uber, Rapido, Ola, and Namma Yatri, the visual language is interchangeable silhouettes that tell users what vehicle type they are booking, but communicate nothing about the brand they are booking with.
            </p>
            <p style={{ fontSize: 20, color: grey, fontFamily: font, lineHeight: 1.8, fontWeight: 400, margin: '0 0 24px' }}>
              The challenge for BOB Rides was to design a vehicle icon system that solved two competing demands simultaneously: icons that are instantly recognisable and legible at small UI sizes, and icons that carry a distinct visual character strong enough to differentiate BOB Rides from every other player in the category. The additional constraint was that the entire system had to be built for a dark-mode-native interface — a context that most existing icon styles in the market were never designed for.
            </p>
            <p style={{ fontSize: 20, color: grey, fontFamily: font, lineHeight: 1.8, fontWeight: 400, margin: 0 }}>
              The core design question was: how do you create 3D vehicle icons that feel familiar enough for a user to identify at a glance, while being visually distinctive enough that the app they appear in could not be mistaken for any competitor?
            </p>
          </div>
        </FadeUp>
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
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            'Existing ride-hailing apps in India use flat, generic vehicle icons that offer no brand differentiation',
            'No established design reference for 3D vehicle icons in a dark-mode mobile context',
            'Icons had to remain legible at 24px (tab navigation size) while retaining dimensional depth',
            'The aggregator model required a single visual system that could represent competing brands (Rapido, Uber, Ola) without visual conflict',
          ].map((text, i) => (
            <FadeUp key={i} stagger={2 + i}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
                <span style={{ color: '#188AEC', fontSize: 24, fontWeight: 700, marginTop: 2, flexShrink: 0 }}>→</span>
                <p style={{ fontSize: 20, color: nearBlack, fontFamily: font, lineHeight: 1.8, margin: 0, fontWeight: 400 }}>{text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Competitor Analysis */}
      <section style={{ backgroundColor: warmBg, padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeUp><SectionLabel>Research</SectionLabel></FadeUp>
          <FadeUp stagger={1}><SectionHeading>Competitor Analysis</SectionHeading></FadeUp>
          <FadeUp stagger={2}>
            <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 64, alignItems: 'start' }}>
              {/* Left — features list */}
              <div>
                <p style={{ fontSize: 18, fontWeight: 700, color: nearBlack, fontFamily: font, margin: '0 0 24px' }}>
                  Competitors: OLA, Rapido, Uber, Namma Yatri
                </p>
                <p style={{ fontSize: 15, fontWeight: 600, color: grey, fontFamily: font, margin: '0 0 16px', letterSpacing: 1, textTransform: 'uppercase' }}>Features</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    "Icon style: Flat 2D silhouettes across most competitors vs BOB Rides' 3 Dimensional renders.",
                    'Dark mode support: None native in Rapido or Ola; partial in Uber vs BOB Rides fully dark-mode-native.',
                    'Price comparison: Hidden or single-app only across all competitors vs cross-app real-time comparison in BOB.',
                    'Visual identity: Generic, interchangeable across category vs distinct, brand-coded in BOB.',
                    'Aggregation: Single service each vs multi-service in a single interface.',
                  ].map((text, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <span style={{ color: '#188AEC', fontSize: 20, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>→</span>
                      <p style={{ fontSize: 18, color: nearBlack, fontFamily: font, lineHeight: 1.7, margin: 0, fontWeight: 400 }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right — logos */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'center' }}>
                <img src="https://www.figma.com/api/mcp/asset/1b193ea8-87d2-4e6b-9242-09a2af002bbd" alt="OLA" style={{ width: '100%', borderRadius: 8 }} />
                <img src="https://www.figma.com/api/mcp/asset/f4f6b490-f62d-401e-bd6c-f81f1b3029f0" alt="Rapido" style={{ width: '100%', borderRadius: 8 }} />
                <img src="https://www.figma.com/api/mcp/asset/f0848239-000f-46b6-a978-c34b51349987" alt="Uber" style={{ width: '100%', borderRadius: 8 }} />
                <img src="https://www.figma.com/api/mcp/asset/eb203260-202b-4289-9c5c-2d2fafed7c93" alt="Namma Yatri" style={{ width: '100%', borderRadius: 8 }} />
              </div>
            </div>
          </FadeUp>
          {/* Competitor screenshots */}
          <FadeUp stagger={3}>
            <div style={{ marginTop: 48 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: grey, fontFamily: font, margin: '0 0 16px', letterSpacing: 1, textTransform: 'uppercase' }}>References from Competitors</p>
              <div style={{ width: '100%', borderRadius: 10, overflow: 'hidden' }}>
                <img
                  src="https://www.figma.com/api/mcp/asset/b9bcc1dc-3744-4248-a516-7ff75978076d"
                  alt="Competitor screenshots"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            </div>
          </FadeUp>
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
        <FadeUp stagger={2}>
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, backgroundColor: cardBg, borderRadius: radius, padding: '48px' }}>
            {/* Left col */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <img src="https://www.figma.com/api/mcp/asset/20287be6-d9f9-4a91-88db-69bbff43d4f8" alt="Rahul Kumar" style={{ width: 148, height: 148, borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 20, fontWeight: 700, color: nearBlack, fontFamily: font, margin: 0 }}>Rahul Kumar</p>
                <p style={{ fontSize: 16, color: '#188AEC', fontFamily: font, margin: '4px 0 0' }}>Community Manager</p>
              </div>
              <div style={{ width: '100%', marginTop: 8 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: nearBlack, fontFamily: font, margin: '0 0 12px' }}>About</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 15, color: grey, fontFamily: font }}>
                  <span>35</span><span>Bangalore</span>
                  <span>MBA</span><span>Employee</span>
                </div>
              </div>
            </div>
            {/* Right col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div>
                <p style={{ fontSize: 20, fontWeight: 700, color: nearBlack, fontFamily: font, margin: '0 0 8px' }}>Description</p>
                <p style={{ fontSize: 17, color: grey, fontFamily: font, lineHeight: 1.7, margin: 0 }}>Arjun commutes daily across Bengaluru using a mix of bike taxis and autos depending on traffic and time of day. He has Rapido, Uber, and Ola installed and manually checks prices before every booking.</p>
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 700, color: nearBlack, fontFamily: font, margin: '0 0 8px' }}>A day in their life</p>
                <ul style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Opens 2–3 different ride apps every morning to compare prices before booking', 'Regularly switches between bike and auto depending on availability and surge pricing', 'Uses dark mode across all his apps by default'].map(t => (
                    <li key={t} style={{ fontSize: 17, color: grey, fontFamily: font, lineHeight: 1.6 }}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 700, color: nearBlack, fontFamily: font, margin: '0 0 8px' }}>Pain points</p>
                <ul style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Wastes 3–5 minutes every commute switching between apps to find the best fare', "Can't tell which vehicle icon belongs to which service tier without reading the label", "Existing apps feel visually identical — no sense of which one he's actually on"].map(t => (
                    <li key={t} style={{ fontSize: 17, color: grey, fontFamily: font, lineHeight: 1.6 }}>{t}</li>
                  ))}
                </ul>
              </div>
              <div style={{ backgroundColor: '#F6FAFE', borderRadius: 12, padding: '20px 24px' }}>
                <p style={{ fontSize: 17, color: '#143D61', fontFamily: font, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>"I just want to see all my options in one place and book the cheapest one. Why do I have to open three apps for that?"</p>
              </div>
            </div>
          </div>
        </FadeUp>
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
        <FadeUp stagger={2}>
          <p style={{ fontSize: 20, color: grey, fontFamily: font, textAlign: 'center', marginTop: 8, marginBottom: 48 }}>To resolve user needs</p>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 0 }}>
          {[
            { icon: 'https://www.figma.com/api/mcp/asset/35275b22-0618-4a92-89f9-ca5dc1bb4776', bg: 'https://www.figma.com/api/mcp/asset/2d92ec1a-4cdf-4145-8555-28b7b46674ca', text: 'Multi-app aggregation — compare Rapido, Uber, and Ola rides in one screen' },
            { icon: 'https://www.figma.com/api/mcp/asset/a7686ee2-675e-465b-b8f9-0c7504a9c597', bg: 'https://www.figma.com/api/mcp/asset/a92f5f29-0581-485a-99eb-caf579c81a26', text: '3D vehicle icon system — custom bike, auto, and cab icons across all booking states' },
            { icon: 'https://www.figma.com/api/mcp/asset/03d16072-95f5-47af-9d20-4a076a12d59b', bg: 'https://www.figma.com/api/mcp/asset/9c92d5ff-02e9-4013-9297-0d2ba1ba5312', text: 'Best price indicator — real-time fare comparison with savings highlighted against competitor pricing' },
          ].map((f, i) => (
            <FadeUp key={i} stagger={3 + i}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
                <div style={{ position: 'relative', width: 130, height: 130 }}>
                  <img src={f.bg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                  <img src={f.icon} alt="" style={{ position: 'absolute', width: 48, height: 48, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                </div>
                <p style={{ fontSize: 18, color: nearBlack, fontFamily: font, lineHeight: 1.7, margin: 0, fontWeight: 400 }}>{f.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
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
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 32 }}>
            {[
              'Custom 3D vehicle icons rendered in Blender — the only ride app icon system in the Indian market built with dimensional 3D models rather than flat vectors',
              'Dark-mode-native design system built from the ground up, not adapted from a light-mode base',
              'Cross-app price aggregation with a real-time "Best Price" indicator showing exact savings compared to individual app pricing',
            ].map((text, i) => (
              <FadeUp key={i} stagger={2 + i}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
                  <span style={{ color: '#188AEC', fontSize: 24, fontWeight: 700, marginTop: 2, flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: 20, color: nearBlack, fontFamily: font, lineHeight: 1.8, margin: 0, fontWeight: 400 }}>{text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Task Mapping */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp><SectionLabel>Design</SectionLabel></FadeUp>
        <FadeUp stagger={1}><SectionHeading>Task Mapping</SectionHeading></FadeUp>
        <FadeUp stagger={2}>
          <div style={{ marginTop: 48, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: font, fontSize: 15 }}>
              <thead>
                <tr style={{ backgroundColor: '#E8E6E1' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 700, color: nearBlack, width: '12%' }}></th>
                  {['Step 1 — Open App', 'Step 2 — Find a Ride', 'Step 3 — Select & Book', 'Step 4 — Complete Ride'].map(s => (
                    <th key={s} style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 700, color: nearBlack }}>{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Task', cells: ['User opens BOB Rides and sees home screen with recent destinations and Ride With selector', 'User enters destination, app fetches live prices from Rapido, Uber, and Ola simultaneously', 'User browses Available Rides screen, identifies vehicle type by icon, selects Best Price option', 'User tracks ride in activity screen, journey completes, fare is charged'] },
                  { label: 'Challenges', cells: ['Remembering which app offers the best price today', 'Too many options displayed simultaneously; icons must communicate vehicle type instantly without reading labels', 'Distinguishing between providers (Rapido, Uber, Ola) and vehicle tiers (bike vs auto vs cab) at a glance', 'Confirming the right ride was booked — provider, vehicle type, and ETA must be immediately clear'] },
                  { label: 'Environment', cells: ['Mobile, indoors or commuting, often in a hurry', 'Mobile, standing or seated, may be in low light or outdoor glare', 'Mobile, quick decision context, 10–30 seconds to choose', 'Mobile, background task, app open but user not actively interacting'] },
                  { label: 'Emotions', cells: ['Mild impatience, wants to book fast and move on', 'Cautious scanning for the cheapest fare without missing a better option', 'Decisive but uncertain — does the icon match what they expect to get?', 'Relieved — Booking is done, needs passive confirmation'] },
                  { label: 'Thoughts', cells: ['"Is this faster than opening three apps separately?"', '"Which one is actually cheapest right now?"', '"Is that icon a bike or an auto? Is Best Price actually the best?"', '"Did it book the right vehicle? When does it arrive?"'] },
                  { label: 'Urgency Level', cells: ['Medium — user has a destination in mind and is ready to book', 'High — fare comparison is time-sensitive due to surge pricing', 'High — selection decision happens in under 30 seconds', 'Low — passive monitoring state'] },
                  { label: 'Design Opportunity', cells: ['Home screen icons (bike, auto, cab) must communicate vehicle category at 48px without any label', 'Available Rides screen is the primary icon performance test — all three vehicle types appear simultaneously at 32px', 'Best Price badge and icon must work together to guide the decision without requiring the user to read every row', 'Activity screen must clearly confirm vehicle type icon and provider — same icon system, confirmation context'] },
                ].map((row, ri) => (
                  <tr key={row.label} style={{ backgroundColor: ri % 2 === 1 ? warmBg : 'transparent' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: nearBlack, borderBottom: '1px solid rgba(0,0,0,0.06)', verticalAlign: 'top' }}>{row.label}</td>
                    {row.cells.map((cell, ci) => (
                      <td key={ci} style={{ padding: '16px 20px', color: grey, borderBottom: '1px solid rgba(0,0,0,0.06)', verticalAlign: 'top', lineHeight: 1.6 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
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
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {/* Problem */}
            <FadeUp stagger={2}>
              <div style={{ backgroundColor: '#188AEC', borderRadius: 15, padding: '26px 40px', width: '100%', maxWidth: 960, textAlign: 'center' }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'white', fontFamily: font, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: 1 }}>Problem</p>
                <p style={{ fontSize: 18, color: 'white', fontFamily: font, lineHeight: 1.7, margin: 0 }}>Users cannot distinguish BOB Rides from other ride apps at first glance.</p>
              </div>
            </FadeUp>
            {/* Arrow */}
            <div style={{ width: 2, height: 40, backgroundColor: '#CBD4DC', margin: '0 auto' }} />
            {/* Causes */}
            {[
              { label: 'Cause 1', text: 'The icon system used standard flat 2D vehicle silhouettes, identical in style to Rapido, Uber, and Ola.' },
              { label: 'Cause 2', text: 'The initial design direction referenced existing competitors as the baseline rather than as the benchmark to exceed.' },
              { label: 'Cause 3', text: 'No Indian ride-hailing app had attempted 3D icons, so there was no category precedent — the design process defaulted to what already existed.' },
              { label: 'Cause 4', text: 'The market had collectively prioritised development speed and functional clarity over visual brand differentiation, making flat icons the industry default.' },
            ].map((cause, i) => (
              <FadeUp key={i} stagger={3 + i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ backgroundColor: '#EFEFEF', borderRadius: 15, padding: '28px 40px', width: '100%', maxWidth: 960, textAlign: 'center' }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#888', fontFamily: font, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: 1 }}>{cause.label}</p>
                    <p style={{ fontSize: 18, color: nearBlack, fontFamily: font, lineHeight: 1.7, margin: 0 }}>{cause.text}</p>
                  </div>
                  {i < 3 && <div style={{ width: 2, height: 40, backgroundColor: '#CBD4DC' }} />}
                </div>
              </FadeUp>
            ))}
            {/* Arrow to root cause */}
            <div style={{ width: 2, height: 40, backgroundColor: '#CBD4DC' }} />
            {/* Root Cause */}
            <FadeUp stagger={7}>
              <div style={{ backgroundColor: '#EDF6FE', borderRadius: 15, padding: '32px 40px', width: '100%', maxWidth: 960, textAlign: 'center' }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#188AEC', fontFamily: font, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 1 }}>Root Cause</p>
                <p style={{ fontSize: 18, color: '#283264', fontFamily: font, lineHeight: 1.7, margin: 0 }}>The icon design brief across the entire ride-hailing category was defined as "communicate vehicle type" — never "communicate vehicle type AND brand identity simultaneously." No one had challenged that constraint, leaving the design opportunity completely open.</p>
              </div>
            </FadeUp>
          </div>
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
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { src: 'https://www.figma.com/api/mcp/asset/019691f9-1e40-44ec-b6ff-d57103abf9d0', label: 'Home Screen' },
              { src: 'https://www.figma.com/api/mcp/asset/dd4102e4-1903-4e67-aa36-0c71c0260082', label: 'Ride Options' },
              { src: 'https://www.figma.com/api/mcp/asset/0db506ef-c2e3-4487-a7b9-a25b3bfb4626', label: 'Confirmation' },
            ].map((screen, i) => (
              <FadeUp key={screen.label} stagger={i}>
                <div style={{ textAlign: 'center' }}>
                  <img src={screen.src} alt={screen.label} style={{ width: '100%', borderRadius: 24, display: 'block' }} />
                  <p style={{ fontSize: 14, color: grey, fontFamily: font, marginTop: 12 }}>{screen.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
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
