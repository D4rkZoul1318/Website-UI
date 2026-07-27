import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const smootherRef = useRef<InstanceType<typeof ScrollSmoother> | null>(null);
  const location = useLocation();

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const id = requestAnimationFrame(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: { allowNestedScroll: true },
      });
    });

    // ScrollSmoother measures total scroll height once at creation time and
    // never re-measures on its own. Web fonts swapping in (fallback ->
    // Bricolage Grotesque) and images/video loading both reflow content
    // height afterward, leaving a stale, oversized scroll distance with
    // dead space past the real end of the page unless we force a refresh.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);

    const content = document.getElementById('smooth-content');
    const resizeObserver = content
      ? new ResizeObserver(() => refresh())
      : null;
    if (content) resizeObserver!.observe(content);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('load', refresh);
      resizeObserver?.disconnect();
      smootherRef.current?.kill();
      smootherRef.current = null;
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [location.pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
