import React from 'react';
import AnimatedContent from '../animations/AnimatedContent';
import MagicBento from '../ui/MagicBento';
import SpotlightCard from '../ui/SpotlightCard';
import { Code2, GitBranch, BarChart3 } from 'lucide-react';
import { LANDING_BENTO_CARDS } from '../../data/content';

export default function FeaturesSection() {
    return (
        <>
            {/* ── Magic Bento (Features) ────────────────── */}
            <section className="section" id="features">
                <div className="container">
                    <AnimatedContent className="text-center reveal" style={{ marginBottom: 'var(--space-8)' }}>
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '16px' }}>Why Pulse</span>
                        <h2 className="display-xl">
                            Everything in one<br /><span className="text-gradient">intelligent platform</span>
                        </h2>
                        <p className="text-lg" style={{ maxWidth: '520px', margin: '20px auto 0', color: 'var(--text-secondary)' }}>
                            Stop juggling dozens of SDKs. Pulse gives you one unified layer with enterprise-grade tooling built in.
                        </p>
                    </AnimatedContent>

                    <AnimatedContent className="reveal" delay={200}>
                        <MagicBento
                            cards={LANDING_BENTO_CARDS}
                            glowColor="244, 166, 35"
                            enableStars
                            enableSpotlight
                            enableBorderGlow
                            enableTilt
                            clickEffect
                            gridStyle={{
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                maxWidth: '1000px',
                                margin: '0 auto',
                            }}
                        />
                    </AnimatedContent>
                </div>
            </section>

            {/* ── SpotlightCard integration row ─────────── */}
            <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <AnimatedContent className="text-center reveal" style={{ marginBottom: 'var(--space-6)' }}>
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '16px' }}>How It Works</span>
                        <h2 className="display-lg">From prompt to production<br /><span className="text-gradient">in minutes</span></h2>
                    </AnimatedContent>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                        {[
                            { step: '01', icon: <Code2 size={24} />, title: 'Connect', desc: 'Add Pulse to your codebase with a single API key. One endpoint, every model.' },
                            { step: '02', icon: <GitBranch size={24} />, title: 'Orchestrate', desc: 'Build visual workflows or define routing rules. Pulse handles fallback and retries.' },
                            { step: '03', icon: <BarChart3 size={24} />, title: 'Optimize', desc: 'Monitor cost, latency and quality in real time. Auto-tuning cuts spend by up to 60%.' },
                        ].map((item, i) => (
                            <AnimatedContent key={i} delay={i * 150} className="reveal">
                                <SpotlightCard spotlightColor="rgba(244, 166, 35, 0.18)" style={{ height: '100%' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <span style={{
                                                fontFamily: 'var(--font-mono)', fontSize: '44px', fontWeight: 700,
                                                color: 'var(--accent-dim)', lineHeight: 1,
                                                letterSpacing: '-0.03em',
                                            }}>{item.step}</span>
                                            <span style={{ color: 'var(--accent)', opacity: 0.8 }}>{item.icon}</span>
                                        </div>
                                        <h3 className="display-md" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                                    </div>
                                </SpotlightCard>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
