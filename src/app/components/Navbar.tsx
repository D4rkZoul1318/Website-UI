python3 << 'EOF'
content = open('src/app/components/Navbar.tsx').read()

old = '''        <div className="flex items-center gap-8">
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
        </div>'''

new = '''        <div className="flex items-center gap-8">
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
        </div>'''

result = content.replace(old, new)
if result == content:
    print("ERROR: pattern not found")
else:
    open('src/app/components/Navbar.tsx', 'w').write(result)
    print("done")
EOF