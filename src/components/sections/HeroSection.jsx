import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedContent from '../animations/AnimatedContent';
import Hero3D from '../ui/Hero3D';
import StarBorder from '../ui/StarBorder';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

export default function HeroSection() {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: 'var(--nav-h)',
        }}>
            {/* Hero background glow */}
            <div style={{
                position: 'absolute', top: '-5%', left: '50%',
                transform: 'translateX(-50%)',
                width: '120vw', height: '70vh',
                background: 'radial-gradient(ellipse, var(--ambient-1) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />
            {/* Animated grid */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                backgroundSize: '64px 64px',
                maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
            }} />

            <div className="container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 'var(--space-8)',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - var(--nav-h))',
                    padding: 'var(--space-8) 0',
                }}>
                    {/* Left — copy */}
                    <AnimatedContent direction="left" duration={700}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                            <StarBorder as="div" color="var(--accent)" speed="6s" style={{ alignSelf: 'flex-start', display: 'inline-block' }}>
                                <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                        width: 7, height: 7, borderRadius: '50%',
                                        background: 'var(--accent)',
                                        boxShadow: '0 0 8px var(--accent)',
                                        display: 'inline-block',
                                        animation: 'pulse-dot 2s infinite',
                                    }} />
                                    <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--accent)', textTransform: 'uppercase' }}>
                                        The AI Orchestration Platform
                                    </span>
                                </div>
                            </StarBorder>

                            <h1 className="display-hero">
                                One API.<br />
                                <span className="text-gradient">Every AI</span><br />
                                Model.
                            </h1>

                            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '460px' }}>
                                Connect, orchestrate, and deploy every major AI model from a single unified platform. Ship AI features 10× faster.
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                                <Link to="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '16px 32px' }}>
                                    Start free <ArrowRight size={15} style={{ marginLeft: '4px', verticalAlign: 'middle' }} />
                                </Link>
                                <a href="#demo" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                    <span style={{
                                        width: 36, height: 36, borderRadius: '50%',
                                        background: 'var(--accent-dim)', border: '1px solid var(--border-md)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Play size={12} fill="currentColor" style={{ color: 'var(--accent)', marginLeft: '2px' }} />
                                    </span>
                                    Watch demo
                                </a>
                            </div>

                            {/* Social proof */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', paddingTop: '8px' }}>
                                <div style={{ display: 'flex' }}>
                                    {['V', 'M', 'P', 'S', 'J'].map((l, i) => (
                                        <div key={i} style={{
                                            width: 28, height: 28, borderRadius: '50%',
                                            background: `hsl(${30 + i * 12}, 75%, ${44 + i * 5}%)`,
                                            border: '2px solid var(--bg)',
                                            marginLeft: i ? '-8px' : 0,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '10px', fontWeight: 700, color: '#fff',
                                        }}>{l}</div>
                                    ))}
                                </div>
                                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                    Trusted by <strong style={{ color: 'var(--text-secondary)' }}>50,000+</strong> developers
                                </span>
                            </div>
                        </div>
                    </AnimatedContent>

                    {/* Right — 3D visualization */}
                    <AnimatedContent direction="right" duration={800}>
                        <div style={{ height: '520px', position: 'relative' }}>
                            <Hero3D />
                        </div>
                    </AnimatedContent>
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.08em',
                textTransform: 'uppercase',
                animation: 'scrollBounce 2s ease-in-out infinite',
            }}>
                <span>Scroll</span>
                <ChevronDown size={14} />
            </div>

            <style>{`
            @keyframes scrollBounce {
                0%, 100% { transform: translateX(-50%) translateY(0); }
                50% { transform: translateX(-50%) translateY(6px); opacity: 0.5; }
            }
            `}</style>
        </section>
    );
}
