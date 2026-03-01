import React, { useEffect, useRef } from 'react'

/* ── Orb Background ──────────────────────────────────────────────
   Slow-pulsing central orb with glow rings. Focus magnet.
   Used in: Pricing / CTA sections
   ─────────────────────────────────────────────────────────────── */
export default function Orb({
    color = '#7C3AED',
    size = 0.6,
    glowStrength = 0.8,
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

        const hexToRgb = (hex) => ({
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16),
        })
        const { r, g, b } = hexToRgb(color)

        const draw = () => {
            const { width: w, height: h } = canvas
            tRef.current += 0.008
            ctx.clearRect(0, 0, w, h)

            ctx.fillStyle = '#060010'
            ctx.fillRect(0, 0, w, h)

            const cx = w / 2
            const cy = h / 2
            const pulse = Math.sin(tRef.current * 0.8) * 0.08 + 1
            const orbR = Math.min(w, h) * size * 0.5 * pulse

            // Outer rings (halo)
            for (let i = 3; i >= 0; i--) {
                const ringR = orbR * (1.5 + i * 0.6)
                const alpha = (glowStrength * 0.06) / (i + 1)
                const grad = ctx.createRadialGradient(cx, cy, orbR * 0.8, cx, cy, ringR)
                grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`)
                grad.addColorStop(1, 'transparent')
                ctx.fillStyle = grad
                ctx.fillRect(0, 0, w, h)
            }

            // Core orb
            const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbR)
            coreGrad.addColorStop(0, `rgba(${r + 40},${g + 40},${b + 40},0.9)`)
            coreGrad.addColorStop(0.4, `rgba(${r},${g},${b},0.7)`)
            coreGrad.addColorStop(1, `rgba(${r},${g},${b},0)`)
            ctx.fillStyle = coreGrad
            ctx.fillRect(0, 0, w, h)

            // Specular highlight
            const specR = orbR * 0.3
            const specGrad = ctx.createRadialGradient(cx - orbR * 0.2, cy - orbR * 0.25, 0, cx - orbR * 0.2, cy - orbR * 0.25, specR)
            specGrad.addColorStop(0, 'rgba(255,255,255,0.22)')
            specGrad.addColorStop(1, 'transparent')
            ctx.fillStyle = specGrad
            ctx.fillRect(0, 0, w, h)

            animRef.current = requestAnimationFrame(draw)
        }

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            draw()
        } else {
            const { width: w, height: h } = canvas
            const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) * 0.35)
            g.addColorStop(0, `rgba(${hexToRgb(color).r},${hexToRgb(color).g},${hexToRgb(color).b},0.5)`)
            g.addColorStop(1, 'transparent')
            ctx.fillStyle = '#060010'
            ctx.fillRect(0, 0, w, h)
            ctx.fillStyle = g
            ctx.fillRect(0, 0, w, h)
        }

        return () => {
            cancelAnimationFrame(animRef.current)
            ro.disconnect()
        }
    }, [color, size, glowStrength])

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
