import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { LuUsers, LuCar, LuWallet, LuArrowRight } from 'react-icons/lu';
import { Reveal, staggerDelay } from '../camera/Reveal';
import { CountUp } from '../camera/CountUp';
import { Nav } from '../home/Nav';
import { Footer } from '../home/Footer';
import LineSidebar from '../LineSidebar';

// Anchor links don't work under ScrollSmoother: it fixes #smooth-wrapper in
// place and drives scroll entirely through a transform on #smooth-content,
// so the browser's native hash-jump (which tries to move window.scrollY)
// has nothing to act on. Route section links through the smoother's own
// scrollTo instead, with a top offset so content doesn't land under the
// fixed Nav bar.
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
  { id: 'hero', num: '00', title: 'BOB Rides', category: 'Overview' },
  { id: 'at-a-glance', num: 'TL;DR', title: 'At a Glance', category: 'Overview' },
  { id: 'the-challenge', num: '01', title: 'The Challenge', category: 'Discovery' },
  { id: 'problem-statement', num: '02', title: 'Problem Statement', category: 'Discovery' },
  { id: 'objectives-goals', num: '04', title: 'Objectives & Goals', category: 'Discovery' },
  { id: 'business-challenges', num: '05', title: 'Business Challenges', category: 'Discovery' },
  { id: 'research-approach', num: '06', title: 'Research Approach', category: 'Discovery' },
  { id: 'competitor-analysis', num: '07', title: 'Competitor Analysis', category: 'Discovery' },
  { id: 'product-users', num: '08', title: 'Product Users', category: 'Research' },
  { id: 'user-persona', num: '09', title: 'User Persona', category: 'Research' },
  { id: 'user-needs', num: '10', title: 'User Needs', category: 'Research' },
  { id: 'features-functionalities', num: '11', title: 'Features & Functionalities', category: 'Design Process' },
  { id: 'product-user-challenges', num: '12', title: 'Product User Challenges', category: 'Design Process' },
  { id: 'unique-features', num: '13', title: 'Unique Features', category: 'Design Process' },
  { id: 'task-mapping', num: '14', title: 'Task Mapping', category: 'Design Process' },
  { id: 'eisenhower-matrix', num: '15', title: 'Eisenhower Matrix', category: 'Design Process' },
  { id: 'key-decisions', num: '16', title: 'Three Decisions', category: 'Design Process' },
  { id: 'sketches', num: '17', title: 'Sketches', category: 'Execution' },
  { id: 'final-icons', num: '18', title: 'Final Icons', category: 'Execution' },
  { id: 'icon-system', num: '19', title: 'Icon System', category: 'Execution' },
  { id: 'major-screens', num: '20', title: 'Major Screens', category: 'Execution' },
  { id: 'what-we-built', num: '21', title: 'What We Built', category: 'Outcome' },
  { id: 'validation', num: '22', title: 'Validation', category: 'Outcome' },
  { id: 'close', num: '23', title: 'Close', category: 'Outcome' },
] as const;

// Maps the first index of each new category to its heading, for
// LineSidebar to render as a divider — 22 flat sections read as a wall
// of text otherwise.
const NAV_HEADINGS = NAV_SECTIONS.reduce<Record<number, string>>((acc, s, i) => {
  if (i === 0 || s.category !== NAV_SECTIONS[i - 1].category) acc[i] = s.category;
  return acc;
}, {});

// Sections rendered with the bg-dark/band treatment — used to flip the
// side-nav rail's numerals/line to a light palette while scrolled over them.
const DARK_SECTION_IDS = new Set(['key-decisions', 'final-icons', 'major-screens']);

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

const objectivesGoals = [
  'Design a 3D vehicle icon system (bike, auto, cab) that is instantly legible at small UI sizes and visually distinct from every competitor in the Indian ride-hailing market',
  'Build icons for a dark-mode-native UI for a ride aggregator that consolidates multiple taxi apps like Rapido, Uber, and Ola into a single booking interface',
];

const businessChallenges = [
  'Existing ride-hailing apps in India use flat, generic vehicle icons that offer no brand differentiation',
  'No established design reference for 3D vehicle icons in a dark-mode mobile context',
  'Icons had to remain legible at 24px (tab navigation size) while retaining dimensional depth',
  'The aggregator model required a single visual system that could represent competing brands (Rapido, Uber, Ola) without visual conflict',
];

