export function FooterNew() {
  return (
    <footer className="mt-32 mb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
      <div className="border-t border-neutral-200 pt-12">
        <p className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900">
          Let's work together.
        </p>
        <div className="mt-4 flex gap-6">
          <a
            href="mailto:sohum1311@gmail.com"
            className="text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/sohumbhatnagar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4"
          >
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4"
          >
            Resume
          </a>
        </div>
        <p className="mt-8 text-xs text-neutral-300">&copy; 2026 Sohum Bhatnagar</p>
      </div>
    </footer>
  );
}
