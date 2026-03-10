import React from "react";
import { Navbar } from "../Navbar";

// Image paths
const imgIPhone35 = "/images/bob/major-screens.png";
const imgIPhone36 = "/images/bob/major-screens.png";
const imgIPhone39 = "/images/bob/major-screens.png";
const imgIPhone42 = "/images/bob/major-screens.png";
const imgDiscovery = "/images/bob/our-process.png";
const imgCopywriting = "/images/bob/our-process.png";
const imgIdea = "/images/bob/our-process.png";
const imgDesign = "/images/bob/our-process.png";
const imgUser2 = "/images/bob/product-users.png";
const imgCar = "/images/bob/sketches.png";
const imgWallet = "/images/bob/features-functionalities.png";
const imgOlaShare = "/images/bob/competitor-analysis.png";
const imgImage5 = "/images/bob/competitor-analysis.png";
const imgImage4 = "/images/bob/competitor-analysis.png";
const imgImage6 = "/images/bob/competitor-analysis.png";
const imgPersona = "/images/bob/user-persona.png";
const imgRCA = "/images/bob/root-cause-analysis.png";
const imgSketchCar = "/images/bob/sketches.png";
const imgSketchBike = "/images/bob/sketches.png";
const imgSketchAuto = "/images/bob/sketches.png";
const img3dCar = "/images/bob/major-screens.png";
const img3dBike = "/images/bob/major-screens.png";
const img3dAuto = "/images/bob/major-screens.png";
const imgScreen = "/images/bob/hero.png";
const imgSphere = "/images/bob/thank-you.png";
const imgTorus = "/images/bob/thank-you.png";
const imgPlatonic = "/images/bob/thank-you.png";
const imgCube = "/images/bob/thank-you.png";
const imgEllipse26 = "/images/bob/product-users.png";
const imgEllipse27 = "/images/bob/product-users.png";
const imgEllipse28 = "/images/bob/product-users.png";


/* ─── ANIMATION COMPONENT ─── */
function FadeUp({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);
  return (
    <div
      ref={setRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function BobRides() {
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
    <section className="py-20 md:py-28" style={{ backgroundColor: "white" }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <img src="/images/bob/hero.png" alt="BOB Rides Hero" style={{ width: "100%", borderRadius: "16px", display: "block" }} />
        </FadeUp>
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
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F9F9F7" }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <img src="/images/bob/our-process.png" alt="Our Process" style={{ width: "100%", borderRadius: "16px", display: "block" }} />
        </FadeUp>
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
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F9F9F7" }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <img src="/images/bob/product-users.png" alt="Product Users" style={{ width: "100%", borderRadius: "16px", display: "block" }} />
        </FadeUp>
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
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F9F9F7" }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <img src="/images/bob/features-functionalities.png" alt="Features and Functionalities" style={{ width: "100%", borderRadius: "16px", display: "block" }} />
        </FadeUp>
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
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F9F9F7" }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <img src="/images/bob/competitor-analysis.png" alt="Competitor Analysis" style={{ width: "100%", borderRadius: "16px", display: "block" }} />
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── USER PERSONA ─── */
function UserPersona() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F9F9F7" }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <img src="/images/bob/user-persona.png" alt="User Persona" style={{ width: "100%", borderRadius: "16px", display: "block" }} />
        </FadeUp>
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
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F9F9F7" }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <img src="/images/bob/root-cause-analysis.png" alt="Root Cause Analysis" style={{ width: "100%", borderRadius: "16px", display: "block" }} />
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── SKETCHES ─── */
function Sketches() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F9F9F7" }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <img src="/images/bob/sketches.png" alt="Sketches" style={{ width: "100%", borderRadius: "16px", display: "block" }} />
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── MAJOR SCREENS ─── */
function MajorScreens() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "white" }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <img src="/images/bob/major-screens.png" alt="Major Screens" style={{ width: "100%", borderRadius: "16px", display: "block" }} />
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── THANK YOU ─── */
function ThankYou() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#EBF4FF" }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeUp>
          <img src="/images/bob/thank-you.png" alt="Thank You" style={{ width: "100%", borderRadius: "16px", display: "block" }} />
        </FadeUp>
      </div>
    </section>
  );
}

