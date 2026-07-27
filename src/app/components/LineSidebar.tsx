import { useEffect, useRef, useState, type CSSProperties } from 'react';

export interface LineSidebarProps {
  items: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  /** Distance (px) from the cursor within which an item is influenced. */
  proximityRadius?: number;
  /** Max horizontal pull (px) toward the cursor at peak proximity. */
  maxShift?: number;
  falloff?: 'smooth' | 'linear';
  markerLength?: number;
  markerGap?: number;
  /** Marker's resting scale; scales up toward 1 near the cursor when scaleTick is set. */
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  /** Transition duration (ms) for the shift/scale/opacity catching up to the cursor. */
  smoothing?: number;
  defaultActive?: number;
  /**
   * Controlled active index — not part of the component this was modeled
   * on, added because a scroll-driven case study nav needs its highlight
   * to track the visible section, not just clicks. Overrides internal
   * click state when provided.
   */
  activeIndex?: number;
  /**
   * Also not in the original spec: a heading to render above the item at
   * a given index, for grouping a long flat list under section headers
   * (e.g. {0: 'Overview', 2: 'Discovery'}). Purely a visual divider — item
   * indices stay flat and sequential, unaffected by grouping.
   */
  headings?: Record<number, string>;
  headingColor?: string;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

function falloffCurve(t: number, falloff: 'smooth' | 'linear') {
  const clamped = Math.max(0, Math.min(1, t));
  if (falloff === 'linear') return 1 - clamped;
  const s = 1 - clamped;
  return s * s * (3 - 2 * s); // smoothstep
}

/**
 * A vertical line-nav where items pull toward the cursor and their tick
 * markers grow as the pointer nears them, fading back to rest outside
 * proximityRadius. Labels stay dim except for the active item or one the
 * cursor is currently near — mirrors the numbers-always/label-on-approach
 * pattern the previous case-study rail used, just driven continuously by
 * distance instead of a binary hover.
 */
export default function LineSidebar({
  items,
  accentColor = 'currentColor',
  textColor = 'currentColor',
  markerColor = 'currentColor',
  showIndex = false,
  showMarker = false,
  proximityRadius = 100,
  maxShift = 24,
  falloff = 'smooth',
  markerLength = 40,
  markerGap = 8,
  tickScale = 0.5,
  scaleTick = false,
  itemGap = 16,
  fontSize = 1,
  smoothing = 200,
  defaultActive = 0,
  activeIndex,
  headings,
  headingColor = 'currentColor',
  onItemClick,
  className = '',
}: LineSidebarProps) {
  const [internalActive, setInternalActive] = useState(defaultActive);
  const active = activeIndex ?? internalActive;

  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [mouseY, setMouseY] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const y = e.clientY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setMouseY(y));
  }

  function handleMouseLeave() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setMouseY(null);
  }

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className={`line-sidebar ${className}`.trim()}
      style={{ '--ls-item-gap': `${itemGap}px` } as CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((label, i) => {
        const el = itemRefs.current[i];
        let influence = 0;
        if (mouseY !== null && el) {
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(mouseY - center);
          influence = dist <= proximityRadius ? falloffCurve(dist / proximityRadius, falloff) : 0;
        }
        const isActive = i === active;
        const shift = maxShift * influence;
        const markerScale = scaleTick ? tickScale + (1 - tickScale) * influence : tickScale;
        const color = isActive ? accentColor : textColor;
        const mColor = isActive ? accentColor : markerColor;
        const labelOpacity = isActive ? 1 : influence;
        const heading = headings?.[i];

        return (
          <div key={label} className="line-sidebar__group" style={{ display: 'contents' }}>
          {heading && (
            <span
              className="line-sidebar__heading"
              aria-hidden="true"
              style={{ color: headingColor, marginTop: i === 0 ? 0 : undefined }}
            >
              {heading}
            </span>
          )}
          <button
            type="button"
            ref={(node) => { itemRefs.current[i] = node; }}
            className={`line-sidebar__item${isActive ? ' is-active' : ''}`}
            aria-current={isActive ? 'true' : undefined}
            style={{
              transform: `translateX(${-shift}px)`,
              transitionDuration: `${smoothing}ms`,
            }}
            onClick={() => {
              if (activeIndex === undefined) setInternalActive(i);
              onItemClick?.(i, label);
            }}
          >
            {showMarker && (
              <span
                className="line-sidebar__marker"
                style={{
                  width: markerLength,
                  marginLeft: markerGap,
                  background: mColor,
                  transform: `scaleX(${markerScale})`,
                  transitionDuration: `${smoothing}ms`,
                }}
              />
            )}
            {showIndex && (
              <span className="line-sidebar__index" style={{ color, transitionDuration: `${smoothing}ms` }}>
                {String(i + 1).padStart(2, '0')}
              </span>
            )}
            <span
              className="line-sidebar__label"
              style={{ color, opacity: labelOpacity, fontSize: `${fontSize}rem`, transitionDuration: `${smoothing}ms` }}
            >
              {label}
            </span>
          </button>
          </div>
        );
      })}
    </div>
  );
}
