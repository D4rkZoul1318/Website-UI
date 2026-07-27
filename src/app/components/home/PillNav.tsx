import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface PillNavItem {
  label: string;
  /** Omit for a client-side item (e.g. a filter tab) driven by onClick instead. */
  href?: string;
  /**
   * With href: an interceptor (e.g. same-page hash-scroll handling) run
   * alongside normal anchor behavior — call preventDefault() to override.
   * Without href: the item's entire action (renders as a button instead).
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  ariaLabel?: string;
}

export interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  theme?: 'light' | 'dark';
  initialLoadAnimation?: boolean;
  logo?: string;
  logoAlt?: string;
  /** Skip the mobile hamburger collapse and keep the list inline (scrollable)
   * at every width — for a filter/tab bar where every item should stay
   * reachable in one row rather than hiding behind a menu toggle. */
  alwaysShowList?: boolean;
}

/** Plain-text nav links with a rolling text-swap hover: each label renders
 * as two stacked copies in an overflow-hidden window (one in the resting
 * color, one in the accent color), and hovering/the active state translates
 * that two-line stack up by exactly half its own height, so the label
 * appears to roll a fresh, differently-colored copy into view rather than
 * just crossfading. No pill background, border, or fill — just the link
 * and its roll.
 *
 * Driven entirely by CSS `:hover`/`.is-active`, not JS mouseenter/mouseleave
 * handlers. An earlier pill-shaped version used gsap.to() on those events,
 * and under main-thread contention (e.g. switching Explorations' filter
 * tabs, which fires GSAP tweens across a dozen-plus masonry items) the
 * browser can coalesce or drop a mouseleave event — the tween would finish
 * with no reverse ever firing, leaving a link stuck mid-roll. CSS `:hover`
 * can't desync from the real pointer state like that. */
export function PillNav({
  items,
  activeHref = '',
  className = '',
  ease = 'power3.out',
  baseColor = 'var(--ink)',
  hoveredPillTextColor = 'var(--terracotta-ink)',
  pillTextColor = 'var(--ink)',
  theme = 'light',
  initialLoadAnimation = true,
  alwaysShowList = false,
}: PillNavProps) {
  const pillRefs = useRef<Array<HTMLAnchorElement | HTMLButtonElement | null>>([]);
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
      <ul className={`vf-pillnav-list${alwaysShowList ? ' is-always-visible' : ''}`} role="menubar">
        {items.map((item, i) => {
          const itemKey = item.href ?? item.label;
          const isActive = itemKey === activeHref;
          const roll = (
            <span className="vf-pillnav-roll" aria-hidden="true">
              <span className="vf-pillnav-roll-track">
                <span className="vf-pillnav-roll-line" style={{ color: pillTextColor }}>{item.label}</span>
                <span className="vf-pillnav-roll-line" style={{ color: hoveredPillTextColor }}>{item.label}</span>
              </span>
            </span>
          );
          return (
            <li key={itemKey} role="none">
              {item.href ? (
                <a
                  ref={(el) => { pillRefs.current[i] = el; }}
                  href={item.href}
                  onClick={item.onClick}
                  role="menuitem"
                  aria-label={item.ariaLabel ?? item.label}
                  aria-current={isActive ? 'page' : undefined}
                  className={`vf-pillnav-link${isActive ? ' is-active' : ''}`}
                  style={{ color: pillTextColor }}
                >
                  {roll}
                </a>
              ) : (
                <button
                  type="button"
                  ref={(el) => { pillRefs.current[i] = el; }}
                  onClick={item.onClick}
                  role="menuitem"
                  aria-label={item.ariaLabel ?? item.label}
                  aria-current={isActive ? 'page' : undefined}
                  className={`vf-pillnav-link${isActive ? ' is-active' : ''}`}
                  style={{ color: pillTextColor }}
                >
                  {roll}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {!alwaysShowList && (
        <>
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
            {items.map((item) => {
              const itemKey = item.href ?? item.label;
              return item.href ? (
                <a
                  key={itemKey}
                  href={item.href}
                  className={`vf-pillnav-mobile-link${itemKey === activeHref ? ' is-active' : ''}`}
                  style={{ color: hoveredPillTextColor }}
                  onClick={(e) => { item.onClick?.(e); setMobileOpen(false); }}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={itemKey}
                  type="button"
                  className={`vf-pillnav-mobile-link${itemKey === activeHref ? ' is-active' : ''}`}
                  style={{ color: hoveredPillTextColor }}
                  onClick={(e) => { item.onClick?.(e); setMobileOpen(false); }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
