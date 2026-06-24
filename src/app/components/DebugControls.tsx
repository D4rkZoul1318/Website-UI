import { useState } from 'react'

export interface HeroConfig {
  portraitLeft: number
  portraitTop: number
  portraitWidth: number
  portraitHeight: number
  portraitPixelSize: number

  templeRight: number
  templeTop: number
  templeWidth: number
  templeHeight: number
  templePixelSize: number

  birdRight: number
  birdBottom: number
  birdWidth: number
  birdHeight: number
  birdPixelSize: number

  bgPixelSize: number

  textBottom: number
  textLeft: number
}

export const DEFAULT_CONFIG: HeroConfig = {
  portraitLeft: 5,
  portraitTop: 14,
  portraitWidth: 27,
  portraitHeight: 62,
  portraitPixelSize: 7,

  templeRight: 0,
  templeTop: 2,
  templeWidth: 36,
  templeHeight: 88,
  templePixelSize: 7,

  birdRight: 18,
  birdBottom: 5,
  birdWidth: 12,
  birdHeight: 16,
  birdPixelSize: 7,

  bgPixelSize: 12,

  textBottom: 8,
  textLeft: 8,
}

function Slider({
  label,
  value,
  min,
  max,
  step = 0.5,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
}) {
  return (
    <div style={{ marginBottom: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
        <span style={{ fontSize: '10px', color: '#A3A3A3', fontFamily: 'Space Mono, monospace' }}>
          {label}
        </span>
        <span style={{ fontSize: '10px', color: '#E8734A', fontFamily: 'Space Mono, monospace', minWidth: '32px', textAlign: 'right' }}>
          {value.toFixed(1)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          width: '100%',
          height: '2px',
          accentColor: '#E8734A',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontFamily: 'Space Mono, monospace',
      fontSize: '9px',
      color: '#737373',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      marginTop: '12px',
      marginBottom: '6px',
      borderBottom: '1px solid #333',
      paddingBottom: '4px',
    }}>
      {label}
    </div>
  )
}

export default function DebugControls({
  config,
  onChange,
}: {
  config: HeroConfig
  onChange: (c: HeroConfig) => void
}) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const set = (key: keyof HeroConfig) => (v: number) =>
    onChange({ ...config, [key]: v })

  const copyValues = () => {
    const out = `// HeroConfig values — paste into DEFAULT_CONFIG\nconst config = ${JSON.stringify(config, null, 2)}`
    navigator.clipboard.writeText(out)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => onChange(DEFAULT_CONFIG)

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        right: '12px',
        zIndex: 9999,
        width: '220px',
        background: 'rgba(12,12,12,0.95)',
        border: '1px solid #333',
        borderRadius: '8px',
        backdropFilter: 'blur(12px)',
        fontFamily: 'Space Mono, monospace',
        boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          borderBottom: '1px solid #222',
          cursor: 'pointer',
        }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ fontSize: '10px', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          // Debug Controls
        </span>
        <span style={{ fontSize: '10px', color: '#4A4A4A' }}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div style={{ padding: '8px 12px 12px', maxHeight: '70vh', overflowY: 'auto' }}>

          <SectionLabel label="Portrait" />
          <Slider label="left %" value={config.portraitLeft} min={0} max={40} onChange={set('portraitLeft')} />
          <Slider label="top %" value={config.portraitTop} min={0} max={30} onChange={set('portraitTop')} />
          <Slider label="width %" value={config.portraitWidth} min={15} max={50} onChange={set('portraitWidth')} />
          <Slider label="height %" value={config.portraitHeight} min={40} max={100} onChange={set('portraitHeight')} />
          <Slider label="pixel size" value={config.portraitPixelSize} min={1} max={20} step={1} onChange={set('portraitPixelSize')} />

          <SectionLabel label="Temple" />
          <Slider label="right %" value={config.templeRight} min={0} max={30} onChange={set('templeRight')} />
          <Slider label="top %" value={config.templeTop} min={0} max={30} onChange={set('templeTop')} />
          <Slider label="width %" value={config.templeWidth} min={20} max={70} onChange={set('templeWidth')} />
          <Slider label="height %" value={config.templeHeight} min={30} max={100} onChange={set('templeHeight')} />
          <Slider label="pixel size" value={config.templePixelSize} min={1} max={20} step={1} onChange={set('templePixelSize')} />

          <SectionLabel label="Bird" />
          <Slider label="right %" value={config.birdRight} min={0} max={40} onChange={set('birdRight')} />
          <Slider label="bottom %" value={config.birdBottom} min={0} max={40} onChange={set('birdBottom')} />
          <Slider label="width %" value={config.birdWidth} min={10} max={45} onChange={set('birdWidth')} />
          <Slider label="height %" value={config.birdHeight} min={15} max={60} onChange={set('birdHeight')} />
          <Slider label="pixel size" value={config.birdPixelSize} min={1} max={20} step={1} onChange={set('birdPixelSize')} />

          <SectionLabel label="Background" />
          <Slider label="pixel size" value={config.bgPixelSize} min={1} max={24} step={1} onChange={set('bgPixelSize')} />

          <SectionLabel label="Text Block" />
          <Slider label="bottom %" value={config.textBottom} min={0} max={30} onChange={set('textBottom')} />
          <Slider label="left %" value={config.textLeft} min={0} max={20} onChange={set('textLeft')} />

          <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
            <button
              onClick={copyValues}
              style={{
                flex: 1,
                background: copied ? '#1a3a1a' : '#1a1a1a',
                border: `1px solid ${copied ? '#22c55e' : '#333'}`,
                color: copied ? '#22c55e' : '#A3A3A3',
                fontSize: '9px',
                fontFamily: 'Space Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '6px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
            >
              {copied ? 'Copied ✓' : 'Copy Values'}
            </button>
            <button
              onClick={reset}
              style={{
                flex: 1,
                background: '#1a1a1a',
                border: '1px solid #333',
                color: '#A3A3A3',
                fontSize: '9px',
                fontFamily: 'Space Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '6px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </div>

          <p style={{
            fontSize: '9px',
            color: '#4A4A4A',
            marginTop: '8px',
            lineHeight: 1.5,
            fontFamily: 'Space Mono, monospace',
          }}>
            Dev only. Hidden in production.<br />
            Drag sliders → Copy Values → paste into DEFAULT_CONFIG.
          </p>
        </div>
      )}
    </div>
  )
}
