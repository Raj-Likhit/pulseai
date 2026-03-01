import React, { useEffect, useRef } from 'react'

/* ── Aurora Background ───────────────────────────────────────────
   Sweeping northern-lights color bands.
   Used in: Features section
   ─────────────────────────────────────────────────────────────── */
export default function Aurora({
    colorStops = ['#7C3AED', '#2DD4BF', '#A855F7'],
    speed = 0.4,
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

        const draw = () => {
            const { width: w, height: h } = canvas
            tRef.current += speed * 0.005
            ctx.clearRect(0, 0, w, h)

            ctx.fillStyle = '#060010'
            ctx.fillRect(0, 0, w, h)

            colorStops.forEach((color, i) => {
                const phase = (tRef.current + i * 2.1) % (Math.PI * 2)
                const yOffset = Math.sin(phase) * h * 0.25
                const xOffset = Math.cos(phase * 0.7) * w * 0.15

                const x = w * (0.2 + i * 0.3) + xOffset
                const y = h * 0.5 + yOffset
                const r = w * (0.4 + Math.sin(phase * 0.5) * 0.1)

                const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
                grad.addColorStop(0, color + '66')
                grad.addColorStop(0.5, color + '22')
                grad.addColorStop(1, 'transparent')

                ctx.fillStyle = grad
                ctx.fillRect(0, 0, w, h)
            })

            // Shimmer lines
            const lineCount = 6
            for (let i = 0; i < lineCount; i++) {
                const y = h * ((i / lineCount) + Math.sin(tRef.current * 0.3 + i) * 0.03)
                const alpha = 0.04 + Math.sin(tRef.current + i * 1.3) * 0.02
                const grad = ctx.createLinearGradient(0, 0, w, 0)
                grad.addColorStop(0, 'transparent')
                grad.addColorStop(0.3, `rgba(168,85,247,${alpha})`)
                grad.addColorStop(0.7, `rgba(45,212,191,${alpha})`)
                grad.addColorStop(1, 'transparent')
                ctx.strokeStyle = grad
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(0, y)
                // Wavy line
                for (let x = 0; x <= w; x += 4) {
                    ctx.lineTo(x, y + Math.sin((x / w) * Math.PI * 4 + tRef.current + i) * 12)
                }
                ctx.stroke()
            }

            animRef.current = requestAnimationFrame(draw)
        }

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            draw()
        } else {
            ctx.fillStyle = '#0D0022'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        return () => {
            cancelAnimationFrame(animRef.current)
            ro.disconnect()
        }
    }, [speed, colorStops])

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
