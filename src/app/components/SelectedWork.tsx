import { ProjectCard } from "./ProjectCard";

export function SelectedWork() {
  return (
    <section id="work" className="pb-20 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-12">
        Selected work
      </p>

      <div className="space-y-16">
        <ProjectCard
          title="Bob Rides"
          description="Sole designer on a ride aggregator. Built the comparison UI, vehicle icon system, and design tokens from scratch."
          tags={["Ride-hailing", "Mobile UX", "Design system"]}
          videoSrc="/videos/bob-rides-preview.mp4"
          videoOrientation="portrait"
          badge="Live product"
          badgeStyle="light"
          link="/bob-rides"
          index={0}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            title="UUCMS Redesign"
            description="Redesigned a university campus management portal to reduce student task completion from 12 steps to 4."
            tags={["EdTech", "Responsive web", "Accessibility"]}
            link="/uucms"
            compact
            index={1}
          />
          <ProjectCard
            title="REWIND"
            description="A nostalgic audio experience built for Figma Config Makeathon 2026. Hardware-inspired UI meets spatial audio processing."
            tags={["Figma Config", "Web Audio", "Creative tech"]}
            videoSrc="/videos/rewind-preview.mp4"
            badge="Makeathon 2026"
            badgeStyle="dark"
            link="https://rewind-tau.vercel.app"
            external
            compact
            index={2}
          />
        </div>
      </div>
    </section>
  );
}
