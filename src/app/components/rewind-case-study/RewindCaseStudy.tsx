import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Reveal, staggerDelay } from '../camera/Reveal';
import { Nav } from '../home/Nav';
import { Footer } from '../home/Footer';
import LineSidebar from '../LineSidebar';

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
  { id: 'hero', num: '00', title: 'REWIND', category: 'Overview' },
  { id: 'problem', num: '01', title: 'The Problem', category: 'Discovery' },
  { id: 'thesis', num: '02', title: 'Thesis', category: 'Discovery' },
  { id: 'design-principles', num: '03', title: 'Design Principles', category: 'Discovery' },
  { id: 'design-exploration', num: '04', title: 'Design Exploration', category: 'Discovery' },
  { id: 'instrument', num: '05', title: 'The Instrument', category: 'Build' },
  { id: 'how-its-built', num: '06', title: "How It's Built", category: 'Build' },
  { id: 'interaction-system', num: '07', title: 'Interaction System', category: 'System' },
  { id: 'control-ledger', num: '08', title: 'Control Ledger', category: 'System' },
  { id: 'design-language', num: '09', title: 'Design Language', category: 'Craft' },
  { id: 'process', num: '10', title: 'Process', category: 'Process' },
  { id: 'tradeoff', num: '11', title: 'Tradeoff', category: 'Decision' },
  { id: 'outcome', num: '12', title: 'What Shipped', category: 'Outcome' },
  { id: 'live-unit', num: '13', title: 'Live Unit', category: 'Outcome' },
  { id: 'reflection', num: '14', title: 'Reflection', category: 'Outcome' },
] as const;

const NAV_HEADINGS = NAV_SECTIONS.reduce<Record<number, string>>((acc, s, i) => {
  if (i === 0 || s.category !== NAV_SECTIONS[i - 1].category) acc[i] = s.category;
  return acc;
}, {});

const DARK_SECTION_IDS = new Set(['instrument', 'process', 'live-unit']);

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

const designPrinciples = [
  { ord: 'Principle 01', title: 'One Control. One Purpose.', body: 'Every physical control performs a single dedicated action. Knobs adjust tone, faders control continuous values, and the click wheel handles navigation. No gesture should perform multiple unrelated functions.' },
  { ord: 'Principle 02', title: 'Physical Gestures Should Feel Different', body: 'Each interaction should create a distinct physical experience. Rotating a wheel, sliding a fader and selecting a disc should each feel mechanically different instead of becoming variations of the same tap.' },
  { ord: 'Principle 03', title: 'Every Interaction Should Produce Feedback', body: 'Every action should create an immediate visual and audible response, reinforcing the illusion of manipulating a physical audio device rather than a flat interface.' },
  { ord: 'Principle 04', title: 'Encourage Intentional Listening', body: 'The interface should slow interaction just enough to make selecting and controlling music feel deliberate rather than passive.' },
];

const designExplorations = [
  { ord: 'Exploration 01', title: 'Traditional Playlist', body: 'Fast and familiar, but reduced every interaction to scrolling and tapping.', whyLabel: 'Why it was rejected', why: "It failed to reinforce the project's physical interaction thesis." },
  { ord: 'Exploration 02', title: 'Turntable Interface', body: 'Created a strong physical metaphor but required large gestures for simple navigation and introduced unnecessary interaction complexity.', whyLabel: 'Why it was rejected', why: 'Playback became slower without improving usability.' },
  { ord: 'Exploration 03', title: 'Cassette Deck', body: 'Strong nostalgic appeal but limited flexibility for modern playlist management and multiple loaded tracks.', whyLabel: 'Why it was rejected', why: 'The interaction model constrained functionality.' },
  { ord: 'Exploration 04', title: 'CD Changer (Final Direction)', body: 'Supported multiple loaded tracks while creating deliberate interactions through disc selection, transport controls and physical movement.', whyLabel: 'Why it was selected', why: 'It balanced familiarity, interaction quality and technical feasibility.' },
];

