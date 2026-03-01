import { Link } from 'react-router-dom';
import AnimatedContent from '../components/animations/AnimatedContent';
import StarBorder from '../components/ui/StarBorder';
import { FEATURES_DATA } from '../data/content';

export default function Features() {
    return (
        <main style={{ paddingTop: 'var(--nav-h)' }}>

            {/* Hero */}
            <section style={{ padding: 'var(--space-16) 32px var(--space-12)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                {/* Hero background glow */}
                <div style={{
                    position: 'absolute', top: '-10%', right: '-5%',
                    width: '60vw', height: '60vw',
                    background: 'radial-gradient(circle, rgba(244, 166, 35, 0.08) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    pointerEvents: 'none',
                }} />
                {/* Animated grid */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse 60% 60% at 80% 20%, black 20%, transparent 100%)',
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-12)', alignItems: 'center' }}>
                        <AnimatedContent direction="left">
                            <div style={{ marginBottom: '24px', display: 'inline-block' }}>
                                <StarBorder as="div" color="var(--accent)" speed="4s">
                                    <span style={{ padding: '6px 14px', display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>PRODUCT</span>
                                </StarBorder>
                            </div>
                            <h1 className="display-hero" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                                Every feature<br />
                                <span style={{ color: 'var(--lime)' }}>built to ship</span>
                            </h1>
                            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.55 }}>
                                Six core capabilities that multiply your team's output — without multiplying complexity.
                            </p>
                        </AnimatedContent>

                        <AnimatedContent direction="right" delay={200}>
                            <div style={{
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {/* Edge feathered mask + screen blend mode guarantees black backgrounds become completely transparent */}
                                <img
                                    src="/features-hero.webp"
                                    alt="Pulse AI Orchestration Features"
                                    style={{
                                        width: '120%',
                                        height: 'auto',
                                        display: 'block',
                                        mixBlendMode: 'screen',
                                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                                        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
                                    }}
                                />
                            </div>
                        </AnimatedContent>
                    </div>
                </div>
            </section>


            {/* Feature deep-dives */}
            {
                FEATURES_DATA.map((f, i) => (
                    <section
                        key={f.id}
                        style={{
                            padding: '100px 32px',
                            background: i % 2 === 1 ? 'var(--bg-surface)' : 'var(--bg)',
                            borderBottom: '1px solid var(--border)',
                        }}
                    >
                        <div className="container feature-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '80px',
                            alignItems: 'center',
                        }}>
                            {/* Text side */}
                            <AnimatedContent delay={0}>
                                <div>
                                    <span style={{
                                        fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700,
                                        color: f.accent, letterSpacing: '0.1em',
                                    }}>{f.id}</span>
                                    <h2 className="display-lg" style={{ marginTop: '16px', marginBottom: '16px' }}>{f.title}</h2>
                                    <p style={{ fontSize: '17px', color: f.accent, fontWeight: 500, marginBottom: '20px' }}>{f.subtitle}</p>
                                    <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px' }}>{f.desc}</p>

                                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {f.benefits.map(b => (
                                            <li key={b} style={{
                                                display: 'flex', alignItems: 'center', gap: '12px',
                                                fontSize: '14px', color: 'var(--text-secondary)',
                                            }}>
                                                <span style={{ color: f.accent, fontWeight: 700 }}>—</span>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedContent>

                            {/* Visual side */}
                            <AnimatedContent delay={100}>
                                <div style={{
                                    background: 'var(--bg)', border: '1px solid var(--border)',
                                    borderRadius: '20px', padding: '40px',
                                    aspectRatio: '4/3', display: 'flex', flexDirection: 'column',
                                    gap: '16px', justifyContent: 'center', alignItems: 'center',
                                    position: 'relative', overflow: 'hidden',
                                }}>
                                    {/* Glow */}
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: `radial-gradient(ellipse at 50% 50%, ${f.accent}12 0%, transparent 70%)`,
                                        pointerEvents: 'none',
                                    }} />

                                    {/* Feature number big */}
                                    <span style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '120px', fontWeight: 900,
                                        color: `${f.accent}18`, lineHeight: 1,
                                        position: 'absolute', bottom: '-10px', right: '20px',
                                        userSelect: 'none', pointerEvents: 'none',
                                    }}>{f.id}</span>

                                    {/* Mock node boxes */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '280px', position: 'relative', zIndex: 1 }}>
                                        {f.benefits.map((b, bi) => (
                                            <div key={b} style={{
                                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                                borderRadius: '10px', padding: '12px 16px',
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                transition: 'border-color 200ms ease',
                                            }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: f.accent, flexShrink: 0 }} />
                                                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedContent>

                        </div>
                        <style>{`@media (max-width: 768px) { .feature-grid { grid-template-columns: 1fr !important; } }`}</style>
                    </section>
                ))
            }

            {/* CTA */}
            <section style={{ padding: '128px 32px', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '640px' }}>
                    <AnimatedContent>
                        <h2 className="display-xl" style={{ marginBottom: '24px' }}>Ready to try it?</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginBottom: '40px' }}>All features available free for 14 days. No credit card required.</p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '15px 32px' }}>Start free trial</Link>
                            <Link to="/pricing" className="btn-secondary" style={{ fontSize: '15px', padding: '15px 32px' }}>See pricing</Link>
                        </div>
                    </AnimatedContent>
                </div>
            </section>

        </main >
    );
}
