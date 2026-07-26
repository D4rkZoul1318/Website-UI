import { useEffect } from 'react';
import { Reveal, staggerDelay } from './camera/Reveal';
import { RollingCounter } from './camera/DigitReel';
import { Nav } from './home/Nav';
import { ToolsWheel, WHEEL_TOOL_NAMES } from './ToolsWheel';
import { Footer } from './home/Footer';

const experience = [
  {
    role: 'Icon Designer — Freelance', company: 'Bob Rides', duration: '4 weeks',
    bullets: ['Redesigned icons for the Bob Rides platform, focusing on creating a unique yet highly user-friendly visual language.'],
  },
  {
    role: '3D Modeler — Intern', company: 'UC Riverside, Dept. of Paleontology', duration: '6 months',
    bullets: [
      'Created scientifically accurate 3D fossil models in Blender and ZBrush for research and education.',
      'Delivered optimized assets for academic visualizations, enhancing accessibility for wider audiences.',
    ],
  },
  {
    role: '3D Generalist', company: 'Academic & Freelance', duration: '2021 – 2025',
    bullets: [
      'Designed game-ready PBR assets in Unreal Engine for modular environments.',
      'Produced hard-surface assets in Maya/Substance Painter for academic films and short projects.',
      'Created workflows integrating 3D modeling and Photoshop refinement for visual consistency.',
    ],
  },
];

const education = [
  { degree: 'Bachelor of Visual Arts (B.Va), Distinction', major: 'Major — Animation', institution: 'Chitrakala Parishath, Bengaluru', year: '2021 – 2025' },
  { degree: 'Class XII', major: '', institution: 'Delhi Public School', year: '2020 – 2021' },
];

const toolkit = [
  { category: 'Design', items: ['Figma', 'Photoshop', 'Maya', 'Blender', 'ZBrush', 'Substance Painter'] },
  { category: 'Prototyping', items: ['Figma Make', 'Unreal Engine'] },
  { category: 'AI', items: ['Claude', 'Gemini', 'ChatGPT', 'DALL·E', 'Midjourney'] },
  { category: 'Dev', items: ['Git', 'Vercel', 'Reaper'] },
  { category: 'Methods', items: ['UX Research', 'Wireframing', '3D Iconography', 'PBR Asset Creation'] },
];

const remainingToolkit = toolkit
  .map((group) => ({ category: group.category, items: group.items.filter((item) => !WHEEL_TOOL_NAMES.includes(item)) }))
  .filter((group) => group.items.length > 0);

