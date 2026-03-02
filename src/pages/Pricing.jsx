import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedContent from '../components/animations/AnimatedContent';
import FaqItem from '../components/ui/FaqItem';
import StarBorder from '../components/ui/StarBorder';

import { PRICING_PLANS as PLANS, PRICING_FAQS as FAQS } from '../data/content';

export default function Pricing() {
    const [annual, setAnnual] = useState(false);

    return (
        <main style={{ paddingTop: 'var(--nav-h)' }}>

            {/* Hero */}
            <section style={{ padding: 'var(--space-16) 32px var(--space-12)', textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                {/* Hero background glow */}
                <div className="pricing-hero-glow" style={{
                    position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%) translateZ(0)',
                    width: '80vw', height: '60vw',
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(244, 166, 35, 0.12) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    willChange: 'transform',
                    pointerEvents: 'none',
                }} />
                {/* Animated grid */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 100%)',
                }} />

                <div className="container" style={{ maxWidth: '680px', position: 'relative', zIndex: 1 }}>
                    <AnimatedContent>
                        <div style={{ marginBottom: '24px', display: 'inline-block' }}>
                            <StarBorder as="div" color="var(--accent)" speed="4s">
                                <span style={{ padding: '6px 14px', display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>PLANS & PRICING</span>
                            </StarBorder>
                        </div>
                        <h1 className="display-hero" style={{ marginBottom: '24px' }}>
                            Simple.<br /><span style={{ color: 'var(--lime)' }}>Transparent.</span>
                        </h1>
                        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.55 }}>
                            No per-seat pricing. No surprise bills. Pick a plan that fits your team.
                        </p>

                        {/* Billing toggle */}
                        <div className="billing-toggle-container">
                            <span style={{ fontSize: '14px', fontWeight: 500, color: annual ? 'var(--text-muted)' : 'var(--text-primary)', transition: 'color 200ms ease' }}>Monthly</span>
                            <button
                                onClick={() => setAnnual(v => !v)}
                                className={`billing-toggle ${annual ? 'active' : ''}`}
                                role="switch"
                                aria-checked={annual}
                                aria-label="Toggle annual billing to save 20%"
                            >
                                <span className="billing-toggle-thumb" />
                            </button>
                            <div style={{
                                display: 'grid', gridTemplateColumns: annual ? '1fr auto' : '1fr 0fr', overflow: 'hidden', gap: annual ? '12px' : '0', alignItems: 'center', transition: 'all 300ms var(--ease-spring)',
                                paddingRight: '6px',
                            }}>
                                <span style={{
                                    fontSize: '14px', fontWeight: 600,
                                    color: annual ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    transition: 'color 300ms ease', whiteSpace: 'nowrap'
                                }}>Annual</span>
                                <div className="billing-badge" style={{ opacity: annual ? 1 : 0, transition: 'opacity 300ms ease', visibility: annual ? 'visible' : 'hidden' }}>
                                    Save 20%
                                </div>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </section>

            {/* Plans */}
            <section style={{ padding: '80px 32px' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    {PLANS.map((plan, i) => (
                        <AnimatedContent key={plan.name} delay={i * 80}>
                            <div style={{
                                background: plan.popular ? 'rgba(247,255,158,0.04)' : 'var(--bg-surface)',
                                border: `1px solid ${plan.popular ? 'rgba(247,255,158,0.25)' : 'var(--border)'}`,
                                borderRadius: '20px', padding: '40px 32px',
                                display: 'flex', flexDirection: 'column', gap: '32px',
                                position: 'relative', height: '100%',
                            }}>
                                {plan.popular && (
                                    <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                                        <span className="badge">Most popular</span>
                                    </div>
                                )}

                                <div>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>{plan.name}</h2>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{plan.desc}</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                                    {plan.price.monthly === null ? (
                                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 800, letterSpacing: '-0.04em' }}>Custom</span>
                                    ) : plan.price.monthly === plan.price.annual ? (
                                        <>
                                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '56px', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1 }}>
                                                ${plan.price.monthly}
                                            </span>
                                            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>/mo</span>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                                <span style={{ position: 'relative', display: 'inline-block' }}>
                                                    <span style={{
                                                        fontFamily: 'var(--font-display)',
                                                        fontSize: annual ? '32px' : '56px',
                                                        fontWeight: 800,
                                                        letterSpacing: '-0.05em',
                                                        lineHeight: 1,
                                                        color: annual ? 'var(--text-muted)' : 'var(--text-primary)',
                                                        transition: 'all 600ms var(--ease-spring)',
                                                        display: 'inline-block'
                                                    }}>${plan.price.monthly}</span>

                                                    {/* Animated strikethrough */}
                                                    <span style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '-5%',
                                                        width: annual ? '110%' : '0%',
                                                        height: annual ? '3px' : '0px',
                                                        background: 'var(--text-muted)',
                                                        transition: 'all 600ms var(--ease-spring)',
                                                        transform: 'translateY(-50%) rotate(-4deg)',
                                                        borderRadius: '2px'
                                                    }} />
                                                </span>
                                                <span style={{
                                                    fontSize: '13px',
                                                    color: 'var(--text-secondary)',
                                                    opacity: annual ? 0 : 1,
                                                    width: annual ? 0 : 'auto',
                                                    overflow: 'hidden',
                                                    transition: 'all 600ms var(--ease-spring)'
                                                }}>/mo</span>
                                            </div>

                                            <div style={{
                                                display: 'flex', alignItems: 'baseline', gap: '4px',
                                                opacity: annual ? 1 : 0,
                                                transform: annual ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.9)',
                                                width: annual ? 'auto' : 0,
                                                overflow: 'hidden',
                                                pointerEvents: annual ? 'auto' : 'none',
                                                transition: 'all 600ms var(--ease-spring)'
                                            }}>
                                                <span style={{ fontFamily: 'var(--font-display)', fontSize: '56px', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: 'var(--lime)' }}>
                                                    ${plan.price.annual}
                                                </span>
                                                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>/mo</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                                    {plan.features.map(f => (
                                        <li key={f.text} style={{
                                            display: 'flex', alignItems: 'center', gap: '12px',
                                            fontSize: '14px',
                                            color: f.included ? 'var(--text-secondary)' : 'rgba(255,255,255,0.2)',
                                            textDecoration: f.included ? 'none' : 'line-through',
                                        }}>
                                            <span style={{ color: f.included ? 'var(--lime)' : 'rgba(255,255,255,0.2)', flexShrink: 0 }}>
                                                {f.included ? '✓' : '—'}
                                            </span>
                                            {f.text}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={plan.ctaLink}
                                    className={plan.popular ? 'btn-primary' : 'btn-secondary'}
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        </AnimatedContent>
                    ))}
                </div>
            </section>

            {/* Social proof strip */}
            <section style={{ padding: '64px 32px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
                    {[
                        { stat: '50K+', label: 'Teams on Pulse' },
                        { stat: '14-day', label: 'Free trial, no card' },
                        { stat: '99.9%', label: 'Uptime guaranteed' },
                        { stat: 'SOC 2', label: 'Type II certified' },
                    ].map(({ stat, label }) => (
                        <div key={stat} style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff' }}>{stat}</div>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section style={{ padding: '128px 32px' }}>
                <div className="container" style={{ maxWidth: '680px' }}>
                    <AnimatedContent>
                        <p className="eyebrow" style={{ marginBottom: '16px' }}>FAQ</p>
                        <h2 className="display-lg" style={{ marginBottom: '48px' }}>Billing questions</h2>
                    </AnimatedContent>
                    {FAQS.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} index={i} />)}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '128px 32px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '580px' }}>
                    <AnimatedContent>
                        <h2 className="display-xl" style={{ marginBottom: '24px' }}>Still have questions?</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginBottom: '40px' }}>Talk to a human. We'll help you find the right plan.</p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '15px 32px' }}>Start free trial</Link>
                            <a href="mailto:hello@pulse.ai" className="btn-secondary" style={{ fontSize: '15px', padding: '15px 32px' }}>Contact sales</a>
                        </div>
                    </AnimatedContent>
                </div>
            </section>

            <style>{`
                @media (max-width: 768px) {
                    .pricing-hero-glow { display: none !important; }
                }
            `}</style>
        </main>
    );
}
