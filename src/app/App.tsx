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
import { useEffect, useState } from "react";

const skills = ["UI/UX", "3D Modeling", "Graphic Design", "Photography"];

const SKILLS_DEFAULTS = { paddingTop: 0, paddingBottom: 64, gap: 24, fontSize: 5 };

function SkillsEditor({ config, onChange }: { config: typeof SKILLS_DEFAULTS; onChange: (c: typeof SKILLS_DEFAULTS) => void }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed', bottom: '12px', right: '12px', zIndex: 9999, width: '220px',
      background: 'rgba(12,12,12,0.95)', border: '1px solid #333', borderRadius: '8px',
      backdropFilter: 'blur(12px)', fontFamily: 'Space Mono, monospace',
      boxShadow: '0 8px 32px rgba(0,0,0,0.8)', userSelect: 'none',
    }}>
      <div onClick={() => setOpen(!open)} style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 12px', borderBottom: open ? '1px solid #222' : 'none', cursor: 'pointer',
      }}>
        <span style={{ fontSize: '10px', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          // Skills Editor
        </span>
        <span style={{ fontSize: '10px', color: '#4A4A4A' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{ padding: '8px 12px 12px' }}>
          {([
            { key: 'paddingTop', label: 'top offset (px)', min: -200, max: 200 },
            { key: 'paddingBottom', label: 'bottom padding (px)', min: 0, max: 200 },
            { key: 'gap', label: 'gap (px)', min: 0, max: 80 },
            { key: 'fontSize', label: 'font size (rem)', min: 1, max: 10 },
          ] as const).map(({ key, label, min, max }) => (
            <div key={key} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '10px', color: '#A3A3A3' }}>{label}</span>
                <span style={{ fontSize: '10px', color: '#E8734A', minWidth: '32px', textAlign: 'right' }}>
                  {config[key]}
                </span>
              </div>
              <input type="range" min={min} max={max} step={key === 'fontSize' ? 0.25 : 1}
                value={config[key]}
                onChange={e => onChange({ ...config, [key]: parseFloat(e.target.value) })}
                style={{ width: '100%', height: '2px', accentColor: '#E8734A', cursor: 'pointer' }}
              />
            </div>
          ))}
          <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
            <button onClick={copy} style={{
              flex: 1, background: copied ? '#1a3a1a' : '#1a1a1a',
              border: `1px solid ${copied ? '#22c55e' : '#333'}`,
              color: copied ? '#22c55e' : '#A3A3A3', fontSize: '9px',
              fontFamily: 'Space Mono, monospace', textTransform: 'uppercase',
              letterSpacing: '0.1em', padding: '6px', borderRadius: '4px', cursor: 'pointer',
            }}>
              {copied ? 'Copied ✓' : 'Copy Values'}
            </button>
            <button onClick={() => onChange(SKILLS_DEFAULTS)} style={{
              flex: 1, background: '#1a1a1a', border: '1px solid #333', color: '#A3A3A3',
              fontSize: '9px', fontFamily: 'Space Mono, monospace', textTransform: 'uppercase',
              letterSpacing: '0.1em', padding: '6px', borderRadius: '4px', cursor: 'pointer',
            }}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillsSection() {
  const [config, setConfig] = useState(SKILLS_DEFAULTS);

  return (
    <>
      <section
        className="flex flex-col items-center"
        style={{
          background: "#0C0C0C",
          marginTop: config.paddingTop + 'px',
          paddingBottom: config.paddingBottom + 'px',
          gap: config.gap + 'px',
        }}
      >
        {skills.map((skill) => (
          <div key={skill} style={{ fontSize: config.fontSize + 'rem' }}>
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
      <SkillsEditor config={config} onChange={setConfig} />
    </>
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
        <Route path="/" element={<HomePage />} />
        <Route path="/bob-rides" element={<BobRides />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/case-study" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}
