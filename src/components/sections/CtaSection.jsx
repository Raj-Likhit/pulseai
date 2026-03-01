import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedContent from '../animations/AnimatedContent';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
    return (
        <section className="section">
            <div className="container">
                <AnimatedContent className="reveal">
                    <div style={{
                        textAlign: 'center',
                        padding: 'var(--space-16) var(--space-4)',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '32px',
                        background: 'linear-gradient(135deg, var(--accent-dim) 0%, var(--accent2-dim) 100%)',
                        border: '1px solid var(--border-md)',
                    }}>
                        {/* Background glow */}
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%,-50%)',
                            width: '60%', height: '80%', borderRadius: '50%',
                            background: 'radial-gradient(circle, var(--ambient-1) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }} />
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', position: 'relative' }}>Get started today</span>
                        <h2 className="display-xl" style={{ position: 'relative', maxWidth: '640px', margin: '0 auto 24px' }}>
                            Your AI stack,<br /><span className="text-gradient">unified in minutes</span>
                        </h2>
                        <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 40px', position: 'relative', lineHeight: 1.6 }}>
                            Free plan available. No credit card required. Cancel anytime.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
                            <Link to="/signup" className="btn-primary" style={{ fontSize: '16px', padding: '18px 36px' }}>
                                Start free — it's free <ArrowRight size={16} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
                            </Link>
                            <Link to="/pricing" className="btn-secondary" style={{ fontSize: '16px', padding: '17px 35px' }}>
                                View pricing
                            </Link>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '24px', position: 'relative' }}>
                            SOC 2 Type II · 99.97% uptime SLA · 24/7 support
                        </p>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
