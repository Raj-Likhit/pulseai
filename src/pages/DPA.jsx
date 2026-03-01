import React from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'
import { FileText, Download } from 'lucide-react'

export default function DPA() {
    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
            <section style={{ padding: 'var(--space-12) 0 var(--space-8)' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '12px' }}>Legal</span>
                        <h1 className="display-xl" style={{ marginBottom: '24px' }}>Data Processing <span className="text-gradient">Agreement</span></h1>
                        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
                            This Data Processing Agreement ("DPA") forms part of the Master Subscription Agreement
                            or other written or electronic agreement between Pulse AI, Inc. ("Provider") and the Customer.
                        </p>

                        <div style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: '16px', padding: '24px', marginBottom: 'var(--space-8)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <FileText size={24} style={{ color: 'var(--accent)' }} />
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Standard SCCs attached</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Includes EU Standard Contractual Clauses (Module 2)</div>
                                </div>
                            </div>
                            <a href="/assets/Pulse_SCC_Template.pdf" target="_blank" rel="noopener noreferrer" style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                background: 'var(--btn-bg)', color: 'var(--btn-text)',
                                padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
                                textDecoration: 'none', cursor: 'pointer',
                            }}>
                                <Download size={14} /> Download PDF
                            </a>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>1. Scope of processing</h3>
                                <p>Provider will process Personal Data only in accordance with Customer's documented instructions. Customer instructs Provider to process Personal Data for the following purposes: (i) processing in accordance with the Agreement; (ii) processing initiated by End Users in their use of the Services; and (iii) processing to comply with other documented reasonable instructions provided by Customer.</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>2. Subprocessors</h3>
                                <p>Customer provides general authorization for Provider to engage Subprocessors to process Personal Data. Provider will maintain an up-to-date list of its Subprocessors. Provider will notify Customer of any new Subprocessor engaged at least 30 days prior to permitting the new Subprocessor to process Personal Data.</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>3. Data Subject Rights</h3>
                                <p>Taking into account the nature of the processing, Provider will assist Customer by appropriate technical and organizational measures, insofar as this is possible, for the fulfilment of Customer's obligation to respond to requests for exercising Data Subject rights as set forth in the GDPR or CCPA.</p>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </section>
        </main>
    )
}
