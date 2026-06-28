import { useRef, useState, useEffect } from 'react';

const CARD_W = 420;
const CARD_H = 480;

export default function AboutSection() {
  const courtRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const court = courtRef.current;
    if (!court) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cw = entry.contentRect.width;
        const ch = entry.contentRect.height;
        const scaleW = (cw - 120) / CARD_W;
        const scaleH = (ch - 80) / CARD_H;
        setScale(Math.min(scaleW, scaleH));
      }
    });

    observer.observe(court);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-[#0C0C0C] pt-16 pb-24">
      <div className="text-center mb-16 px-6">
        <h2
          style={{ fontFamily: 'Space Mono, monospace' }}
          className="text-[#E8734A] text-xs tracking-[4px] uppercase"
        >
          About Me
        </h2>
      </div>

      <div className="relative w-full max-w-[960px] mx-auto px-6">
        {/* Court background */}
        <div
          ref={courtRef}
          className="relative w-full aspect-[16/9] rounded-lg overflow-visible"
        >
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <img
              src="/images/court-bg.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {/* Card — centered on court, scales to fit */}
          <div className="absolute inset-0 flex items-center justify-center overflow-visible z-10">
            <div
              style={{
                width: CARD_W,
                height: CARD_H,
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
              }}
            >
              <div className="relative w-full h-full">
                {/* Cat sticker */}
                <div className="absolute -top-[44px] -right-[44px] z-20 w-[88px] h-[88px] animate-waddle-a">
                  <img src="/stickers/cat.png" alt="" width={88} height={88} className="w-full h-full object-contain drop-shadow-lg" />
                </div>

                {/* Frog sticker */}
                <div className="absolute -bottom-[28px] -left-[36px] z-20 w-[76px] h-[76px] animate-waddle-b">
                  <img src="/stickers/frog.png" alt="" width={76} height={76} className="w-full h-full object-contain drop-shadow-lg" />
                </div>

                {/* Torn frame border */}
                <div className="torn-border absolute -inset-[12px] z-0" />

                {/* White paper */}
                <div className="relative z-10 bg-white px-[48px] py-[40px] h-full flex items-center justify-center">
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
      </div>
    </section>
  );
}
