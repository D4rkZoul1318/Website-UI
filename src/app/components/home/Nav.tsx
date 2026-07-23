import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const LINKS = [
  { href: '#work', index: '01', label: 'Work' },
  { href: '#about', index: '02', label: 'About' },
  { href: '#explorations', index: '03', label: 'Explorations' },
  { href: '#contact', index: '04', label: 'Contact' },
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

  return createPortal(
    <header className="vf-nav">
      <div className="vf-nav-bar">
        <a href="#top" className="vf-logo">
          <span className="vf-logo-dot" aria-hidden="true"></span>
          <span>SB / Viewfinder</span>
        </a>
        <nav className="vf-nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="vf-nav-link">
              <span className="vf-nav-idx">{l.index}</span>
              <span>{l.label}</span>
            </a>
          ))}
        </nav>
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
