import React, { useEffect, useRef, useState } from "react";

function FadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
      {children}
    </div>
  );
}

const sections = [
  { src: "/images/bob/hero.png", alt: "BOB Rides Hero", bg: "#ffffff" },
  { src: "/images/bob/problem-statement.png", alt: "Problem Statement", bg: "#F9F9F7" },
  { src: "/images/bob/our-process.png", alt: "Our Process", bg: "#ffffff" },
  { src: "/images/bob/objectives-goals.png", alt: "Objectives and Goals", bg: "#F9F9F7" },
  { src: "/images/bob/business-challenges.png", alt: "Business Challenges", bg: "#ffffff" },
  { src: "/images/bob/product-users.png", alt: "Product Users", bg: "#F9F9F7" },
  { src: "/images/bob/user-needs.png", alt: "User Needs", bg: "#ffffff" },
  { src: "/images/bob/features-functionalities.png", alt: "Features and Functionalities", bg: "#F9F9F7" },
  { src: "/images/bob/product-user-challenges.png", alt: "Product User Challenges", bg: "#ffffff" },
  { src: "/images/bob/competitor-analysis.png", alt: "Competitor Analysis", bg: "#F9F9F7" },
  { src: "/images/bob/unique-features.png", alt: "Unique Features", bg: "#ffffff" },
  { src: "/images/bob/user-persona.png", alt: "User Persona", bg: "#F9F9F7" },
  { src: "/images/bob/task-mapping.png", alt: "Task Mapping", bg: "#ffffff" },
  { src: "/images/bob/eisen-hover-matrix.png", alt: "Eisenhower Matrix", bg: "#F9F9F7" },
  { src: "/images/bob/5-why-analysis.png", alt: "5 Why Analysis", bg: "#ffffff" },
  { src: "/images/bob/root-cause-analysis.png", alt: "Root Cause Analysis", bg: "#F9F9F7" },
  { src: "/images/bob/sketches.png", alt: "Sketches", bg: "#ffffff" },
  { src: "/images/bob/major-screens.png", alt: "Major Screens", bg: "#F9F9F7" },
  { src: "/images/bob/thank-you.png", alt: "Thank You", bg: "#EBF4FF" },
];

export default function BobRides() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: "#F9F9F7" }}>
      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "64px", backgroundColor: "rgba(249,249,247,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E5E5E3", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: "20px", color: "#1A1A1A" }}>SB</span>
          <a href="/" style={{ fontSize: "14px", color: "#6B6B6B", textDecoration: "none" }}>← Back to Portfolio</a>
        </div>
      </nav>

      {/* Sections */}
      <div style={{ paddingTop: "64px" }}>
        {sections.map((s) => (
          <div key={s.src} style={{ backgroundColor: s.bg, padding: "60px 0" }}>
            <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>
              <FadeIn>
                <img src={s.src} alt={s.alt} style={{ width: "100%", display: "block", borderRadius: "12px" }} />
              </FadeIn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
