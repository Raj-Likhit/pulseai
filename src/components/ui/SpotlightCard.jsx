import { useRef } from 'react';

/* ── SpotlightCard ───────────────────────────────────────────────
   Mouse-tracked spotlight glow effect. Fully theme-aware via CSS vars.
   ─────────────────────────────────────────────────────────────── */
const SpotlightCard = ({
    children,
    className = '',
    spotlightColor,   // optional override — defaults to var(--accent) tint
    style = {},
}) => {
    const divRef = useRef(null);

    const handleMouseMove = e => {
        const rect = divRef.current.getBoundingClientRect();
        divRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        divRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            className={`pulse-card-spotlight ${className}`}
            style={{
                position: 'relative',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                padding: '2rem',
                overflow: 'hidden',
                '--mouse-x': '50%',
                '--mouse-y': '50%',
                '--spotlight-color': spotlightColor || 'var(--accent-dim)',
                transition: 'border-color 250ms ease, box-shadow 250ms ease',
                ...style,
            }}
        >
            {/* Spotlight gradient follows cursor */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 75%)',
                opacity: 0,
                transition: 'opacity 0.45s ease',
                pointerEvents: 'none',
                borderRadius: 'inherit',
            }} className="spotlight-glow" />

            {children}

            <style>{`
              .pulse-card-spotlight:hover .spotlight-glow,
              .pulse-card-spotlight:focus-within .spotlight-glow {
                opacity: 1 !important;
              }
              .pulse-card-spotlight:hover {
                border-color: var(--border-md) !important;
                box-shadow: var(--shadow-card);
              }
            `}</style>
        </div>
    );
};

export default SpotlightCard;
