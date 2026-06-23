import { motion } from "motion/react";

interface ProjectCardProps {
  number: string;
  title: string;
  description: string;
  tags: string[];
  videoSrc?: string;
  videoOrientation?: "portrait" | "landscape";
  badge?: string;
  link: string;
  external?: boolean;
  status?: string;
}

function CornerMarkers() {
  return (
    <>
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#737373]/40" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#737373]/40" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#737373]/40" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#737373]/40" />
    </>
  );
}

export function ProjectCard({
  number,
  title,
  description,
  tags,
  videoSrc,
  videoOrientation = "landscape",
  badge,
  link,
  external,
  status,
}: ProjectCardProps) {
  const isPortrait = videoOrientation === "portrait";

  const linkProps = external
    ? { href: link, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href: link };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <a {...linkProps} className="group block">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-start">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <span
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-[13px] text-[#737373]"
              >
                {number}.
              </span>
              {status && (
                <span
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[10px] uppercase tracking-widest text-[#E8734A] bg-[rgba(232,115,74,0.1)] px-2 py-0.5 rounded"
                >
                  {status}
                </span>
              )}
            </div>

            <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-[#F0EDE8] group-hover:text-white transition-colors duration-300">
              {title}
            </h3>

            <p className="mt-4 text-[15px] leading-relaxed text-[#A3A3A3] max-w-[420px]">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[10px] uppercase tracking-widest text-[#737373] border border-[#333333] px-3 py-1.5 rounded-full group-hover:border-[#404040] group-hover:text-[#A3A3A3] transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2">
              <span
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-[12px] uppercase tracking-widest text-[#A3A3A3] group-hover:text-[#E8734A] transition-colors duration-300"
              >
                {external ? "Visit Project" : "View Case Study"}
              </span>
              <span className="text-[#A3A3A3] group-hover:text-[#E8734A] group-hover:translate-x-1 transition-all duration-300">
                {external ? "↗" : "→"}
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            {videoSrc ? (
              <div
                className={`relative rounded-lg overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#E8734A]/5 ${
                  isPortrait
                    ? "bg-[#0A0A0A] h-[350px] md:h-[450px] flex items-center justify-center"
                    : "bg-[#181818] aspect-video"
                }`}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  className={
                    isPortrait
                      ? "h-full w-auto object-contain mx-auto block"
                      : "w-full h-full object-cover"
                  }
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>

                {badge && (
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="absolute top-3 right-3 text-[10px] uppercase tracking-widest bg-[#F0EDE8]/10 backdrop-blur-sm text-[#F0EDE8] px-3 py-1 rounded-full border border-[#F0EDE8]/10"
                  >
                    {badge}
                  </span>
                )}

                <CornerMarkers />
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden bg-[#181818] aspect-video flex items-center justify-center border border-[#333333]">
                <span
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[11px] uppercase tracking-widest text-[#737373]"
                >
                  Case study in progress
                </span>
                {badge && (
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="absolute top-3 right-3 text-[10px] uppercase tracking-widest bg-[#F0EDE8]/10 backdrop-blur-sm text-[#F0EDE8] px-3 py-1 rounded-full border border-[#F0EDE8]/10"
                  >
                    {badge}
                  </span>
                )}
                <CornerMarkers />
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 border-b border-[#333333]" />
      </a>
    </motion.div>
  );
}
