import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedContent from '../components/animations/AnimatedContent';

const SOCIAL_PROOF = [
    { stat: '50K+', label: 'Teams building on Pulse' },
    { stat: '4.9★', label: 'Average rating' },
    { stat: '< 2s', label: 'Average workflow runtime' },
];

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setLoading(false);
        setSuccess(true);
        setTimeout(() => navigate('/'), 2500);
    };

    if (success) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '56px', marginBottom: '24px' }}>✓</div>
                    <h1 className="display-lg" style={{ marginBottom: '16px' }}>You're in.</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Redirecting to your workspace...</p>
                </div>
            </main>
        );
    }

    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="signup-grid">

            {/* Left — Social proof */}
            <div style={{
                padding: '80px 64px',
                background: 'var(--bg-surface)',
                borderRight: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
            }} className="signup-left">
                <div style={{
                    position: 'absolute', top: '30%', left: '-10%',
                    width: '400px', height: '300px',
                    background: 'radial-gradient(ellipse, rgba(247,255,158,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <AnimatedContent>
                    <div style={{ marginBottom: '64px' }}>
                        <p className="eyebrow" style={{ marginBottom: '24px' }}>Trusted by 50,000+ teams</p>
                        <h2 className="display-lg" style={{ marginBottom: '24px' }}>
                            Join builders who move<br />
                            <span style={{ color: 'var(--lime)' }}>faster with AI</span>
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6, maxWidth: '380px' }}>
                            Get access to every major AI model, a visual workflow canvas, and real-time team collaboration — all in one place.
                        </p>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '64px' }}>
                        {SOCIAL_PROOF.map(s => (
                            <div key={s.stat} style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
                                <span style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', minWidth: '90px' }}>{s.stat}</span>
                                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <div style={{
                        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                        borderRadius: '14px', padding: '28px',
                    }}>
                        <p style={{ fontSize: '15px', color: '#fff', lineHeight: 1.6, marginBottom: '16px' }}>
                            "Switched from 4 tools to just Pulse. Our output doubled in 3 weeks and our AI spend dropped by 40%."
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #F7FF9E, #2DD4BF)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '13px', fontWeight: 800, color: '#000',
                            }}>SM</div>
                            <div>
                                <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Sofia M.</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>CTO, Vanta Health</div>
                            </div>
                        </div>
                    </div>
                </AnimatedContent>
            </div>

            {/* Right — Form */}
            <div style={{ padding: '80px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="signup-right">
                <AnimatedContent delay={100}>
                    <div style={{ maxWidth: '400px', width: '100%' }}>
                        <div style={{ marginBottom: '40px' }}>
                            <h1 className="display-md" style={{ marginBottom: '8px' }}>Create your account</h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                                Already have one?{' '}
                                <Link to="/signup" style={{ color: 'var(--lime)', textDecoration: 'underline', textDecorationColor: 'rgba(247,255,158,0.3)' }}>Sign in</Link>
                            </p>
                        </div>

                        {/* SSO buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                            {[
                                { icon: 'G', label: 'Continue with Google', bg: '#fff', color: '#111' },
                                { icon: '⌥', label: 'Continue with GitHub', bg: '#24292e', color: '#fff' },
                            ].map(sso => (
                                <button key={sso.label} style={{
                                    width: '100%', padding: '13px 20px',
                                    background: sso.bg, color: sso.color,
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    borderRadius: 'var(--r-lg) 4px 4px 4px',
                                    fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    cursor: 'pointer', transition: 'opacity 150ms ease',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                >
                                    <span style={{ fontWeight: 900 }}>{sso.icon}</span>
                                    {sso.label}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>OR</span>
                            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { id: 'email', label: 'Email', type: 'email', value: email, set: setEmail, placeholder: 'you@company.com' },
                                { id: 'password', label: 'Password', type: 'password', value: password, set: setPassword, placeholder: 'Min. 8 characters' },
                            ].map(f => (
                                <div key={f.id}>
                                    <label htmlFor={f.id} style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>{f.label}</label>
                                    <input
                                        id={f.id}
                                        type={f.type}
                                        required
                                        value={f.value}
                                        onChange={e => f.set(e.target.value)}
                                        placeholder={f.placeholder}
                                        style={{
                                            width: '100%', padding: '13px 16px',
                                            background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                            borderRadius: 'var(--r-md)', color: '#fff', fontSize: '15px',
                                            fontFamily: 'var(--font-body)', outline: 'none',
                                            transition: 'border-color 150ms ease',
                                        }}
                                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(247,255,158,0.4)'}
                                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                            ))}

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', marginTop: '8px', fontSize: '15px', padding: '15px' }}
                            >
                                {loading ? (
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{
                                            width: '16px', height: '16px', border: '2px solid rgba(0,0,0,0.3)',
                                            borderTopColor: '#000', borderRadius: '50%',
                                            animation: 'spin 0.7s linear infinite',
                                        }} />
                                        Creating account...
                                    </span>
                                ) : 'Create free account'}
                            </button>

                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                                By creating an account you agree to our{' '}
                                <a href="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Terms</a>{' '}and{' '}
                                <a href="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Privacy Policy</a>.
                            </p>
                        </form>
                    </div>
                </AnimatedContent>
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .signup-grid { grid-template-columns: 1fr !important; }
          .signup-left { display: none !important; }
          .signup-right { padding: 48px 24px !important; }
        }
      `}</style>
        </main>
    );
}
