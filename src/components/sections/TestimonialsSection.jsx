import React from 'react';
import AnimatedContent from '../animations/AnimatedContent';
import SpotlightCard from '../ui/SpotlightCard';
import { Star } from 'lucide-react';
import { LANDING_TESTIMONIALS } from '../../data/content';

export default function TestimonialsSection() {
    return (
        <section className="section">
            <div className="container">
                <AnimatedContent className="text-center reveal" style={{ marginBottom: 'var(--space-8)' }}>
                    <span className="eyebrow" style={{ display: 'block', marginBottom: '16px' }}>Testimonials</span>
                    <h2 className="display-lg">Loved by the teams<br /><span className="text-gradient">building the future</span></h2>
                </AnimatedContent>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {LANDING_TESTIMONIALS.map((t, i) => (
                        <AnimatedContent key={i} delay={i * 120} className="reveal">
                            <SpotlightCard spotlightColor="rgba(244, 166, 35, 0.15)">
                                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                                    {[...Array(t.stars)].map((_, j) => <Star key={j} size={13} fill="var(--accent)" stroke="none" />)}
                                </div>
                                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '20px', fontStyle: 'italic' }}>"{t.quote}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: '50%',
                                        background: `hsl(${28 + i * 16}, 70%, ${44 + i * 6}%)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '13px', fontWeight: 700, color: '#fff',
                                    }}>{t.name[0]}</div>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.role}</div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </AnimatedContent>
                    ))}
                </div>
            </div>
        </section>
    );
}
