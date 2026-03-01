import { useTheme } from '../../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

/* ── ThemeToggle ────────────────────────────────────────────────
   Premium sliding pill toggle for day/night modes.
   ─────────────────────────────────────────────────────────────── */
export default function ThemeToggle() {
    const { theme, toggleTheme, isAnimating } = useTheme()
    const isDark = theme === 'dark'

    return (
        <button
            onClick={toggleTheme}
            disabled={isAnimating}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light (Cream Parchment)' : 'dark (Warm Obsidian)'} mode`}
            style={{
                width: 64,
                height: 32,
                borderRadius: '16px',
                background: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.05)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                boxShadow: isDark ? 'inset 0 2px 4px rgba(0,0,0,0.5)' : 'inset 0 2px 4px rgba(0,0,0,0.05)',
                position: 'relative',
                cursor: isAnimating ? 'not-allowed' : 'pointer',
                opacity: isAnimating ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                padding: '0 4px',
                transition: 'all 300ms ease',
                flexShrink: 0,
            }}
            onMouseEnter={e => {
                if (!isAnimating) e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
            }}
            className="theme-toggle-btn"
        >
            {/* Track Icons */}
            <div style={{
                position: 'absolute', inset: 0, padding: '0 8px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                pointerEvents: 'none'
            }}>
                <Moon size={14} color={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)'} />
                <Sun size={14} color={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.4)'} />
            </div>

            {/* Sliding Puck */}
            <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: isDark
                    ? 'linear-gradient(135deg, #F4A623, #FF6348)'
                    : 'linear-gradient(135deg, #FFFFFF, #F9F4EC)',
                boxShadow: isDark
                    ? '0 0 10px rgba(244,166,35,0.4), inset 0 1px 1px rgba(255,255,255,0.5)'
                    : '0 2px 5px rgba(0,0,0,0.15), inset 0 1px 1px #fff',
                transform: `translateX(${isDark ? '0' : '30px'})`,
                transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), background 400ms',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1
            }}>
                {isDark ? (
                    <Moon size={12} color="#fff" style={{ opacity: 0.9 }} />
                ) : (
                    <Sun size={12} color="#E8A020" style={{ opacity: 0.9 }} />
                )}
            </div>

            {/* Tooltip */}
            <span style={{
                position: 'absolute',
                bottom: '-36px',
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
                opacity: 0,
                pointerEvents: 'none',
                transition: 'opacity 200ms',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                padding: '4px 10px',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }} className="theme-tooltip">
                {isDark ? 'Light mode' : 'Dark mode'}
            </span>

            <style>{`
                .theme-toggle-btn:hover .theme-tooltip { opacity: 1 !important; transform: translateX(-50%) translateY(-4px) !important; }
            `}</style>
        </button>
    )
}
