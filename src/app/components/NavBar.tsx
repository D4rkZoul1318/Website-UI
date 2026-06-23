import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#work";
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center transition-colors duration-200 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-[#E4E4E7]" : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
        <Link to="/" className="text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
          Sohum Bhatnagar
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="#work"
            onClick={handleWorkClick}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Work
          </a>
          <Link
            to="/about"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            About
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
