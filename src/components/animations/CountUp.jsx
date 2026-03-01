import React, { useEffect, useRef, useState } from 'react'

/* ── Count Up ────────────────────────────────────────────────────
   Animates a number from 0 to `end` when scrolled into view.
   Based on ReactBits Count Up component.
   ─────────────────────────────────────────────────────────────── */
export default function CountUp({
    end = 100,
    duration = 2000,
    prefix = '',
    suffix = '',
    separator = ',',
    decimals = 0,
    className = '',
}) {
    const [value, setValue] = useState(0)
    const ref = useRef(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(end)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true
                    const start = performance.now()
                    const step = (now) => {
                        const elapsed = now - start
                        const progress = Math.min(elapsed / duration, 1)
                        // Ease out
                        const eased = 1 - Math.pow(1 - progress, 3)
                        setValue(Math.round(eased * end * Math.pow(10, decimals)) / Math.pow(10, decimals))
                        if (progress < 1) requestAnimationFrame(step)
                    }
                    requestAnimationFrame(step)
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [end, duration, decimals])

    const formatted = decimals > 0
        ? value.toFixed(decimals)
        : Math.round(value).toLocaleString()

    return (
        <span ref={ref} className={className}>
            {prefix}{formatted}{suffix}
        </span>
    )
}
