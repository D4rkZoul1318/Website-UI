import type { MouseEvent } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

/**
 * Scrolls to #id through ScrollSmoother (SmoothScroll.tsx drives every
 * route's scroll via a transform, so native scrollIntoView has no effect
 * once it's active — same issue BobRides.tsx's own scrollToSection works
 * around for its in-page nav). A hash landing on a fresh page load can beat
 * SmoothScroll's deferred ScrollSmoother.create(), so this polls briefly
 * before falling back to a plain scrollIntoView (e.g. prefers-reduced-motion
 * visitors, for whom SmoothScroll never creates a smoother at all).
 */
export function scrollToHashTarget(id: string) {
  let attempts = 0;
  const tryScroll = () => {
    const el = document.getElementById(id);
    if (!el) return;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(el, true, 'top top+=80');
    } else if (attempts++ < 20) {
      setTimeout(tryScroll, 100);
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  tryScroll();
}

/**
 * onClick for a "/path#id"-style link (Nav.tsx, home/Footer.tsx) that needs
 * to work correctly under ScrollSmoother. When we're already on the page
 * the link points to, this intercepts the click and drives ScrollSmoother
 * directly — same pattern as BobRides.tsx's own scrollToSection — instead
 * of letting the browser's native same-document hash-jump run, which
 * fights ScrollSmoother's transform-based scroll and lands somewhere
 * wildly wrong. When the route differs, it's a real cross-page navigation:
 * left alone to navigate normally, picked up by App.tsx's useHashScroll
 * once the new page finishes loading.
 */
export function handleHashLinkClick(e: MouseEvent<HTMLAnchorElement>, href: string, currentPathname: string) {
  const [pathname, hash] = href.split('#');
  if (!hash || pathname !== currentPathname) return;
  e.preventDefault();
  history.pushState(null, '', `#${hash}`);
  scrollToHashTarget(hash);
}
