import { Linkedin } from "lucide-react";

function BehanceIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 18V6h5.5a3.5 3.5 0 0 1 0 5H3" />
      <path d="M3 11h6a3.5 3.5 0 0 1 0 7H3" />
      <path d="M15 6h6" />
      <path d="M18 12.5a3.5 3.5 0 1 0 0-1h-3.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#F9F9F7",
        borderTop: "1px solid #E8E8E4",
        padding: "28px 24px",
      }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: "#6B6B6B",
            margin: 0,
          }}
        >
          &copy; 2025 Sohum Bhatnagar
        </p>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "12px",
            color: "#6B6B6B",
            margin: 0,
          }}
        >
          Designed in Figma. Built with intent.
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/sohum-bhatnagar-9b2301276/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: "#6B6B6B", transition: "color 200ms ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")}
          >
            <Linkedin size={20} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.behance.net/sohumbhatnagar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
            style={{ color: "#6B6B6B", transition: "color 200ms ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")}
          >
            <BehanceIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
