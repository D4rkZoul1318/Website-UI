export default function AboutSection() {
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

      <div className="relative w-full mx-auto px-6" style={{ maxWidth: 1600 }}>
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-visible">
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <img
              src="/images/court-bg.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/[0.21]" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center overflow-visible z-10">
            <div
              style={{
                width: 360,
                height: 480,
                transform: 'scale(1.5)',
                transformOrigin: 'center center',
              }}
            >
              <div className="relative w-full h-full">
                <div
                  className="absolute z-20 animate-waddle-a"
                  style={{ width: 100, height: 100, top: -53, right: -44 }}
                >
                  <img src="/stickers/cat.png" alt="" className="w-full h-full object-contain drop-shadow-lg" />
                </div>

                <div
                  className="absolute z-20 animate-waddle-b"
                  style={{ width: 128, height: 128, bottom: -51, left: -69 }}
                >
                  <img src="/stickers/frog.png" alt="" className="w-full h-full object-contain drop-shadow-lg" />
                </div>

                <div className="torn-border absolute z-0" style={{ inset: -12 }} />

                <div
                  className="relative z-10 bg-white h-full flex items-center justify-center"
                  style={{ padding: '50px' }}
                >
                  <p
                    className="font-caveat text-[#1a1a1a] text-center italic"
                    style={{ fontSize: 23, lineHeight: 1.6 }}
                  >
                    <span
                      className="block font-semibold not-italic"
                      style={{ fontSize: 32, marginBottom: 16 }}
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
