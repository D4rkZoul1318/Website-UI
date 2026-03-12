import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { ChillSection } from "./components/ChillSection";
import { Footer } from "./components/Footer";
import CaseStudy from "./components/CaseStudy";
import BobRides from "./components/bob-case-study/BobRides";
import { AboutPage } from "./components/AboutPage";

function MainSite() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: "#F9F9F7", color: "#1A1A1A", lineHeight: 1.6 }}>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <ChillSection />
      <Footer />
    </div>
  );
}

import { useEffect } from "react";

function useHashScroll() {
  useEffect(() => {
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
        <Route path="/" element={<MainSite />} />
        <Route path="/case-study" element={<CaseStudy />} />
        <Route path="/bob-rides" element={<BobRides />} />
          <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
