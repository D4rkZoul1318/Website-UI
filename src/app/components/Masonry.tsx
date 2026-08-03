import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Masonry.css';

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
};

// A slow or unreachable external image (the grid mixes local /images assets
// with hotlinked artstation.com URLs) must never hold up the whole gallery —
// without a per-image timeout, one straggling host can block layout and
// every entrance animation for as long as the browser takes to give up on
// that connection, which on some networks is many seconds.
const IMAGE_LOAD_TIMEOUT = 2500;

const preloadImages = async (urls: string[]) => {
  await Promise.all(urls.map(src => new Promise(resolve => {
    const img = new Image();
    const done = () => resolve(null);
    const timer = setTimeout(done, IMAGE_LOAD_TIMEOUT);
    img.onload = img.onerror = () => { clearTimeout(timer); done(); };
    img.src = src;
  })));
};

interface MasonryItem {
  id: number;
  img: string;
  url: string;
  title: string;
  category: string;
  height: number;
  caption?: string;
  live?: 'rewind' | 'octopus';
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: string;
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onItemClick?: (item: MasonryItem) => void;
}

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  onItemClick,
}: MasonryProps) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [4, 3, 2, 2],
    1
  );

  // Animating `filter: blur()` on a dozen-plus staggered elements at once
  // forces a separate compositing/blur pass per element — cheap on a
  // desktop GPU, but enough to visibly drop frames (and, since this runs
  // on every mount/filter-change while the user may already be scrolling,
  // reads as general scroll stutter) on mobile hardware. Touch devices get
  // the same fade + slide entrance, just without the blur step.
  const skipBlur = useMedia(['(hover: none) and (pointer: coarse)'], [true], false);

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: any) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };
    let direction = animateFrom;
    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }
    switch (direction) {
      case 'top': return { x: item.x, y: -200 };
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
      case 'left': return { x: -200, y: item.y };
      case 'right': return { x: window.innerWidth + 200, y: item.y };
      case 'center': return { x: containerRect.width / 2 - item.w / 2, y: containerRect.height / 2 - item.h / 2 };
      default: return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];
      colHeights[col] += height;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  // Tracks which item ids were actually mounted in the DOM as of the last
  // run — not just "has the component ever rendered before". Switching
  // filters unmounts the old category's DOM nodes and mounts brand-new ones
  // for the new category; a single one-time "hasMounted" flag can't tell
  // those fresh nodes apart from ones that have been sitting in the DOM the
  // whole time (e.g. a resize/column-count change on the same item set), so
  // it was sending fresh nodes straight into the bare reposition tween below
  // with no entrance treatment — they'd pop in at their untouched CSS
  // default position/opacity, then snap to their grid slot, instead of
  // fading + sliding + un-blurring in like the very first page load does.
  const prevIdsRef = useRef<Set<number>>(new Set());

  useLayoutEffect(() => {
    if (!imagesReady) return;
    const prevIds = prevIdsRef.current;
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (!prevIds.has(item.id)) {
        const initialPos = getInitialPosition(item);
        const useBlur = blurToFocus && !skipBlur;
        gsap.fromTo(selector,
          { opacity: 0, x: initialPos.x, y: initialPos.y, width: item.w, height: item.h, ...(useBlur && { filter: 'blur(10px)' }) },
          { opacity: 1, ...animationProps, ...(useBlur && { filter: 'blur(0px)' }), duration: 0.8, ease: 'power3.out', delay: index * stagger }
        );
      } else {
        gsap.to(selector, { ...animationProps, duration, ease, overwrite: 'auto' });
      }
    });
    prevIdsRef.current = new Set(grid.map((item) => item.id));
  }, [grid, imagesReady, skipBlur]);

  const handleMouseEnter = (_: React.MouseEvent, item: any) => {
    if (scaleOnHover) gsap.to(`[data-key="${item.id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = (_: React.MouseEvent, item: any) => {
    if (scaleOnHover) gsap.to(`[data-key="${item.id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' });
  };

  const totalHeight = grid.length ? Math.max(...grid.map(i => i.y + i.h)) : 0;

  return (
    <div ref={containerRef} className="list" style={{ height: totalHeight }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="item-wrapper"
          onClick={() => onItemClick ? onItemClick(item) : item.url && window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(e, item)}
          onMouseLeave={e => handleMouseLeave(e, item)}
        >
          <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
            <div
              className="item-overlay"
              style={{
                position: 'absolute', inset: 0, borderRadius: '10px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
                opacity: 0, transition: 'opacity 300ms ease', pointerEvents: 'none',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px',
              }}

            >
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                {item.category}
              </span>
              <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>
                {item.title}
              </span>
              {item.caption && (
                <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '12px', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', marginTop: '4px', lineHeight: 1.4 }}>
                  {item.caption}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
