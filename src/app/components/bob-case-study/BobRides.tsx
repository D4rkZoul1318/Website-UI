import { Navbar } from "../Navbar";
import { FadeUp, StaggerContainer, StaggerChild } from "./components/use-scroll-animation";

// Import all images - using public web paths instead of Figma assets
const imgIPhone35 = "/images/bob/iphone-home-screen.png";
const imgIPhone36 = "/images/bob/iphone-screen-2.png";
const imgIPhone39 = "/images/bob/iphone-ride-options.png";
const imgIPhone42 = "/images/bob/iphone-checkout.png";
const imgDiscovery = "/images/bob/icon-discovery.png";
const imgCopywriting = "/images/bob/icon-copywriting.png";
const imgIdea = "/images/bob/icon-idea.png";
const imgDesign = "/images/bob/icon-design.png";
const imgUser2 = "/images/bob/icon-user.png";
const imgCar = "/images/bob/icon-car.png";
const imgWallet = "/images/bob/icon-wallet.png";
const imgOlaShare = "/images/bob/logo-ola.png";
const imgImage5 = "/images/bob/logo-rapido.png";
const imgImage4 = "/images/bob/logo-uber.png";
const imgImage6 = "/images/bob/logo-namma-yatri.png";
const imgPersona = "/images/bob/persona-rahul.png";
const imgRCA = "/images/bob/diagram-rca.png";
const imgSketchCar = "/images/bob/sketch-car.png";
const imgSketchBike = "/images/bob/sketch-bike.png";
const imgSketchAuto = "/images/bob/sketch-auto.png";
const img3dCar = "/images/bob/3d-car.png";
const img3dBike = "/images/bob/3d-bike.png";
const img3dAuto = "/images/bob/3d-auto.png";
const imgScreen = "/images/bob/screen.png";
const imgSphere = "/images/bob/3d-sphere.png";
const imgTorus = "/images/bob/3d-torus.png";
const imgPlatonic = "/images/bob/3d-platonic.png";
const imgCube = "/images/bob/3d-cube.png";
const imgEllipse26 = "/images/bob/avatar-user-1.png";
const imgEllipse27 = "/images/bob/avatar-user-2.png";
const imgEllipse28 = "/images/bob/avatar-user-3.png";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9F9F7]" style={{ lineHeight: 1.6 }}>
      <style>{`
        .fade-up-element {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 400ms ease-out, transform 400ms ease-out;
        }
        .fade-up-element.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemStatement />
        <OurProcess />
        <ObjectivesGoals />
        <BusinessChallenges />
        <ProductUsers />
        <UserNeeds />
        <FeaturesSection />
        <ProductUserChallenges />
        <CompetitorAnalysis />
        <UserPersona />
        <UniqueFeatures />
        <TaskMapping />
        <EisenhowerMatrix />
        <FiveWhyAnalysis />
        <RootCauseAnalysis />
        <Sketches />
        <MajorScreens />
        <ThankYou />
      </main>
    </div>
  );
}

/* ─── HERO ─── */
function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden" style={{ minHeight: "90vh" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-20 relative z-10">
        <FadeUp>
          <h1
            className="text-[#282D46] tracking-tight"
            style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 600, lineHeight: 1.15 }}
          >
            BOB RIDES
          </h1>
          <p
            className="text-[#282D46] mt-2"
            style={{ fontSize: "clamp(24px, 3.5vw, 48px)", fontWeight: 600, lineHeight: 1.3 }}
          >
            Icon Design & UI/UX<br />Case Study.
          </p>
        </FadeUp>
      </div>
      {/* Floating phone mockups */}
      <div className="absolute top-16 right-0 w-[55%] h-full hidden lg:block">
        <div className="relative w-full h-full">
          <PlaceholderImage
            alt="iPhone Screen"
            className="absolute rounded-[20px] shadow-lg"
            width="180px"
            height="auto"
            style={{
              aspectRatio: "9/19.5",
              top: "15%",
              right: "25%",
              transform: "rotate(-30deg)",
            }}
          />
          <PlaceholderImage
            alt="iPhone Screen"
            className="absolute rounded-[20px] shadow-lg"
            width="180px"
            height="auto"
            style={{
              aspectRatio: "9/19.5",
              top: "5%",
              right: "5%",
              transform: "rotate(-30deg)",
            }}
          />
          <PlaceholderImage
            alt="iPhone Screen"
            className="absolute rounded-[20px] shadow-lg"
            width="180px"
            height="auto"
            style={{
              aspectRatio: "9/19.5",
              top: "30%",
              right: "45%",
              transform: "rotate(-30deg)",
            }}
          />
          <PlaceholderImage
            alt="iPhone Screen"
            className="absolute rounded-[20px] shadow-lg"
            width="180px"
            height="auto"
            style={{
              aspectRatio: "9/19.5",
              top: "40%",
              right: "15%",
              transform: "rotate(-30deg)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEM STATEMENT ─── */
function ProblemStatement() {
  return (
    <section className="bg-[#F9F9F7] py-20 md:py-28">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>Problem Statement</SectionTitle>
        </FadeUp>
        <FadeUp delay={80}>
          <div className="text-[#1A1A1A] space-y-6 mt-8" style={{ fontSize: "17px" }}>
            <p>
              Ride-hailing apps in the Indian market rely almost entirely on flat, generic vehicle
              icons that prioritize function over identity. Across Uber, Rapido, Ola, and Namma
              Yatri, the visual language is interchangeable silhouettes that tell users what vehicle
              type they are booking, but communicate nothing about the brand they are booking with.
            </p>
            <p>
              The challenge for BOB Rides was to design a vehicle icon system that solved two
              competing demands simultaneously: icons that are instantly recognisable and legible at
              small UI sizes, and icons that carry a distinct visual character strong enough to
              differentiate BOB Rides from every other player in the category. The additional
              constraint was that the entire system had to be built for a dark-mode-native
              interface — a context that most existing icon styles in the market were never designed
              for, making direct reference or adaptation impossible.
            </p>
            <p>
              The core design question was: how do you create 3D vehicle icons that feel familiar
              enough for a user to identify at a glance, while being visually distinctive enough
              that the app they appear in could not be mistaken for any competitor?
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── OUR PROCESS ─── */
function OurProcess() {
  const steps = [
    { label: "Discover", icon: imgDiscovery, color: "rgba(24,138,236,0.04)" },
    { label: "Define", icon: imgCopywriting, color: "#F6FAFE" },
    { label: "Ideate", icon: imgIdea, color: "#F6FAFE" },
    { label: "Design", icon: imgDesign, color: "#F6FAFE" },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle center>Our Process</SectionTitle>
        </FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {steps.map((step, i) => (
            <FadeUp key={step.label} delay={i * 80}>
              <div className="flex flex-col items-center text-center">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{ width: 140, height: 140, backgroundColor: step.color }}
                >
                  <PlaceholderImage
                    alt={step.label}
                    width="56px"
                    height="56px"
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <p
                  className="mt-5 text-[#282D46]"
                  style={{ fontSize: "20px", fontWeight: 500 }}
                >
                  {step.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── OBJECTIVES & GOALS ─── */
function ObjectivesGoals() {
  return (
    <section className="bg-[#F9F9F7] py-20 md:py-28">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>Objectives & Goals</SectionTitle>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <FadeUp delay={80}>
            <ul className="list-disc pl-6 text-[#1A1A1A] space-y-2" style={{ fontSize: "17px" }}>
              <li>
                Design a 3D vehicle icon system (bike, auto, cab) that is instantly legible at small
                UI sizes and visually distinct from every competitor in the Indian ride-hailing
                market
              </li>
            </ul>
          </FadeUp>
          <FadeUp delay={160}>
            <ul className="list-disc pl-6 text-[#1A1A1A] space-y-2" style={{ fontSize: "17px" }}>
              <li>
                Build Icons for a dark-mode-native UI for a ride aggregator that consolidates
                multiple taxi apps like Rapido, Uber, Ola into a single booking interface
              </li>
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── BUSINESS CHALLENGES ─── */
function BusinessChallenges() {
  const challenges = [
    "Existing ride-hailing apps in India use flat, generic vehicle icons that offer no brand differentiation",
    "No established design reference for 3D vehicle icons in a dark-mode mobile context",
    "Icons had to remain legible at 24px (tab navigation size) while retaining dimensional depth",
    "The aggregator model required a single visual system that could represent competing brands (Rapido, Uber, Ola) without visual conflict",
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>Business Challenges</SectionTitle>
        </FadeUp>
        <div className="mt-10 space-y-5">
          {challenges.map((c, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="flex items-start gap-4">
                <span className="mt-2 block w-8 h-[2px] bg-[#F57878] shrink-0 rounded" />
                <p className="text-[#1A1A1A]" style={{ fontSize: "17px" }}>
                  {c}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRODUCT USERS ─── */
function ProductUsers() {
  return (
    <section className="bg-[#F6FAFE] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative">
        <FadeUp>
          <SectionTitle center>Product Users</SectionTitle>
        </FadeUp>
        <FadeUp delay={80}>
          <p
            className="text-center text-[#282D46] mt-4 max-w-[600px] mx-auto"
            style={{ fontSize: "18px" }}
          >
            Any user that uses taxi apps like OLA, Uber, Rapido, Namma Yatri
          </p>
        </FadeUp>
        <div className="flex justify-center gap-8 md:gap-16 mt-12 flex-wrap">
          {[imgEllipse26, imgEllipse27, imgEllipse28].map((img, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="relative">
                <PlaceholderImage
                  alt={`User ${i + 1}`}
                  width={i === 2 ? "120px" : "160px"}
                  height={i === 2 ? "120px" : "160px"}
                  style={{ borderRadius: "50%" }}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── USER NEEDS ─── */
function UserNeeds() {
  const needs = [
    "A single interface to compare ride prices across Rapido, Uber, and Ola without switching between apps",
    "Clear, instant visual identification of vehicle type (bike, auto, cab) at a glance, especially in low-light conditions",
    "A booking experience that feels reliable and premium, not just functional",
  ];

  return (
    <section className="bg-[#F9F9F7] py-20 md:py-28">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>User Needs</SectionTitle>
        </FadeUp>
        <div className="mt-10 space-y-5">
          {needs.map((n, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="flex items-start gap-4">
                <span className="mt-2 block w-8 h-[2px] bg-[#188AEC] shrink-0 rounded" />
                <p className="text-[#1A1A1A]" style={{ fontSize: "17px" }}>
                  {n}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES & FUNCTIONALITIES ─── */
function FeaturesSection() {
  const features = [
    {
      icon: imgUser2,
      title: "Multi-app aggregation",
      desc: "Compare Rapido, Uber, and Ola rides in one screen",
    },
    {
      icon: imgCar,
      title: "3D vehicle icon system",
      desc: "Custom bike, auto, and cab icons across all booking states",
    },
    {
      icon: imgWallet,
      title: "Best price indicator",
      desc: "Real-time fare comparison with savings highlighted against competitor pricing",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle center>Features & Functionalities</SectionTitle>
          <p className="text-center text-[#6B6B6B] mt-2" style={{ fontSize: "18px" }}>
            To resolve user needs
          </p>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-10 mt-14">
          {features.map((f, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="flex flex-col items-center text-center">
                <div
                  className="rounded-full flex items-center justify-center bg-[#F6FAFE]"
                  style={{ width: 100, height: 100 }}
                >
                  <PlaceholderImage
                    alt={f.title}
                    width="40px"
                    height="40px"
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <p
                  className="mt-5 text-[#1A1A1A]"
                  style={{ fontSize: "16px", fontWeight: 500 }}
                >
                  {f.title}
                </p>
                <p className="mt-2 text-[#6B6B6B]" style={{ fontSize: "15px" }}>
                  {f.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRODUCT USER CHALLENGES ─── */
function ProductUserChallenges() {
  const challenges = [
    "Users switching between 3 or more apps to compare prices before booking, adding friction to every ride decision",
    "Flat, generic icons across existing apps make vehicle type selection feel utilitarian and unmemorable",
    "Dark environments (night travel, low screen brightness) make standard light-mode icon systems difficult to read",
    "No single app surfaces price comparisons transparently — users have to manually open each app",
  ];

  return (
    <section className="bg-[#F9F9F7] py-20 md:py-28">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>Product User Challenges</SectionTitle>
        </FadeUp>
        <div className="mt-10 space-y-5">
          {challenges.map((c, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="flex items-start gap-4">
                <span className="mt-2 block w-8 h-[2px] bg-[#188AEC] shrink-0 rounded" />
                <p className="text-[#1A1A1A]" style={{ fontSize: "17px" }}>
                  {c}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COMPETITOR ANALYSIS ─── */
function CompetitorAnalysis() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>Competitor Analysis</SectionTitle>
        </FadeUp>

        {/* Competitor logos */}
        <FadeUp delay={80}>
          <div className="flex flex-wrap gap-6 items-center mt-10">
            <PlaceholderImage alt="Ola" width="100px" height="64px" style={{ borderRadius: "8px" }} />
            <PlaceholderImage alt="Rapido" width="100px" height="56px" style={{ borderRadius: "8px" }} />
            <PlaceholderImage alt="Uber" width="100px" height="56px" style={{ borderRadius: "8px" }} />
            <PlaceholderImage alt="Namma Yatri" width="100px" height="56px" style={{ borderRadius: "8px" }} />
          </div>
        </FadeUp>

        <FadeUp delay={160}>
          <p className="text-[#1A1A1A] mt-10" style={{ fontSize: "18px", fontWeight: 600 }}>
            Competitor's: OLA, Rapido, Uber, Namma Yatri
          </p>
        </FadeUp>

        <FadeUp delay={240}>
          <p className="text-[#1A1A1A] mt-6" style={{ fontSize: "16px", fontWeight: 600 }}>
            Features:
          </p>
        </FadeUp>

        {/* Comparison table */}
        <FadeUp delay={320}>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse" style={{ fontSize: "15px" }}>
              <thead>
                <tr className="border-b-2 border-[#CBD4DC]">
                  <th className="text-left py-3 px-4 text-[#1A1A1A]" style={{ fontWeight: 600 }}>Feature</th>
                  <th className="text-left py-3 px-4 text-[#1A1A1A]" style={{ fontWeight: 600 }}>Competitors</th>
                  <th className="text-left py-3 px-4 text-[#1A1A1A]" style={{ fontWeight: 600 }}>BOB Rides</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                {[
                  ["Icon style", "Flat 2D silhouettes across most competitors", "3 Dimensional renders"],
                  ["Dark mode support", "None native in Rapido or Ola; partial in Uber", "Fully dark-mode-native"],
                  ["Price comparison", "Hidden or single-app only", "Cross-app real-time comparison"],
                  ["Visual identity", "Generic, interchangeable across category", "Distinct, brand-coded"],
                  ["Aggregation", "Single service each", "Multi-service in a single interface"],
                ].map(([feature, comp, bob], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#F6FAFE]" : ""}>
                    <td className="py-3 px-4" style={{ fontWeight: 500 }}>{feature}</td>
                    <td className="py-3 px-4 text-[#6B6B6B]">{comp}</td>
                    <td className="py-3 px-4 text-[#188AEC]" style={{ fontWeight: 500 }}>{bob}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── USER PERSONA ─── */
function UserPersona() {
  return (
    <section className="bg-[#F9F9F7] py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>User Persona</SectionTitle>
        </FadeUp>
        <div className="grid md:grid-cols-[320px_1fr] gap-10 mt-10">
          {/* Left - Profile card */}
          <FadeUp delay={80}>
            <div className="bg-white rounded-[12px] p-8 border border-[#E5E5E3]">
              <div className="flex flex-col items-center">
                <PlaceholderImage
                  alt="Rahul Kumar"
                  width="128px"
                  height="128px"
                  style={{ borderRadius: "50%" }}
                />
                <p className="mt-4 text-[#1A1A1A]" style={{ fontSize: "20px", fontWeight: 500 }}>
                  Rahul Kumar
                </p>
                <p className="text-[#188AEC]" style={{ fontSize: "15px" }}>
                  Community Manager
                </p>
              </div>
              <div className="mt-6 space-y-3">
                <p className="text-[#1A1A1A]" style={{ fontSize: "14px", fontWeight: 600 }}>
                  About
                </p>
                <div className="grid grid-cols-2 gap-3" style={{ fontSize: "14px" }}>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#188AEC] flex items-center justify-center text-white" style={{ fontSize: "10px" }}>
                      🎂
                    </span>
                    <span className="text-[#1A1A1A]">35</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#188AEC] flex items-center justify-center text-white" style={{ fontSize: "10px" }}>
                      📍
                    </span>
                    <span className="text-[#1A1A1A]">Bangalore</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#188AEC] flex items-center justify-center text-white" style={{ fontSize: "10px" }}>
                      🎓
                    </span>
                    <span className="text-[#1A1A1A]">MBA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#188AEC] flex items-center justify-center text-white" style={{ fontSize: "10px" }}>
                      💼
                    </span>
                    <span className="text-[#1A1A1A]">Employee</span>
                  </div>
                </div>
              </div>

              {/* Maslow Pyramid - simplified */}
              <div className="mt-8">
                <p className="text-[#1A1A1A]" style={{ fontSize: "14px", fontWeight: 600 }}>
                  Maslow Pyramid
                </p>
                <div className="mt-3 space-y-1" style={{ fontSize: "13px" }}>
                  {[
                    { label: "Self Actualisation", active: false },
                    { label: "Esteem", active: true },
                    { label: "Love Belonging", active: false },
                    { label: "Safety", active: false },
                    { label: "Physiological", active: false },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`py-1.5 px-3 rounded-md ${item.active ? "bg-[#188AEC] text-white" : "text-[#6B6B6B]"}`}
                      style={{ fontWeight: item.active ? 500 : 400 }}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right - Details */}
          <div className="space-y-8">
            <FadeUp delay={160}>
              <div>
                <p className="text-[#1A1A1A]" style={{ fontSize: "18px", fontWeight: 600 }}>
                  Description
                </p>
                <p className="mt-3 text-[#1A1A1A]" style={{ fontSize: "16px" }}>
                  Arjun commutes daily across Bengaluru using a mix of bike taxis and autos
                  depending on traffic and time of day. He has Rapido, Uber, and Ola installed and
                  manually checks prices before every booking.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={240}>
              <div>
                <p className="text-[#1A1A1A]" style={{ fontSize: "18px", fontWeight: 600 }}>
                  A day in their life
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-2 text-[#1A1A1A]" style={{ fontSize: "16px" }}>
                  <li>Opens 2–3 different ride apps every morning to compare prices before booking</li>
                  <li>Regularly switches between bike and auto depending on availability and surge pricing</li>
                  <li>Uses dark mode across all his apps by default</li>
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={320}>
              <div>
                <p className="text-[#1A1A1A]" style={{ fontSize: "18px", fontWeight: 600 }}>
                  Pain Points
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-2 text-[#1A1A1A]" style={{ fontSize: "16px" }}>
                  <li>Wastes 3–5 minutes every commute switching between apps to find the best fare</li>
                  <li>Can't tell which vehicle icon belongs to which service tier without reading the label</li>
                  <li>Existing apps feel visually identical — no sense of which one he's actually on</li>
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={400}>
              <div className="bg-[#F6FAFE] rounded-[12px] p-6 border-l-4 border-[#188AEC]">
                <p className="text-[#143D61] italic" style={{ fontSize: "16px" }}>
                  "I just want to see all my options in one place and book the cheapest one. Why do
                  I have to open three apps for that?"
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── UNIQUE FEATURES ─── */
function UniqueFeatures() {
  const features = [
    "Custom 3D vehicle icons rendered in Blender — the only ride app icon system in the Indian market built with dimensional 3D models rather than flat vectors",
    "Dark-mode-native design system built from the ground up, not adapted from a light-mode base",
    'Cross-app price aggregation with a real-time "Best Price" indicator showing exact savings compared to individual app pricing',
  ];

  return (
    <section className="bg-[#F6FAFE] py-20 md:py-28">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle center>Unique Features</SectionTitle>
        </FadeUp>
        <div className="mt-10 space-y-6">
          {features.map((f, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="flex items-start gap-4">
                <span className="mt-2 block w-8 h-[2px] bg-[#188AEC] shrink-0 rounded" />
                <p className="text-[#1A1A1A]" style={{ fontSize: "17px" }}>
                  {f}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TASK MAPPING ─── */
function TaskMapping() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>Task Mapping</SectionTitle>
        </FadeUp>
        <FadeUp delay={80}>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]" style={{ fontSize: "14px" }}>
              <thead>
                <tr className="border-b-2 border-[#CBD4DC]">
                  <th className="text-left py-3 px-3 text-[#1A1A1A] w-[120px]" style={{ fontWeight: 600 }}></th>
                  <th className="text-center py-3 px-3 text-[#1A1A1A]" style={{ fontWeight: 500 }}>Step 1 - Open App</th>
                  <th className="text-center py-3 px-3 text-[#1A1A1A]" style={{ fontWeight: 500 }}>Step 2 - Find a Ride</th>
                  <th className="text-center py-3 px-3 text-[#1A1A1A]" style={{ fontWeight: 500 }}>Step 3 - Select & Book</th>
                  <th className="text-center py-3 px-3 text-[#1A1A1A]" style={{ fontWeight: 500 }}>Step 4 - Complete Ride</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                {[
                  {
                    label: "Task",
                    cells: [
                      "User opens BOB Rides and sees home screen with recent destinations and Ride With selector",
                      "User enters destination, app fetches live prices from Rapido, Uber, and Ola simultaneously",
                      "User browses Available Rides screen, identifies vehicle type by icon, selects Best Price option",
                      "User tracks ride in activity screen, journey completes, fare is charged",
                    ],
                  },
                  {
                    label: "Environment",
                    cells: [
                      "Mobile, indoors or commuting, often in a hurry",
                      "Mobile, standing or seated, may be in low light or outdoor glare",
                      "Mobile, quick decision context, 10–30 seconds to choose",
                      "Mobile, background task, app open but user not actively interacting",
                    ],
                  },
                  {
                    label: "Challenges",
                    cells: [
                      "Remembering which app offers the best price today",
                      "Too many options displayed simultaneously; icons must communicate vehicle type instantly without reading labels",
                      "Distinguishing between providers and vehicle tiers at a glance",
                      "Confirming the right ride was booked — provider, vehicle type, and ETA must be immediately clear",
                    ],
                  },
                  {
                    label: "Emotions",
                    cells: [
                      "Mild impatience, wants to book fast and move on",
                      "Cautious scanning for the cheapest fare without missing a better option",
                      "Decisive but uncertain — does the icon match what they expect?",
                      "Relieved — booking is done, needs passive confirmation",
                    ],
                  },
                  {
                    label: "Thoughts",
                    cells: [
                      '"Is this faster than opening three apps separately?"',
                      '"Which one is actually cheapest right now?"',
                      '"Is that icon a bike or an auto? Is Best Price actually the best?"',
                      '"Did it book the right vehicle? When does it arrive?"',
                    ],
                  },
                  {
                    label: "Urgency",
                    cells: [
                      "Medium — user has a destination in mind and is ready to book",
                      "High — fare comparison is time-sensitive due to surge pricing",
                      "High — selection decision happens in under 30 seconds",
                      "Low — passive monitoring state",
                    ],
                  },
                  {
                    label: "Design Opportunity",
                    cells: [
                      "Home screen icons must communicate vehicle category at 48px without any label",
                      "Available Rides screen is the primary icon performance test — all three vehicle types appear simultaneously",
                      "Best Price badge and icon must work together to guide the decision",
                      "Activity screen must clearly confirm vehicle type icon and provider",
                    ],
                  },
                ].map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-[#F6FAFE]" : ""}>
                    <td className="py-3 px-3 border-r border-[#CBD4DC]" style={{ fontWeight: 600 }}>
                      {row.label}
                    </td>
                    {row.cells.map((cell, ci) => (
                      <td key={ci} className="py-3 px-3 text-center border-r border-[#CBD4DC] last:border-r-0" style={{ fontSize: "13px" }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── EISENHOWER MATRIX ─── */
function EisenhowerMatrix() {
  return (
    <section className="bg-[#F9F9F7] py-20 md:py-28">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>Eisenhower Matrix</SectionTitle>
        </FadeUp>
        <FadeUp delay={80}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Labels */}
            <div className="md:col-span-2 flex justify-between px-4">
              <p className="text-[#1A1A1A]" style={{ fontSize: "16px", fontWeight: 600 }}>
                Urgent
              </p>
              <p className="text-[#1A1A1A]" style={{ fontSize: "16px", fontWeight: 600 }}>
                Not Urgent
              </p>
            </div>

            {/* Q1 - Important + Urgent */}
            <div className="bg-[rgba(143,216,24,0.3)] rounded-[16px] p-8 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#3C5612]" style={{ fontSize: "13px", fontWeight: 500 }}>
                  <span className="block" style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px" }}>
                    Important & Urgent
                  </span>
                  Icon legibility at 24px; dark mode rendering across all screen states
                </p>
              </div>
            </div>

            {/* Q2 - Important + Not Urgent */}
            <div className="bg-[rgba(125,209,255,0.28)] rounded-[16px] p-8 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#282D46]" style={{ fontSize: "13px", fontWeight: 500 }}>
                  <span className="block" style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px" }}>
                    Important & Not Urgent
                  </span>
                  Full 3D model pipeline for all vehicle types; consistent perspective angle across
                  icon family
                </p>
              </div>
            </div>

            {/* Q3 - Not Important + Urgent */}
            <div className="bg-[#FFF4CE] rounded-[16px] p-8 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#67530C]" style={{ fontSize: "13px", fontWeight: 500 }}>
                  <span className="block" style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px" }}>
                    Not Important & Urgent
                  </span>
                  Colour differentiation between vehicle tiers
                </p>
              </div>
            </div>

            {/* Q4 - Not Important + Not Urgent */}
            <div className="bg-[#FCCFCF] rounded-[16px] p-8 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#49010E]" style={{ fontSize: "13px", fontWeight: 500 }}>
                  <span className="block" style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px" }}>
                    Not Important & Not Urgent
                  </span>
                  Additional vehicle types beyond bike, auto, cab
                </p>
              </div>
            </div>

            {/* Side labels */}
            <div className="md:col-span-2 flex justify-between px-4 -mt-2">
              <p className="text-[#1A1A1A]" style={{ fontSize: "14px", fontWeight: 600 }}>
                Important ↑
              </p>
              <p className="text-[#1A1A1A]" style={{ fontSize: "14px", fontWeight: 600 }}>
                Not Important ↓
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── 5 WHY ANALYSIS ─── */
function FiveWhyAnalysis() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>5 Why Analysis</SectionTitle>
        </FadeUp>
        <div className="mt-10 space-y-6">
          {/* Problem */}
          <FadeUp delay={80}>
            <div className="bg-[#188AEC] rounded-[12px] py-6 px-8 text-center">
              <p className="text-white" style={{ fontSize: "15px", fontWeight: 500 }}>
                Problem 1
              </p>
              <p className="text-white mt-1" style={{ fontSize: "16px" }}>
                Users cannot distinguish BOB Rides from other ride apps at first glance.
              </p>
            </div>
          </FadeUp>

          {/* Arrow */}
          <FadeUp delay={120}>
            <div className="flex justify-center">
              <svg width="2" height="40" viewBox="0 0 2 40">
                <path d="M1 0V40" stroke="#EFEFEF" strokeWidth="3" />
              </svg>
            </div>
          </FadeUp>

          {/* Causes */}
          {[
            {
              label: "Cause 1",
              text: "The icon system used standard flat 2D vehicle silhouettes, identical in style to Rapido, Uber, and Ola.",
            },
            {
              label: "Cause 2",
              text: "The initial design direction referenced existing competitors as the baseline rather than as the benchmark to exceed.",
            },
            {
              label: "Cause 3",
              text: "No Indian ride-hailing app had attempted 3D icons, so there was no category precedent — the design process defaulted to what already existed.",
            },
            {
              label: "Cause 4",
              text: "The market had collectively prioritised development speed and functional clarity over visual brand differentiation, making flat icons the industry default.",
            },
          ].map((cause, i) => (
            <FadeUp key={i} delay={160 + i * 80}>
              <div className="bg-[#EFEFEF] rounded-[12px] py-5 px-8 text-center">
                <p className="text-[#1A1A1A]" style={{ fontSize: "14px", fontWeight: 600 }}>
                  {cause.label}
                </p>
                <p className="text-[#1A1A1A] mt-1" style={{ fontSize: "15px" }}>
                  {cause.text}
                </p>
              </div>
              {i < 3 && (
                <div className="flex justify-center mt-4">
                  <svg width="2" height="24" viewBox="0 0 2 24">
                    <path d="M1 0V24" stroke="#EFEFEF" strokeWidth="3" />
                  </svg>
                </div>
              )}
            </FadeUp>
          ))}

          {/* Root Cause */}
          <FadeUp delay={560}>
            <div className="flex justify-center mt-2">
              <svg width="2" height="40" viewBox="0 0 2 40">
                <path d="M1 0V40" stroke="#EFEFEF" strokeWidth="3" />
              </svg>
            </div>
            <div className="bg-[#EDF6FE] rounded-[12px] py-6 px-8 text-center mt-4">
              <p className="text-[#283264]" style={{ fontSize: "14px", fontWeight: 600 }}>
                Root Cause
              </p>
              <p className="text-[#283264] mt-2" style={{ fontSize: "15px" }}>
                The icon design brief across the entire ride-hailing category was defined as
                "communicate vehicle type" — never "communicate vehicle type AND brand identity
                simultaneously." No one had challenged that constraint, leaving the design
                opportunity completely open.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT CAUSE ANALYSIS (RCA DIAGRAM) ─── */
function RootCauseAnalysis() {
  return (
    <section className="bg-[#F9F9F7] py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>Root Cause Analysis (RCA)</SectionTitle>
        </FadeUp>
        <FadeUp delay={80}>
          <div className="mt-10 flex justify-center">
            <PlaceholderImage
              alt="Root Cause Analysis Diagram"
              width="900px"
              height="500px"
              style={{ borderRadius: "12px", maxWidth: "100%" }}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── SKETCHES ─── */
function Sketches() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>Sketches</SectionTitle>
        </FadeUp>

        {/* 3D Icon Renders */}
        <div className="grid grid-cols-3 gap-8 mt-10">
          {[
            { img: img3dCar, label: "Car", sketch: imgSketchCar },
            { img: img3dBike, label: "Bike", sketch: imgSketchBike },
            { img: img3dAuto, label: "Auto", sketch: imgSketchAuto },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="text-center">
                <div className="bg-[#F6FAFE] rounded-[12px] overflow-hidden aspect-square flex items-center justify-center">
                  <PlaceholderImage
                    alt={item.label}
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "12px" }}
                  />
                </div>
                <p
                  className="mt-4 text-[#1A1A1A]"
                  style={{ fontSize: "24px", fontWeight: 600 }}
                >
                  {item.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MAJOR SCREENS ─── */
function MajorScreens() {
  type Annotation = {
    label: string;
    side: "left" | "right";
    top: string; // percentage position along the phone height
  };

  type ScreenData = {
    img: string;
    title: string;
    annotations: Annotation[];
  };

  const screens: ScreenData[] = [
    {
      img: imgIPhone35,
      title: "Home Screen",
      annotations: [
        { label: "Location", side: "left", top: "12%" },
        { label: "Profile", side: "right", top: "12%" },
        { label: "Search bar", side: "right", top: "32%" },
        { label: "Recent Rides", side: "left", top: "55%" },
        { label: "Navigation bar", side: "left", top: "92%" },
      ],
    },
    {
      img: imgIPhone39,
      title: "Ride Options",
      annotations: [
        { label: "Back", side: "left", top: "8%" },
        { label: "Refresh", side: "right", top: "8%" },
        { label: "Mode of Transport", side: "right", top: "30%" },
        { label: "Ride Options", side: "left", top: "52%" },
        { label: "Navigation bar", side: "left", top: "92%" },
      ],
    },
    {
      img: imgIPhone42,
      title: "Checkout Screen",
      annotations: [
        { label: "Confirmation progress Bar", side: "left", top: "22%" },
        { label: "Upcoming ride details", side: "right", top: "50%" },
      ],
    },
  ];

  return (
    <section className="bg-[#F9F9F7] py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <FadeUp>
          <SectionTitle>Major Screens</SectionTitle>
        </FadeUp>

        <div className="mt-14 flex flex-col" style={{ gap: 80 }}>
          {screens.map((screen, idx) => (
            <FadeUp key={screen.title} delay={idx * 120}>
              {/* Title above */}
              <p
                className="text-center text-[#1A1A1A] mb-8"
                style={{ fontSize: "24px", fontWeight: 600 }}
              >
                {screen.title}
              </p>

              {/* Annotation layout: left annotations | phone | right annotations */}
              <div className="flex items-stretch justify-center mx-auto" style={{ maxWidth: 780 }}>
                {/* Left annotations column */}
                <div
                  className="hidden md:flex flex-col justify-start relative"
                  style={{ width: 200, flexShrink: 0 }}
                >
                  {screen.annotations
                    .filter((a) => a.side === "left")
                    .map((ann) => (
                      <div
                        key={ann.label}
                        className="absolute right-0 flex items-center"
                        style={{ top: ann.top, transform: "translateY(-50%)" }}
                      >
                        <span
                          className="text-[#6B6B6B] whitespace-nowrap"
                          style={{ fontSize: "13px", fontWeight: 500 }}
                        >
                          {ann.label}
                        </span>
                        <span
                          className="block bg-[#C4C4C4]"
                          style={{ width: 32, height: 1, marginLeft: 8, flexShrink: 0 }}
                        />
                        <span
                          className="block rounded-full bg-[#C4C4C4]"
                          style={{ width: 5, height: 5, flexShrink: 0 }}
                        />
                      </div>
                    ))}
                </div>

                {/* Phone mockup */}
                <div
                  className="relative mx-4 md:mx-6 flex-shrink-0"
                  style={{ width: "100%", maxWidth: 280 }}
                >
                  <div
                    className="bg-[#1A1A1A] overflow-hidden w-full"
                    style={{
                      borderRadius: 36,
                      aspectRatio: "9 / 19.5",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                      padding: 6,
                    }}
                  >
                    <PlaceholderImage
                      alt={screen.title}
                      width="100%"
                      height="100%"
                      style={{ borderRadius: 30 }}
                    />
                  </div>
                </div>

                {/* Right annotations column */}
                <div
                  className="hidden md:flex flex-col justify-start relative"
                  style={{ width: 200, flexShrink: 0 }}
                >
                  {screen.annotations
                    .filter((a) => a.side === "right")
                    .map((ann) => (
                      <div
                        key={ann.label}
                        className="absolute left-0 flex items-center"
                        style={{ top: ann.top, transform: "translateY(-50%)" }}
                      >
                        <span
                          className="block rounded-full bg-[#C4C4C4]"
                          style={{ width: 5, height: 5, flexShrink: 0 }}
                        />
                        <span
                          className="block bg-[#C4C4C4]"
                          style={{ width: 32, height: 1, marginRight: 8, flexShrink: 0 }}
                        />
                        <span
                          className="text-[#6B6B6B] whitespace-nowrap"
                          style={{ fontSize: "13px", fontWeight: 500 }}
                        >
                          {ann.label}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Mobile-only: annotations listed below the phone */}
              <div className="md:hidden mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
                {screen.annotations.map((ann) => (
                  <span
                    key={ann.label}
                    className="text-[#6B6B6B] flex items-center gap-2"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    <span
                      className="block rounded-full bg-[#C4C4C4]"
                      style={{ width: 5, height: 5 }}
                    />
                    {ann.label}
                  </span>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── THANK YOU ─── */
function ThankYou() {
  return (
    <section className="bg-[#EAF4FD] py-28 md:py-40 overflow-hidden relative">
      {/* 3D Elements */}
      <div
        className="absolute top-0 right-0 w-48 md:w-72 blur-[6px] opacity-80 pointer-events-none"
        style={{
          backgroundColor: "#EEEEEA",
          borderRadius: "12px",
          aspectRatio: "1",
        }}
      >
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999999",
          fontSize: "12px",
        }}>
          3D Sphere
        </div>
      </div>
      <div
        className="absolute bottom-10 left-[-80px] w-48 md:w-72 blur-[6px] opacity-70 pointer-events-none -rotate-15"
        style={{
          backgroundColor: "#EEEEEA",
          borderRadius: "12px",
          aspectRatio: "1",
        }}
      >
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999999",
          fontSize: "12px",
        }}>
          3D Torus
        </div>
      </div>
      <div
        className="absolute top-20 left-[15%] w-24 md:w-36 opacity-80 pointer-events-none"
        style={{
          backgroundColor: "#EEEEEA",
          borderRadius: "12px",
          aspectRatio: "1",
        }}
      >
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999999",
          fontSize: "12px",
        }}>
          3D Platonic
        </div>
      </div>
      <div
        className="absolute bottom-10 right-[5%] w-24 md:w-36 opacity-80 pointer-events-none"
        style={{
          backgroundColor: "#EEEEEA",
          borderRadius: "12px",
          aspectRatio: "1",
        }}
      >
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999999",
          fontSize: "12px",
        }}>
          3D Cube
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center relative z-10">
        <FadeUp>
          <h2
            className="text-[#282D46]"
            style={{
              fontSize: "clamp(48px, 8vw, 114px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            Thank You
          </h2>
          <h2
            className="text-[#282D46]"
            style={{
              fontSize: "clamp(48px, 8vw, 114px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            For Watching
          </h2>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── SHARED COMPONENTS ─── */
function SectionTitle({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <h2
      className={`text-[#1A1A1A] ${center ? "text-center" : ""}`}
      style={{
        fontSize: "clamp(28px, 4vw, 48px)",
        fontWeight: 600,
        letterSpacing: "-0.03em",
        lineHeight: 1.2,
      }}
    >
      {children}
    </h2>
  );
}

/* ─── PLACEHOLDER COMPONENT ─── */
interface PlaceholderImageProps {
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

function PlaceholderImage({
  alt,
  width = "100%",
  height = "300px",
  className = "",
  style = {},
}: PlaceholderImageProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: "#EEEEEA",
        borderRadius: "12px",
        width: width,
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
        ...style,
      }}
    >
      <div>
        <p style={{ color: "#999999", fontSize: "14px", fontWeight: 500 }}>
          {alt}
        </p>
        <p style={{ color: "#CCCCCC", fontSize: "12px", marginTop: "4px" }}>
          Image placeholder
        </p>
      </div>
    </div>
  );
}