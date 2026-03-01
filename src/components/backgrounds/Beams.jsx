import React, { useEffect, useRef } from 'react'

/* ── Beams Background ────────────────────────────────────────────
   Dramatic light beams sweeping from a central point.
   Used in: Final CTA / Footer banner
   ─────────────────────────────────────────────────────────────── */
export default function Beams({
    beamColor = '#7C3AED',
    style = {}
}) {
    const canvasRef = useRef(null)
    const animRef = useRef(null)
    const tRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        const ro = new ResizeObserver(resize)
        ro.observe(canvas)

        const beams = Array.from({ length: 8 }, (_, i) => ({
            angle: (i / 8) * Math.PI * 2,
            width: Math.random() * 0.06 + 0.02,
            speed: (Math.random() - 0.5) * 0.003,
            alpha: Math.random() * 0.15 + 0.05,
        }))

        const hexToRgb = (hex) => [
            parseInt(hex.slice(1, 3), 16),
            parseInt(hex.slice(3, 5), 16),
            parseInt(hex.slice(5, 7), 16)
        ]
        const [r, g, b] = hexToRgb(beamColor)

        const draw = () => {
            const { width: w, height: h } = canvas
            tRef.current += 1

            ctx.fillStyle = '#060010'
            ctx.fillRect(0, 0, w, h)

            const cx = w / 2
            const cy = h * 0.85
            const maxLen = Math.sqrt(w * w + h * h)

            beams.forEach((beam) => {
                beam.angle += beam.speed

                const a1 = beam.angle - beam.width
                const a2 = beam.angle + beam.width

                const x1 = cx + Math.cos(a1) * maxLen
                const y1 = cy + Math.sin(a1) * maxLen
                const x2 = cx + Math.cos(a2) * maxLen
                const y2 = cy + Math.sin(a2) * maxLen

                const pulsedAlpha = beam.alpha * (0.7 + Math.sin(tRef.current * 0.02 + beam.angle) * 0.3)

                const grad = ctx.createLinearGradient(cx, cy, (x1 + x2) / 2, (y1 + y2) / 2)
                grad.addColorStop(0, `rgba(${r},${g},${b},${pulsedAlpha})`)
                grad.addColorStop(0.3, `rgba(${r},${g},${b},${pulsedAlpha * 0.5})`)
                grad.addColorStop(1, 'transparent')

                ctx.beginPath()
                ctx.moveTo(cx, cy)
                ctx.lineTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.closePath()
                ctx.fillStyle = grad
                ctx.fill()
            })

            // Center glow
            const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.35)
            centerGrad.addColorStop(0, `rgba(${r},${g},${b},0.3)`)
            centerGrad.addColorStop(1, 'transparent')
            ctx.fillStyle = centerGrad
            ctx.fillRect(0, 0, w, h)

            animRef.current = requestAnimationFrame(draw)
        }

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            draw()
        } else {
            ctx.fillStyle = '#060010'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        return () => {
            cancelAnimationFrame(animRef.current)
            ro.disconnect()
        }
    }, [beamColor])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                ...style,
            }}
            aria-hidden="true"
        />
    )
}