const productUserChallenges = [
  'Users switching between 3 or more apps to compare prices before booking, adding friction to every ride decision',
  'Flat, generic icons across existing apps make vehicle type selection feel utilitarian and unmemorable',
  'Dark environments (night travel, low screen brightness) make standard light-mode icon systems difficult to read',
  'No single app surfaces price comparisons transparently. Users have to manually open each app',
];

const decisions = [
  {
    name: 'Vehicle direction: left-facing to isometric right-facing',
    tradeoff: 'Took noticeably longer to iterate. Every vehicle had to be redrawn and retested until the new direction read clearly.',
    whyItWon: 'Facing right reads as forward motion, a vehicle ready to go, which fit the booking moment better than a static left-facing silhouette.',
  },
  {
    name: 'Vehicle choice: recognizable over realistic',
    tradeoff: "Traded some visual realism for recognizability. The vehicle shapes aren't as photoreal as they could be.",
    whyItWon: 'Instant recognition mattered more than photorealism. Users identify the vehicle type without a second thought.',
  },
  {
    name: 'Color system built for both light and dark',
    tradeoff: 'Ruled out bright, saturated colors to keep the set uniform across both themes.',
    whyItWon: 'The icons stay equally legible in both modes, so switching themes never costs clarity.',
  },
];

const competitorPoints = [
  "Icon style: Flat 2D silhouettes across most competitors vs BOB Rides' 3 Dimensional renders.",
  'Dark mode support: None native in Rapido or Ola; partial in Uber vs BOB Rides fully dark-mode-native.',
  'Price comparison: Hidden or single-app only across all competitors vs cross-app real-time comparison in BOB.',
  'Visual identity: Generic, interchangeable across category vs distinct, brand-coded in BOB.',
  'Aggregation: Single service each vs multi-service in a single interface.',
];

const userNeeds = [
  'Compare fares across providers without switching between apps',
  'Clear, instant visual identification of vehicle type (bike, auto, cab) at a glance, especially in low-light conditions',
  'A booking experience that feels reliable and premium, not just functional',
];

const features = [
  { ord: '01', Icon: LuUsers, text: 'Multi-app aggregation: compare Rapido, Uber, and Ola rides in one screen' },
  { ord: '02', Icon: LuCar, text: '3D vehicle icon system: custom bike, auto, and cab icons across all booking states' },
  { ord: '03', Icon: LuWallet, text: 'Best price indicator: real-time fare comparison with savings highlighted against competitor pricing' },
];

const uniqueFeatures = [
  'Custom 3D vehicle icons rendered in Blender, a dimensional icon system built specifically for BOB Rides rather than flat vectors',
  'Dark-mode-native design system built from the ground up, not adapted from a light-mode base',
  'Cross-app price aggregation with a real-time "Best Price" indicator showing exact savings compared to individual app pricing',
];

const taskMappingRows: { label: string; cells: string[] }[] = [
  { label: 'Task', cells: ['User opens BOB Rides and sees home screen with recent destinations and Ride With selector', 'User enters destination, app fetches live prices from Rapido, Uber, and Ola simultaneously', 'User browses Available Rides screen, identifies vehicle type by icon, selects Best Price option', 'User tracks ride in activity screen, journey completes, fare is charged'] },
  { label: 'Challenges', cells: ['Remembering which app offers the best price today', 'Too many options displayed simultaneously; icons must communicate vehicle type instantly without reading labels', 'Distinguishing between providers (Rapido, Uber, Ola) and vehicle tiers (bike vs auto vs cab) at a glance', 'Confirming the right ride was booked. Provider, vehicle type, and ETA must be immediately clear'] },
  { label: 'Environment', cells: ['Mobile, indoors or commuting, often in a hurry', 'Mobile, standing or seated, may be in low light or outdoor glare', 'Mobile, quick decision context, 10–30 seconds to choose', 'Mobile, background task, app open but user not actively interacting'] },
  { label: 'Emotions', cells: ['Mild impatience, wants to book fast and move on', 'Cautious scanning for the cheapest fare without missing a better option', 'Decisive but uncertain: does the icon match what they expect to get?', 'Relieved. Booking is done, needs passive confirmation'] },
  { label: 'Thoughts', cells: ['"Is this faster than opening three apps separately?"', '"Which one is actually cheapest right now?"', '"Is that icon a bike or an auto? Is Best Price actually the best?"', '"Did it book the right vehicle? When does it arrive?"'] },
  { label: 'Urgency Level', cells: ['Medium: user has a destination in mind and is ready to book', 'High: fare comparison is time-sensitive due to surge pricing', 'High: selection decision happens in under 30 seconds', 'Low: passive monitoring state'] },
  { label: 'Design Opportunity', cells: ['Home screen icons (bike, auto, cab) must communicate vehicle category at 48px without any label', 'Available Rides screen is the primary icon performance test. All three vehicle types appear simultaneously at 32px', 'Best Price badge and icon must work together to guide the decision without requiring the user to read every row', 'Activity screen must clearly confirm vehicle type icon and provider, same icon system, confirmation context'] },
];

