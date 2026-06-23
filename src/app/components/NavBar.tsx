import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8F7F4]/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex justify-between items-center">
        <Link
          to="/"
          className="text-sm font-medium text-neutral-900"
        >
          Sohum Bhatnagar
        </Link>
        <div className="flex gap-6">
          <a
            href="#work"
            onClick={handleWorkClick}
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Work
          </a>
          <Link
            to="/about"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            About
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
