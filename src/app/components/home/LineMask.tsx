import { useEffect, useRef, useState } from 'react';

/** Word-by-word "roll up into view" reveal for the hero headline — mirrors
 * the reference's .line-mask (overflow-hidden wrapper, inner span starts at
 * translateY(105%)). Runs once on mount, staggered by `delay` per line. */
export function LineMask({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setInView(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  return (
    <span className={`line-mask${inView ? ' in' : ''}`}>
      <span ref={ref}>{children}</span>
    </span>
  );
}
