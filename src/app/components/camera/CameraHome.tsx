import { useEffect, useRef } from 'react';
import { Reveal } from './Reveal';
import { ROUTES } from '../../routes';

type Project = {
  title: string;
  category: string;
  year: string;
  role: string;
  tag: string;
  problem: string;
  overview: string;
  problemHeading?: string;
  problemBody?: string;
  insightHeading?: string;
  insightBody?: string;
  tradeoffHeading?: string;
  tradeoffBody?: string;
  solutionHeading?: string;
  solutionBody?: string;
  impactHeading?: string;
  impactBody?: string;
  reflectionHeading?: string;
  reflectionBody?: string;
  image?: string;
  video?: string;
  thumbVideo?: string;
  thumbAnimated?: boolean;
  thumbZoom?: number;
  thumbPosition?: string;
  compareBefore?: string;
  compareAfter?: string;
  compare?: boolean;
  ctaLabel?: string;
  external?: boolean;
  url: string;
};

const PROJECTS: Project[] = [
  {
    title: 'Bob Rides', category: 'Ride-hailing · Mobile UX', year: '2025', role: 'Sole Designer', tag: 'Shipped',
    problem: 'Every ride app in India used the same flat vehicle silhouettes — zero brand differentiation, three apps open just to compare a fare.',
    overview: 'A live ride-hailing aggregator that compares Uber, Ola, and Rapido in one screen — sole designer across a full 3D vehicle icon system and a dark-mode-native token system.',
    problemHeading: 'Every ride app in India used the same flat, generic vehicle icons — zero brand differentiation, and riders opened three apps just to compare prices.',
    problemBody: 'Uber, Ola, Rapido, and Namma Yatri all use interchangeable silhouettes that communicate vehicle type but nothing about the brand behind it. The icons also had to stay legible at 24px in a dark-mode-native interface — a context most existing icon styles were never designed for.',
    insightHeading: 'The brief was never just "differentiate the icon set" — it was "read as a vehicle instantly, and read as ours instantly," at the same time.',
    insightBody: 'No Indian ride-hailing app had shipped a 3D icon system, so there was no category precedent to build on. Most teams default to flat vectors because it is the established pattern, not because it is the better answer for a dark-mode aggregator comparing three brands at once.',
    tradeoffHeading: 'Chose full dimensional 3D renders over faster-to-produce flat vectors, even though 3D is harder to keep legible at small sizes.',
    tradeoffBody: '3D added real production time — modeled in Blender, refined across two generations from flat isometric to full-color renders with cast shadows — but it was the only way to hit both goals without one undercutting the other.',
    solutionHeading: 'The icon system spans two production generations — flat 2D isometric to full-color 3D — unified by one shared token system.',
    solutionBody: 'Built the comparison and booking flow around a shared component and token system, so pricing and iconography stayed visually consistent across bike, auto, and cab tiers through both generations.',
    impactHeading: 'BOB Rides shipped with a fully 3D-rendered vehicle icon system, built dark-mode-native from the ground up.',
    impactBody: 'The final app lets riders compare Uber, Ola, and Rapido fares in one screen with a real-time Best Price indicator — collapsing the habit of switching between three apps into one.',
    reflectionHeading: 'The 3D icon direction paid off, but it is a heavier production pipeline than the category is used to.',
    reflectionBody: 'Next time I would build the 24px tab-bar legibility testing earlier in the process, rather than after the first full render pass.',
    image: '/images/bob-thumbnail.png',
    thumbVideo: '/videos/bob-rides-preview.mp4',
    thumbAnimated: true, thumbZoom: 1.65, thumbPosition: 'center 38%',
    url: ROUTES.bobRides,
  },
  {
    title: 'UUCMS Redesign', category: 'EdTech · Responsive Web', year: '2025', role: 'Product Designer', tag: 'Completed',
    problem: 'Finding your own exam marks on a government university portal took 10–15 minutes, with zero back button.',
    overview: 'A redesign of UUCMS, the official student portal for Karnataka’s Department of Higher Education, used by students across the state each term.',
    problemHeading: 'Finding your own exam marks on UUCMS took 10–15 minutes, buried in an admin-centric structure with zero back button.',
    problemBody: 'Results were filed under exam and fee categories with no logical grouping, hover flyouts required pixel-precise interaction, and some students could not navigate it without calling a friend for help.',
    insightHeading: 'Students weren’t confused by the forms — they were exhausted by the number of screens.',
    insightBody: 'A heuristic audit against Nielsen’s 10 usability heuristics turned up zero back navigation, admin-centric labelling, and no wayfinding — not one single broken form. The system itself was the obstacle.',
    tradeoffHeading: 'Consolidating the flow onto fewer screens meant packing more information onto each one.',
    tradeoffBody: 'Offset the added density with progressive disclosure — SGPA, payment status, and events surface immediately on the dashboard, with further detail only one tap away.',
    solutionHeading: 'Twelve steps became four, folded into one guided flow.',
    solutionBody: 'Rewrote every navigation label around student goals instead of backend structure, and gave every page in the redesign breadcrumbs, an active sidebar state, and a consistent shell.',
    impactHeading: 'Task completion dropped from 12 steps to 4, and time to find results dropped from roughly 15 minutes to under 60 seconds.',
    impactBody: 'Every student interviewed after the redesign could navigate to their results independently — a task that previously required help for less tech-savvy students.',
    reflectionHeading: 'The fix was never more features — it was fewer, better-named screens.',
    reflectionBody: 'If I rebuilt it today, I’d push for structured usability testing with a larger student sample before locking the IA, rather than relying mainly on personal use and peer interviews.',
    image: '/images/uucms-thumbnail.png',
    compareBefore: '/images/original-uucms.png',
    compareAfter: '/images/redesigned-dashboard.png',
    compare: true,
    url: ROUTES.caseStudy,
  },
  {
    title: 'Rewind', category: 'Hardware UI · Makeathon', year: '2026', role: 'Designer & Builder', tag: 'Submitted',
    problem: 'Browser music players default to flat transport controls, with none of the tactile feedback of a physical device.',
    overview: 'A nostalgic, hardware-inspired browser music player with spatial audio — built for the Figma Config Makeathon 2026 using the Web Audio API.',
    problemHeading: 'Browser music players default to flat transport controls — play, pause, seek — with none of the tactile feedback of a real device.',
    problemBody: 'Built for the Figma Config Makeathon 2026, Rewind set out to prove a hardware metaphor could work as a real, usable browser interface rather than a static mockup.',
    insightHeading: 'A click wheel and physical faders give the ear something to trust before the audio even plays.',
    insightBody: 'Once the interface had real drag physics and spatial audio panning tied to physical-feeling controls, people testing it stopped treating it like a novelty and started using it like an instrument.',
    tradeoffHeading: 'Chose full interaction fidelity — drag physics, Web Audio API spatial processing — over breadth of features, given the makeathon timeline.',
    tradeoffBody: 'That meant shipping fewer total features, but the ones that shipped worked convincingly instead of existing as decoration.',
    solutionHeading: 'Disc slots, EQ, faders, and a click wheel — built as a working prototype, not a mockup.',
    solutionBody: 'Designed a full hardware-metaphor interaction system with spatial audio processing and shipped it as a working browser prototype within the makeathon window.',
    impactHeading: 'Submitted to Figma Config Makeathon 2026.',
    impactBody: 'This portfolio’s color and type tokens were carried forward directly from Rewind — the click wheel in the dock below is a direct descendant of that build.',
    reflectionHeading: 'Building a convincing physical metaphor in the browser is mostly about interruption-safe animation, not visual polish.',
    reflectionBody: 'The feature testers asked for most was persistence — saved EQ presets — which is the first thing I’d add if I extended it.',
    video: '/videos/rewind-preview.mp4',
    thumbVideo: '/videos/rewind-preview.mp4',
    url: ROUTES.rewindCaseStudy,
  },
  // 3D explorations — pulled from ExplorationsPage.tsx. Art pieces, not UX
  // case studies: brief description only, CTA opens ArtStation in a new tab.
  {
    title: 'Lamborghini Huracán', category: '3D · Automotive', year: '2025', role: '3D Artist', tag: 'ArtStation',
    problem: 'Hard-surface automotive study — a full-body model of the Lamborghini Huracán, shaded and staged for final renders.',
    overview: 'A hard-surface automotive study: full-body model of the Lamborghini Huracán, shaded and staged for a set of final renders.',
    image: 'https://cdna.artstation.com/p/assets/images/images/088/801/282/large/sohum-group-8.jpg?1749204965',
    ctaLabel: 'Go to project →', external: true,
    url: 'https://www.artstation.com/artwork/6L2NGw',
  },
  {
    title: 'Huntsman Knife', category: '3D · Prop', year: '2025', role: '3D Artist', tag: 'ArtStation',
    problem: 'Hard-surface prop study — a huntsman knife modeled, textured, and staged in a lit scene.',
    overview: 'A hard-surface prop study: a huntsman knife modeled, textured, and staged in a lit scene composition.',
    image: 'https://cdna.artstation.com/p/assets/images/images/089/857/486/large/sohum-knife-scene-ps-copy.jpg?1752143066',
    ctaLabel: 'Go to project →', external: true,
    url: 'https://www.artstation.com/artwork/mAYEBd',
  },
  {
    title: 'Ancient Temple Ruins', category: '3D · Environment', year: '2025', role: '3D Artist', tag: 'ArtStation',
    problem: 'Environment piece — ancient temple ruins built from modular assets and rendered in Unreal Engine.',
    overview: 'An environment piece: ancient temple ruins assembled from modular assets and rendered in Unreal Engine.',
    image: 'https://cdna.artstation.com/p/assets/images/images/090/415/182/large/sohum-newlevelsequence-0000.jpg?1753859721',
    ctaLabel: 'Go to project →', external: true,
    url: 'https://www.artstation.com/artwork/dyV6QA',
  },
];

