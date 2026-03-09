import React from "react";

export default function BobRides() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/";
        }}
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1000,
          fontFamily: "Outfit, sans-serif",
          fontSize: "14px",
          color: "#6B6B6B",
          textDecoration: "none",
          padding: "8px 12px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")}
      >
        ← Back to Portfolio
      </a>
      <iframe
        src="https://sohumbob.framer.website"
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </div>
  );
}
