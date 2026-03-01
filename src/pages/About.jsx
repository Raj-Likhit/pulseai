import { Link } from 'react-router-dom';
import AnimatedContent from '../components/animations/AnimatedContent';
import StarBorder from '../components/ui/StarBorder';
import { ABOUT_VALUES, ABOUT_TEAM, ABOUT_MILESTONES } from '../data/content';

export default function About() {
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
                                    <span style={{ padding: '6px 14px', display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>OUR STORY</span>
                                </StarBorder>
                            </div>
                            <h1 className="display-hero" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                                We're building the<br />
                                <span style={{ color: 'var(--lime)' }}>thinking layer</span><br />
                                for how teams work
                            </h1>
                            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.55 }}>
                                Pulse was started in 2022 with one belief: the best human creativity paired with the best AI intelligence is unstoppable. We're still proving that.
                            </p>
                        </AnimatedContent>
                        <AnimatedContent direction="right" delay={200}>
                            <div className="hero-asset-container">
                                <img
                                    src="/about-hero.webp"
                                    alt="Pulse AI Structural Foundation"
                                    className="hero-asset-img"
                                />
                            </div>
                        </AnimatedContent>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section style={{ padding: '128px 32px', background: 'var(--bg-surface)' }}>
                <div className="container about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                    <AnimatedContent>
                        <p className="eyebrow" style={{ marginBottom: '20px' }}>Our mission</p>
                        <h2 className="display-xl" style={{ marginBottom: '24px' }}>
                            Bridge intelligence<br />and creativity
                        </h2>
                    </AnimatedContent>
                    <AnimatedContent delay={120}>
                        <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                            AI models are getting smarter every month. But the gap between raw capability and human-usable tools keeps growing. We close that gap.
                        </p>
                        <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '24px' }}>
                            Pulse is the canvas where AI does the work and humans stay in control. We believe the future of work isn't AI replacing people — it's AI letting people think bigger.
                        </p>
                    </AnimatedContent>
                </div>
                <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
            </section>

            {/* Values */}
            <section style={{ padding: '128px 32px' }}>
                <div className="container">
                    <AnimatedContent>
                        <p className="eyebrow" style={{ marginBottom: '20px' }}>Values</p>
                        <h2 className="display-xl" style={{ marginBottom: '80px' }}>What we stand for</h2>
                    </AnimatedContent>
                    <div className="values-grid" style={{
                        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1px', background: 'var(--border)',
                        border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden',
                    }}>
                        {ABOUT_VALUES.map((v, i) => (
                            <AnimatedContent key={v.title} delay={i * 80}>
                                <div style={{
                                    padding: '48px 40px', background: 'var(--bg)',
                                    height: '100%',
                                    transition: 'background 200ms ease',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(247,255,158,0.03)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
                                >
                                    <span style={{ fontSize: '32px', display: 'block', marginBottom: '24px', color: 'var(--lime)' }}>{v.icon}</span>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>{v.title}</h3>
                                    <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{v.desc}</p>
                                </div>
                            </AnimatedContent>
                        ))}
                    </div>
                    <style>{`@media (max-width: 768px) { .values-grid { grid-template-columns: 1fr !important; } }`}</style>
                </div>
            </section>

            {/* Team */}
            <section style={{ padding: '128px 32px', background: 'var(--bg-surface)' }}>
                <div className="container">
                    <AnimatedContent>
                        <p className="eyebrow" style={{ marginBottom: '20px' }}>Team</p>
                        <h2 className="display-xl" style={{ marginBottom: '80px' }}>The people behind Pulse</h2>
                    </AnimatedContent>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                        {ABOUT_TEAM.map((member, i) => (
                            <AnimatedContent key={member.name} delay={i * 60}>
                                <div style={{
                                    background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px',
                                    padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '20px',
                                    transition: 'border-color 200ms ease',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(247,255,158,0.2)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                                >
                                    {/* Avatar */}
                                    <div style={{
                                        width: '64px', height: '64px', borderRadius: '50%',
                                        background: member.bg, display: 'flex', alignItems: 'center',
                                        justifyContent: 'center',
                                        fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800,
                                        color: '#000',
                                    }}>
                                        {member.initials}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{member.name}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{member.role}</div>
                                    </div>
                                </div>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section style={{ padding: '128px 32px' }}>
                <div className="container" style={{ maxWidth: '720px' }}>
                    <AnimatedContent>
                        <p className="eyebrow" style={{ marginBottom: '20px' }}>History</p>
                        <h2 className="display-xl" style={{ marginBottom: '64px' }}>How we got here</h2>
                    </AnimatedContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {ABOUT_MILESTONES.map((m, i) => (
                            <AnimatedContent key={m.year} delay={i * 80}>
                                <div style={{
                                    display: 'grid', gridTemplateColumns: '80px 1fr', gap: '32px',
                                    padding: '28px 0', borderBottom: '1px solid var(--border)',
                                    alignItems: 'start',
                                }}>
                                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: 'var(--lime)', letterSpacing: '-0.03em' }}>{m.year}</span>
                                    <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, paddingTop: '2px' }}>{m.event}</p>
                                </div>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '128px 32px', textAlign: 'center', background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <AnimatedContent>
                        <h2 className="display-xl" style={{ marginBottom: '24px' }}>Join us on the mission</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginBottom: '40px' }}>
                            Start building for free, or reach out to talk about partnerships, press, or careers.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '15px 32px' }}>Start free</Link>
                            <a href="mailto:hello@pulse.ai" className="btn-secondary" style={{ fontSize: '15px', padding: '15px 32px' }}>Say hello →</a>
                        </div>
                    </AnimatedContent>
                </div>
            </section>

        </main>
    );
}