const SECTIONS = [
  { key: 'VIEWFINDER', id: 'viewfinder', angle: -90 },
  { key: 'WORK', id: 'sheet', angle: -45 },
  { key: 'ABOUT', id: 'notes', angle: 0 },
  { key: 'PHOTOGRAPHY', id: 'writing', angle: 45 },
  { key: 'CONTACT', id: 'contact', angle: 90 },
];
const WORK_INDEX = 1;

const PHOTOS = [
  { img: '/images/about/eagle.jpg', title: 'Crested Hawk-Eagle', desc: 'Patience is just focus with nowhere to be.' },
  { img: '/images/about/leopard.jpg', title: 'Leopard', desc: 'Spent 20 minutes staring before I saw it.' },
  { img: '/images/about/peacock.jpg', title: 'Indian Peacock', desc: 'The blue that made me reconsider every UI I had ever built.' },
  { img: '/images/about/bee-eater.jpg', title: 'Green Bee-eater', desc: "Nature's color palette beats any Figma swatch." },
];

const TOOLS: { name: string; icon: JSX.Element }[] = [
  { name: 'Claude', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 L13.4 10.6 L21 12 L13.4 13.4 L12 21 L10.6 13.4 L3 12 L10.6 10.6 Z" /></svg> },
  { name: 'Figma', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx={12} cy={6.5} r={3} /><rect x={9} y={9.5} width={6} height={6} rx={3} /><circle cx={12} cy={18.5} r={3} /></svg> },
  { name: 'Blender', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4H18V10H12L18 16H12V21L6 15V10H12L6 4Z" /></svg> },
  {
    name: 'React', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <circle cx={12} cy={12} r={1.6} fill="currentColor" stroke="none" />
        <ellipse cx={12} cy={12} rx={9} ry={3.6} />
        <ellipse cx={12} cy={12} rx={9} ry={3.6} transform="rotate(60 12 12)" />
        <ellipse cx={12} cy={12} rx={9} ry={3.6} transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: 'Photoshop', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <rect x={2.5} y={4.5} width={19} height={15} rx={2.5} />
        <text x={12} y={15.2} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={8} fill="currentColor" stroke="none">Ps</text>
      </svg>
    ),
  },
  {
    name: 'Illustrator', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <rect x={2.5} y={4.5} width={19} height={15} rx={2.5} />
        <text x={12} y={15.2} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={8} fill="currentColor" stroke="none">Ai</text>
      </svg>
    ),
  },
  { name: 'Maya', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 3L19 10L12.2 12L10 19.5L5 3Z" /></svg> },
];

export default function CameraHome() {
  const bootRef = useRef<HTMLDivElement>(null);
  const focusFrameRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const floatingNavRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const miniScreenRef = useRef<HTMLDivElement>(null);
  const miniZoneRef = useRef<HTMLDivElement>(null);
  const miniCounterRef = useRef<HTMLDivElement>(null);
  const infoBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const focusCueRef = useRef<HTMLAnchorElement>(null);
  const wheelUpRef = useRef<HTMLButtonElement>(null);
  const wheelDownRef = useRef<HTMLButtonElement>(null);
  const wheelLeftRef = useRef<HTMLButtonElement>(null);
  const wheelRightRef = useRef<HTMLButtonElement>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewTagRef = useRef<HTMLSpanElement>(null);
  const previewTitleRef = useRef<HTMLHeadingElement>(null);
  const previewCategoryRef = useRef<HTMLSpanElement>(null);
  const previewYearRef = useRef<HTMLSpanElement>(null);
  const previewRoleRef = useRef<HTMLSpanElement>(null);
  const previewOverviewRef = useRef<HTMLParagraphElement>(null);
  const previewNarrativeRef = useRef<HTMLDivElement>(null);
  const previewCtaRef = useRef<HTMLAnchorElement>(null);
  const compareSliderRef = useRef<HTMLDivElement>(null);
  const compareBeforeRef = useRef<HTMLDivElement>(null);
  const compareAfterRef = useRef<HTMLDivElement>(null);
  const compareHandleRef = useRef<HTMLDivElement>(null);
  const deviceFrameRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const momentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const boot = bootRef.current;
    const mainEl = mainRef.current;
    const focusFrame = focusFrameRef.current;
    const floatingNav = floatingNavRef.current;
    const wheel = wheelRef.current;
    const needle = needleRef.current;
    const controls = controlsRef.current;
    const miniScreen = miniScreenRef.current;
    const miniZone = miniZoneRef.current;
    const miniCounter = miniCounterRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    const preview = previewRef.current;
    const previewTag = previewTagRef.current;
    const previewTitle = previewTitleRef.current;
    const previewCategory = previewCategoryRef.current;
    const previewYear = previewYearRef.current;
    const previewRole = previewRoleRef.current;
    const previewOverview = previewOverviewRef.current;
    const previewNarrative = previewNarrativeRef.current;
    const previewCta = previewCtaRef.current;
    const compareSlider = compareSliderRef.current;
    const compareBeforeEl = compareBeforeRef.current;
    const compareAfterEl = compareAfterRef.current;
    const compareHandle = compareHandleRef.current;
    const deviceFrameEl = deviceFrameRef.current;
    const heroEl = heroRef.current;
    const momentEl = momentRef.current;

    if (!boot || !mainEl || !floatingNav || !wheel || !needle || !controls || !track || !viewport || !prevBtn || !nextBtn || !preview) {
      return;
    }

    const cleanups: Array<() => void> = [];
    const on = <K extends keyof WindowEventMap>(target: EventTarget, evt: K | string, fn: EventListenerOrEventListenerObject, opts?: AddEventListenerOptions) => {
      target.addEventListener(evt, fn, opts);
      cleanups.push(() => target.removeEventListener(evt, fn, opts));
    };

    // ---- FLOATING NAV: THEME DETECTION -------------------------------------
    const FNAV_DEBUG = false; // verified correct; logging muted by default

    function sampleThemeAt(el: HTMLElement) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return { theme: 'light' as const };
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const points = [
        { x: cx, y: cy },
        { x: cx, y: rect.top + 1 },
        { x: cx, y: rect.bottom - 1 },
        { x: rect.left + 1, y: cy },
        { x: rect.right - 1, y: cy },
      ];
      const prevPointerEvents = el.style.pointerEvents;
      el.style.pointerEvents = 'none';
      let darkCount = 0;
      points.forEach((p) => {
        const x = Math.max(0, Math.min(window.innerWidth - 1, p.x));
        const y = Math.max(0, Math.min(window.innerHeight - 1, p.y));
        const hit = document.elementFromPoint(x, y);
        const themed = hit && hit.closest ? (hit.closest('[data-theme]') as HTMLElement | null) : null;
        const pointTheme = themed && themed.dataset.theme === 'dark' ? 'dark' : 'light';
        if (pointTheme === 'dark') darkCount++;
      });
      el.style.pointerEvents = prevPointerEvents;
      const result = darkCount >= 3 ? 'dark' : 'light';
      if (FNAV_DEBUG) console.log('[floating-nav theme] dark votes:', darkCount, '/ 5 — applied theme:', result);
      return { theme: result as 'dark' | 'light' };
    }

    function updateFloatingNavThemes() {
      if (getComputedStyle(floatingNav).display === 'none') return;
      const result = sampleThemeAt(floatingNav);
      floatingNav.classList.toggle('theme-dark', result.theme === 'dark');
    }

    let fnavThemeTicking = false;
    function requestFloatingNavThemeUpdate() {
      if (fnavThemeTicking) return;
      fnavThemeTicking = true;
      requestAnimationFrame(() => { updateFloatingNavThemes(); fnavThemeTicking = false; });
    }

    // ---- BOOT SEQUENCE ----------------------------------------------------
    (function boot_() {
      const dot3 = focusFrame ? focusFrame.querySelector('.dot-3') : null;
      const bootMark = boot.querySelector('.boot-mark');
      const bootChecks = boot.querySelectorAll('.boot-check');
      let bootDone = false;
      let timers: number[] = [];

      const schedule = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)); };
      const clearPending = () => { timers.forEach(clearTimeout); timers = []; };

      function reveal() { requestFloatingNavThemeUpdate(); }

      function finishBoot() {
        if (bootDone) return;
        bootDone = true;
        clearPending();
        boot!.classList.add('iris-open');
        setTimeout(() => boot!.classList.add('hidden'), 300);
        setTimeout(() => boot!.classList.add('gone'), 620);
        setTimeout(() => {
          if (focusFrame) focusFrame.classList.add('show');
          setTimeout(() => {
            if (dot3) dot3.classList.add('in');
            mainEl!.classList.remove('pre-focus');
            mainEl!.classList.add('in-focus');
            if (focusFrame) focusFrame.classList.remove('show');
          }, 1300);
        }, 260);
        reveal();
      }

      function skipBoot() {
        if (bootDone) return;
        bootDone = true;
        clearPending();
        boot!.classList.add('iris-open', 'hidden', 'gone');
        mainEl!.classList.remove('pre-focus');
        mainEl!.classList.add('in-focus');
        if (dot3) dot3.classList.add('in');
        if (focusFrame) focusFrame.classList.remove('show');
        reveal();
      }

      let alreadyBooted = false;
      try { alreadyBooted = sessionStorage.getItem('sb-booted') === '1'; } catch (e) { /* private mode */ }
      function markBooted() { try { sessionStorage.setItem('sb-booted', '1'); } catch (e) { /* private mode */ } }

      if (prefersReduced || alreadyBooted) {
        skipBoot();
        markBooted();
      } else {
        if (bootMark) schedule(() => bootMark.classList.add('in'), 40);
        schedule(() => {
          bootChecks.forEach((chk, i) => {
            schedule(() => chk.classList.add('in'), i * 65);
            schedule(() => chk.classList.add('ready'), i * 65 + 90);
          });
        }, 180);
        schedule(() => { finishBoot(); markBooted(); }, 900);
        schedule(() => { skipBoot(); markBooted(); }, 3400);
      }

      ['click', 'keydown', 'wheel', 'touchstart'].forEach((evt) => {
        on(window, evt, () => { skipBoot(); markBooted(); }, { once: true, passive: true });
      });
    })();

    // ---- FLOATING NAV: LAYOUT ----------------------------------------------
    const fnavLine = document.createElement('div');
    fnavLine.className = 'floating-nav__line';
    floatingNav.appendChild(fnavLine);

    const sectionEls = SECTIONS.map((s) => ({
      ...s,
      navItem: (() => {
        const item = document.createElement('button');
        item.className = 'floating-nav__item';
        item.setAttribute('aria-label', 'Go to ' + s.key);
        const dot = document.createElement('span');
        dot.className = 'floating-nav__dot';
        const label = document.createElement('span');
        label.className = 'floating-nav__label';
        label.textContent = s.key;
        item.appendChild(dot);
        item.appendChild(label);
        floatingNav.appendChild(item);
        return item;
      })(),
      el: document.getElementById(s.id),
    }));
    sectionEls.forEach((s, idx) => {
      const handler = () => flyTo(s.id, idx);
      s.navItem.addEventListener('click', handler);
      cleanups.push(() => s.navItem.removeEventListener('click', handler));
    });

    for (let i = 0; i < 12; i++) {
      const t = document.createElement('div');
      t.className = 'tick';
      t.style.transform = 'rotate(' + i * 30 + 'deg)';
      wheel.appendChild(t);
    }
    const ticks = Array.from(wheel.querySelectorAll<HTMLDivElement>('.tick'));
    let lastPulsedTick = -1;

    function nearestSectionIndex(angle: number) {
      let best = 0, bestDiff = Infinity;
      SECTIONS.forEach((s, i) => {
        const diff = Math.abs(((angle - s.angle + 540) % 360) - 180);
        if (diff < bestDiff) { bestDiff = diff; best = i; }
      });
      return best;
    }

    function highlightWheelForAngle(angle: number) {
      const idx = nearestSectionIndex(angle);
      const activeTickIdx = Math.round(((SECTIONS[idx].angle + 360) % 360) / 30) % 12;
      ticks.forEach((t, i) => t.classList.toggle('active', i === activeTickIdx));
      if (activeTickIdx !== lastPulsedTick && !prefersReduced) {
        lastPulsedTick = activeTickIdx;
        const el = ticks[activeTickIdx];
        el.classList.add('pulse');
        setTimeout(() => el.classList.remove('pulse'), 140);
      }
      return idx;
    }

    const topnavLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('#topnav nav a'));
    let currentSection = 0;
    function setActiveVisuals(idx: number) {
      sectionEls.forEach((s, i) => s.navItem.classList.toggle('active', i === idx));
      if (miniZone) miniZone.textContent = SECTIONS[idx].key;
      if (miniCounter) miniCounter.textContent = '0' + (idx + 1) + '/0' + SECTIONS.length;
      topnavLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + SECTIONS[idx].id));
    }

    // ---- NEEDLE SPRING PHYSICS ---------------------------------------------
    let angleCurrent = SECTIONS[0].angle, angleTarget = SECTIONS[0].angle, velocity = 0;
    const stiffness = 120, damping = 23;
    let rafId: number | null = null, lastFrameTime: number | null = null;

    function springStep(now: number) {
      const dt = lastFrameTime ? Math.min((now - lastFrameTime) / 1000, 1 / 30) : 1 / 60;
      lastFrameTime = now;
      const force = -stiffness * (angleCurrent - angleTarget) - damping * velocity;
      velocity += force * dt;
      angleCurrent += velocity * dt;
      needle!.style.transform = 'rotate(' + (angleCurrent + 90) + 'deg)';
      if (currentSection === WORK_INDEX) highlightWheelForAngle(SECTIONS[WORK_INDEX].angle);
      else highlightWheelForAngle(angleCurrent);
      if (Math.abs(angleCurrent - angleTarget) > 0.05 || Math.abs(velocity) > 0.05) {
        rafId = requestAnimationFrame(springStep);
      } else { angleCurrent = angleTarget; velocity = 0; rafId = null; lastFrameTime = null; }
    }
    function setNeedleTarget(deg: number, initialVelocity?: number) {
      angleTarget = deg;
      velocity = initialVelocity || 0;
      if (prefersReduced) { angleCurrent = deg; velocity = 0; needle!.style.transform = 'rotate(' + (deg + 90) + 'deg)'; return; }
      lastFrameTime = null;
      if (!rafId) rafId = requestAnimationFrame(springStep);
    }
    setNeedleTarget(SECTIONS[0].angle);
    setActiveVisuals(0);
    highlightWheelForAngle(SECTIONS[0].angle);

    function flyTo(sectionId: string, idx: number, initialVelocity?: number) {
      miniScreen?.classList.add('zooming');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
        setTimeout(() => miniScreen?.classList.remove('zooming'), prefersReduced ? 0 : 500);
      }, prefersReduced ? 0 : 200);
      currentSection = idx;
      const target = SECTIONS[idx].angle;
      const delta = ((target - angleCurrent + 540) % 360) - 180;
      setNeedleTarget(angleCurrent + delta, initialVelocity);
      setActiveVisuals(idx);
    }

    if (infoBtnRef.current) on(infoBtnRef.current, 'click', () => flyTo('notes', 2));
    if (menuBtnRef.current) on(menuBtnRef.current, 'click', () => flyTo('viewfinder', 0));
    if (focusCueRef.current) on(focusCueRef.current, 'click', (e: Event) => { e.preventDefault(); flyTo('sheet', WORK_INDEX); });

    function goUp() { const idx = Math.max(0, currentSection - 1); flyTo(SECTIONS[idx].id, idx); }
    function goDown() { const idx = Math.min(SECTIONS.length - 1, currentSection + 1); flyTo(SECTIONS[idx].id, idx); }
    function goPrevProject() { if (currentSection !== WORK_INDEX) flyTo('sheet', WORK_INDEX); scrubProject(-1); }
    function goNextProject() { if (currentSection !== WORK_INDEX) flyTo('sheet', WORK_INDEX); scrubProject(1); }
    if (wheelUpRef.current) on(wheelUpRef.current, 'click', goUp);
    if (wheelDownRef.current) on(wheelDownRef.current, 'click', goDown);
    if (wheelLeftRef.current) on(wheelLeftRef.current, 'click', goPrevProject);
    if (wheelRightRef.current) on(wheelRightRef.current, 'click', goNextProject);

    function computeCurrentSectionIndex() {
      const refY = window.innerHeight * 0.4;
      let best = 0, bestDist = Infinity, exact = false;
      sectionEls.forEach((s, i) => {
        if (!s.el) return;
        const rect = s.el.getBoundingClientRect();
        if (rect.top <= refY && rect.bottom > refY) { best = i; exact = true; return; }
        if (exact) return;
        const dist = rect.top > refY ? rect.top - refY : refY - rect.bottom;
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    }

    let sectionTicking = false;
    function checkSectionChange() {
      const idx = computeCurrentSectionIndex();
      if (idx !== currentSection) {
        currentSection = idx;
        const target = SECTIONS[idx].angle;
        const delta = ((target - angleCurrent + 540) % 360) - 180;
        setNeedleTarget(angleCurrent + delta);
        setActiveVisuals(idx);
      }
    }
    function requestSectionCheck() {
      if (sectionTicking) return;
      sectionTicking = true;
      requestAnimationFrame(() => { checkSectionChange(); sectionTicking = false; });
    }
    on(window, 'scroll', requestSectionCheck, { passive: true });
    on(window, 'resize', requestSectionCheck);
    requestSectionCheck();

    if (momentEl) {
      const momentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) momentEl.classList.add('visible'); });
      }, { threshold: 0.5 });
      momentObserver.observe(momentEl);
      cleanups.push(() => momentObserver.disconnect());
    }

    // ---- CAROUSEL -----------------------------------------------------------
    const cardEls: HTMLButtonElement[] = [];
    PROJECTS.forEach((p, i) => {
      const num = String(i + 1).padStart(2, '0');
      const el = document.createElement('button');
      el.className = 'polaroid';
      el.dataset.idx = String(i);
      el.dataset.theme = 'light';
      el.style.setProperty('--tilt', (Math.random() * 2 - 1).toFixed(2) + 'deg');
      el.setAttribute('aria-label', 'Project ' + num + ' — ' + p.title);
      const thumbZoom = p.thumbZoom || 1;
      const thumbPos = p.thumbPosition || 'center';
      let thumbInner: string;
      if (p.thumbAnimated) {
        thumbInner = '<div class="bob-anim-thumb"><div class="bob-anim-base"></div><span class="bob-anim-logo" aria-hidden="true" style="position:absolute;top:48%;left:50%;transform:translate(-50%,-50%);z-index:2;font-family:var(--font-mono);font-weight:700;font-size:20px;letter-spacing:0.08em;color:rgba(255,255,255,0.92);text-shadow:0 2px 8px rgba(0,0,0,0.4);">bob</span></div>';
      } else if (p.thumbVideo) {
        thumbInner = '<video class="polaroid-photo-inner" src="' + p.thumbVideo + '" poster="' + (p.image || '') + '" autoplay muted loop playsinline style="transform:scale(' + thumbZoom + ');transform-origin:' + thumbPos + ';object-position:' + thumbPos + ';"></video>';
      } else {
        thumbInner = '<div class="polaroid-photo-inner"' + (p.image ? ' style="background-image:url(\'' + p.image + '\');"' : '') + '></div>';
      }
      el.innerHTML =
        '<div class="polaroid-photo">' + thumbInner + '<span class="polaroid-num">F' + num + '</span></div>' +
        '<div class="polaroid-caption">' +
        '<span class="polaroid-title"></span>' +
        '<span class="polaroid-meta"></span>' +
        '</div>';
      (el.querySelector('.polaroid-title') as HTMLElement).textContent = p.title;
      (el.querySelector('.polaroid-meta') as HTMLElement).textContent = p.problem;
      const clickHandler = () => goToProject(i);
      el.addEventListener('click', clickHandler);
      cleanups.push(() => el.removeEventListener('click', clickHandler));
      track.appendChild(el);
      cardEls.push(el);
    });

    let projectIndex = 0;

    function renderPreview() {
      const p = PROJECTS[projectIndex];
      if (previewTag) previewTag.textContent = p.tag;
      if (previewTitle) previewTitle.textContent = p.title;
      if (previewCategory) previewCategory.innerHTML = '<b>Category</b> ' + p.category;
      if (previewYear) previewYear.innerHTML = '<b>Year</b> ' + p.year;
      if (previewRole) previewRole.innerHTML = '<b>Role</b> ' + p.role;
      if (previewOverview) previewOverview.textContent = p.overview;

      if (compareBeforeEl) { compareBeforeEl.innerHTML = ''; compareBeforeEl.style.backgroundImage = 'none'; }
      if (compareAfterEl) { compareAfterEl.innerHTML = ''; compareAfterEl.style.backgroundImage = 'none'; }
      deviceFrameEl?.classList.toggle('single-media', !p.compare);

      if (!p.compare) {
        const mediaSrc = p.video || p.thumbVideo;
        if (mediaSrc && compareAfterEl) {
          compareAfterEl.innerHTML = '<video src="' + mediaSrc + '" autoplay muted loop playsinline style="width:100%;height:100%;object-fit:contain;background:var(--screen-bg);display:block;"></video>';
        } else if (p.image && compareAfterEl) {
          compareAfterEl.style.backgroundImage = "url('" + p.image + "')";
          compareAfterEl.style.backgroundSize = 'cover';
          compareAfterEl.style.backgroundPosition = 'center top';
        }
        setComparePosition(100);
      } else {
        if (compareBeforeEl) { compareBeforeEl.style.backgroundImage = p.compareBefore ? "url('" + p.compareBefore + "')" : ''; compareBeforeEl.style.backgroundSize = 'contain'; compareBeforeEl.style.backgroundPosition = 'center'; }
        if (compareAfterEl) { compareAfterEl.style.backgroundImage = p.compareAfter ? "url('" + p.compareAfter + "')" : ''; compareAfterEl.style.backgroundSize = 'contain'; compareAfterEl.style.backgroundPosition = 'center'; }
        setComparePosition(50);
      }

      const blocks = [
        ['Problem', p.problemHeading, p.problemBody],
        ['Key Insight', p.insightHeading, p.insightBody],
        ['Tradeoff', p.tradeoffHeading, p.tradeoffBody],
        ['Solution', p.solutionHeading, p.solutionBody],
        ['Impact', p.impactHeading, p.impactBody],
        ['Reflection', p.reflectionHeading, p.reflectionBody],
      ].filter((b) => b[1] && b[2]);
      if (previewNarrative) {
        previewNarrative.innerHTML = blocks
          .map((b) => '<div class="narrative-block"><span class="eyebrow">' + b[0] + '</span><h4>' + b[1] + '</h4><p>' + b[2] + '</p></div>')
          .join('');
      }
      if (previewCta) {
        previewCta.href = p.url;
        previewCta.textContent = p.ctaLabel || 'View full case study →';
        if (p.external) { previewCta.target = '_blank'; previewCta.rel = 'noopener noreferrer'; }
        else { previewCta.removeAttribute('target'); previewCta.removeAttribute('rel'); }
      }
    }

    function setActiveCard() {
      cardEls.forEach((el, i) => {
        const isActive = i === projectIndex;
        el.classList.toggle('active', isActive);
        el.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    }
    function updateNavState() {
      prevBtn!.disabled = projectIndex === 0;
      nextBtn!.disabled = projectIndex === PROJECTS.length - 1;
    }
    function updateTrackPosition(animate: boolean) {
      const active = cardEls[projectIndex];
      if (!active) return;
      const vpWidth = viewport!.getBoundingClientRect().width;
      const cardCenter = active.offsetLeft + active.offsetWidth / 2;
      const targetX = vpWidth / 2 - cardCenter;
      track!.style.transition = animate && !prefersReduced ? 'transform 400ms var(--ease-out)' : 'none';
      track!.style.transform = 'translateX(' + targetX + 'px)';
    }
    function goToProject(i: number) {
      i = Math.max(0, Math.min(PROJECTS.length - 1, i));
      if (i === projectIndex) return;
      projectIndex = i;
      setActiveCard();
      updateTrackPosition(true);
      updateNavState();
      if (currentSection === WORK_INDEX && miniCounter) miniCounter.textContent = '0' + (projectIndex + 1) + '/0' + PROJECTS.length;
      if (prefersReduced) { renderPreview(); return; }
      preview!.classList.add('updating');
      setTimeout(() => { renderPreview(); preview!.classList.remove('updating'); }, 250);
    }
    function scrubProject(dir: number) { goToProject(projectIndex + dir); }

    on(prevBtn, 'click', () => scrubProject(-1));
    on(nextBtn, 'click', () => scrubProject(1));

    setActiveCard();
    updateNavState();
    renderPreview();
    updateTrackPosition(false);
    on(window, 'resize', () => updateTrackPosition(false));

    // ---- COMPARE SLIDER -------------------------------------------------
    function setComparePosition(pct: number) {
      pct = Math.max(0, Math.min(100, pct));
      if (compareAfterEl) compareAfterEl.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      if (compareHandle) { compareHandle.style.left = pct + '%'; compareHandle.setAttribute('aria-valuenow', String(Math.round(pct))); }
    }
    setComparePosition(PROJECTS[projectIndex].compare ? 50 : 100);
    let comparing = false;
    function updateFromEvent(e: PointerEvent) {
      if (!compareSlider) return;
      const rect = compareSlider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setComparePosition((x / rect.width) * 100);
    }
    if (compareHandle) {
      on(compareHandle, 'pointerdown', (e: Event) => {
        if (!PROJECTS[projectIndex].compare) return;
        comparing = true; e.stopPropagation();
        const pe = e as PointerEvent;
        if (compareHandle.setPointerCapture) compareHandle.setPointerCapture(pe.pointerId);
      });
      on(compareHandle, 'keydown', (e: Event) => {
        if (!PROJECTS[projectIndex].compare) return;
        const ke = e as KeyboardEvent;
        const current = Number(compareHandle.getAttribute('aria-valuenow'));
        if (ke.key === 'ArrowLeft') { setComparePosition(current - 4); ke.preventDefault(); }
        else if (ke.key === 'ArrowRight') { setComparePosition(current + 4); ke.preventDefault(); }
      });
    }
    if (compareSlider) {
      on(compareSlider, 'pointerdown', (e: Event) => {
        if (!PROJECTS[projectIndex].compare) return;
        comparing = true; updateFromEvent(e as PointerEvent);
      });
    }
    on(window, 'pointermove', (e: Event) => { if (comparing) updateFromEvent(e as PointerEvent); });
    on(window, 'pointerup', () => { comparing = false; });

    // ---- DOCK VISIBILITY --------------------------------------------------
    function updateDock() {
      if (!heroEl) return;
      const threshold = heroEl.getBoundingClientRect().height * 0.22;
      controls.classList.toggle('visible', window.scrollY > threshold);
    }
    on(window, 'scroll', updateDock, { passive: true });
    updateDock();

    // ---- WHEEL DRAG PHYSICS ------------------------------------------------
    let dragging = false, dragAccum = 0, lastAngle = 0, lastMoveTime = 0, dragVelocity = 0;
    function angleFromEvent(e: PointerEvent) {
      const rect = wheel!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      const px = e.clientX - cx, py = e.clientY - cy;
      return (Math.atan2(py, px) * 180) / Math.PI;
    }
    function onDragStart(e: Event) {
      dragging = true; dragAccum = 0; dragVelocity = 0;
      lastAngle = angleFromEvent(e as PointerEvent); lastMoveTime = performance.now();
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }
    function onDragMove(e: Event) {
      if (!dragging) return;
      const pe = e as PointerEvent;
      const now = performance.now();
      const a = angleFromEvent(pe);
      const delta = ((a - lastAngle + 540) % 360) - 180;
      const dt = Math.max((now - lastMoveTime) / 1000, 1 / 240);
      dragVelocity = dragVelocity * 0.7 + (delta / dt) * 0.3;
      lastAngle = a; lastMoveTime = now;
      if (currentSection === WORK_INDEX) {
        dragAccum += delta;
        if (dragAccum > 40) { scrubProject(1); dragAccum = 0; }
        else if (dragAccum < -40) { scrubProject(-1); dragAccum = 0; }
        needle!.style.transform = 'rotate(' + (SECTIONS[WORK_INDEX].angle + 90) + 'deg)';
      } else {
        angleCurrent = a;
        needle!.style.transform = 'rotate(' + (a + 90) + 'deg)';
        highlightWheelForAngle(a);
      }
      pe.preventDefault();
    }
    function onDragEnd() {
      if (!dragging) return;
      dragging = false;
      if (currentSection !== WORK_INDEX) {
        const idx = nearestSectionIndex(angleCurrent);
        flyTo(SECTIONS[idx].id, idx, dragVelocity);
      } else {
        setNeedleTarget(SECTIONS[WORK_INDEX].angle, dragVelocity);
      }
    }
    on(wheel, 'pointerdown', onDragStart);
    on(window, 'pointermove', onDragMove);
    on(window, 'pointerup', onDragEnd);

    on(window, 'keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      if (currentSection !== WORK_INDEX) return;
      if (ke.key === 'ArrowRight' || ke.key === 'ArrowLeft') scrubProject(ke.key === 'ArrowRight' ? 1 : -1);
      else if (ke.key === 'Enter' && document.activeElement?.tagName !== 'A') previewCta?.click();
    });

    return () => {
      cleanups.forEach((fn) => fn());
      if (rafId) cancelAnimationFrame(rafId);
      floatingNav.innerHTML = '';
      wheel.querySelectorAll('.tick').forEach((t) => t.remove());
      track.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="camera-theme camera-home">
      <div id="boot" ref={bootRef} aria-hidden="true">
        <div className="boot-mark">SB <b>·</b> 2026</div>
        <div className="boot-checks">
          <div className="boot-check">Sensor</div>
          <div className="boot-check">Lens</div>
          <div className="boot-check">Storage</div>
          <div className="boot-check">Stabilisation</div>
        </div>
      </div>
      <div id="focusFrame" ref={focusFrameRef}>
        <span className="corner tl"></span><span className="corner tr"></span>
        <span className="corner bl"></span><span className="corner br"></span>
        <span className="focus-label">Initializing<span className="dot">.</span><span className="dot">.</span><span className="dot dot-3">.</span></span>
      </div>

      <header id="topnav">
        <a className="topnav-mark" href="#viewfinder">Sohum Bhatnagar</a>
        <nav aria-label="Primary">
          <a href="#sheet">Work</a>
          <a href="#notes">About</a>
          <a href="#writing">Photography</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <nav id="floating-nav" className="floating-nav" ref={floatingNavRef} aria-label="Section navigation"></nav>

      <div id="controls" ref={controlsRef}>
        <div className="mini-screen" ref={miniScreenRef}>
          <div className="zone" ref={miniZoneRef}>VIEWFINDER</div>
          <div className="counter" ref={miniCounterRef}>01/05</div>
        </div>
        <button className="fn-btn" ref={infoBtnRef} title="About" type="button">INFO</button>
        <div id="wheel" ref={wheelRef}>
          <button className="wheel-arrow up" ref={wheelUpRef} aria-label="Previous section" type="button"><span className="tri"></span></button>
          <button className="wheel-arrow left" ref={wheelLeftRef} aria-label="Previous project" type="button"><span className="tri"></span></button>
          <div className="needle-dot" ref={needleRef}></div>
          <div className="hub"></div>
          <button className="wheel-arrow right" ref={wheelRightRef} aria-label="Next project" type="button"><span className="tri"></span></button>
          <button className="wheel-arrow down" ref={wheelDownRef} aria-label="Next section" type="button"><span className="tri"></span></button>
        </div>
        <button className="fn-btn" ref={menuBtnRef} title="Viewfinder" type="button">TOP</button>
      </div>

      <main className="pre-focus" ref={mainRef}>
        <section className="section" id="viewfinder" data-theme="light">
          <Reveal className="hero-tags">
            <span>UI/UX</span><span>3D Modeling</span><span>Graphic Design</span><span>Photography</span>
          </Reveal>
          <Reveal as="h1">Sohum Bhatnagar</Reveal>
          <Reveal as="p" className="lede">Designer, photographer, and storyteller interested in how people interact with systems. Multidisciplinary work spanning UI/UX, 3D visual production, brand design, and AI-assisted workflows — I design complex digital products end-to-end, from the first sketch to the shipped system.</Reveal>
          <Reveal as="a" className="focus-cue" href="#sheet" ref={focusCueRef}>
            <span>See selected work</span><span className="arrow">↓</span>
          </Reveal>
        </section>

        <section className="section" id="sheet" data-theme="light">
          <Reveal className="section-index">SEC.<b>01</b> — SELECTED WORK</Reveal>
          <Reveal as="h2">Frames</Reveal>
          <Reveal as="p" className="sheet-subtitle">A few products I've designed end-to-end — the problem each one solved, and what I'd change with what I know now.</Reveal>
          <div id="sheet-wrap">
            <div className="carousel-stage" data-theme="dark">
              <button className="carousel-nav prev" ref={prevBtnRef} aria-label="Previous project" type="button"><span className="carousel-tri left"></span></button>
              <div className="carousel-viewport" ref={viewportRef}>
                <div className="carousel-track" ref={trackRef}></div>
              </div>
              <button className="carousel-nav next" ref={nextBtnRef} aria-label="Next project" type="button"><span className="carousel-tri right"></span></button>
            </div>
            <div className="preview" ref={previewRef}>
              <div className="preview-visual reveal--zoom visible">
                <div className="device-frame" data-theme="dark" ref={deviceFrameRef}>
                  <div className="compare-slider" ref={compareSliderRef}>
                    <div className="compare-pane compare-before" ref={compareBeforeRef}></div>
                    <div className="compare-pane compare-after" ref={compareAfterRef}></div>
                    <span className="compare-label before">Before</span>
                    <span className="compare-label after">After</span>
                    <div className="compare-handle" ref={compareHandleRef} tabIndex={0} role="slider" aria-label="Drag to compare before and after" aria-valuemin={0} aria-valuemax={100} aria-valuenow={50}>
                      <span className="compare-handle-grip"></span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="preview-tag" ref={previewTagRef}></span>
              <h3 ref={previewTitleRef}></h3>
              <div className="preview-meta">
                <span ref={previewCategoryRef}></span>
                <span ref={previewYearRef}></span>
                <span ref={previewRoleRef}></span>
              </div>
              <p className="preview-overview" ref={previewOverviewRef}></p>
              <div className="preview-narrative" ref={previewNarrativeRef}></div>
              <a className="preview-cta" ref={previewCtaRef} href="#">View full case study →</a>
            </div>
          </div>
        </section>

        <div className="moment bg-paper" ref={momentRef}>
          <p>Every product begins with noticing something everyone else ignored.</p>
        </div>

        <section className="section bg-soft" id="notes" data-theme="light">
          <Reveal className="notes-head">
            <div className="section-index">SEC.<b>02</b> — ABOUT</div>
            <h2>I&#8217;m Sohum.</h2>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-body">
              <p>I studied Animation at Chitrakala Parishath in Bengaluru (B.Va, Distinction) before moving into product design, so I still think in composition, narrative and visual weight before I think in components. Four-plus years span UI/UX, 3D visual production — game-ready PBR assets in Unreal Engine, hard-surface modeling in Maya and Substance Painter, even scientifically accurate 3D fossil models for UC Riverside's Paleontology department — brand design, and AI-assisted workflows.</p>
              <p>That background shows up directly in the work: the Bob Rides icon system exists because I could take a vehicle from sketch to a fully-shaded 3D render, not just a flat vector. My process starts with a real problem and ends with an interface that feels obvious in hindsight. When I'm not in Figma, I'm usually somewhere quiet with a 600mm lens, or on a basketball court.</p>
              <div className="about-facts">
                <div><span className="meta-label">Based in</span><span className="meta-value">Bengaluru</span></div>
                <div><span className="meta-label">Status</span><span className="meta-value">Open to roles &amp; apprenticeships</span></div>
                <div><span className="meta-label">Tools</span><span className="meta-value">Figma, Maya, Blender, React</span></div>
              </div>
              <div style={{ marginTop: 'var(--space-6)' }}>
                <a className="preview-cta" href={ROUTES.about}>Full background — experience, education, toolkit →</a>
              </div>
              <div className="tool-row">
                {TOOLS.map((tool) => (
                  <div key={tool.name} className="tool-icon" data-tooltip={tool.name}>{tool.icon}</div>
                ))}
              </div>
            </Reveal>
            <Reveal variant="clip" className="about-portrait">
              <div className="cycle-frame">
                <div className="cycle-stage">
                  <div className="ball-rig">
                    <div className="ball-shadow"></div>
                    <svg className="ball-svg" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="ballShade" cx="38%" cy="32%" r="75%">
                          <stop offset="0%" stopColor="#ff8a5c" />
                          <stop offset="55%" stopColor="var(--accent)" />
                          <stop offset="100%" stopColor="#b23600" />
                        </radialGradient>
                      </defs>
                      <circle cx={32} cy={32} r={30} fill="url(#ballShade)" />
                      <g fill="none" stroke="#1a1a1a" strokeWidth={1.4} strokeOpacity={0.55}>
                        <path d="M2 32 H62" />
                        <path d="M32 2 V62" />
                        <path d="M8 10 C20 22, 20 42, 8 54" />
                        <path d="M56 10 C44 22, 44 42, 56 54" />
                      </g>
                    </svg>
                  </div>
                  <span className="stage-label">Basketball — illustrated study</span>
                </div>
              </div>
              <div className="cycle-frame">
                <div className="cycle-stage">
                  <div className="dslr-rig">
                    <svg className="dslr-svg" viewBox="0 0 180 130" xmlns="http://www.w3.org/2000/svg">
                      <g fill="none" stroke="rgba(244,243,240,0.85)" strokeWidth={2} strokeLinejoin="round">
                        <rect x={18} y={38} width={102} height={66} rx={8} />
                        <rect x={8} y={52} width={14} height={36} rx={4} />
                        <path d="M46 38 V24 C46 20 49 17 53 17 H79 C83 17 86 20 86 24 V38" />
                        <circle cx={66} cy={70} r={27} fill="rgba(20,20,20,0.6)" />
                        <circle cx={66} cy={70} r={19} className="dslr-sheen" fill="rgba(244,243,240,1)" />
                        <circle cx={66} cy={70} r={11} fill="none" />
                        <rect x={30} y={46} width={14} height={9} rx={2} />
                        <circle cx={150} cy={50} r={9} />
                        <path d="M147 44 L153 56 M153 44 L147 56" />
                      </g>
                      <g fill="rgba(255,77,0,0.9)">
                        <circle cx={108} cy={47} r={3} />
                      </g>
                    </svg>
                  </div>
                  <span className="stage-label">DSLR — turntable study</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section" id="writing" data-theme="light">
          <Reveal className="section-index">SEC.<b>03</b> — THROUGH THE LENS</Reveal>
          <Reveal as="h2">Notes from behind the camera.</Reveal>
          <Reveal as="p" className="sheet-subtitle">When I'm not in Figma, I'm usually somewhere quiet with a 600mm lens. A few frames from the field.</Reveal>
          <div className="writing-list">
            {PHOTOS.map((photo) => (
              <Reveal as="a" key={photo.title} className="writing-item" href={photo.img} target="_blank" rel="noopener">
                <div className="writing-cover"><div className="writing-cover-inner" style={{ backgroundImage: `url('${photo.img}')` }}></div></div>
                <div className="writing-meta-row"><span>Wildlife</span><span>·</span><span>Photography</span></div>
                <span className="writing-title">{photo.title}</span>
                <span className="writing-desc">{photo.desc}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section bg-dark" id="contact" data-theme="dark">
          <Reveal className="section-index">SEC.<b>04</b> — CONTACT</Reveal>
          <Reveal as="h2">Let&#8217;s work together.</Reveal>
          <Reveal as="p">Open to product design roles and apprenticeships.</Reveal>
          <Reveal as="a" className="contact-cta" href="mailto:sohum1311@gmail.com">
            <span>sohum1311@gmail.com</span><span className="arrow">→</span>
          </Reveal>
          <Reveal as="a" className="contact-cta" href="https://www.linkedin.com/in/sohum-bhatnagar-9b2301276/" target="_blank" rel="noopener noreferrer" style={{ marginTop: 'var(--space-3)' }}>
            <span>LinkedIn</span><span className="arrow">↗</span>
          </Reveal>
          <Reveal as="a" className="contact-cta" href="https://www.behance.net/sohumbhatnagar" target="_blank" rel="noopener noreferrer" style={{ marginTop: 'var(--space-3)' }}>
            <span>Behance</span><span className="arrow">↗</span>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
