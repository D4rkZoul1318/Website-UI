import { ProjectCard } from "./ProjectCard";
import { ROUTES } from "../routes";

export function SelectedWork() {
  return (
    <section id="work" className="px-6 md:px-16 lg:px-24 py-32 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-baseline mb-16 border-b border-[#333333] pb-4">
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[11px] uppercase tracking-[0.2em] text-[#737373]"
        >
          Selected Work
        </span>
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[11px] uppercase tracking-[0.2em] text-[#737373]"
        >
          03 Projects
        </span>
      </div>

      <div className="space-y-24">
        <ProjectCard
          number="01"
          title="Bob Rides"
          description="Sole designer on a live ride-hailing aggregator. Built the comparison UI, vehicle icon evolution across 3 generations, and a complete design token system."
          tags={["Ride-hailing", "Mobile UX", "Design System", "Production"]}
          videoSrc="/videos/bob-rides-preview.mp4"
          videoOrientation="portrait"
          badge="Live Product"
          link={ROUTES.bobRides}
          status="Shipped"
        />

        <ProjectCard
          number="02"
          title="UUCMS Redesign"
          description="Redesigned a university campus management portal. Reduced student task completion from 12 steps to 4 through information architecture restructuring."
          tags={["EdTech", "Responsive Web", "Accessibility", "IA"]}
          badge="Case Study"
          link={ROUTES.caseStudy}
          status="Completed"
        />

        <ProjectCard
          number="03"
          title="REWIND"
          description="A nostalgic audio experience for Figma Config Makeathon 2026. Hardware-inspired interface with spatial audio processing, built with Web Audio API."
          tags={["Figma Config", "Web Audio", "Creative Tech", "React"]}
          videoSrc="/videos/rewind-preview.mp4"
          videoOrientation="landscape"
          badge="Makeathon 2026"
          link="https://rewind-tau.vercel.app"
          external
          status="Submitted"
        />
      </div>
    </section>
  );
}
