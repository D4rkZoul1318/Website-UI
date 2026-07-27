import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { PillNav } from './PillNav';
import { handleHashLinkClick } from '../../lib/scrollToHash';

// Work/Contact are same-page anchors on the homepage; prefixing the route
// makes them work as "go home, then scroll" links from every other page too
// (App.tsx's useHashScroll handles the scroll-into-view once we land there;
// handleHashLinkClick below handles clicking them while already on Home).
const LINKS = [
  { href: `${ROUTES.home}#work`, label: 'Work' },
  { href: ROUTES.explorations, label: 'Explorations' },
  { href: ROUTES.about, label: 'About' },
  { href: `${ROUTES.home}#contact`, label: 'Contact' },
];

function useScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return pct;
}

function useISTClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Nav() {
  const pct = useScrollProgress();
  const time = useISTClock();
  const location = useLocation();

  const activeHref =
    location.pathname === ROUTES.explorations ? ROUTES.explorations
    : location.pathname === ROUTES.about ? ROUTES.about
    : '';

  // Memoized so PillNav's items prop keeps the same array/function
  // references across re-renders that don't actually change the route
  // (the clock ticking every second, scroll-progress updates, ...) — its
  // load-in animation effect depends on `items`, and a fresh array every
  // second was replaying that fade/slide-in on every tick, reading as a
  // constant jitter in the nav links.
  const navItems = useMemo(
    () => LINKS.map((l) => ({
      ...l,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleHashLinkClick(e, l.href, location.pathname),
    })),
    [location.pathname]
  );

  return createPortal(
    <header className="vf-nav">
      <div className="vf-nav-bar">
        <a href={ROUTES.home} className="vf-logo">
          <img src="/SB.png" alt="Sohum Bhatnagar" className="vf-logo-mark" />
          <span>/ Viewfinder</span>
        </a>
        <PillNav
          items={navItems}
          activeHref={activeHref}
          baseColor="var(--ink)"
          pillTextColor="var(--ink)"
          hoveredPillTextColor="var(--terracotta-ink)"
          theme="light"
        />
        <div className="vf-nav-right">
          <span className="vf-nav-clock">IST · {time}</span>
          <a href="mailto:sohum1311@gmail.com" className="vf-nav-cta">●&nbsp;&nbsp;Available</a>
        </div>
      </div>
      <div className="vf-nav-track">
        <div className="vf-nav-fill" style={{ width: `${pct}%` }} />
      </div>
    </header>,
    document.getElementById('fixed-ui-root')!
  );
}
