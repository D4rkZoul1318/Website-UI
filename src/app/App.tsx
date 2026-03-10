import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { ChillSection } from "./components/ChillSection";
import { Footer } from "./components/Footer";
import CaseStudy from "./components/CaseStudy";
import BobRides from "./components/bob-case-study/BobRides";

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/case-study" element={<CaseStudy />} />
        <Route path="/bob-rides" element={<BobRides />} />
      </Routes>
    </BrowserRouter>
  );
}