export function AboutPage() {
  useEffect(() => { document.title = 'About — Sohum Bhatnagar'; }, []);

  return (
    <div className="camera-theme">
      <Nav />

      <main>
        {/* HERO */}
        <section className="section bg-paper index-bleed num-left">
          <span className="index-num" data-speed="0.65" aria-hidden="true">00</span>
          <div className="wrap wrap-lean-left">
            <Reveal className="section-index">SEC.<b>00</b> — ABOUT</Reveal>
            <Reveal as="h1" style={{ maxWidth: '22ch' }}>Designer by training.<br />Naturalist by instinct.</Reveal>
            <Reveal as="p" className="lede">
              Multidisciplinary creative with 4+ years spanning UI/UX, 3D visual production, brand design, and AI-assisted workflows. My process starts with real problems and ends with interfaces that feel obvious in hindsight. When I'm not in Figma, I'm somewhere quiet with a 600mm lens.
            </Reveal>
          </div>
        </section>

        {/* BIO */}
        <section className="section bg-soft index-bleed index-bleed--split num-right">
          <span className="index-num" data-speed="0.65" aria-hidden="true">01</span>
          <Reveal className="photo-cluster">
            <div className="polaroid r1"><img src="/images/about-photos/rocks.webp" alt="Sohum relaxing by a rocky stream" loading="lazy" decoding="async" /></div>
            <div className="polaroid r2"><img src="/images/about-photos/cafe.webp" alt="Sohum at a café" loading="lazy" decoding="async" /></div>
            <div className="polaroid r3"><img src="/images/about-photos/camera.webp" alt="Sohum shooting with a telephoto lens" loading="lazy" decoding="async" /></div>
            <div className="polaroid r4"><img src="/images/about-photos/macaques.webp" alt="Macaques photographed on a riverside rock" loading="lazy" decoding="async" /></div>
          </Reveal>
          <div className="wrap wrap-lean-right">
            <Reveal className="section-index">SEC.<b>01</b> — BACKGROUND</Reveal>
            <Reveal as="h2">I'm Sohum.</Reveal>
            <Reveal className="problem-copy" style={{ marginTop: 'var(--space-5)' }}>
              <p>I studied Animation at Chitrakala Parishath in Bengaluru (B.Va, Distinction) before moving into product design, so I still think in composition, narrative and visual weight before I think in components. Four-plus years span UI/UX, 3D visual production — game-ready PBR assets in Unreal Engine, hard-surface modeling in Maya and Substance Painter, even scientifically accurate 3D fossil models for UC Riverside's Paleontology department — brand design, and AI-assisted workflows.</p>
              <p style={{ marginTop: 'var(--space-4)' }}>That background shows up directly in the work: the Bob Rides icon system exists because I could take a vehicle from sketch to a fully-shaded 3D render, not just a flat vector. My process starts with a real problem and ends with an interface that feels obvious in hindsight. When I'm not in Figma, I'm usually somewhere quiet with a 600mm lens, or on a basketball court.</p>
            </Reveal>
            <Reveal variant="scale" className="facts-row">
              <div><span className="meta-label">Based in</span><span className="meta-value" style={{ fontSize: 20 }}>Bengaluru</span></div>
              <div><span className="meta-label">Frames shipped</span><span className="meta-value" style={{ fontSize: 20 }}><RollingCounter target={3} /></span></div>
              <div>
                <span className="meta-label">Status</span>
                <span className="meta-value" style={{ fontSize: 20 }}>Open to roles &amp; apprenticeships</span>
              </div>
              <div className="facts-subitem">
                <div className="tools-subrow">
                  <div className="tools-wheel-col">
                    <span className="meta-label">Tools</span>
                    <ToolsWheel />
                  </div>
                  <div className="tools-remaining">
                    <span className="meta-label">Also</span>
                    <div className="tools-remaining-groups">
                      {remainingToolkit.map((group) => (
                        <div className="tools-remaining-group" key={group.category}>
                          <span className="tools-remaining-group-label">{group.category}</span>
                          <div className="hero-tags">
                            {group.items.map((item) => <span key={item}>{item}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section index-bleed index-bleed--split num-left">
          <span className="index-num" data-speed="0.65" aria-hidden="true">02</span>
          <div className="wrap wrap-lean-left">
            <Reveal className="section-index">SEC.<b>02</b> — EXPERIENCE</Reveal>
            <Reveal as="h2">Where I've Worked</Reveal>
            <div style={{ marginTop: 'var(--space-7)', display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
              {experience.map((exp, i) => (
                <Reveal key={exp.role} delay={staggerDelay(i)} className="split">
                  <div>
                    <span className="meta-label" style={{ marginBottom: 4 }}>{exp.duration}</span>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-faint)' }}>{exp.company}</p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 'var(--space-3)' }}>{exp.role}</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} style={{ color: 'var(--ink-soft)', lineHeight: 1.7, fontSize: '0.96rem', paddingLeft: 20, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>→</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="photo-cluster photo-cluster--work">
            <div className="polaroid r2"><img src="/images/about-photos/skull-render.webp" alt="3D still-life render — antique study scene" loading="lazy" decoding="async" /></div>
            <div className="polaroid r1"><img src="/images/about-photos/lever-render.webp" alt="3D render — sci-fi emergency lever panel, hard-surface modeling" loading="lazy" decoding="async" /></div>
          </Reveal>
        </section>

        {/* EDUCATION */}
        <section className="section bg-soft index-bleed num-right">
          <span className="index-num" data-speed="0.65" aria-hidden="true">03</span>
          <div className="wrap wrap-lean-right">
            <Reveal className="section-index">SEC.<b>03</b> — EDUCATION</Reveal>
            <Reveal as="h2">Where I Studied</Reveal>
            <div style={{ marginTop: 'var(--space-7)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {education.map((ed, i) => (
                <Reveal key={ed.institution} delay={staggerDelay(i)} className="split">
                  <span className="meta-label">{ed.year}</span>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 4 }}>{ed.degree}</h3>
                    {ed.major && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-faint)', marginBottom: 4 }}>{ed.major}</p>}
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-faint)' }}>{ed.institution}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLKIT */}
        <section className="section index-bleed num-left">
          <span className="index-num" data-speed="0.65" aria-hidden="true">04</span>
          <div className="wrap-wide wrap-lean-left">
            <Reveal className="section-index">SEC.<b>04</b> — TOOLKIT</Reveal>
            <Reveal as="h2">Skills &amp; Tools</Reveal>
            <div style={{ marginTop: 'var(--space-7)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {toolkit.map((group, i) => (
                <Reveal key={group.category} delay={staggerDelay(i)} className="split">
                  <span className="meta-label" style={{ paddingTop: 4 }}>{group.category}</span>
                  <div className="hero-tags" style={{ marginTop: 0 }}>
                    {group.items.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section band bg-dark" style={{ textAlign: 'center' }}>
          <div className="band-inner wrap cinema-head">
            <Reveal className="section-index">SEC.<b>05</b> — CONTACT</Reveal>
            <Reveal as="h2">Get in touch.</Reveal>
            <Reveal as="p">Open to product design roles and apprenticeships.</Reveal>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--space-6)' }}>
              <Reveal as="a" className="contact-cta" href="mailto:sohum1311@gmail.com">
                <span>sohum1311@gmail.com</span><span className="arrow">→</span>
              </Reveal>
              <Reveal as="a" delay={staggerDelay(1)} className="contact-cta" href="https://www.linkedin.com/in/sohum-bhatnagar-9b2301276/" target="_blank" rel="noopener noreferrer">
                <span>LinkedIn</span><span className="arrow">↗</span>
              </Reveal>
              <Reveal as="a" delay={staggerDelay(2)} className="contact-cta" href="https://www.behance.net/sohumbhatnagar" target="_blank" rel="noopener noreferrer">
                <span>Behance</span><span className="arrow">↗</span>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer showEmailCta={false} showBehance={false} />
    </div>
  );
}
