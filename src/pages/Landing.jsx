import React, { useEffect } from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FaqSection from '../components/sections/FaqSection';
import CtaSection from '../components/sections/CtaSection';
import AnimatedContent from '../components/animations/AnimatedContent';
import CountUp from '../components/animations/CountUp';
import Marquee from '../components/animations/Marquee';

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal')
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
        }, { threshold: 0.12 })
        els.forEach(el => obs.observe(el))
        return () => obs.disconnect()
    }, [])
}

export default function Landing() {
    useReveal();

    return (
        <>
            <HeroSection />

            {/* ── Stats bar ─────────────────────────────── */}
            <section style={{ padding: 'var(--space-6) 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <div className="grid grid-cols-4" style={{ gap: 'var(--space-4)', textAlign: 'center' }}>
                        {[
                            { value: 50, suffix: 'K+', label: 'Active teams', color: 'var(--accent)' },
                            { value: 40, suffix: '+', label: 'AI models', color: 'var(--accent2)' },
                            { value: 2.1, suffix: 'B', decimals: 1, label: 'Requests/month', color: 'var(--accent)' },
                            { value: 99.97, suffix: '%', decimals: 2, label: 'Uptime SLA', color: 'var(--accent2)' },
                        ].map((s, i) => (
                            <AnimatedContent key={i} delay={i * 80}>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, color: s.color, letterSpacing: '-0.03em', lineHeight: 1 }}>
                                        <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                                    </div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</div>
                                </div>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Model marquee ─────────────────────────── */}
            <section style={{ padding: 'var(--space-5) 0', overflow: 'hidden' }}>
                <Marquee speed={28} gap={32} pauseOnHover>
                    {['GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'LLaMA 3.1', 'Mistral Large', 'Qwen 2.5', 'Phi-4', 'Stable Diffusion', 'DALL·E 3', 'Codestral', 'Grok 2', 'DeepSeek V3', 'Flux Pro'].map(m => (
                        <span key={m} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'var(--tag-bg)', border: '1px solid var(--tag-border)',
                            borderRadius: '999px', padding: '8px 18px',
                            fontSize: '13px', fontWeight: 600, color: 'var(--tag-text)',
                            letterSpacing: '0.02em', whiteSpace: 'nowrap',
                            transition: 'all 0.2s',
                        }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', opacity: 0.8 }} />
                            {m}
                        </span>
                    ))}
                </Marquee>
            </section>

            <FeaturesSection />
            <TestimonialsSection />
            <FaqSection />
            <CtaSection />
        </>
    );
}
