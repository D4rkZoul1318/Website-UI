import { useEffect, useRef, useState } from 'react';
import { Reveal, staggerDelay } from './camera/Reveal';
import { Nav } from './home/Nav';
import { ContactForm } from './ContactForm';

const researchCards = [
  { eyebrow: 'Personal Observation', title: 'First-hand Experience', body: 'As a direct user of UUCMS, navigation patterns and failure states were documented through repeated use. Initial attempts to locate the marks card required navigating through multiple misleading subsections — results were filed under exam and fee categories with no logical grouping.' },
  { eyebrow: 'User Interviews', title: 'Peer Validation', body: 'Conversations with classmates revealed a consistent pattern. Students less familiar with technology could not navigate independently. Digitally fluent students resorted to phone calls with peers to navigate together. When a digital tool requires human assistance for a primary task, the tool has failed.' },
  { eyebrow: 'Heuristic Evaluation', title: 'System Audit', body: "The portal was evaluated against Nielsen's 10 Usability Heuristics. Critical violations found: no system feedback, admin-centric labelling, zero back navigation, hover flyouts requiring pixel-precise interaction, and no wayfinding or breadcrumbs." },
];

const competitiveRows = [
  { platform: 'Manipal University Portal', observation: 'Calendar highlights upcoming exams on dashboard', influence: 'Inspired Updates + Calendar section' },
  { platform: 'Google Classroom', observation: 'Card-based layout for course information', influence: 'Informed Results and Payments card layout' },
  { platform: 'Notion', observation: 'Minimal clean sidebar with clear hierarchy', influence: 'Influenced sidebar navigation structure' },
  { platform: 'Dribbble Portals', observation: 'Multiple features on one page without clutter when spaced correctly', influence: 'Validated information-dense dashboard approach' },
];

const decisions = [
  { num: '01', title: 'Goal-oriented Information Architecture', body: 'The original portal organised information around administrative categories — Academics, Exam, Reports. Students think in goals — I want to see my marks, I want to pay my fee. Every navigation label was rewritten to reflect student intent, not backend structure.' },
  { num: '02', title: 'Progressive Disclosure', body: 'The dashboard surfaces the most critical information immediately — current SGPA, payment status, upcoming events. Detail is accessible on demand. Students get answers in seconds without being overwhelmed by the full system complexity.' },
  { num: '03', title: 'Wayfinding by Default', body: 'The original portal had zero back navigation. Every page in the redesign has breadcrumbs, an active sidebar state, and a consistent shell. Users always know where they are and how to get back.' },
];

const outcomeSlides = [
  { src: '/images/redesigned-dashboard.webp', alt: 'Redesigned Dashboard', caption: 'Simplified navigation with clear hierarchy and quick access to key student actions' },
  { src: '/images/results.webp', alt: 'Results and Outcomes', caption: 'Time, clicks, and independence — the three metrics measured below' },
];

