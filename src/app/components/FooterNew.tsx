export function FooterNew() {
  return (
    <footer className="border-t border-neutral-200 py-12 px-4 md:px-8 lg:px-12 max-w-[1280px] mx-auto">
      <p className="text-sm text-neutral-500">
        Open to product design roles and apprenticeships.
      </p>
      <div className="mt-3 flex items-center gap-4">
        <a
          href="https://linkedin.com/in/sohumbhatnagar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors"
        >
          LinkedIn
        </a>
        <span className="text-neutral-300">·</span>
        <a
          href="mailto:sohum1311@gmail.com"
          className="text-sm text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors"
        >
          Email
        </a>
        <span className="text-neutral-300">·</span>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors"
        >
          Resume
        </a>
      </div>
    </footer>
  );
}
