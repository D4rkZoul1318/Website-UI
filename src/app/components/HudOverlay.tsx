import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function HudOverlay() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionLabel, setSectionLabel] = useState("00 // Home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "work") setSectionLabel("01 // Selected Work");
            else setSectionLabel("00 // Home");
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "/#work";
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress}%`, background: "#E8734A" }}
      />

      <div className="fixed inset-0 pointer-events-none z-50 p-4 md:p-6">
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <span style={{ fontFamily: "var(--font-mono)" }} className="text-[11px] uppercase tracking-widest text-[#4A4A4A]">
            Sohum Bhatnagar // Portfolio v3.0
          </span>
        </div>

        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-6 pointer-events-auto">
          <a
            href="#work"
            onClick={handleWorkClick}
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[11px] uppercase tracking-widest text-[#4A4A4A] hover:text-[#E8E4DF] transition-colors"
          >
            Work
          </a>
          <Link
            to="/about"
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[11px] uppercase tracking-widest text-[#4A4A4A] hover:text-[#E8E4DF] transition-colors"
          >
            About
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[11px] uppercase tracking-widest text-[#4A4A4A] hover:text-[#E8E4DF] transition-colors"
          >
            Resume
          </a>
        </div>

        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
          <span style={{ fontFamily: "var(--font-mono)" }} className="text-[11px] uppercase tracking-widest text-[#4A4A4A]">
            {sectionLabel}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-right">
          <span style={{ fontFamily: "var(--font-mono)" }} className="text-[11px] uppercase tracking-widest text-[#4A4A4A]">
            Bengaluru, IN // Available
          </span>
        </div>
      </div>
    </>
  );
}
