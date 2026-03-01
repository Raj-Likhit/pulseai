import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import ThemeToggle from '../ui/ThemeToggle'
import Logo from '../ui/Logo'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => { setMobileOpen(false) }, [location])

    const navLinks = [
        { label: 'Features', to: '/features' },
        { label: 'Pricing', to: '/pricing' },
        { label: 'About', to: '/about' },
    ]

    const isActive = to => location.pathname === to

    /* Theme-aware values */
    const navBg = isDark
        ? (scrolled ? 'rgba(11, 9, 6, 0.75)' : 'rgba(11, 9, 6, 0.2)')
        : (scrolled ? 'rgba(249, 244, 236, 0.85)' : 'rgba(249, 244, 236, 0.4)')

    const navBorder = isDark
        ? 'rgba(244,166,35,0.18)'
        : 'rgba(10,22,40,0.12)'

    return (
        <>
            <div style={{ position: 'fixed', top: '24px', left: 0, right: 0, zIndex: 1000, pointerEvents: 'none', display: 'flex', justifyContent: 'center', padding: '0 var(--space-4)' }} className="navbar-wrapper">
                <nav style={{
                    pointerEvents: 'all',
                    width: '100%', maxWidth: '840px',
                    height: '56px',
                    display: 'flex', alignItems: 'center',
                    padding: '0 8px 0 20px',
                    background: navBg,
                    backdropFilter: 'blur(24px) saturate(180%)',
                    border: `1px solid ${navBorder}`,
                    borderRadius: '999px',
                    boxShadow: scrolled
                        ? (isDark ? '0 16px 48px rgba(0,0,0,0.8), 0 0 0 1px rgba(244,166,35,0.05)' : '0 16px 48px rgba(10,22,40,0.12), 0 0 0 1px rgba(255,255,255,0.5)')
                        : 'none',
                    transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%',
                    }}>
                        {/* Logo */}
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <Logo size={28} />
                        </Link>

                        {/* Desktop nav */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
                            {navLinks.map(link => (
                                <Link
                                    key={link.to} to={link.to}
                                    style={{
                                        fontSize: '13px',
                                        fontWeight: isActive(link.to) ? 700 : 400,
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        color: isActive(link.to) ? 'var(--accent)' : 'var(--text-secondary)',
                                        padding: '8px 14px',
                                        borderRadius: '8px',
                                        background: isActive(link.to) ? 'var(--accent-dim)' : 'transparent',
                                        textDecoration: 'none',
                                        transition: 'color 200ms, background 200ms',
                                    }}
                                    onMouseEnter={e => { if (!isActive(link.to)) e.currentTarget.style.color = 'var(--text-primary)' }}
                                    onMouseLeave={e => { if (!isActive(link.to)) e.currentTarget.style.color = 'var(--text-secondary)' }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* CTA + Theme Toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="desktop-nav">
                            <ThemeToggle />
                            <Link to="/signup" style={{
                                fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)',
                                padding: '8px 12px', textDecoration: 'none', transition: 'color 200ms',
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                            >Sign in</Link>
                            <Link to="/signup" className="btn-primary" style={{ fontSize: '13px', padding: '11px 22px' }}>
                                Start free
                            </Link>
                        </div>

                        {/* Hamburger */}
                        <div style={{ display: 'none', alignItems: 'center', gap: '10px' }} className="mobile-controls">
                            <ThemeToggle />
                            <button
                                onClick={() => setMobileOpen(o => !o)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: 'var(--text-primary)' }}
                                aria-label="Menu"
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '22px' }}>
                                    {[0, 1, 2].map(i => (
                                        <span key={i} style={{
                                            display: 'block', height: '2px', borderRadius: '1px',
                                            background: 'var(--accent)',
                                            width: i === 1 ? '14px' : '22px',
                                            transform: mobileOpen
                                                ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                                                    : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                                                        : 'scaleX(0)'
                                                : 'none',
                                            transition: 'transform 300ms, width 300ms',
                                        }} />
                                    ))}
                                </div>
                            </button>
                        </div>
                    </div>

                    <style>{`
          @media (max-width: 768px) {
            .desktop-nav     { display: none !important; }
            .mobile-controls { display: flex !important; align-items: center; gap: 8px !important; }
            .navbar-wrapper  { padding: 0 var(--space-3) !important; top: 16px !important; }
          }
        `}</style>
                </nav>
            </div>

            {/* Mobile menu */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: isDark ? 'rgba(11,9,6,0.97)' : 'rgba(249,244,236,0.97)',
                backdropFilter: 'blur(24px)', zIndex: 999,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 'var(--space-3)',
                opacity: mobileOpen ? 1 : 0,
                pointerEvents: mobileOpen ? 'all' : 'none',
                transition: 'opacity 300ms ease',
            }}>
                {navLinks.map(link => (
                    <Link key={link.to} to={link.to} style={{
                        fontSize: '36px', fontFamily: 'var(--font-display)', fontWeight: 900,
                        color: isActive(link.to) ? 'var(--accent)' : 'var(--text-primary)',
                        letterSpacing: '-0.025em', textDecoration: 'none', transition: 'color 200ms',
                    }}>
                        {link.label}
                    </Link>
                ))}
                <Link to="/signup" className="btn-primary" style={{ marginTop: '16px', fontSize: '16px', padding: '16px 36px' }}>
                    Start free
                </Link>
            </div>
        </>
    )
}
