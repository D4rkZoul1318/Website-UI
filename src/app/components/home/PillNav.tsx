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
 * section/page is always visually distinct from the rest.
 *
 * The circle's scale is driven entirely by CSS `:hover`/`.is-active`, not by
 * JS mouseenter/mouseleave handlers calling gsap.to(). An earlier version
 * did that, and under main-thread contention (e.g. switching Explorations'
 * filter tabs, which fires GSAP tweens across a dozen-plus masonry items)
 * the browser can coalesce or drop a mouseleave event — the "scale up" tween
 * would finish with no matching "scale down" ever firing, leaving a pill
 * permanently stuck solid-black with unreadable dark-on-dark text. CSS
 * `:hover` can't desync from the real pointer state like that. */
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
  const pillRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialLoadAnimation) {
      gsap.fromTo(
        pillRefs.current.filter(Boolean),
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease, stagger: 0.06 }
      );
    }
  }, [items, ease, initialLoadAnimation]);

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
              >
                <span className="vf-pillnav-circle" aria-hidden="true" />
                <span className="vf-pillnav-roll" aria-hidden="true">
                  <span className="vf-pillnav-roll-track">
                    <span className="vf-pillnav-roll-line" style={{ color: pillTextColor }}>{item.label}</span>
                    <span className="vf-pillnav-roll-line" style={{ color: hoveredPillTextColor }}>{item.label}</span>
                  </span>
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
