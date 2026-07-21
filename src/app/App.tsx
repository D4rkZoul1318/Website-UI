import { BrowserRouter, Routes, Route } from "react-router-dom";
import CameraHome from "./components/camera/CameraHome";
import BobRides from "./components/bob-case-study/BobRides";
import { AboutPage } from "./components/AboutPage";
import CaseStudy from "./components/CaseStudy";
import { ExplorationsPage } from "./components/ExplorationsPage";
import RewindCaseStudy from "./components/rewind-case-study/RewindCaseStudy";
import Viewfinder from "./components/viewfinder/Viewfinder";
import { ROUTES } from "./routes";
import { useEffect } from "react";
import { SmoothScroll } from "./components/SmoothScroll";

function useHashScroll() {
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem("scrollTo");
    if (scrollTarget) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, []);
}

export default function App() {
  useHashScroll();
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route path={ROUTES.home} element={<CameraHome />} />
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
