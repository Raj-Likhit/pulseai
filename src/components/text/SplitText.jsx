import React, { useEffect, useRef, useState } from 'react'

/* ── Split Text ──────────────────────────────────────────────────
   Animates text word-by-word with a staggered entrance.
   Based on ReactBits Split Text component.
   ─────────────────────────────────────────────────────────────── */
export default function SplitText({
    text = '',
    className = '',
    delay = 80,     // ms between each word
    from = { opacity: 0, transform: 'translateY(30px)' },
    style = {},
}) {
    const words = text.split(' ')
    const [visible, setVisible] = useState([])
    const ref = useRef(null)
    const observed = useRef(false)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(words.map((_, i) => i))
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !observed.current) {
                    observed.current = true
                    words.forEach((_, i) => {
                        setTimeout(() => setVisible(prev => [...prev, i]), i * delay)
                    })
                }
            },
            { threshold: 0.2 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [text, delay])

    return (
        <span ref={ref} className={className} style={{ display: 'inline', ...style }}>
            {words.map((word, i) => (
                <span
                    key={i}
                    style={{
                        display: 'inline-block',
                        marginRight: '0.25em',
                        opacity: visible.includes(i) ? 1 : 0,
                        transform: visible.includes(i) ? 'translateY(0)' : from.transform,
                        transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.34,1.3,0.64,1)`,
                    }}
                >
                    {word}
                </span>
            ))}
        </span>
    )
}
