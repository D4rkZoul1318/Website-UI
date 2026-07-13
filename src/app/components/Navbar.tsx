import { useState, useEffect } from "react";
import { ROUTES } from "../routes";

const font = "'Outfit', sans-serif";
const nearBlack = "#1A1A1A";
const grey = "#6B6B6B";
const accent = "#4A5240";

const navLinks = ["Home", "Work", "Chill"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHomePage = window.location.pathname === ROUTES.home;
  const currentPage = window.location.pathname;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);

    if (currentPage === ROUTES.about) setActive("About");
    else if (currentPage === ROUTES.explorations) setActive("Explorations");
    else if (currentPage === ROUTES.caseStudy || currentPage === ROUTES.bobRides) setActive("Work");

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!isHomePage) return;
      const sections = navLinks.map((link) => {
        const elId = link === "Work" ? "projects" : link.toLowerCase();
        const el = document.getElementById(elId);
        if (!el) return { link, top: Infinity };
        return { link, top: Math.abs(el.getBoundingClientRect().top) };
      });
      const current = sections.reduce((closest, section) =>
        section.top < closest.top ? section : closest
      );
      setActive(current.link);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (link: string) => {
    const targetId = link === "Work" ? "projects" : link.toLowerCase();
    setMenuOpen(false);
    if (isHomePage) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${targetId}`;
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          opacity: visible ? 1 : 0,
          backgroundColor: scrolled || menuOpen
            ? "rgba(249, 249, 247, 0.95)"
            : "rgba(249, 249, 247, 0.01)",
          borderBottom: scrolled || menuOpen ? "1px solid #E5E5E3" : "1px solid transparent",
          transition: "opacity 300ms ease, background-color 300ms ease, border-color 300ms ease",
        }}
      >
        <div
          className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between"
          style={{ height: "64px" }}
        >
          {/* Logo */}
          <a
            href={ROUTES.home}
            style={{
              fontFamily: font,
              fontWeight: 500,
              fontSize: "20px",
              color: nearBlack,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            SB
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="relative cursor-pointer bg-transparent border-none"
                style={{
                  fontFamily: font,
                  fontWeight: 400,
                  fontSize: "16px",
                  color: active === link ? nearBlack : grey,
                  transition: "color 200ms ease",
                  padding: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = nearBlack)}
                onMouseLeave={e => (e.currentTarget.style.color = active === link ? nearBlack : grey)}
              >
                {link}
                <span
                  className="absolute left-0 right-0 bottom-[-4px]"
                  style={{
                    height: "1.5px",
                    backgroundColor: accent,
                    transform: active === link ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 200ms ease",
                    display: "block",
                  }}
                />
              </button>
            ))}

            <a
              href={ROUTES.explorations}
              style={{
                fontFamily: font, fontWeight: 400, fontSize: "16px",
                color: active === "Explorations" ? nearBlack : grey,
                textDecoration: "none", position: "relative", paddingBottom: "4px",
                transition: "color 200ms ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = nearBlack; (e.currentTarget.querySelector("span") as HTMLElement).style.transform = "scaleX(1)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = active === "Explorations" ? nearBlack : grey; (e.currentTarget.querySelector("span") as HTMLElement).style.transform = active === "Explorations" ? "scaleX(1)" : "scaleX(0)"; }}
            >
              Explorations
              <span style={{ position: "absolute", left: 0, right: 0, bottom: "-2px", height: "1.5px", backgroundColor: accent, transform: active === "Explorations" ? "scaleX(1)" : "scaleX(0)", transition: "transform 200ms ease", display: "block" }} />
            </a>

            <a
              href={ROUTES.about}
              style={{
                fontFamily: font, fontWeight: 400, fontSize: "16px",
                color: active === "About" ? nearBlack : grey,
                textDecoration: "none", position: "relative", paddingBottom: "4px",
                transition: "color 200ms ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = nearBlack; (e.currentTarget.querySelector("span") as HTMLElement).style.transform = "scaleX(1)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = active === "About" ? nearBlack : grey; (e.currentTarget.querySelector("span") as HTMLElement).style.transform = active === "About" ? "scaleX(1)" : "scaleX(0)"; }}
            >
              About
              <span style={{ position: "absolute", left: 0, right: 0, bottom: "-2px", height: "1.5px", backgroundColor: accent, transform: active === "About" ? "scaleX(1)" : "scaleX(0)", transition: "transform 200ms ease", display: "block" }} />
            </a>

            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginLeft: "8px", borderLeft: "1px solid #E5E5E3", paddingLeft: "16px" }}>
              <a href="https://www.linkedin.com/in/sohum-bhatnagar-9b2301276/" target="_blank" rel="noopener noreferrer"
                style={{ color: grey, transition: "color 200ms", display: "flex", alignItems: "center" }}
                onMouseEnter={e => (e.currentTarget.style.color = nearBlack)}
                onMouseLeave={e => (e.currentTarget.style.color = grey)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://www.behance.net/sohumbhatnagar" target="_blank" rel="noopener noreferrer"
                style={{ color: grey, transition: "color 200ms", display: "flex", alignItems: "center" }}
                onMouseEnter={e => (e.currentTarget.style.color = nearBlack)}
                onMouseLeave={e => (e.currentTarget.style.color = grey)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9h5a2 2 0 0 1 0 4H3V9z"/><path d="M3 13h5.5a2.5 2.5 0 0 1 0 5H3v-5z"/><path d="M15 7h6"/><path d="M21 13.5a4 4 0 1 0-1 2.5h-5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="flex md:hidden flex-col justify-center items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", width: "32px", height: "32px", gap: "5px" }}
          >
            <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: nearBlack, transition: "transform 200ms ease, opacity 200ms ease", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: nearBlack, transition: "opacity 200ms ease", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: nearBlack, transition: "transform 200ms ease", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className="md:hidden"
          style={{
            maxHeight: menuOpen ? "400px" : "0",
            overflow: "hidden",
            transition: "max-height 300ms ease",
            backgroundColor: "rgba(249, 249, 247, 0.98)",
            borderTop: menuOpen ? "1px solid #E5E5E3" : "none",
          }}
        >
          <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column" }}>
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                style={{
                  fontFamily: font, fontWeight: 400, fontSize: "18px",
                  color: active === link ? nearBlack : grey,
                  background: "none", border: "none", cursor: "pointer",
                  textAlign: "left", padding: "14px 0",
                  borderBottom: "1px solid #F0EFEB",
                }}
              >
                {link}
              </button>
            ))}
            <a href={ROUTES.explorations} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: font, fontWeight: 400, fontSize: "18px", color: active === "Explorations" ? nearBlack : grey, textDecoration: "none", padding: "14px 0", borderBottom: "1px solid #F0EFEB", display: "block" }}>
              Explorations
            </a>
            <a href={ROUTES.about} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: font, fontWeight: 400, fontSize: "18px", color: active === "About" ? nearBlack : grey, textDecoration: "none", padding: "14px 0", borderBottom: "1px solid #F0EFEB", display: "block" }}>
              About
            </a>
            <div style={{ display: "flex", gap: "20px", paddingTop: "20px" }}>
              <a href="https://www.linkedin.com/in/sohum-bhatnagar-9b2301276/" target="_blank" rel="noopener noreferrer" style={{ color: grey, display: "flex", alignItems: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://www.behance.net/sohumbhatnagar" target="_blank" rel="noopener noreferrer" style={{ color: grey, display: "flex", alignItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9h5a2 2 0 0 1 0 4H3V9z"/><path d="M3 13h5.5a2.5 2.5 0 0 1 0 5H3v-5z"/><path d="M15 7h6"/><path d="M21 13.5a4 4 0 1 0-1 2.5h-5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
