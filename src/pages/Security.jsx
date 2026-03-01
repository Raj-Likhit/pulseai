import React from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'
import { CheckCircle } from 'lucide-react'

export default function Security() {
    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
            <section style={{ padding: 'var(--space-12) 0 var(--space-8)' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '12px' }}>Legal</span>
                        <h1 className="display-xl" style={{ marginBottom: '24px' }}>Security <span className="text-gradient">Practices</span></h1>
                        <p style={{ fontSize: '17px', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
                            Trust is our most important feature. We implement rigorous security measures across
                            our infrastructure, application, and operations to protect your data.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                    <CheckCircle size={20} style={{ color: 'var(--accent)' }} />
                                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>SOC 2 Type II Certified</h3>
                                </div>
                                <p>Our information security program has been audited and certified to comply with SOC 2 Type II trust principles for security, availability, and confidentiality. Copies of the report are available under NDA upon request.</p>
                            </div>

                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                    <CheckCircle size={20} style={{ color: 'var(--accent)' }} />
                                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Data Encryption</h3>
                                </div>
                                <p>All customer data is encrypted at rest using AES-256 and in transit via TLS 1.3 across all of our networks. We enforce strict key rotation policies backed by AWS KMS.</p>
                            </div>

                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                    <CheckCircle size={20} style={{ color: 'var(--accent)' }} />
                                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Zero Data Retention for Prompts</h3>
                                </div>
                                <p>When you enable Zero Data Retention mode, your API payloads (prompts and completions) are processed purely in memory and immediately discarded. Never written to logs or disk.</p>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </section>
        </main>
    )
}
