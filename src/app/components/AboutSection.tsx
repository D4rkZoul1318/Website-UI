export default function AboutSection() {
  return (
    <section className="relative w-full bg-[#0C0C0C] pt-16 pb-24">

      {/* === ABOUT ME TITLE === */}
      <div className="text-center mb-16 px-6">
        <h2
          style={{ fontFamily: 'Space Mono, monospace' }}
          className="text-[#E8734A] text-xs tracking-[4px] uppercase"
        >
          About Me
        </h2>
      </div>

      {/* === BASKETBALL COURT BACKGROUND === */}
      <div className="relative w-full mx-auto px-6">
        <div className="relative w-full overflow-hidden">
          <img
            src="/images/court-bg.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>

        {/* === TORN FRAME CARD — overlaps the court image === */}
        <div className="relative mx-auto max-w-[380px] -mt-32 md:-mt-40 z-10">

          {/* Cat sticker - top right */}
          <div className="absolute -top-10 -right-10 z-20 w-[90px] h-[90px] animate-waddle-a">
            <img
              src="/stickers/cat.png"
              alt=""
              width={90}
              height={90}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>

          {/* Frog sticker - bottom left */}
          <div className="absolute -bottom-6 -left-10 z-20 w-[80px] h-[80px] animate-waddle-b">
            <img
              src="/stickers/frog.png"
              alt=""
              width={80}
              height={80}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>

          {/* Torn frame border */}
          <div className="torn-border absolute -inset-3 z-0" />

          {/* White paper */}
          <div className="relative z-10 bg-white p-10 md:p-12">
            <p className="font-caveat text-[#1a1a1a] text-center text-[20px] md:text-[24px] leading-[1.6] italic">
              <span className="block text-[22px] md:text-[26px] font-semibold mb-4 not-italic">
                I am Sohum.
              </span>
              I spend most of my time designing digital experiences and bringing ideas to life.
              <br /><br />
              When I&apos;m away from my desk, I&apos;m usually behind a camera, exploring somewhere new, or on a basketball court.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
