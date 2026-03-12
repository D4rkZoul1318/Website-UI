import { useState, useEffect } from "react";

const navLinks = ["Home", "Projects", "Chill"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => {
        const el = document.getElementById(link.toLowerCase());
        if (!el) return { link, top: 0 };
        return { link, top: el.getBoundingClientRect().top };
      });

      const current = sections.reduce((closest, section) => {
        return Math.abs(section.top) < Math.abs(closest.top)
          ? section
          : closest;
      });
      setActive(current.link);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: scrolled
          ? "rgba(249, 249, 247, 0.85)"
          : "rgba(249, 249, 247, 0.01)",
        borderBottom: scrolled ? "1px solid #E5E5E3" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between"
        style={{ height: "64px" }}
      >
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            fontSize: "20px",
            color: "#1A1A1A",
          }}
        >
          SB
        </span>
        <div className="flex items-center gap-8">
  {navLinks.map((link) => (
    <button
      key={link}
      onClick={() => scrollTo(link)}
      className="relative cursor-pointer bg-transparent border-none"
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 400,
        fontSize: "16px",
        color: active === link ? "#1A1A1A" : "#6B6B6B",
        transition: "color 200ms ease",
      }}
    >
      {link}
      <span
        className="absolute left-0 right-0 bottom-[-4px]"
        style={{
          height: "1.5px",
          backgroundColor: "#4A5240",
          transform: active === link ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 200ms ease",
        }}
      />
    </button>
  ))}
  
    href="/about"
    style={{
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 400,
      fontSize: "16px",
      color: "#6B6B6B",
      textDecoration: "none",
      cursor: "pointer",
      transition: "color 200ms ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")}
  >
    About
  </a>
       <div style={{ display: "flex", gap: "16px", alignItems: "center", marginLeft: "8px", borderLeft: "1px solid #E5E5E3", paddingLeft: "16px" }}>
            <a href="https://www.linkedin.com/in/sohum-bhatnagar-9b2301276/" target="_blank" rel="noopener noreferrer"
              style={{ color: "#6B6B6B", transition: "color 200ms", display: "flex", alignItems: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://www.behance.net/sohumbhatnagar" target="_blank" rel="noopener noreferrer"
              style={{ color: "#6B6B6B", transition: "color 200ms", display: "flex", alignItems: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9h5a2 2 0 0 1 0 4H3V9z"/><path d="M3 13h5.5a2.5 2.5 0 0 1 0 5H3v-5z"/><path d="M15 7h6"/><path d="M21 13.5a4 4 0 1 0-1 2.5h-5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
