import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HudOverlay } from "./components/HudOverlay";
import { HeroSection } from "./components/HeroSection";
import { SelectedWork } from "./components/SelectedWork";
import { FooterNew } from "./components/FooterNew";
import BobRides from "./components/bob-case-study/BobRides";
import { AboutPage } from "./components/AboutPage";
import CaseStudy from "./components/CaseStudy";
import { useEffect } from "react";

function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "#0C0C0C", color: "#E8E4DF" }}>
      <HudOverlay />
      <HeroSection />
      <SelectedWork />
      <FooterNew />
    </div>
  );
}

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bob-rides" element={<BobRides />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/case-study" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}
