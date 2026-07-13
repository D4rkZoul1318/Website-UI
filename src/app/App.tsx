import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HudOverlay } from "./components/HudOverlay";
import HeroCollage from "./components/HeroCollage";
import AboutSection from "./components/AboutSection";
import SplitText from "./components/SplitText";
import { SelectedWork } from "./components/SelectedWork";
import { FooterNew } from "./components/FooterNew";
import BobRides from "./components/bob-case-study/BobRides";
import { AboutPage } from "./components/AboutPage";
import CaseStudy from "./components/CaseStudy";
import { ExplorationsPage } from "./components/ExplorationsPage";
import { ROUTES } from "./routes";
import { useEffect } from "react";

const skills = ["UI/UX", "3D Modeling", "Graphic Design", "Photography"];

function SkillsSection() {
  return (
    <section
      className="flex flex-col items-center"
      style={{
        background: "#0C0C0C",
        paddingBottom: '64px',
        gap: '24px',
      }}
    >
      {skills.map((skill) => (
        <div key={skill} style={{ fontSize: '5rem' }}>
          <SplitText
            text={skill}
            tag="h2"
            className="font-semibold text-[#F0EDE8] tracking-[-0.03em]"
            delay={40}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-50px"
            textAlign="center"
          />
        </div>
      ))}
    </section>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "#0C0C0C", color: "#E8E4DF" }}>
      <HudOverlay />
      <HeroCollage />
      <SkillsSection />
      <AboutSection />
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
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.bobRides} element={<BobRides />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.caseStudy} element={<CaseStudy />} />
        <Route path={ROUTES.explorations} element={<ExplorationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
