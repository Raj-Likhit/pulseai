import React, { useEffect, useRef, useState } from 'react'

/* ── Blur Text ───────────────────────────────────────────────────
   Text that blurs in char-by-char from a hazy state to sharp focus.
   Based on ReactBits Blur Text component.
   ─────────────────────────────────────────────────────────────── */
export default function BlurText({
    text = '',
    delay = 40,
    className = '',
    style = {},
}) {
    const chars = text.split('')
    const [sharpened, setSharpened] = useState([])
    const ref = useRef(null)
    const observed = useRef(false)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setSharpened(chars.map((_, i) => i))
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !observed.current) {
                    observed.current = true
                    chars.forEach((_, i) => {
                        setTimeout(() => setSharpened(prev => [...prev, i]), i * delay)
                    })
                }
            },
            { threshold: 0.3 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [text, delay])

    return (
        <span ref={ref} className={className} style={{ display: 'inline', ...style }}>
            {chars.map((char, i) => (
                <span
                    key={i}
                    style={{
                        display: 'inline-block',
                        filter: sharpened.includes(i) ? 'blur(0px)' : 'blur(8px)',
                        opacity: sharpened.includes(i) ? 1 : 0.3,
                        transform: sharpened.includes(i) ? 'translateY(0)' : 'translateY(6px)',
                        transition: 'filter 0.5s ease, opacity 0.5s ease, transform 0.5s ease',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    )
}
