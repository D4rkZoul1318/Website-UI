export function FooterNew() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 py-24 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-2xl md:text-3xl font-medium tracking-tight text-[#E8E4DF]">
            Let's work together.
          </p>
          <p className="mt-3 text-[#8A8A8A] text-sm">
            Open to product design roles and apprenticeships.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end md:justify-center">
          <a
            href="mailto:sohum1311@gmail.com"
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[12px] uppercase tracking-widest text-[#4A4A4A] hover:text-[#E8734A] transition-colors"
          >
            sohum1311@gmail.com ↗
          </a>
          <a
            href="https://linkedin.com/in/sohumbhatnagar"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[12px] uppercase tracking-widest text-[#4A4A4A] hover:text-[#E8734A] transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="mt-16 pt-4 border-t border-[#262626] flex justify-between">
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[10px] uppercase tracking-widest text-[#4A4A4A]"
        >
          &copy; 2026 Sohum Bhatnagar
        </span>
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[10px] uppercase tracking-widest text-[#4A4A4A]"
        >
          Designed & Built in Bengaluru
        </span>
      </div>
    </footer>
  );
}
