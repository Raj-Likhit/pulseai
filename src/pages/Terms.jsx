import React from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'

export default function Terms() {
    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
            <section style={{ padding: 'var(--space-12) 0 var(--space-8)' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '12px' }}>Legal</span>
                        <h1 className="display-xl" style={{ marginBottom: '24px' }}>Terms of <span className="text-gradient">Service</span></h1>
                        <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: 'var(--space-8)' }}>Last updated: February 2026</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>1. Acceptance of terms</h3>
                                <p>By accessing or using our services, you agree to be bound by these Terms. If you don't agree to these Terms, do not use the services. If you are accessing and using the services on behalf of a company or other legal entity, you represent and warrant that you have the authority to bind that entity to these Terms.</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>2. Use of services</h3>
                                <p>You must follow any policies made available to you within the Services. Don't misuse our Services. For example, don't interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>3. Your content</h3>
                                <p>Some of our Services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold in that content. In short, what belongs to you stays yours.</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>4. API usage limits</h3>
                                <p>We may limit the number of network calls that your client makes to our API services to ensure that all developers get fair access to the systems. If you exceed these limits, we may restrict or suspend your access until the next billing cycle.</p>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </section>
        </main>
    )
}
