import React from "react";
import { Navbar } from "../Navbar";

/* ─── ANIMATION COMPONENT ─── */
function FadeUp({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);
  return (
    <div
      ref={setRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── SECTION IMAGE COMPONENT ─── */
function SectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <FadeUp>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          borderRadius: "16px",
          display: "block",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      />
    </FadeUp>
  );
}

/* ─── SECTION WRAPPER ─── */
function Section({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 48px" }}>
        {children}
      </div>
    </section>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function BobRides() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: "#F9F9F7", color: "#1A1A1A", lineHeight: 1.6 }}>
      <Navbar />
      <div style={{ paddingTop: "64px" }}>

        {/* Hero */}
        <section style={{ padding: "80px 0 0 0" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 48px" }}>
            <FadeUp>
              <p style={{ fontSize: "12px", letterSpacing: "3px", color: "#6B6B6B", textTransform: "uppercase", marginBottom: "16px" }}>
                UI/UX & ICON DESIGN · 2025
              </p>
              <h1 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700, color: "#1A1A1A", marginBottom: "16px", lineHeight: 1.1 }}>
                BOB Rides
              </h1>
              <p style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "#6B6B6B", maxWidth: "600px", marginBottom: "48px" }}>
                Designing a 3D vehicle icon system and UI for a taxi aggregator that consolidates Uber, Ola, and Rapido into one app.
              </p>
            </FadeUp>
            <SectionImage src="/images/bob/hero.png" alt="BOB Rides Hero" />
          </div>
        </section>

        {/* Problem Statement */}
        <Section>
          <SectionImage src="/images/bob/problem-statement.png" alt="Problem Statement" />
        </Section>

        {/* Our Process */}
        <Section>
          <SectionImage src="/images/bob/our-process.png" alt="Our Process" />
        </Section>

        {/* Objectives & Goals */}
        <Section>
          <SectionImage src="/images/bob/objectives-goals.png" alt="Objectives and Goals" />
        </Section>

        {/* Business Challenges */}
        <Section>
          <SectionImage src="/images/bob/business-challenges.png" alt="Business Challenges" />
        </Section>

        {/* Product Users */}
        <Section>
          <SectionImage src="/images/bob/product-users.png" alt="Product Users" />
        </Section>

        {/* User Needs */}
        <Section>
          <SectionImage src="/images/bob/user-needs.png" alt="User Needs" />
        </Section>

        {/* Features & Functionalities */}
        <Section>
          <SectionImage src="/images/bob/features-functionalities.png" alt="Features and Functionalities" />
        </Section>

        {/* Product User Challenges */}
        <Section>
          <SectionImage src="/images/bob/product-user-challenges.png" alt="Product User Challenges" />
        </Section>

        {/* Competitor Analysis */}
        <Section>
          <SectionImage src="/images/bob/competitor-analysis.png" alt="Competitor Analysis" />
        </Section>

        {/* Unique Features */}
        <Section>
          <SectionImage src="/images/bob/unique-features.png" alt="Unique Features" />
        </Section>

        {/* User Persona */}
        <Section>
          <SectionImage src="/images/bob/user-persona.png" alt="User Persona" />
        </Section>

        {/* Task Mapping */}
        <Section>
          <SectionImage src="/images/bob/task-mapping.png" alt="Task Mapping" />
        </Section>

        {/* Eisenhower Matrix */}
        <Section>
          <SectionImage src="/images/bob/eisen-hover-matrix.png" alt="Eisenhower Matrix" />
        </Section>

        {/* 5 Why Analysis */}
        <Section>
          <SectionImage src="/images/bob/5-why-analysis.png" alt="5 Why Analysis" />
        </Section>

        {/* Root Cause Analysis */}
        <Section>
          <SectionImage src="/images/bob/root-cause-analysis.png" alt="Root Cause Analysis" />
        </Section>

        {/* Sketches */}
        <Section>
          <SectionImage src="/images/bob/sketches.png" alt="Sketches" />
        </Section>

        {/* Major Screens */}
        <Section>
          <SectionImage src="/images/bob/major-screens.png" alt="Major Screens" />
        </Section>

        {/* Thank You */}
        <Section>
          <SectionImage src="/images/bob/thank-you.png" alt="Thank You" />
        </Section>

        {/* Footer spacer */}
        <div style={{ height: "80px" }} />
      </div>
    </div>
  );
}
