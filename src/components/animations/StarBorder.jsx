import React, { useRef, useEffect, useState } from 'react'

/* ── Star Border ─────────────────────────────────────────────────
   Button/wrapper with an orbiting star/comet border animation.
   Based on ReactBits Star Border component.
   ─────────────────────────────────────────────────────────────── */
export default function StarBorder({
    children,
    as: Tag = 'button',
    color = '#7C3AED',
    speed = 3,
    thickness = 1.5,
    className = '',
    style = {},
    ...rest
}) {
    const borderRef = useRef(null)
    const tRef = useRef(0)
    const animRef = useRef(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const canvas = borderRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            const parent = canvas.parentElement
            canvas.width = parent.offsetWidth
            canvas.height = parent.offsetHeight
        }
        resize()

        const hexToRgb = (hex) => [
            parseInt(hex.slice(1, 3), 16),
            parseInt(hex.slice(3, 5), 16),
            parseInt(hex.slice(5, 7), 16)
        ]
        const [r, g, b] = hexToRgb(color)

        const drawComet = (progress) => {
            const w = canvas.width
            const h = canvas.height
            const perimeter = 2 * (w + h)
            const pos = progress * perimeter

            // Convert perimeter position to (x,y)
            let x, y
            if (pos < w) { x = pos; y = 0 }
            else if (pos < w + h) { x = w; y = pos - w }
            else if (pos < 2 * w + h) { x = w - (pos - w - h); y = h }
            else { x = 0; y = h - (pos - 2 * w - h) }

            return { x, y }
        }

        const draw = () => {
            const w = canvas.width
            const h = canvas.height
            tRef.current += speed * 0.008
            ctx.clearRect(0, 0, w, h)

            // Draw border rectangle
            ctx.strokeStyle = `rgba(${r},${g},${b},0.2)`
            ctx.lineWidth = thickness
            ctx.beginPath()
            ctx.roundRect(0, 0, w, h, 10)
            ctx.stroke()

            // Comet 1
            const p1 = tRef.current % 1
            const pt1 = drawComet(p1)

            // Comet trail
            const trailLen = 40
            for (let i = trailLen; i >= 0; i--) {
                const trailProgress = (p1 - (i / (trailLen * 120))) % 1
                if (trailProgress < 0) continue
                const tp = drawComet((trailProgress + 1) % 1)
                const alpha = (1 - i / trailLen) * 0.6
                ctx.beginPath()
                ctx.arc(tp.x, tp.y, thickness * (1 - i / trailLen * 0.8), 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
                ctx.fill()
            }

            // Comet head
            const headGrad = ctx.createRadialGradient(pt1.x, pt1.y, 0, pt1.x, pt1.y, 8)
            headGrad.addColorStop(0, `rgba(255,255,255,0.9)`)
            headGrad.addColorStop(0.3, `rgba(${r},${g},${b},0.8)`)
            headGrad.addColorStop(1, 'transparent')
            ctx.fillStyle = headGrad
            ctx.beginPath()
            ctx.arc(pt1.x, pt1.y, 8, 0, Math.PI * 2)
            ctx.fill()

            // Second comet offset by 180°
            const p2 = (tRef.current + 0.5) % 1
            const pt2 = drawComet(p2)
            const g2 = ctx.createRadialGradient(pt2.x, pt2.y, 0, pt2.x, pt2.y, 5)
            g2.addColorStop(0, `rgba(45,212,191,0.9)`)
            g2.addColorStop(1, 'transparent')
            ctx.fillStyle = g2
            ctx.beginPath()
            ctx.arc(pt2.x, pt2.y, 5, 0, Math.PI * 2)
            ctx.fill()

            animRef.current = requestAnimationFrame(draw)
        }

        draw()
        const ro = new ResizeObserver(resize)
        ro.observe(canvas.parentElement)

        return () => {
            cancelAnimationFrame(animRef.current)
            ro.disconnect()
        }
    }, [color, speed, thickness])

    return (
        <Tag
            style={{ position: 'relative', display: 'inline-flex', ...style }}
            className={className}
            {...rest}
        >
            <canvas
                ref={borderRef}
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    borderRadius: 'inherit',
                }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </span>
        </Tag>
    )
}
