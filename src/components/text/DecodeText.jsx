import React, { useEffect, useRef, useState } from 'react'

/* ── Decode Text ─────────────────────────────────────────────────
   Text scrambles through random chars before resolving to final value.
   Based on ReactBits Decode Text component.
   ─────────────────────────────────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export default function DecodeText({
    text = '',
    speed = 50,
    className = '',
    style = {},
    trigger = 'scroll',  // 'scroll' | 'mount'
}) {
    const [display, setDisplay] = useState(text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]))
    const [done, setDone] = useState(false)
    const ref = useRef(null)
    const intervalRef = useRef(null)
    const iterRef = useRef(0)

    const startDecode = () => {
        if (done) return
        intervalRef.current = setInterval(() => {
            setDisplay(prev =>
                prev.map((char, i) => {
                    if (text[i] === ' ') return ' '
                    if (i < iterRef.current) return text[i]
                    return CHARS[Math.floor(Math.random() * CHARS.length)]
                })
            )
            iterRef.current += 1
            if (iterRef.current > text.length) {
                clearInterval(intervalRef.current)
                setDisplay(text.split(''))
                setDone(true)
            }
        }, speed)
    }

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setDisplay(text.split(''))
            setDone(true)
            return
        }

        if (trigger === 'mount') {
            startDecode()
            return () => clearInterval(intervalRef.current)
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startDecode()
                    observer.disconnect()
                }
            },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => {
            observer.disconnect()
            clearInterval(intervalRef.current)
        }
    }, [text, speed, trigger])

    return (
        <span
            ref={ref}
            className={className}
            style={{ fontFamily: 'var(--font-mono)', ...style }}
        >
            {display.map((char, i) => (
                <span
                    key={i}
                    style={{
                        color: i < (iterRef.current) && char === text[i]
                            ? 'inherit'
                            : 'var(--color-text-muted)',
                        transition: 'color 0.1s',
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    )
}
