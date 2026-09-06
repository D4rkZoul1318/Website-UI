import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Reveal, staggerDelay } from './camera/Reveal';
import { Nav } from './home/Nav';
import { Footer } from './home/Footer';
import LineSidebar from './LineSidebar';

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, true, 'top top+=80');
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  history.pushState(null, '', `#${id}`);
}

const NAV_SECTIONS = [
  { id: 'hero', num: '00', title: 'UUCMS Portal', category: 'Overview' },
  { id: 'the-problem', num: '01', title: 'The Problem', category: 'Discovery' },
  { id: 'understanding-the-failure', num: '02', title: 'Understanding the Failure', category: 'Research' },
  { id: 'key-research-findings', num: '03', title: 'Key Research Findings', category: 'Research' },
  { id: 'competitive-analysis', num: '04', title: 'Competitive Analysis', category: 'Research' },
  { id: 'before-after', num: '05', title: 'Before and After', category: 'Design' },
  { id: 'decisions', num: '06', title: 'Decisions That Mattered', category: 'Design' },
  { id: 'the-redesign', num: '07', title: 'The Redesign', category: 'Outcome' },
  { id: 'what-changed', num: '08', title: 'What Changed', category: 'Outcome' },
  { id: 'concept-validation', num: '09', title: 'Concept Validation', category: 'Outcome' },
  { id: 'reflection', num: '10', title: 'Reflection', category: 'Outcome' },
] as const;

const NAV_HEADINGS = NAV_SECTIONS.reduce<Record<number, string>>((acc, s, i) => {
  if (i === 0 || s.category !== NAV_SECTIONS[i - 1].category) acc[i] = s.category;
  return acc;
}, {});

const DARK_SECTION_IDS = new Set(['before-after']);

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? '');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const researchCards = [
  { eyebrow: 'Personal Observation', title: 'First-hand Experience', body: 'As a direct user of UUCMS, navigation patterns and failure states were documented through repeated use. Initial attempts to locate the marks card required navigating through multiple misleading subsections. Results were filed under exam and fee categories with no logical grouping.' },
  { eyebrow: 'User Interviews', title: 'Peer Validation', body: 'Conversations with classmates revealed a consistent pattern. Students less familiar with technology could not navigate independently. Digitally fluent students resorted to phone calls with peers to navigate together. When a digital tool requires human assistance for a primary task, the tool has failed.' },
  { eyebrow: 'Heuristic Evaluation', title: 'System Audit', body: "The portal was evaluated against Nielsen's 10 Usability Heuristics. Critical violations found: no system feedback, admin-centric labelling, zero back navigation, hover flyouts requiring pixel-precise interaction, and no wayfinding or breadcrumbs." },
];

const keyFindings = [
  { num: '01', observation: "Students searched for information according to their academic goals rather than the university's administrative categories.", opportunity: 'Reorganise navigation around student tasks instead of backend structure.' },
  { num: '02', observation: 'Students frequently relied on classmates when attempting to complete common academic tasks.', opportunity: 'Reduce navigation complexity and improve information discoverability.' },
  { num: '03', observation: 'Users regularly lost their place because the portal lacked navigation context and clear wayfinding.', opportunity: 'Introduce breadcrumbs, active navigation states and consistent page hierarchy.' },
  { num: '04', observation: 'Important academic information was buried beneath multiple navigation levels.', opportunity: 'Surface high-priority information directly on the dashboard.' },
];

const competitiveRows = [
  { platform: 'Manipal University Portal', observation: 'Calendar highlights upcoming exams on dashboard', influence: 'Inspired Updates + Calendar section' },
  { platform: 'Google Classroom', observation: 'Card-based layout for course information', influence: 'Informed Results and Payments card layout' },
  { platform: 'Notion', observation: 'Minimal clean sidebar with clear hierarchy', influence: 'Influenced sidebar navigation structure' },
  { platform: 'Dribbble Portals', observation: 'Multiple features on one page without clutter when spaced correctly', influence: 'Validated information-dense dashboard approach' },
];

const decisions = [
  { num: '01', title: 'Goal-oriented Information Architecture', body: 'The original portal organised information around administrative categories: Academics, Exam, Reports. Students think in goals: I want to see my marks, I want to pay my fee. Every navigation label was rewritten to reflect student intent, not backend structure.' },
  { num: '02', title: 'Progressive Disclosure', body: 'The dashboard surfaces the most critical information immediately: current SGPA, payment status, upcoming events. Detail is accessible on demand. Students get answers in seconds without being overwhelmed by the full system complexity.' },
  { num: '03', title: 'Wayfinding by Default', body: 'The original portal had zero back navigation. Every page in the redesign has breadcrumbs, an active sidebar state, and a consistent shell. Users always know where they are and how to get back.' },
];

