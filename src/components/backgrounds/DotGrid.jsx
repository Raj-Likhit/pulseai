import React, { useEffect, useRef } from 'react'

/* ── DotGrid Background ──────────────────────────────────────────
   Subtle animated dot grid with mouse glow interaction.
   Used in: Stats, How It Works sections
   ─────────────────────────────────────────────────────────────── */
export default function DotGrid({
    dotColor = '#5C5378',
    glowColor = '#7C3AED',
    dotSize = 1.5,
    gap = 32,
    style = {}
}) {
    const canvasRef = useRef(null)
    const animRef = useRef(null)
    const mouseRef = useRef({ x: -999, y: -999 })

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

        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
        }
        canvas.addEventListener('mousemove', onMouseMove)

        const draw = () => {
            const { width: w, height: h } = canvas
            ctx.clearRect(0, 0, w, h)

            const cols = Math.ceil(w / gap) + 1
            const rows = Math.ceil(h / gap) + 1

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * gap
                    const y = row * gap
                    const dx = mouseRef.current.x - x
                    const dy = mouseRef.current.y - y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    const glow = Math.max(0, 1 - dist / 120)

                    const r = dotSize + glow * 2.5
                    ctx.beginPath()
                    ctx.arc(x, y, r, 0, Math.PI * 2)

                    if (glow > 0.01) {
                        // Glowing dot
                        const gr = ctx.createRadialGradient(x, y, 0, x, y, r * 3)
                        gr.addColorStop(0, glowColor + Math.round(glow * 200).toString(16).padStart(2, '0'))
                        gr.addColorStop(1, 'transparent')
                        ctx.fillStyle = gr
                        ctx.arc(x, y, r * 3, 0, Math.PI * 2)
                        ctx.fill()
                        ctx.beginPath()
                        ctx.arc(x, y, r, 0, Math.PI * 2)
                    }

                    ctx.fillStyle = glow > 0.05
                        ? `rgba(124,58,237,${0.3 + glow * 0.7})`
                        : dotColor + '66'
                    ctx.fill()
                }
            }

            animRef.current = requestAnimationFrame(draw)
        }

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            draw()
        } else {
            // Static dots
            const { width: w, height: h } = canvas
            const cols = Math.ceil(w / gap) + 1
            const rows = Math.ceil(h / gap) + 1
            ctx.fillStyle = dotColor + '44'
            for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
                ctx.beginPath()
                ctx.arc(c * gap, r * gap, dotSize, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        return () => {
            cancelAnimationFrame(animRef.current)
            ro.disconnect()
            canvas.removeEventListener('mousemove', onMouseMove)
        }
    }, [dotColor, glowColor, dotSize, gap])

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
