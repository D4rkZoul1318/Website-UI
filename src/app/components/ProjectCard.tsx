import { motion } from "motion/react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  videoSrc?: string;
  badge?: string;
  link: string;
  external?: boolean;
  index: number;
}

export function ProjectCard({
  title,
  description,
  tags,
  videoSrc,
  badge,
  link,
  external,
  index,
}: ProjectCardProps) {
  const linkProps = external
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : { href: link };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm text-neutral-400">Case study coming soon</span>
          </div>
        )}
        {badge && (
          <span className="absolute top-3 right-3 bg-neutral-900 text-white text-xs px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-badge-text bg-badge-bg px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mt-3 text-xl md:text-2xl font-medium tracking-tight text-neutral-900">
        {title}
      </h3>

      <p className="mt-1 text-neutral-500 leading-relaxed">{description}</p>

      <a
        {...linkProps}
        className="mt-2 inline-flex items-center gap-1 text-sm text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors"
      >
        {external ? "Visit project" : "Read case study"}
        {external ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        ) : (
          <span aria-hidden="true">→</span>
        )}
      </a>
    </motion.div>
  );
}