const outcomeSlides = [
  { src: '/images/redesigned-dashboard.webp', alt: 'Redesigned Dashboard', caption: 'Simplified navigation with clear hierarchy and quick access to key student actions' },
  { src: '/images/results.webp', alt: 'Results and Outcomes', caption: 'Time, clicks, and independence: the three metrics measured below' },
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
  useEffect(() => { document.title = 'UUCMS Redesign , Sohum Bhatnagar'; }, []);
  const activeSection = useActiveSection(NAV_SECTIONS.map((s) => s.id));
  const navOnDark = DARK_SECTION_IDS.has(activeSection);

  return (
    <div className="camera-theme uucms">
      <Nav />
      {createPortal(
        <>
          <nav
            aria-label="Case study sections"
            className="mobile-nav-fallback"
            style={{
              position: 'fixed', top: 63, left: 0, right: 0, zIndex: 8,
              gap: 'var(--space-4)', overflowX: 'auto',
              padding: 'var(--space-2) var(--space-6)',
              background: 'rgba(226, 224, 220, 0.97)', borderBottom: '1px solid var(--line-soft)',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => scrollToSection(e, s.id)}
                title={s.title}
                aria-current={activeSection === s.id ? 'true' : undefined}
                style={{
                  flex: '0 0 auto', display: 'inline-flex', alignItems: 'center',
                  padding: '13px 6px',
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em',
                  textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap',
                  color: activeSection === s.id ? 'var(--accent)' : 'var(--ink-faint)',
                  fontWeight: activeSection === s.id ? 700 : 500,
                }}
              >
                {s.num}
              </a>
            ))}
          </nav>

          <LineSidebar
            items={NAV_SECTIONS.map((s) => s.title)}
            headings={NAV_HEADINGS}
            accentColor="var(--accent)"
            textColor={navOnDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.55)'}
            markerColor={navOnDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(26, 26, 26, 0.15)'}
            headingColor={navOnDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(26, 26, 26, 0.4)'}
            showIndex
            showMarker
            proximityRadius={60}
            maxShift={14}
            falloff="smooth"
            markerLength={20}
            markerGap={0}
            tickScale={0.44}
            scaleTick
            itemGap={4}
            fontSize={0.7}
            smoothing={220}
            activeIndex={NAV_SECTIONS.findIndex((s) => s.id === activeSection)}
            onItemClick={(index) => {
              const target = document.getElementById(NAV_SECTIONS[index].id);
              if (!target) return;
              const smoother = ScrollSmoother.get();
              if (smoother) smoother.scrollTo(target, true, 'top top+=80');
              else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              history.pushState(null, '', `#${NAV_SECTIONS[index].id}`);
            }}
          />
        </>,
        document.getElementById('fixed-ui-root')!
      )}

      <main className="has-mobile-nav">
        {/* HERO */}
        <section id="hero" className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>00</b>: UI/UX REDESIGN · 2026</Reveal>
            <div className="hero-primary">
              <Reveal as="h1">UUCMS Student Portal</Reveal>
              <Reveal as="p" className="lede">Redesigning UUCMS, Karnataka's Department of Higher Education student portal, to reduce task completion time from 15 minutes to under 60 seconds.</Reveal>
            </div>
            <Reveal className="hero-tags">
              <span>15 min → 60 sec</span><span>2-click navigation</span><span>Student-first IA</span>
            </Reveal>
            {/* Project info — admissions-required metadata (location, context,
                individual/group, year of study, supervisor). Date is skipped:
                already shown in the SEC.00 line above ("· 2026"). Second pill
                row, identical shape to hero-tags, just visually quieter. */}
            <Reveal className="hero-tags hero-tags--meta">
              <span>Location: Bengaluru</span>
              <span>Context: Self-initiated</span>
              <span>Individual: research &amp; design</span>
              <span>Post-graduation</span>
              <span>No formal supervisor</span>
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
        <section id="the-problem" className="section bg-soft">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>01</b>: PROBLEM</Reveal>
            <Reveal as="h2">The Problem</Reveal>
            <div className="problem-composition">
              <Reveal className="problem-copy">
                <p>UUCMS is the official student portal for Karnataka's Department of Higher Education. Despite being a primary academic tool, finding marks required navigating through an admin-centric structure that had no logical connection to how students think.</p>
                <p>What should have taken seconds took 10–15 minutes, and for students less familiar with technology, it was impossible without help.</p>
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
        <section id="understanding-the-failure" className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>02</b>: RESEARCH</Reveal>
            <Reveal as="h2">Understanding the Failure</Reveal>
            <Reveal className="problem-copy" style={{ marginTop: 'var(--space-5)' }}>
              <p>The redesign began by understanding why students struggled to complete everyday academic tasks. Rather than immediately redesigning screens, I focused on identifying recurring usability failures through first-hand observation, conversations with students, and heuristic evaluation of the existing portal.</p>
            </Reveal>
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

        {/* KEY RESEARCH FINDINGS */}
        <section id="key-research-findings" className="section bg-paper">
          <div className="wrap-wide">
            <Reveal className="section-index">SEC.<b>03</b>: RESEARCH</Reveal>
            <Reveal as="h2">Key Research Findings</Reveal>
            <div className="research-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {keyFindings.map((f, i) => (
                <Reveal key={f.num} variant="scale" delay={staggerDelay(i)} className="spec-plate" style={{ padding: 'var(--space-5)' }}>
                  <span className="spec-label">Finding {f.num}</span>
                  <span className="meta-label" style={{ marginTop: 'var(--space-5)' }}>Observation</span>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: 1.6 }}>{f.observation}</p>
                  <span className="meta-label" style={{ marginTop: 'var(--space-4)' }}>Design Opportunity</span>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: 1.6 }}>{f.opportunity}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* COMPETITIVE ANALYSIS */}
        <section id="competitive-analysis" className="section bg-soft">
          <div className="wrap-wide">
            <div className="competitive-head">
              <div>
                <Reveal className="section-index">SEC.<b>04</b>: RESEARCH</Reveal>
                <Reveal as="h2">Competitive Analysis</Reveal>
              </div>
              <Reveal as="p" className="lede competitive-intro">Four reference points studied to identify patterns worth adopting.</Reveal>
            </div>
            <Reveal className="problem-copy" style={{ marginTop: 'var(--space-6)' }}>
              <p>The objective of this analysis was not to replicate existing interfaces, but to identify interaction patterns that consistently reduced cognitive load and improved discoverability across successful digital products.</p>
            </Reveal>
            <Reveal style={{ marginTop: 'var(--space-6)' }}>
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
        <section id="before-after" className="section section--cinema bg-dark">
          <div className="wrap-wide cinema-head">
            <Reveal className="section-index">SEC.<b>05</b>: DESIGN</Reveal>
            <Reveal as="h2">Before and After</Reveal>
            <Reveal as="p" className="drag-cue">Drag to compare</Reveal>
          </div>
          <CompareSlider />
        </section>

        {/* DESIGN DECISIONS */}
        <section id="decisions" className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>06</b>: DESIGN</Reveal>
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
        <section id="the-redesign" className="section bg-soft">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>07</b>: OUTCOME</Reveal>
            <Reveal as="h2">The Redesign</Reveal>
            <Reveal as="p" className="lede">Task completion time dropped from 15 minutes to under 60 seconds.</Reveal>
            <OutcomeCarousel />
          </div>
        </section>

        {/* WHAT CHANGED */}
        <section id="what-changed" className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>08</b>: OUTCOME</Reveal>
            <Reveal as="h2">What Changed</Reveal>
            <Reveal variant="scale" className="facts-row">
              <div><span className="meta-label">To access results from dashboard</span><span className="meta-value">2 clicks</span></div>
              <div><span className="meta-label">Task completion time reduction</span><span className="meta-value">15 min → 60 sec</span></div>
              <div><span className="meta-label">Student feedback</span><span className="meta-value">Positive validation</span></div>
            </Reveal>
          </div>
        </section>

        {/* CONCEPT VALIDATION */}
        <section id="concept-validation" className="section bg-soft">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>09</b>: OUTCOME</Reveal>
            <Reveal as="h2">Concept Validation</Reveal>
            <Reveal className="problem-copy" style={{ marginTop: 'var(--space-5)' }}>
              <p>Before finalising the redesign, the prototype was reviewed by five university students through guided walkthroughs. Because the prototype was not fully interactive, the sessions focused on whether participants could understand the information architecture, predict navigation paths, and locate key academic tasks without assistance.</p>
              <p style={{ marginTop: 'var(--space-4)' }}>Participants consistently found the redesigned structure easier to understand than the existing UUCMS portal. While several improvements were identified during these walkthroughs, the feedback confirmed that organising the interface around student goals rather than administrative categories significantly improved the overall experience.</p>
            </Reveal>
            <Reveal variant="scale" className="facts-row facts-row--four" style={{ marginTop: 'var(--space-7)' }}>
              <div><span className="meta-label">Participants</span><span className="meta-value">5 Students</span></div>
              <div><span className="meta-label">Evaluation Method</span><span className="meta-value">Guided Walkthrough</span></div>
              <div><span className="meta-label">Focus</span><span className="meta-value">Navigation &amp; IA</span></div>
              <div><span className="meta-label">Outcome</span><span className="meta-value">Positive Direction</span></div>
            </Reveal>
          </div>
        </section>

        {/* REFLECTION */}
        <section id="reflection" className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>10</b>: OUTCOME</Reveal>
            <Reveal as="h2">Reflection</Reveal>
            <Reveal className="problem-copy" style={{ marginTop: 'var(--space-5)' }}>
              <p>This project reinforced that improving usability is often less about adding new functionality and more about organising information around how people naturally think. Designing for students required shifting the system from an administrative perspective to a task-oriented experience.</p>
              <p style={{ marginTop: 'var(--space-4)' }}>This project also highlighted how government digital services can benefit from applying user-centred design principles commonly found in consumer products, without increasing system complexity.</p>
              <p style={{ marginTop: 'var(--space-4)' }}>If this project were taken further, I would build a fully interactive prototype and conduct moderated usability testing to measure task completion time, navigation success rates, and long-term usability improvements.</p>
            </Reveal>
          </div>
        </section>

        <Reveal as="blockquote" className="moment">
          <span className="moment-mark" aria-hidden="true">"</span>
          <p>"The best redesign is the one students don't have to think about."</p>
        </Reveal>
      </main>

      <Footer showEmailCta={false} showBehance={false} />
    </div>
  );
}
