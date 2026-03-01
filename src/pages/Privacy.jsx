import React from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'

export default function Privacy() {
    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
            <section style={{ padding: 'var(--space-12) 0 var(--space-8)' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '12px' }}>Legal</span>
                        <h1 className="display-xl" style={{ marginBottom: '24px' }}>Privacy <span className="text-gradient">Policy</span></h1>
                        <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: 'var(--space-8)' }}>Last updated: February 2026</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>1. Information we collect</h3>
                                <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>2. How we use your information</h3>
                                <p>We rely on a number of legal bases to process the information we receive about you from your use of Pulse, including where: (1) necessary to perform the terms of service; (2) necessary to comply with a legal obligation; (3) necessary to protect your vital interests; (4) you have consented to the processing.</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>3. Data retention and deletion</h3>
                                <p>We keep your personal data only as long as necessary to provide you with the Pulse Service and for legitimate and essential business purposes, such as maintaining the performance of the Pulse Service, making data-driven business decisions about new features and offerings, complying with our legal obligations, and resolving disputes.</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>4. Changes to this policy</h3>
                                <p>We may change this privacy policy from time to time. If we make significant changes in the way we treat your personal information, or to the privacy policy, we will provide you notice through the Services or by some other means, such as email.</p>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </section>
        </main>
    )
}
