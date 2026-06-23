import { useEffect, useRef } from 'react'

const PixelGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const spacing = 28
    const baseDotSize = 1.5
    const mouseRadius = 150

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const cols = Math.floor(w / spacing)
      const rows = Math.floor(h / spacing)
      const offsetX = (w - cols * spacing) / 2
      const offsetY = (h - rows * spacing) / 2

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = offsetX + i * spacing
          const y = offsetY + j * spacing

          const dx = x - mx
          const dy = y - my
          const dist = Math.sqrt(dx * dx + dy * dy)

          const influence = Math.max(0, 1 - dist / mouseRadius)

          const wave = Math.sin(i * 0.4 + time * 0.008) * Math.cos(j * 0.4 + time * 0.006)

          const baseOpacity = 0.06 + (wave + 1) * 0.04
          const opacity = baseOpacity + influence * 0.6

          const size = baseDotSize + influence * 3

          if (influence > 0.5) {
            ctx.fillStyle = `rgba(232, 115, 74, ${opacity})`
          } else if (influence > 0.2) {
            ctx.fillStyle = `rgba(240, 237, 232, ${opacity})`
          } else {
            ctx.fillStyle = `rgba(240, 237, 232, ${opacity})`
          }

          ctx.fillRect(x - size / 2, y - size / 2, size, size)
        }
      }

      time++
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block', cursor: 'crosshair' }}
    />
  )
}

export default PixelGrid
