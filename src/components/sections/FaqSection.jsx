import React from 'react';
import AnimatedContent from '../animations/AnimatedContent';
import FaqItem from '../ui/FaqItem';
import { LANDING_FAQS } from '../../data/content';

export default function FaqSection() {
    return (
        <section className="section-md" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
                <AnimatedContent className="text-center reveal" style={{ marginBottom: 'var(--space-6)' }}>
                    <h2 className="display-lg">Common <span className="text-gradient">questions</span></h2>
                </AnimatedContent>
                {LANDING_FAQS.map((faq, i) => (
                    <AnimatedContent key={i} delay={i * 60} className="reveal">
                        <FaqItem q={faq.q} a={faq.a} index={i} />
                    </AnimatedContent>
                ))}
            </div>
        </section>
    );
}
