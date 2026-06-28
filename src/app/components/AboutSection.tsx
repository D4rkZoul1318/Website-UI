import { useRef, useState, useEffect } from 'react';

const DESIGN_WIDTH = 420;

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const availableWidth = entry.contentRect.width;
        const maxCardWidth = availableWidth - 80;
        const newScale = Math.min(maxCardWidth / DESIGN_WIDTH, 1);
        setScale(newScale);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-[#0C0C0C] pt-16 pb-24">

      {/* Section title */}
      <div className="text-center mb-16 px-6">
        <h2
          style={{ fontFamily: 'Space Mono, monospace' }}
          className="text-[#E8734A] text-xs tracking-[4px] uppercase"
        >
          About Me
        </h2>
      </div>

      {/* Court background */}
      <div ref={containerRef} className="relative w-full mx-auto px-6">
        <div className="relative w-full overflow-hidden">
          <img
            src="/images/court-bg.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Scaled card unit — everything inside is fixed px, scales uniformly */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={{
              width: DESIGN_WIDTH,
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
          >
            <div className="relative">
              {/* Cat sticker */}
              <div className="absolute -top-[44px] -right-[44px] z-20 w-[88px] h-[88px] animate-waddle-a">
                <img
                  src="/stickers/cat.png"
                  alt=""
                  width={88}
                  height={88}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>

              {/* Frog sticker */}
              <div className="absolute -bottom-[32px] -left-[40px] z-20 w-[76px] h-[76px] animate-waddle-b">
                <img
                  src="/stickers/frog.png"
                  alt=""
                  width={76}
                  height={76}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>

              {/* Torn frame border */}
              <div className="torn-border absolute -inset-[12px] z-0" />

              {/* White paper */}
              <div className="relative z-10 bg-white px-[48px] py-[44px]">
                <p
                  className="font-caveat text-[#1a1a1a] text-center italic"
                  style={{ fontSize: 24, lineHeight: 1.6 }}
                >
                  <span
                    className="block font-semibold not-italic"
                    style={{ fontSize: 28, marginBottom: 16 }}
                  >
                    I am Sohum.
                  </span>
                  I spend most of my time designing digital experiences and bringing ideas to life.
                  <br /><br />
                  When I&apos;m away from my desk, I&apos;m usually behind a camera, exploring somewhere new, or on a basketball court.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