const researchActivities: { label: string; text: string }[] = [
  {
    label: 'User Interviews',
    text: 'Conducted interviews with approximately 20–30 frequent ride-hailing users, including friends, family members, and college students. The interviews focused on booking behaviour, fare comparison, vehicle selection, and frustrations with existing ride-hailing applications.',
  },
  {
    label: 'Competitive Product Analysis',
    text: 'Compared Uber, Ola, Rapido and Namma Yatri by analysing booking flows, navigation patterns, pricing presentation, vehicle iconography, and overall interaction design.',
  },
  {
    label: 'Visual Interface Audit',
    text: 'Evaluated existing vehicle icon systems for recognisability, consistency, scalability, and performance across light and dark interfaces.',
  },
  {
    label: 'Beta Product Validation',
    text: "Following implementation, the complete icon system and interface redesign were deployed through the application's TestFlight beta programme, making the redesign available to a substantial portion of the application's ~40,000 beta-user community before production release.",
  },
];

const researchGoals = [
  'How do riders compare prices before booking?',
  'What creates friction during ride selection?',
  'Why do existing ride-hailing applications feel visually similar?',
  'How can BOB Rides establish a distinctive visual identity without sacrificing usability?',
];

export default function BobRides() {
  useEffect(() => { document.title = 'BOB Rides , Sohum Bhatnagar'; }, []);
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
            <Reveal className="section-index">SEC.<b>00</b>: Icon Design &amp; UI/UX · 2025</Reveal>
            <Reveal as="h1">BOB Rides</Reveal>
            <Reveal as="p" className="lede">Designing a 3D vehicle icon system and dark-mode UI for a taxi aggregator that consolidates Uber, Ola, and Rapido into one app.</Reveal>
            <Reveal className="hero-tags">
              <span>3D icon system</span><span>Dark-mode native</span><span>Multi-app aggregator</span>
            </Reveal>
            {/* Project info — admissions-required metadata (location, context,
                individual/group, year of study, supervisor). Date is skipped:
                already shown in the SEC.00 line above ("· 2025"). Second pill
                row, identical shape to hero-tags, just visually quieter. */}
            <Reveal className="hero-tags hero-tags--meta">
              <span>Location: Bengaluru</span>
              <span>Context: Freelance</span>
              <span>Individual: design &amp; research</span>
              <span>Final year, B.Va</span>
              <span>No formal supervisor</span>
            </Reveal>
            <Reveal className="pipeline-row">
              <span className="pipeline-label">Pipeline</span>
              <span className="pipeline-tool">Figma</span><span className="pipeline-arrow" aria-hidden="true">→</span>
              <span className="pipeline-tool">Maya</span><span className="pipeline-arrow" aria-hidden="true">→</span>
              <span className="pipeline-tool">Photoshop</span><span className="pipeline-arrow" aria-hidden="true">→</span>
              <span className="pipeline-tool">AI</span>
            </Reveal>
          </div>
          <div className="wrap-wide" style={{ marginTop: 'var(--space-8)' }}>
            <Reveal variant="zoom" className="media-frame" data-speed="0.85">
              <img src="/images/bob-images/hero.webp" alt="BOB Rides Hero" />
            </Reveal>
          </div>
        </section>

        {/* AT A GLANCE — TLDR */}
        <section id="at-a-glance" className="section section--tight bg-soft">
          <div className="wrap">
            <Reveal className="section-index">AT A GLANCE</Reveal>
            <div className="feature-grid">
              <Reveal className="feature-cell">
                <span className="ord">What Shipped</span>
                <p>A ground-up 3D vehicle icon system designed specifically for Bob Rides, replacing flat 2D silhouettes across the booking flow.</p>
              </Reveal>
              <Reveal delay={staggerDelay(1)} className="feature-cell">
                <span className="ord">My Ownership</span>
                <p>Designed the full 3D icon set from scratch, distinct from every competitor, and led the shift from 2D to 3D across the product.</p>
              </Reveal>
              <Reveal delay={staggerDelay(2)} className="feature-cell">
                <span className="ord">What Changed</span>
                <p>The product moved from flat, generic 2D icons to a 3D system that feels alive and reads instantly.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SEC.01 — PROBLEM */}
        <section id="the-challenge" className="section bg-soft">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>01</b>: PROBLEM</Reveal>
            <Reveal as="h2">Three apps, one decision, every time</Reveal>
            <div className="problem-composition">
              <Reveal className="problem-copy">
                <p>Ride-hailing apps in India (Uber, Rapido, Ola, Namma Yatri) all use flat, generic vehicle silhouettes that offer zero brand differentiation. Users switch between 3 apps to compare prices, adding friction to every ride decision. BOB Rides needed a visual identity strong enough to stand apart, while keeping icons legible at 24px in a dark-mode-native interface.</p>
              </Reveal>
              <Reveal variant="scale" className="spec-plate">
                <div className="spec-row"><span className="spec-label">Apps users open before booking a ride</span><CountUp target={3} suffix="+" className="spec-value" /></div>
                <div className="spec-row"><span className="spec-label">Indian ride apps with 3D icon systems</span><CountUp target={4} prefix="<" className="spec-value" /></div>
                <div className="spec-row"><span className="spec-label">Minimum icon size for tab navigation</span><CountUp target={24} suffix="px" className="spec-value" /></div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SEC.02 — PROBLEM STATEMENT */}
        <section id="problem-statement" className="section">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>02</b>: PROBLEM</Reveal>
            <Reveal as="h2">Nobody had solved this for India</Reveal>
            <Reveal className="problem-copy" style={{ marginTop: 'var(--space-5)' }}>
              <p>Ride-hailing apps in the Indian market rely almost entirely on flat, generic vehicle icons that prioritize function over identity. Across Uber, Rapido, Ola, and Namma Yatri, the visual language is interchangeable silhouettes that tell users what vehicle type they are booking, but communicate nothing about the brand they are booking with.</p>
              <p style={{ marginTop: 'var(--space-4)' }}>The challenge for BOB Rides was to design a vehicle icon system that solved two competing demands simultaneously: icons that are instantly recognisable and legible at small UI sizes, and icons that carry a distinct visual character strong enough to differentiate BOB Rides from every other player in the category. The additional constraint was that the entire system had to be built for a dark-mode-native interface, a context that most existing icon styles in the market were never designed for.</p>
            </Reveal>
          </div>
        </section>

        <Reveal variant="rotate" as="section" className="moment">
          <p>How do you create 3D vehicle icons that feel familiar enough for a user to identify at a glance, while being visually distinctive enough that the app they appear in could not be mistaken for any competitor?</p>
        </Reveal>

        {/* SEC.04 — STRATEGY */}
        <section id="objectives-goals" className="section bg-paper">
          <div className="wrap-wide">
            <Reveal className="section-index">SEC.<b>04</b>: STRATEGY</Reveal>
            <Reveal as="h2">Objectives &amp; Goals</Reveal>
            <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {objectivesGoals.map((text, i) => (
                <Reveal key={i} variant="scale" delay={staggerDelay(i)} className="feature-cell">
                  <span className="ord">{String(i + 1).padStart(2, '0')}</span><p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SEC.05 — RESEARCH: Business Challenges */}
        <section id="business-challenges" className="section">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>05</b>: RESEARCH</Reveal>
            <Reveal as="h2">Business Challenges</Reveal>
            {businessChallenges.map((text, i) => (
              <Reveal key={i} variant="scale" className="feature-cell" style={{ marginTop: i === 0 ? 'var(--space-6)' : 'var(--space-5)', maxWidth: '56ch' }}>
                <span className="ord">{String(i + 1).padStart(2, '0')}</span><p>{text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SEC.06 — RESEARCH: Research Approach */}
        <section id="research-approach" className="section">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>06</b>: RESEARCH</Reveal>
            <Reveal as="h2">Research Approach</Reveal>
            <Reveal className="problem-copy" style={{ marginTop: 'var(--space-5)' }}>
              <p>To understand how users compare ride-hailing services and identify opportunities for product differentiation, I combined qualitative user research with competitive product analysis. Rather than relying on secondary sources, the research was grounded in direct conversations with riders and hands-on evaluation of existing ride-hailing platforms.</p>
            </Reveal>

            <Reveal as="p" className="sheet-subtitle" style={{ marginTop: 'var(--space-7)' }}>Research Activities</Reveal>
            <Reveal style={{ overflowX: 'auto' }}>
              <table className="ed">
                <thead>
                  <tr>
                    <th scope="col">Activity</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {researchActivities.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <td>{row.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            <Reveal as="p" className="sheet-subtitle" style={{ marginTop: 'var(--space-7)' }}>Research Goals</Reveal>
            <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {researchGoals.map((text, i) => (
                <Reveal key={i} variant="scale" delay={staggerDelay(i)} className="feature-cell">
                  <span className="ord">{String(i + 1).padStart(2, '0')}</span><p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SEC.07 — RESEARCH: Competitor Analysis */}
        <section id="competitor-analysis" className="section section--roomy bg-soft">
          <div className="wrap-wide" style={{ textAlign: 'center' }}>
            <Reveal className="section-index">SEC.<b>07</b>: RESEARCH</Reveal>
            <Reveal as="h2">What every competitor got wrong</Reveal>
            <Reveal as="p" className="lede" style={{ marginInline: 'auto' }}>Competitors: OLA, Rapido, Uber, Namma Yatri</Reveal>
          </div>
          <div className="wrap" style={{ marginTop: 'var(--space-7)' }}>
            {competitorPoints.map((text, i) => (
              <Reveal key={i} className="arrow-point" style={{ marginTop: i === 0 ? 0 : 'var(--space-5)' }}>
                <LuArrowRight className="arrow-point-icon" aria-hidden="true" />
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SEC.08 — RESEARCH: Product Users */}
        <section id="product-users" className="section section--tight">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>08</b>: RESEARCH</Reveal>
            <Reveal as="h2">The user was never the hard part</Reveal>
            <Reveal variant="scale" className="media-frame" style={{ marginTop: 'var(--space-6)' }}>
              <img src="/images/bob-images/product-users.webp" alt="Product Users" loading="lazy" decoding="async" />
            </Reveal>
          </div>
        </section>

        {/* SEC.09 — RESEARCH: User Persona */}
        <section id="user-persona" className="section bg-paper">
          <div className="wrap-wide">
            <Reveal className="section-index">SEC.<b>09</b>: RESEARCH</Reveal>
            <Reveal as="h2">Meet Rahul</Reveal>
            <Reveal as="p" className="sheet-subtitle" style={{ maxWidth: 640 }}>Note: This persona is a synthesis of recurring behaviours and patterns observed during user interviews. It represents the common needs and frustrations of frequent ride-hailing users rather than a single individual.</Reveal>
            <div style={{ marginTop: 'var(--space-6)', maxWidth: 640 }}>
              <Reveal as="h3" style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.005em' }}>Rahul Kumar</Reveal>
              <Reveal as="p" style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginTop: 4 }}>Community Manager</Reveal>
              <Reveal as="span" className="meta-label" style={{ marginTop: 'var(--space-5)' }}>About</Reveal>
              <Reveal className="hero-tags" style={{ marginTop: 'var(--space-2)' }}><span>35</span><span>Bangalore</span><span>MBA</span><span>Employee</span></Reveal>
              <Reveal as="span" className="meta-label" style={{ marginTop: 'var(--space-6)' }}>Description</Reveal>
              <Reveal className="problem-copy"><p style={{ fontSize: '0.96rem' }}>Rahul commutes daily across Bengaluru using a mix of bike taxis and autos depending on traffic and time of day. He has Rapido, Uber, and Ola installed and manually checks prices before every booking.</p></Reveal>
              <Reveal as="span" className="meta-label" style={{ marginTop: 'var(--space-6)' }}>A day in their life</Reveal>
              <Reveal className="problem-copy">
                <p style={{ fontSize: '0.96rem' }}>Opens 2–3 different ride apps every morning to compare prices before booking</p>
                <p style={{ fontSize: '0.96rem', marginTop: 'var(--space-2)' }}>Regularly switches between bike and auto depending on availability and surge pricing</p>
                <p style={{ fontSize: '0.96rem', marginTop: 'var(--space-2)' }}>Uses dark mode across all his apps by default</p>
              </Reveal>
              <Reveal as="span" className="meta-label" style={{ marginTop: 'var(--space-6)' }}>Pain points</Reveal>
              <Reveal className="problem-copy">
                <p style={{ fontSize: '0.96rem' }}>Wastes 3–5 minutes every commute switching between apps to find the best fare</p>
                <p style={{ fontSize: '0.96rem', marginTop: 'var(--space-2)' }}>Can't tell which vehicle icon belongs to which service tier without reading the label</p>
                <p style={{ fontSize: '0.96rem', marginTop: 'var(--space-2)' }}>Existing apps feel visually identical, no sense of which one he's actually on</p>
              </Reveal>
            </div>
          </div>
        </section>

        <Reveal variant="rotate" as="section" className="moment">
          <p>"I just want to see all my options in one place and book the cheapest one. Why do I have to open three apps for that?"</p>
        </Reveal>

        {/* SEC.10 — RESEARCH: User Needs */}
        <section id="user-needs" className="section section--tight">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>10</b>: RESEARCH</Reveal>
            <Reveal as="h2">What riders actually needed</Reveal>
            {userNeeds.map((text, i) => (
              <Reveal key={i} variant="scale" className="feature-cell" style={{ marginTop: i === 0 ? 'var(--space-6)' : 'var(--space-5)', maxWidth: '56ch' }}>
                <span className="ord">{String(i + 1).padStart(2, '0')}</span><p>{text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SEC.11 — DESIGN: Features & Functionalities */}
        <section id="features-functionalities" className="section bg-soft">
          <div className="wrap-wide">
            <Reveal className="section-index">SEC.<b>11</b>: DESIGN</Reveal>
            <Reveal as="h2">Features &amp; Functionalities</Reveal>
            <Reveal as="p" className="sheet-subtitle">To resolve user needs</Reveal>
            <div className="feature-grid">
              {features.map((f, i) => (
                <Reveal key={f.ord} variant="scale" delay={staggerDelay(i)} className="feature-cell">
                  <span className="feature-cell-icon"><f.Icon /></span>
                  <span className="ord">{f.ord}</span><p>{f.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SEC.12 — DESIGN: Product User Challenges */}
        <section id="product-user-challenges" className="section">
          <div className="wrap-wide">
            <Reveal className="section-index">SEC.<b>12</b>: DESIGN</Reveal>
            <Reveal as="h2">What was actually broken for users</Reveal>
            <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {productUserChallenges.map((text, i) => (
                <Reveal key={i} delay={staggerDelay(i)} className="arrow-point">
                  <LuArrowRight className="arrow-point-icon" aria-hidden="true" />
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SEC.13 — DESIGN: Unique Features */}
        <section id="unique-features" className="section bg-paper">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>13</b>: DESIGN</Reveal>
            <Reveal as="h2">Unique Features</Reveal>
            {uniqueFeatures.map((text, i) => (
              <Reveal key={i} className="feature-cell" style={{ marginTop: i === 0 ? 'var(--space-6)' : 'var(--space-5)', maxWidth: '56ch' }}>
                <span className="ord">{String(i + 1).padStart(2, '0')}</span><p>{text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SEC.14 — DESIGN: Task Mapping */}
        <section id="task-mapping" className="section">
          <div className="wrap-wide cinema-head">
            <Reveal className="section-index">SEC.<b>14</b>: DESIGN</Reveal>
            <Reveal as="h2">Every tap is a decision point</Reveal>
          </div>
          <div className="wrap-wide">
            <Reveal style={{ overflowX: 'auto', marginTop: 'var(--space-7)' }}>
              <table className="ed">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Step 1: Open App</th>
                    <th scope="col">Step 2: Find a Ride</th>
                    <th scope="col">Step 3: Select &amp; Book</th>
                    <th scope="col">Step 4: Complete Ride</th>
                  </tr>
                </thead>
                <tbody>
                  {taskMappingRows.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      {row.cells.map((cell, ci) => <td key={ci}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        {/* SEC.15 — DESIGN: Eisenhower Matrix */}
        <section id="eisenhower-matrix" className="section bg-soft">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>15</b>: DESIGN</Reveal>
            <Reveal as="h2">Eisenhower Matrix</Reveal>
            <Reveal variant="scale" className="media-frame" style={{ marginTop: 'var(--space-6)' }}>
              <img src="/images/bob-images/eisen-hover-matrix.webp" alt="Eisenhower Matrix" loading="lazy" decoding="async" />
            </Reveal>
          </div>
        </section>

        {/* SEC.16 — ANALYSIS: Three decisions that shaped the system */}
        <section id="key-decisions" className="section band bg-dark">
          <div className="band-inner wrap-wide">
            <Reveal className="section-index">SEC.<b>16</b>: ANALYSIS</Reveal>
            <Reveal as="h2">Three decisions that shaped the system</Reveal>
            <div className="feature-grid">
              {decisions.map((d, i) => (
                <Reveal key={i} variant="scale" delay={staggerDelay(i)} className="spec-plate" style={{ padding: 'var(--space-5)' }}>
                  <span className="spec-label">Decision {String(i + 1).padStart(2, '0')}</span>
                  <p style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 'var(--space-2)', fontSize: '1.02rem' }}>{d.name}</p>
                  <span className="meta-label" style={{ marginTop: 'var(--space-5)' }}>The Tradeoff</span>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: 1.6 }}>{d.tradeoff}</p>
                  <span className="meta-label" style={{ marginTop: 'var(--space-4)' }}>Why It Won</span>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: 1.6 }}>{d.whyItWon}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SEC.17 — DESIGN: Sketches */}
        <section id="sketches" className="section bg-paper">
          <div className="wrap-wide">
            <Reveal className="section-index">SEC.<b>17</b>: DESIGN</Reveal>
            <Reveal as="h2">Sketches</Reveal>
            <Reveal variant="rotate" className="media-frame" style={{ maxWidth: 880, marginTop: 'var(--space-6)' }}>
              <img src="/images/bob-images/sketches.webp" alt="Sketches" loading="lazy" decoding="async" />
            </Reveal>
            <p className="meta-label" style={{ marginTop: 'var(--space-3)' }}>Original concept sketches: Sohum Bhatnagar</p>
          </div>
        </section>

        {/* SEC.18 — DESIGN: Final Icons */}
        <section id="final-icons" className="section section--roomy band bg-dark">
          <div className="band-inner wrap-wide">
            <Reveal className="section-index">SEC.<b>18</b>: DESIGN</Reveal>
            <Reveal as="h2">Final Icons</Reveal>
            <div className="icons-row">
              <Reveal variant="scale" delay={staggerDelay(0)} className="icon-cell"><img src="/images/bob-images/Car.webp" alt="BOB Rides 3D cab icon" loading="lazy" decoding="async" /><span>Cab</span></Reveal>
              <Reveal variant="scale" delay={staggerDelay(1)} className="icon-cell"><img src="/images/bob-images/Bike.webp" alt="BOB Rides 3D bike icon" loading="lazy" decoding="async" /><span>Bike</span></Reveal>
              <Reveal variant="scale" delay={staggerDelay(2)} className="icon-cell"><img src="/images/bob-images/Auto.webp" alt="BOB Rides 3D auto-rickshaw icon" loading="lazy" decoding="async" /><span>Auto</span></Reveal>
            </div>
          </div>
        </section>

        {/* SEC.19 — DESIGN SYSTEM */}
        <section id="icon-system" className="section section--roomy bg-paper">
          <div className="wrap cinema-head">
            <Reveal className="section-index">SEC.<b>19</b>: DESIGN SYSTEM</Reveal>
            <Reveal as="h2">Icon System</Reveal>
            <Reveal as="p" className="lede" style={{ marginInline: 'auto' }}>
              The icon system spans two production generations, flat 2D isometric to full-colour 3D with cast shadows. View the full version history, evolution rationale, and spec documentation in Figma.
            </Reveal>
            <Reveal style={{ marginTop: 'var(--space-7)' }}>
              <a className="preview-cta" href="https://www.figma.com/design/6doJgq0YhHNlCkv7mLwwLy/bob-UI-Sohum?node-id=732-1630" target="_blank" rel="noopener noreferrer">View Icon System in Figma →</a>
            </Reveal>
          </div>
        </section>

        {/* SEC.20 — DESIGN: Major Screens */}
        <section id="major-screens" className="section section--roomy band bg-dark">
          <div className="band-inner cinema-head">
            <Reveal className="section-index">SEC.<b>20</b>: DESIGN</Reveal>
            <Reveal as="h2">Major Screens</Reveal>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'var(--space-6)', marginTop: 'var(--space-7)', maxWidth: 1800, marginInline: 'auto', paddingInline: 'var(--space-5)' }}>
            {[
              { name: 'home-screen-1', label: 'Home Screen' },
              { name: 'home-screen-2', label: 'Ride Selection' },
              { name: 'home-screen-3', label: 'Ride Details' },
            ].map(({ name, label }, i) => (
              <div key={name} style={{ flex: '1 1 480px', maxWidth: 560 }}>
                <Reveal
                  as="p"
                  delay={staggerDelay(i)}
                  style={{ textAlign: 'center', fontWeight: 600, color: 'var(--cream)', marginBottom: 'var(--space-4)' }}
                >
                  {label}
                </Reveal>
                <Reveal
                  variant="zoom"
                  delay={staggerDelay(i)}
                  className="media-frame"
                  style={{ borderColor: 'rgba(244,243,240,0.12)', background: 'var(--screen-bg)' }}
                >
                  <img src={`/images/bob-images/major-screens-${name}.webp`} alt={label} loading="lazy" decoding="async" />
                </Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* SEC.21 — OUTCOME */}
        <section id="what-we-built" className="section section--tight">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>21</b>: OUTCOME</Reveal>
            <Reveal as="h2">What We Built</Reveal>
            <Reveal variant="scale" className="facts-row">
              <div><span className="meta-label">3D vehicle icon system built for BOB Rides</span><span className="meta-value">3D</span></div>
              <div><span className="meta-label">Native dark-mode UI built from ground up</span><span className="meta-value">Dark</span></div>
              <div><span className="meta-label">Uber, Ola &amp; Rapido compared in one screen</span><span className="meta-value">1 app</span></div>
            </Reveal>
          </div>
        </section>

        {/* SEC.22 — OUTCOME: Validation */}
        <section id="validation" className="section section--tight bg-soft">
          <div className="wrap">
            <Reveal className="section-index">SEC.<b>22</b>: OUTCOME</Reveal>
            <Reveal as="h2">Validation</Reveal>
            <Reveal className="problem-copy" style={{ marginTop: 'var(--space-5)' }}>
              <p>Following implementation, the redesigned icon system and interface were released through the application's TestFlight beta programme before being promoted to production.</p>
              <p style={{ marginTop: 'var(--space-4)' }}>This beta release made the redesigned experience available to a substantial portion of the product's approximately 40,000 beta users, allowing the team to observe real-world usage and gather feedback before production rollout.</p>
              <p style={{ marginTop: 'var(--space-4)' }}>Feedback from the beta release was positive, supporting the decision to promote the redesigned experience to the live product.</p>
            </Reveal>
            <Reveal variant="scale" className="facts-row facts-row--four" style={{ marginTop: 'var(--space-7)' }}>
              <div><span className="meta-label">User Interviews</span><span className="meta-value">20–30</span></div>
              <div><span className="meta-label">Competitor Products Analysed</span><span className="meta-value">4</span></div>
              <div><span className="meta-label">Beta Users Exposed</span><span className="meta-value">~40K</span></div>
              <div><span className="meta-label">Release Status</span><span className="meta-value">Production</span></div>
            </Reveal>
          </div>
        </section>

        {/* SEC.23 — CLOSE */}
        <section id="close" className="section section--roomy bg-paper">
          <div className="wrap" style={{ display: 'flex', justifyContent: 'center' }}>
            <Reveal className="media-frame" style={{ maxWidth: 480 }}>
              <img src="/images/bob-images/thank-you.webp" alt="Thank You" loading="lazy" decoding="async" />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer showEmailCta={false} showBehance={false} />
    </div>
  );
}
