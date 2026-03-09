import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { ChillSection } from "./components/ChillSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "'Outfit', sans-serif",
        backgroundColor: "#F9F9F7",
        color: "#1A1A1A",
        lineHeight: 1.6,
      }}
    >
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <ChillSection />
      <Footer />
    </div>
  );
}
