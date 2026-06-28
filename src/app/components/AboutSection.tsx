import { useState } from 'react';

const DEFAULTS = {
  bgMaxWidth: 960,
  bgOverlay: 15,
  cardW: 420,
  cardH: 480,
  cardScale: 1,
  cardOffsetX: 0,
  cardOffsetY: 0,
  borderInset: 12,
  catSize: 88,
  catTop: -44,
  catRight: -44,
  frogSize: 76,
  frogBottom: -28,
  frogLeft: -36,
  titleSize: 28,
  bodySize: 24,
  lineHeight: 1.6,
  padX: 48,
  padY: 40,
};

type Config = typeof DEFAULTS;

function AboutEditor({ config, onChange }: { config: Config; onChange: (c: Config) => void }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sliders: { key: keyof Config; label: string; min: number; max: number; step: number }[] = [
    { key: 'bgMaxWidth', label: 'BG max width', min: 400, max: 1600, step: 10 },
    { key: 'bgOverlay', label: 'BG overlay %', min: 0, max: 80, step: 1 },
    { key: 'cardW', label: 'Card width', min: 200, max: 800, step: 10 },
    { key: 'cardH', label: 'Card height', min: 200, max: 800, step: 10 },
    { key: 'cardScale', label: 'Card scale', min: 0.2, max: 3, step: 0.05 },
    { key: 'cardOffsetX', label: 'Card offset X', min: -400, max: 400, step: 1 },
    { key: 'cardOffsetY', label: 'Card offset Y', min: -400, max: 400, step: 1 },
    { key: 'borderInset', label: 'Border inset', min: 0, max: 40, step: 1 },
    { key: 'catSize', label: 'Cat size', min: 20, max: 200, step: 2 },
    { key: 'catTop', label: 'Cat top', min: -150, max: 150, step: 1 },
    { key: 'catRight', label: 'Cat right', min: -150, max: 150, step: 1 },
    { key: 'frogSize', label: 'Frog size', min: 20, max: 200, step: 2 },
    { key: 'frogBottom', label: 'Frog bottom', min: -150, max: 150, step: 1 },
    { key: 'frogLeft', label: 'Frog left', min: -150, max: 150, step: 1 },
    { key: 'titleSize', label: 'Title font', min: 12, max: 60, step: 1 },
    { key: 'bodySize', label: 'Body font', min: 10, max: 48, step: 1 },
    { key: 'lineHeight', label: 'Line height', min: 1, max: 3, step: 0.05 },
    { key: 'padX', label: 'Pad X', min: 0, max: 120, step: 2 },
    { key: 'padY', label: 'Pad Y', min: 0, max: 120, step: 2 },
  ];

  return (
    <div style={{
      position: 'fixed', bottom: 12, left: 12, zIndex: 9999, width: 240,
      background: 'rgba(12,12,12,0.95)', border: '1px solid #333', borderRadius: 8,
      backdropFilter: 'blur(12px)', fontFamily: 'Space Mono, monospace',
      boxShadow: '0 8px 32px rgba(0,0,0,0.8)', userSelect: 'none',
      maxHeight: '90vh', display: 'flex', flexDirection: 'column',
    }}>
      <div onClick={() => setOpen(!open)} style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 12px', borderBottom: open ? '1px solid #222' : 'none', cursor: 'pointer',
      }}>
        <span style={{ fontSize: 10, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          // About Editor
        </span>
        <span style={{ fontSize: 10, color: '#4A4A4A' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{ padding: '8px 12px 12px', overflowY: 'auto', flex: 1 }}>
          {sliders.map(({ key, label, min, max, step }) => (
            <div key={key} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 10, color: '#A3A3A3' }}>{label}</span>
                <span style={{ fontSize: 10, color: '#E8734A', minWidth: 40, textAlign: 'right' }}>
                  {config[key]}
                </span>
              </div>
              <input type="range" min={min} max={max} step={step}
                value={config[key]}
                onChange={e => onChange({ ...config, [key]: parseFloat(e.target.value) })}
                style={{ width: '100%', height: 2, accentColor: '#E8734A', cursor: 'pointer' }}
              />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <button onClick={copy} style={{
              flex: 1, background: copied ? '#1a3a1a' : '#1a1a1a',
              border: `1px solid ${copied ? '#22c55e' : '#333'}`,
              color: copied ? '#22c55e' : '#A3A3A3', fontSize: 9,
              fontFamily: 'Space Mono, monospace', textTransform: 'uppercase',
              letterSpacing: '0.1em', padding: 6, borderRadius: 4, cursor: 'pointer',
            }}>
              {copied ? 'Copied ✓' : 'Copy Values'}
            </button>
            <button onClick={() => onChange(DEFAULTS)} style={{
              flex: 1, background: '#1a1a1a', border: '1px solid #333', color: '#A3A3A3',
              fontSize: 9, fontFamily: 'Space Mono, monospace', textTransform: 'uppercase',
              letterSpacing: '0.1em', padding: 6, borderRadius: 4, cursor: 'pointer',
            }}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AboutSection() {
  const [c, setC] = useState(DEFAULTS);

  return (
    <>
      <section className="relative w-full bg-[#0C0C0C] pt-16 pb-24">
        <div className="text-center mb-16 px-6">
          <h2
            style={{ fontFamily: 'Space Mono, monospace' }}
            className="text-[#E8734A] text-xs tracking-[4px] uppercase"
          >
            About Me
          </h2>
        </div>

        <div className="relative w-full mx-auto px-6" style={{ maxWidth: c.bgMaxWidth }}>
          {/* Court background */}
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-visible">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <img
                src="/images/court-bg.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${c.bgOverlay / 100})` }} />
            </div>

            {/* Card — centered on court, scales uniformly */}
            <div className="absolute inset-0 flex items-center justify-center overflow-visible z-10">
              <div
                style={{
                  width: c.cardW,
                  height: c.cardH,
                  transform: `scale(${c.cardScale}) translate(${c.cardOffsetX}px, ${c.cardOffsetY}px)`,
                  transformOrigin: 'center center',
                }}
              >
                <div className="relative w-full h-full">
                  {/* Cat sticker */}
                  <div
                    className="absolute z-20 animate-waddle-a"
                    style={{
                      width: c.catSize, height: c.catSize,
                      top: c.catTop, right: c.catRight,
                    }}
                  >
                    <img src="/stickers/cat.png" alt="" className="w-full h-full object-contain drop-shadow-lg" />
                  </div>

                  {/* Frog sticker */}
                  <div
                    className="absolute z-20 animate-waddle-b"
                    style={{
                      width: c.frogSize, height: c.frogSize,
                      bottom: c.frogBottom, left: c.frogLeft,
                    }}
                  >
                    <img src="/stickers/frog.png" alt="" className="w-full h-full object-contain drop-shadow-lg" />
                  </div>

                  {/* Torn frame border */}
                  <div className="torn-border absolute z-0" style={{ inset: -c.borderInset }} />

                  {/* White paper */}
                  <div
                    className="relative z-10 bg-white h-full flex items-center justify-center"
                    style={{ padding: `${c.padY}px ${c.padX}px` }}
                  >
                    <p
                      className="font-caveat text-[#1a1a1a] text-center italic"
                      style={{ fontSize: c.bodySize, lineHeight: c.lineHeight }}
                    >
                      <span
                        className="block font-semibold not-italic"
                        style={{ fontSize: c.titleSize, marginBottom: 16 }}
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
      <AboutEditor config={c} onChange={setC} />
    </>
  );
}
