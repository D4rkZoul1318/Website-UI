export default function AboutSection() {
  return (
    <section className="relative w-full bg-[#0C0C0C] py-24 px-6 md:px-12 lg:px-20">
      <div className="relative mx-auto max-w-[420px]">

        <div className="absolute -top-10 -right-12 z-10 w-[100px] h-[100px] animate-waddle-a">
          <img
            src="/stickers/cat.png"
            alt="Cat sticker"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        <div className="absolute -bottom-8 -left-12 z-10 w-[90px] h-[90px] animate-waddle-b">
          <img
            src="/stickers/frog.png"
            alt="Frog sticker"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        <div className="torn-frame relative bg-white p-10 md:p-14">
          <p className="font-caveat text-[#1a1a1a] text-center text-[22px] md:text-[26px] leading-[1.6] italic">
            <span className="block text-[24px] md:text-[28px] font-semibold mb-4 not-italic">
              I am Sohum.
            </span>
            I spend most of my time designing digital experiences and bringing ideas to life.
            <br /><br />
            When I&apos;m away from my desk, I&apos;m usually behind a camera, exploring somewhere new, or on a basketball court.
          </p>
        </div>
      </div>
    </section>
  );
}
