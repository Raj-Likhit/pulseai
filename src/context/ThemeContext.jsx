import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

/* ── ThemeContext ────────────────────────────────────────────────
   Provides theme state ('dark' | 'light') + a toggleTheme function
   that triggers the venetian blinds animation before switching.
   ─────────────────────────────────────────────────────────────── */

const ThemeContext = createContext(null)

/* ── Animation config ─────────────────────────────────────────── */
const SLAT_COUNT = 12    // More slats = finer/more luxurious grain
const CLOSE_MS = 250    // Each slat's close animation duration
const CLOSE_STAGGER_MS = 40    // Delay between successive slats closing
const HOLD_MS = 150    // Pause while fully covered
const OPEN_MS = 300   // Each slat's open animation duration (slower = more premium feel)
const OPEN_STAGGER_MS = 35    // Delay between successive slats opening

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem('pulse-theme') || 'dark' }
        catch { return 'dark' }
    })
    const [isAnimating, setIsAnimating] = useState(false)
    const overlayRef = useRef(null)

    /* Apply theme to document root */
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        try { localStorage.setItem('pulse-theme', theme) } catch { }
    }, [theme])

    /* Create overlay DOM element once at mount */
    useEffect(() => {
        const overlay = document.createElement('div')
        overlay.className = 'blinds-overlay'
        overlay.setAttribute('aria-hidden', 'true')
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 99999;
            pointer-events: none;
            display: flex;
            flex-direction: column;
        `

        for (let i = 0; i < SLAT_COUNT; i++) {
            const slat = document.createElement('div')
            slat.className = 'blind-slat'
            slat.style.cssText = `
                flex: 1;
                width: 100%;
                transform: scaleY(0);
                transform-origin: top;
                will-change: transform, opacity;
            `
            overlay.appendChild(slat)
        }

        document.body.appendChild(overlay)
        overlayRef.current = overlay

        return () => {
            if (overlayRef.current && document.body.contains(overlayRef.current)) {
                document.body.removeChild(overlayRef.current)
            }
        }
    }, [])

    /* Keep slat color in sync with current theme when not animating */
    useEffect(() => {
        if (!overlayRef.current) return
        const color = theme === 'dark' ? '#0B0906' : '#F9F4EC'
        overlayRef.current.querySelectorAll('.blind-slat').forEach(s => {
            s.style.background = color
        })
    }, [theme])

    const toggleTheme = useCallback(() => {
        if (isAnimating) return
        setIsAnimating(true)

        const overlay = overlayRef.current
        if (!overlay) {
            setTheme(t => t === 'dark' ? 'light' : 'dark')
            setIsAnimating(false)
            return
        }

        const slats = Array.from(overlay.querySelectorAll('.blind-slat'))
        const nextTheme = theme === 'dark' ? 'light' : 'dark'

        // The curtain closing matches the CURRENT background — seamless
        const closingColor = theme === 'dark' ? '#0B0906' : '#F9F4EC'
        slats.forEach(s => {
            s.style.background = closingColor
            s.style.transform = 'scaleY(0)'
            s.style.transformOrigin = 'top'
            s.style.transition = 'none'
        })

        overlay.style.pointerEvents = 'all'

        /* ── Phase 1: Close slats (top → bottom wave) ───────────────
           Easing: slow-start, fast-finish (curtain falls with weight)  */
        slats.forEach((slat, i) => {
            setTimeout(() => {
                slat.style.transition = `transform ${CLOSE_MS}ms cubic-bezier(0.55, 0, 0.85, 0.05)`
                slat.style.transform = 'scaleY(1)'
            }, i * CLOSE_STAGGER_MS)
        })

        const lastCloseAt = (SLAT_COUNT - 1) * CLOSE_STAGGER_MS + CLOSE_MS

        setTimeout(() => {
            /* ── Mid-point: Switch theme while fully covered ─────────── */
            setTheme(nextTheme)

            // Update slat color to match the NEW theme — revealed as blinds open
            const openingColor = nextTheme === 'dark' ? '#0B0906' : '#F9F4EC'
            slats.forEach(s => { s.style.background = openingColor })

            setTimeout(() => {
                /* ── Phase 2: Open slats (bottom → top wave) ────────────
                   Easing: fast-start, elastic deceleration — feels snappy
                   and light, like a blind rolling up with spring tension   */
                const reversed = [...slats].reverse()
                reversed.forEach((slat, i) => {
                    setTimeout(() => {
                        slat.style.transformOrigin = 'bottom'
                        slat.style.transition = `transform ${OPEN_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`
                        slat.style.transform = 'scaleY(0)'
                    }, i * OPEN_STAGGER_MS)
                })

                const lastOpenAt = (SLAT_COUNT - 1) * OPEN_STAGGER_MS + OPEN_MS
                setTimeout(() => {
                    overlay.style.pointerEvents = 'none'
                    setIsAnimating(false)
                }, lastOpenAt + 80)

            }, HOLD_MS)

        }, lastCloseAt)

    }, [theme, isAnimating])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}
