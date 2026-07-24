import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  theme?: 'light' | 'dark';
  initialLoadAnimation?: boolean;
  logo?: string;
  logoAlt?: string;
}

/** A pill-shaped nav with a circular color-swap reveal on hover, modeled on
 * react-bits' PillNav (installed via the shadcn registry in spirit — rebuilt
 * here since the sandbox can't reach ui.shadcn.com's registry endpoint).
 * Each pill hides a full-color circle behind its label; hovering scales the
 * circle up from its center (clipped by the pill's own rounded corners) while
 * the label crossfades between `pillTextColor` and `hoveredPillTextColor`.
 * The active item is pinned in that same "hovered" state so the current
 * section/page is always visually distinct from the rest. */
export function PillNav({
  items,
  activeHref = '',
  className = '',
  ease = 'power3.out',
  baseColor = 'var(--ink)',
  pillColor = 'var(--paper)',
  hoveredPillTextColor = 'var(--paper)',
  pillTextColor = 'var(--ink)',
  theme = 'light',
  initialLoadAnimation = true,
}: PillNavProps) {
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pillRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // The circle's resting scale (0 normally, 1 when active) is a CSS
    // default now, not something JS sets on mount — writing it here too
    // used to leave a brief window, before this effect ran, where the
    // circle rendered at its unset natural size (fully opaque, covering
    // the label) until GSAP caught up and hid it. GSAP now only ever
    // touches these circles in response to a real hover.
    if (initialLoadAnimation) {
      gsap.fromTo(
        pillRefs.current.filter(Boolean),
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease, stagger: 0.06 }
      );
    }
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number, isActive: boolean) => {
    if (isActive) return;
    const circle = circleRefs.current[i];
    if (circle) gsap.to(circle, { scale: 1, duration: 0.4, ease });
  };

  const handleLeave = (i: number, isActive: boolean) => {
    if (isActive) return;
    const circle = circleRefs.current[i];
    if (circle) gsap.to(circle, { scale: 0, duration: 0.3, ease });
  };

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (mobileOpen) {
      gsap.set(menu, { display: 'flex', height: 'auto' });
      const h = menu.scrollHeight;
      gsap.fromTo(menu, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.35, ease });
    } else {
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease,
        onComplete: () => gsap.set(menu, { display: 'none' }),
      });
    }
  }, [mobileOpen, ease]);

  return (
    <div className={`vf-pillnav vf-pillnav--${theme} ${className}`.trim()} style={{ ['--pillnav-base' as string]: baseColor }}>
      <ul className="vf-pillnav-list" role="menubar">
        {items.map((item, i) => {
          const isActive = item.href === activeHref;
          return (
            <li key={item.href} role="none">
              <a
                ref={(el) => { pillRefs.current[i] = el; }}
                href={item.href}
                role="menuitem"
                aria-label={item.ariaLabel ?? item.label}
                aria-current={isActive ? 'page' : undefined}
                className={`vf-pillnav-pill${isActive ? ' is-active' : ''}`}
                style={{ background: pillColor, color: pillTextColor }}
                onMouseEnter={() => handleEnter(i, isActive)}
                onMouseLeave={() => handleLeave(i, isActive)}
              >
                <span
                  ref={(el) => { circleRefs.current[i] = el; }}
                  className="vf-pillnav-circle"
                  aria-hidden="true"
                />
                <span
                  ref={(el) => { labelRefs.current[i] = el; }}
                  className="vf-pillnav-label"
                  style={{ color: isActive ? hoveredPillTextColor : undefined }}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className={`vf-pillnav-toggle${mobileOpen ? ' is-open' : ''}`}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        style={{ background: baseColor }}
      >
        <span />
        <span />
      </button>

      <div ref={mobileMenuRef} className="vf-pillnav-mobile" style={{ display: 'none', background: baseColor }}>
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`vf-pillnav-mobile-link${item.href === activeHref ? ' is-active' : ''}`}
            style={{ color: hoveredPillTextColor }}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
