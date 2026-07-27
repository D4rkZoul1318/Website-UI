import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import BobRides from "./components/bob-case-study/BobRides";
import { AboutPage } from "./components/AboutPage";
import CaseStudy from "./components/CaseStudy";
import { ExplorationsPage } from "./components/ExplorationsPage";
import RewindCaseStudy from "./components/rewind-case-study/RewindCaseStudy";
import Viewfinder from "./components/viewfinder/Viewfinder";
import { ROUTES } from "./routes";
import { useEffect } from "react";
import { SmoothScroll } from "./components/SmoothScroll";
import { scrollToHashTarget } from "./lib/scrollToHash";

// Handles a hash landing on a fresh page load (e.g. navigating in from
// another page via a `/#work`-style link) — the effect's empty deps mean
// this only runs once, on the initial mount. Clicking a hash link while
// already on the page it points to (e.g. WORK from the homepage itself)
// is a different case — no navigation/remount happens, so this never
// re-fires — and is handled separately via onClick directly on those
// links (Nav.tsx, home/Footer.tsx), the same pattern BobRides.tsx's own
// in-page nav already uses. A document-level click listener here was
// tried first and dropped: it raced unpredictably against ScrollSmoother's
// own rAF-deferred setup and produced a wildly wrong scroll position,
// where React's synthetic onClick (registered at app bootstrap, well
// before that race window) reliably doesn't.
function useHashScroll() {
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem("scrollTo");
    if (scrollTarget) {
      sessionStorage.removeItem("scrollTo");
      scrollToHashTarget(scrollTarget);
      return;
    }
    const hash = window.location.hash;
    if (hash) {
      scrollToHashTarget(hash.replace("#", ""));
    }
  }, []);
}

export default function App() {
  useHashScroll();
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.bobRides} element={<BobRides />} />
          <Route path={ROUTES.about} element={<AboutPage />} />
          <Route path={ROUTES.caseStudy} element={<CaseStudy />} />
          <Route path={ROUTES.explorations} element={<ExplorationsPage />} />
          <Route path={ROUTES.rewindCaseStudy} element={<RewindCaseStudy />} />
          <Route path={ROUTES.viewfinder} element={<Viewfinder />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