const systemFeatures = [
  { ord: '01: Disc rail', title: 'Load, don’t queue', body: 'Tracks are uploaded to a shelf, then loaded into one of six slots. A frosted-glass carriage slides over the active disc. Selection is a deliberate act, not a scroll.' },
  { ord: '02: Click wheel', title: 'Navigate by rotation', body: 'MENU, prev, next, play/pause, and drag-to-scrub on a single wheel. Navigation borrowed from the most beloved music hardware ever shipped.' },
  { ord: '03: EQ & faders', title: 'Mix, don’t tap', body: 'HI / MID / LO rotary knobs per channel and vertical faders for master volume and stereo pan. Continuous physical gestures for continuous parameters.' },
];

const signalChain = [
  { label: 'Source', body: 'Uploaded track, decoded and loaded into the active disc slot', accent: true },
  { label: 'EQ: HI / MID / LO knobs', body: <><code>BiquadFilterNode</code> per band, each rotary knob drives one filter's gain</> },
  { label: 'Master fader', body: <><code>GainNode</code>, the vertical volume fader maps directly to output gain</> },
  { label: 'Pan fader', body: <><code>StereoPannerNode</code>, balance fader positions the track in the stereo field</> },
  { label: 'VU meter', body: <><code>AnalyserNode</code>, live frequency data drives the meter; it reads the signal, it doesn't fake it</> },
  { label: 'Output', body: '44.1kHz stereo, straight to the device destination', accent: true },
];

const controlLedger = [
  { control: 'EQ knobs (HI/MID/LO)', gesture: 'Rotate', drives: <code>BiquadFilterNode</code>, drivesSuffix: ' gain per band', feedback: 'Knob position + audible tone shift + VU response' },
  { control: 'Master fader', gesture: 'Vertical drag', drives: <code>GainNode</code>, drivesSuffix: '', feedback: 'Fader travel + level change' },
  { control: 'Pan fader', gesture: 'Vertical drag', drives: <code>StereoPannerNode</code>, drivesSuffix: '', feedback: 'Stereo image shifts left/right' },
  { control: 'Click wheel', gesture: 'Rotate / press', drives: 'Transport + scrub position', drivesSuffix: '', feedback: 'Progress bar + elapsed clock' },
  { control: 'Disc rail', gesture: 'Select', drives: 'Active source', drivesSuffix: '', feedback: 'Glass carriage slides to slot, accent color switches per disc' },
];

const craftFeatures = [
  { ord: 'Ground', body: <>Concrete grey <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>#E2E0DC</span> body, <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>#111111</span> display glass, the same tokens this portfolio now runs on.</> },
  { ord: 'Type', body: 'JetBrains Mono for every label, readout, and status line. Inter for track titles only. Content is the one thing that isn’t machinery.' },
  { ord: 'Accent', body: <>One accent per disc, set as a CSS variable. Disc 01 is <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em', color: 'var(--accent)' }}>#D91E18</span>, the darkroom red this site runs on now.</> },
];

const processFeatures = [
  { ord: 'Figma Make', body: 'Component generation and layout scaffolding. The device body, panels, and disc rail started as Make output, then were refined by hand where Make drifts.' },
  { ord: 'Figma MCP', body: 'Design-system operations: reading tokens, checking structure, keeping the built app honest against the design file.' },
  { ord: 'Claude Code', body: 'Audio engine integration: the node graph, drag physics on the wheel and faders, and interruption-safe state transitions.' },
];

function LiveUnit() {
  const [powered, setPowered] = useState(false);
  return (
    <Reveal variant="scale" className="live-unit">
      <div className="live-unit__stage">
        {powered ? (
          <iframe
            src="https://rewind-it.vercel.app"
            title="REWIND: live prototype"
            loading="eager"
            allow="autoplay"
          />
        ) : (
          <button
            className="live-unit__cover"
            type="button"
            aria-label="Power on the live REWIND prototype"
            onClick={() => setPowered(true)}
          >
            <span className="power-ring" aria-hidden="true">⏻</span>
            <span className="live-unit__label">Power On: Try the Live Unit</span>
            <span className="live-unit__sub">Loads the full prototype in place</span>
          </button>
        )}
      </div>
      <div className="live-unit__bar">
        <span>REWIND · V.01-Alpha · Live</span>
        <a href="https://rewind-it.vercel.app" target="_blank" rel="noopener noreferrer">Open full screen ↗</a>
      </div>
    </Reveal>
  );
}

export default function RewindCaseStudy() {
  useEffect(() => { document.title = 'REWIND , Sohum Bhatnagar'; }, []);
  const activeSection = useActiveSection(NAV_SECTIONS.map((s) => s.id));
  const navOnDark = DARK_SECTION_IDS.has(activeSection);

  return (
    <div className="camera-theme">
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
        {/* SEC.00 — HERO */}
        <section id="hero" className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>00</b>: Hardware UI · Figma Config Makeathon · 2026</Reveal>
            <Reveal as="h1">REWIND</Reveal>
            <Reveal as="p" className="lede">A hardware-inspired music control interface for the browser (six disc slots, dedicated EQ knobs, physical faders, a click wheel) with real audio processing behind every control. Physical Interactions, V.01-Alpha.</Reveal>
            <Reveal className="hero-tags"><span>Hardware UI</span><span>Web Audio API</span><span>Makeathon 2026</span></Reveal>
            <Reveal className="pipeline-row">
              <span className="pipeline-label">Pipeline</span>
              <span className="pipeline-tool">Figma Make</span><span className="pipeline-arrow">→</span>
              <span className="pipeline-tool">Figma MCP</span><span className="pipeline-arrow">→</span>
              <span className="pipeline-tool">Claude Code</span><span className="pipeline-arrow">→</span>
              <span className="pipeline-tool">Runway</span>
            </Reveal>
          </div>
          <div className="wrap-wide" style={{ marginTop: 'var(--space-8)' }}>
            <Reveal variant="zoom" className="media-frame hero-video-frame" data-speed="0.85">
              {/* Native 1280×720, streamed from the same source the homepage uses.
                  Untouched file: no re-encode, no crop; display capped at source width. */}
              <video autoPlay loop muted playsInline width={1280} height={720} aria-label="REWIND, device walkthrough: discs loading, EQ manipulation, fader control">
                <source src="/videos/rewind-preview.mp4" type="video/mp4" />
              </video>
            </Reveal>
          </div>
        </section>

        {/* PROJECT INFO — admissions-required metadata (author, date,
            location, individual/group, context, year of study, supervisor).
            Placed right after the hero, before the problem statement. */}
        <section id="project-info" className="section section--tight">
          <div className="wrap">
            <Reveal className="section-index">PROJECT INFO</Reveal>
            <Reveal variant="scale" className="spec-plate">
              <div className="spec-row"><span className="spec-label">Author</span><span className="spec-value">Sohum Bhatnagar</span></div>
              <div className="spec-row"><span className="spec-label">Date</span><span className="spec-value">[[TODO: month]] 2026</span></div>
              <div className="spec-row"><span className="spec-label">Location</span><span className="spec-value">[[TODO: city]]</span></div>
              <div className="spec-row"><span className="spec-label">Context</span><span className="spec-value">Makeathon</span></div>
              <div className="spec-row"><span className="spec-label">Year of study</span><span className="spec-value">Post-graduation</span></div>
              <div className="spec-row"><span className="spec-label">Supervisor</span><span className="spec-value">None: makeathon</span></div>
            </Reveal>
            <Reveal className="problem-copy" style={{ marginTop: 'var(--space-5)' }}>
              <p>This was individual work. I was solely responsible for the design and front-end build described below, including the Web Audio API integration.</p>
              <p style={{ marginTop: 'var(--space-3)' }}>This was built for the Figma Config Makeathon, 2026, an external competition, not a class assignment or self-initiated project.</p>
              <p style={{ marginTop: 'var(--space-3)' }}>No formal supervisor. Makeathon project.</p>
            </Reveal>
          </div>
        </section>

        {/* SEC.01 — PROBLEM */}
        <section id="problem" className="section bg-soft">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>01</b>: PROBLEM</Reveal>
            <Reveal as="h2">Every Control Is the Same Tap</Reveal>
            <div className="problem-composition">
              <Reveal className="problem-copy">
                <p>Modern music interfaces optimise for passive listening. Track skip, volume, EQ. Every interaction is a flat tap on a flat surface, the same gesture with zero physical differentiation. Users who want active control over their listening have no digital tool that feels like hardware.</p>
                <p style={{ marginTop: 'var(--space-4)' }}>REWIND set out to prove a hardware metaphor could work as a real, usable browser interface, not a static mockup, and not a skin over a standard player.</p>
              </Reveal>
              <Reveal variant="scale" className="spec-plate">
                <div className="spec-row"><span className="spec-label">Gestures in a modern player</span><span className="spec-value">1</span></div>
                <div className="spec-row"><span className="spec-label">Physical differentiation between controls</span><span className="spec-value">0</span></div>
                <div className="spec-row"><span className="spec-label">Controls in REWIND that share a gesture</span><span className="spec-value">0</span></div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SEC.02 — THESIS */}
        <section id="thesis" className="section section--roomy">
          <div className="wrap">
            <Reveal className="section-index" style={{ textAlign: 'center' }}>SEC.<b>02</b>: THESIS</Reveal>
            <Reveal as="p" className="thesis">"What if choosing a song was a <em>ritual</em>, not a reflex?"</Reveal>
          </div>
        </section>

        {/* SEC.03 — DESIGN PRINCIPLES */}
        <section id="design-principles" className="section bg-soft">
          <div className="wrap-wide">
            <Reveal className="section-index">SEC.<b>03</b>: PRINCIPLES</Reveal>
            <Reveal as="h2">Design Principles</Reveal>
            <div className="feature-grid">
              {designPrinciples.map((f, i) => (
                <Reveal key={f.ord} delay={staggerDelay(i)} variant="scale" className="feature-cell">
                  <span className="ord">{f.ord}</span><h3>{f.title}</h3><p>{f.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SEC.04 — DESIGN EXPLORATION */}
        <section id="design-exploration" className="section bg-paper">
          <div className="wrap-wide">
            <Reveal className="section-index">SEC.<b>04</b>: EXPLORATION</Reveal>
            <Reveal as="h2">Design Exploration</Reveal>
            <Reveal as="p" className="lede">Before committing to the final direction, multiple interaction models were explored. The goal was not to recreate an existing music player, but to identify a hardware metaphor that encouraged deliberate interaction while remaining practical in a browser environment.</Reveal>
            <div className="feature-grid">
              {designExplorations.map((f, i) => (
                <Reveal key={f.ord} delay={staggerDelay(i)} variant="scale" className="feature-cell">
                  <span className="ord">{f.ord}</span><h3>{f.title}</h3><p>{f.body}</p>
                  <span className="meta-label" style={{ marginTop: 'var(--space-4)' }}>{f.whyLabel}</span>
                  <p>{f.why}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SEC.05 — THE INSTRUMENT */}
        <section id="instrument" className="section band bg-dark">
          <div className="band-inner wrap-wide cinema-head">
            <Reveal className="section-index">SEC.<b>05</b>: BUILD</Reveal>
            <Reveal as="h2">The Instrument</Reveal>
            <Reveal as="p" className="lede" style={{ marginInline: 'auto' }}>A 6-disc slot system modeled after CD changers. A glass carriage that slides between discs. Dedicated rotary EQ knobs per channel, vertical faders for master and pan, an iPod-style click wheel for navigation. Each control does one thing and feels distinct.</Reveal>
            <Reveal variant="zoom" className="media-frame" style={{ marginTop: 'var(--space-7)', maxWidth: 839, marginInline: 'auto', borderColor: 'rgba(244,243,240,0.12)', background: 'var(--screen-bg)' }}>
              <img src="/images/rewind/instrument.webp" alt="REWIND: the six-disc instrument body, glass carriage, EQ knobs, and faders" loading="lazy" decoding="async" />
            </Reveal>
          </div>
        </section>

        {/* SEC.06 — HOW IT'S BUILT */}
        <section id="how-its-built" className="section bg-paper">
          <div className="wrap cinema-head">
            <Reveal className="section-index">SEC.<b>06</b>: BUILD</Reveal>
            <Reveal as="h2">How It's Built</Reveal>
            <Reveal as="p" className="lede" style={{ marginInline: 'auto' }}>
              The implementation decisions were driven by interaction goals rather than technology. The Web Audio API was selected because it allowed each physical control to manipulate live audio in real time, preserving the illusion that every interaction produced a direct mechanical consequence.
            </Reveal>
            <Reveal as="p" className="lede" style={{ marginInline: 'auto', marginTop: 'var(--space-6)' }}>
              The hardest part wasn't visual, it was feel. The wheel's design came from combining two hardware languages, an iPod and a vinyl turntable, then tuning the drag sensitivity until spinning it actually felt smooth.
            </Reveal>
            <Reveal as="p" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--ink-faint)', marginTop: 'var(--space-4)' }}>
              React · Web Audio API · Deployed on Vercel
            </Reveal>
            <Reveal as="p" className="lede" style={{ marginInline: 'auto', marginTop: 'var(--space-6)' }}>This isn't a skin over a standard player. Every control on the surface drives a node in a live Web Audio processing graph. Turn a knob and the sound actually changes.</Reveal>
            <div className="flow-chart">
              {signalChain.map((node, i) => (
                <div key={node.label} style={{ display: 'contents' }}>
                  {i > 0 && <div className="flow-connector" />}
                  <Reveal delay={staggerDelay(i)} className={`flow-node${node.accent ? ' flow-node--accent' : ''}`}>
                    <span className="flow-label">{node.label}</span><p>{node.body}</p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEC.07 — INTERACTION SYSTEM */}
        <section id="interaction-system" className="section">
          <div className="wrap-wide">
            <Reveal className="section-index">SEC.<b>07</b>: SYSTEM</Reveal>
            <Reveal as="h2">One Control, One Job</Reveal>
            <Reveal as="p" className="lede">The flat-tap problem isn't solved by drawing knobs. It's solved by making every control mechanically distinct: different gesture, different resistance, different feedback.</Reveal>
            <div className="feature-grid">
              {systemFeatures.map((f, i) => (
                <Reveal key={f.ord} delay={staggerDelay(i)} variant="scale" className="feature-cell">
                  <span className="ord">{f.ord}</span><h3>{f.title}</h3><p>{f.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SEC.08 — CONTROL LEDGER */}
        <section id="control-ledger" className="section section--tight bg-soft">
          <div className="wrap-wide">
            <Reveal className="section-index">SEC.<b>08</b>: SYSTEM</Reveal>
            <Reveal as="h2">Control → Node Mapping</Reveal>
            <Reveal style={{ overflowX: 'auto' }}>
              <table className="ed">
                <thead><tr><th>Control</th><th>Gesture</th><th>Drives</th><th>Feedback</th></tr></thead>
                <tbody>
                  {controlLedger.map((row) => (
                    <tr key={row.control}>
                      <td>{row.control}</td>
                      <td>{row.gesture}</td>
                      <td>{row.drives}{row.drivesSuffix}</td>
                      <td>{row.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        {/* SEC.09 — DESIGN LANGUAGE */}
        <section id="design-language" className="section">
          <div className="wrap-wide">
            <Reveal className="section-index">SEC.<b>09</b>: CRAFT</Reveal>
            <Reveal as="h2">Brutalist on Purpose</Reveal>
            <Reveal as="p" className="lede">Bold borders, heavy contrast, visible screw heads, a status bar reading out latency and buffer size. The aesthetic isn't decoration. It signals that REWIND is a tool, not a player. Concrete grey ground, JetBrains Mono labels, and a single accent color per disc that repaints the whole interface when the carriage moves.</Reveal>
            <div className="feature-grid">
              {craftFeatures.map((f, i) => (
                <Reveal key={f.ord} delay={staggerDelay(i)} variant="scale" className="feature-cell">
                  <span className="ord">{f.ord}</span><p>{f.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SEC.10 — PROCESS */}
        <section id="process" className="section band bg-dark">
          <div className="band-inner wrap-wide">
            <Reveal className="section-index">SEC.<b>10</b>: PROCESS</Reveal>
            <Reveal as="h2">Built Inside the Figma Ecosystem</Reveal>
            <Reveal as="p" className="lede">The makeathon brief was to push Figma's AI tooling as far as it would go. REWIND ran the full stack: Make generated and scaffolded components, MCP handled design-system operations against the file, Claude Code wired the Web Audio engine into the React app, and Runway produced the reveal video.</Reveal>
            <div className="feature-grid">
              {processFeatures.map((f, i) => (
                <Reveal key={f.ord} delay={staggerDelay(i)} variant="scale" className="feature-cell">
                  <span className="ord">{f.ord}</span><p>{f.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SEC.11 — TRADEOFF */}
        <section id="tradeoff" className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>11</b>: DECISION</Reveal>
            <Reveal as="h2">Fidelity Over Breadth</Reveal>
            <Reveal className="problem-copy" style={{ marginTop: 'var(--space-5)' }}>
              <p>The makeathon window forced a choice: many features that demo well, or few features that hold up under real use. REWIND chose full interaction fidelity (real drag physics, real audio processing) over a longer feature list.</p>
              <p style={{ marginTop: 'var(--space-4)' }}>That meant shipping fewer things. But once the controls had genuine physics and the audio genuinely responded, testers stopped treating it like a novelty and started using it like an instrument. The features that shipped worked convincingly instead of existing as decoration.</p>
            </Reveal>
          </div>
        </section>

        {/* SEC.12 — OUTCOME */}
        <section id="outcome" className="section section--tight">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>12</b>: OUTCOME</Reveal>
            <Reveal as="h2">What Shipped</Reveal>
            <Reveal variant="scale" className="facts-row">
              <div><span className="meta-label">CD-changer slot system with glass carriage</span><span className="meta-value">6 discs</span></div>
              <div><span className="meta-label">Live Web Audio nodes behind the controls</span><span className="meta-value">4 nodes</span></div>
              <div><span className="meta-label">Working prototype, not a mockup, submitted to Config Makeathon 2026</span><span className="meta-value">1 build</span></div>
            </Reveal>
            <Reveal style={{ marginTop: 'var(--space-7)' }}>
              <a className="preview-cta" href="https://rewind-it.vercel.app" target="_blank" rel="noopener noreferrer">Launch REWIND →</a>
            </Reveal>
          </div>
        </section>

        {/* SEC.13 — LIVE UNIT */}
        <section id="live-unit" className="section band bg-dark">
          <div className="band-inner wrap-wide cinema-head">
            <Reveal className="section-index">SEC.<b>13</b>: LIVE</Reveal>
            <Reveal as="h2">Don't Take the Case Study's Word for It</Reveal>
            <Reveal as="p" className="lede" style={{ marginInline: 'auto' }}>This is the actual submitted build, running live. Power it on, load a disc, grab a fader. Audio needs a click anyway. The browser insists on the ritual too.</Reveal>
            <LiveUnit />
          </div>
        </section>

        {/* SEC.14 — REFLECTION */}
        <section id="reflection" className="section bg-soft">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>14</b>: REFLECTION</Reveal>
            <Reveal as="h2">What I Learned</Reveal>
            <Reveal className="problem-copy" style={{ marginTop: 'var(--space-5)' }}>
              <p>Building a convincing physical metaphor in the browser is mostly about interruption-safe animation, not visual polish. A knob that stutters when you grab it mid-transition breaks the illusion faster than any flat texture could.</p>
              <p style={{ marginTop: 'var(--space-4)' }}>The feature testers asked for most was persistence, saved EQ presets. That's the first thing I'd add if I extended it. And one artifact of the build outlived the makeathon: this portfolio's color and type tokens were carried forward directly from REWIND. The click wheel in the site's dock is a direct descendant of this build.</p>
              <p style={{ marginTop: 'var(--space-4)' }}>More than anything, this project demonstrated that convincing interaction design depends less on visual realism and more on behavioural consistency. Users quickly forgive simplified graphics, but they immediately notice when movement, timing or feedback feel disconnected from their expectations of physical objects. Designing believable digital tools therefore became an exercise in designing predictable behaviour rather than decorative interfaces.</p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer showEmailCta={false} showBehance={false} />
    </div>
  );
}