function CompareSlider() {
  const [pct, setPct] = useState(50);
  const draggingRef = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPct(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  const afterDominant = pct >= 50;

  return (
    <>
      <div className="cinema-stage">
        <Reveal
          as="div"
          ref={frameRef as never}
          variant="zoom"
          className="device-frame device-frame--hero"
        >
          <div
            className="compare-slider"
            role="slider"
            tabIndex={0}
            aria-label="Before and after comparison. Use left and right arrow keys to adjust."
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
            onPointerDown={(e) => {
              draggingRef.current = true;
              updateFromClientX(e.clientX);
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => { if (draggingRef.current) updateFromClientX(e.clientX); }}
            onPointerUp={() => { draggingRef.current = false; }}
            onPointerCancel={() => { draggingRef.current = false; }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') { setPct((p) => Math.max(0, p - 5)); e.preventDefault(); }
              else if (e.key === 'ArrowRight') { setPct((p) => Math.min(100, p + 5)); e.preventDefault(); }
              else if (e.key === 'Home') { setPct(0); e.preventDefault(); }
              else if (e.key === 'End') { setPct(100); e.preventDefault(); }
            }}
          >
            <div className="compare-pane compare-before"><img src="/images/original-uucms.webp" alt="Original UUCMS portal" loading="lazy" decoding="async" /></div>
            <div className="compare-pane compare-after" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
              <img src="/images/redesigned-dashboard.webp" alt="Redesigned UUCMS dashboard" loading="lazy" decoding="async" />
            </div>
            <div className="compare-label before">Before</div>
            <div className="compare-label after">After</div>
            <div className="compare-handle" style={{ left: `${pct}%` }}><div className="compare-handle-grip" /></div>
          </div>
        </Reveal>
      </div>
      <div className="cinema-tags-wrap">
        <div className="ba-tags reveal visible">
          <div className={`grp${afterDominant ? ' is-inactive' : ''}`}>
            <span className="grp-label">Before</span>
            <span className="dark-pill">Admin-centric navigation</span>
            <span className="dark-pill">No back button</span>
            <span className="dark-pill">Hover flyout menus</span>
          </div>
          <div className={`grp${!afterDominant ? ' is-inactive' : ''}`} style={{ marginLeft: 'var(--space-8)' }}>
            <span className="grp-label">After</span>
            <span className="dark-pill">Goal-oriented navigation</span>
            <span className="dark-pill">Breadcrumb wayfinding</span>
            <span className="dark-pill">2-click to results</span>
          </div>
        </div>
      </div>
    </>
  );
}

function OutcomeCarousel() {
  const [active, setActive] = useState(0);
  const slide = outcomeSlides[active];
  return (
    <Reveal variant="scale" className="outcome-carousel">
      <div className="device-frame">
        {outcomeSlides.map((s, i) => (
          <img key={s.src} className={`outcome-slide${i === active ? ' is-active' : ''}`} src={s.src} alt={s.alt} loading="lazy" decoding="async" />
        ))}
        <button className="outcome-arrow outcome-arrow--prev" type="button" aria-label="Previous screen" onClick={() => setActive((a) => (a - 1 + outcomeSlides.length) % outcomeSlides.length)}>
          <span aria-hidden="true">←</span>
        </button>
        <button className="outcome-arrow outcome-arrow--next" type="button" aria-label="Next screen" onClick={() => setActive((a) => (a + 1) % outcomeSlides.length)}>
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="outcome-caption outcome-caption--primary">{slide.caption}</p>
      <div className="outcome-dots" role="tablist" aria-label="Outcome screens">
        {outcomeSlides.map((s, i) => (
          <button
            key={s.src}
            className={`outcome-dot${i === active ? ' is-active' : ''}`}
            role="tab"
            aria-selected={i === active}
            type="button"
            aria-label={s.alt}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </Reveal>
  );
}

export default function CaseStudy() {
  useEffect(() => { document.title = 'UUCMS Redesign — Sohum Bhatnagar'; }, []);

  return (
    <div className="camera-theme uucms">
      <Nav />

      <main>
        {/* HERO */}
        <section className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>00</b> — UI/UX REDESIGN · 2025</Reveal>
            <div className="hero-primary">
              <Reveal as="h1">UUCMS Student Portal</Reveal>
              <Reveal as="p" className="lede">Redesigning a government university portal to reduce task completion time from 15 minutes to under 60 seconds.</Reveal>
            </div>
            <Reveal className="hero-tags">
              <span>15 min → 60 sec</span><span>2-click navigation</span><span>Student-first IA</span>
            </Reveal>
            <Reveal className="pipeline-row">
              <span className="pipeline-label">Pipeline</span>
              <span className="pipeline-tool">Figma</span>
              <span className="pipeline-arrow" aria-hidden="true">→</span>
              <span className="pipeline-tool">Figma Make</span>
            </Reveal>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="section bg-soft">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>01</b> — PROBLEM</Reveal>
            <Reveal as="h2">The Problem</Reveal>
            <div className="problem-composition">
              <Reveal className="problem-copy">
                <p>UUCMS is the official student portal for Karnataka's Department of Higher Education. Despite being a primary academic tool, finding marks required navigating through an admin-centric structure that had no logical connection to how students think.</p>
                <p>What should have taken seconds took 10–15 minutes — and for students less familiar with technology, it was impossible without help.</p>
              </Reveal>
              <Reveal variant="scale" className="spec-plate">
                <div className="spec-row"><span className="spec-label">Average time to find results</span><span className="spec-value">15 min</span></div>
                <div className="spec-row"><span className="spec-label">Columns in the original marks table</span><span className="spec-value">12</span></div>
                <div className="spec-row"><span className="spec-label">Back buttons on the original portal</span><span className="spec-value">0</span></div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* RESEARCH */}
        <section className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>02</b> — RESEARCH</Reveal>
            <Reveal as="h2">Understanding the Failure</Reveal>
            <div className="research-grid">
              {researchCards.map((c, i) => (
                <Reveal key={c.title} delay={staggerDelay(i)} className="narrative-block">
                  <span className="eyebrow">{c.eyebrow}</span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* COMPETITIVE ANALYSIS */}
        <section className="section bg-soft">
          <div className="wrap-wide">
            <div className="competitive-head">
              <div>
                <Reveal className="section-index">SEC.<b>03</b> — RESEARCH</Reveal>
                <Reveal as="h2">What Others Got Right</Reveal>
              </div>
              <Reveal as="p" className="lede competitive-intro">Four reference points studied to identify patterns worth adopting.</Reveal>
            </div>
            <Reveal>
              <table className="ed">
                <thead><tr><th scope="col">Platform</th><th scope="col">Key Observation</th><th scope="col">Influence on Redesign</th></tr></thead>
                <tbody>
                  {competitiveRows.map((row) => (
                    <tr key={row.platform}>
                      <td>{row.platform}</td>
                      <td>{row.observation}</td>
                      <td>{row.influence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="section section--cinema bg-dark">
          <div className="wrap-wide cinema-head">
            <Reveal className="section-index">SEC.<b>04</b> — DESIGN</Reveal>
            <Reveal as="h2">Before and After</Reveal>
            <Reveal as="p" className="drag-cue">Drag to compare</Reveal>
          </div>
          <CompareSlider />
        </section>

        {/* DESIGN DECISIONS */}
        <section className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>05</b> — DESIGN</Reveal>
            <Reveal as="h2">Decisions That Mattered</Reveal>
            <ol className="decision-column">
              {decisions.map((d, i) => (
                <Reveal key={d.num} as="li" delay={staggerDelay(i)} className="decision-entry">
                  <span className="decision-ghost" aria-hidden="true">{d.num}</span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* OUTCOME */}
        <section className="section bg-soft">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>06</b> — OUTCOME</Reveal>
            <Reveal as="h2">The Redesign</Reveal>
            <Reveal as="p" className="lede">Task completion time dropped from 15 minutes to under 60 seconds.</Reveal>
            <OutcomeCarousel />
          </div>
        </section>

        {/* WHAT CHANGED */}
        <section className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>07</b> — OUTCOME</Reveal>
            <Reveal as="h2">What Changed</Reveal>
            <Reveal variant="scale" className="facts-row">
              <div><span className="meta-label">To access results from dashboard</span><span className="meta-value">2 clicks</span></div>
              <div><span className="meta-label">Task completion time reduction</span><span className="meta-value">15 min → 60 sec</span></div>
              <div><span className="meta-label">Students could navigate independently</span><span className="meta-value">100%</span></div>
            </Reveal>
          </div>
        </section>

        <Reveal as="blockquote" className="moment">
          <span className="moment-mark" aria-hidden="true">"</span>
          <p>"The best redesign is the one students don't have to think about."</p>
        </Reveal>
      </main>

      <div className="wrap" style={{ padding: '0 0 var(--space-6)' }}>
        <ContactForm />
      </div>

      <footer>
        <span>© 2026 Sohum Bhatnagar</span>
        <span>Designed in Figma. Designed and built in React.</span>
      </footer>
    </div>
  );
}
