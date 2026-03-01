import React, { useState, useRef, useEffect } from 'react'
import { Plus } from 'lucide-react'

export default function FaqItem({ q, a, index }) {
    const [open, setOpen] = useState(false)
    const [height, setHeight] = useState(0)
    const contentRef = useRef(null)

    useEffect(() => {
        if (open) {
            setHeight(contentRef.current?.scrollHeight || 0)
        } else {
            setHeight(0)
        }
    }, [open])

    return (
        <div
            style={{
                borderBottom: '1px solid var(--border)',
                overflow: 'hidden',
                background: open ? 'var(--bg-surface)' : 'transparent',
                transition: 'background 400ms ease',
                padding: '0 20px',
                margin: '0 -20px',
                borderRadius: open ? '16px' : '0',
                border: open ? '1px solid var(--border)' : '1px solid transparent',
                borderBottomColor: open ? 'var(--border)' : 'var(--border)',
                marginBottom: open ? '12px' : '0',
                marginTop: open && index > 0 ? '12px' : '0',
            }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '100%', padding: '24px 0',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-primary)', textAlign: 'left',
                }}
            >
                <span style={{ fontSize: '17px', fontWeight: 600, paddingRight: '24px', letterSpacing: '-0.01em' }}>{q}</span>
                <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 32, height: 32, borderRadius: '50%',
                    background: open ? 'var(--accent)' : 'var(--bg-card)',
                    color: open ? '#000' : 'var(--text-secondary)',
                    transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: open ? 'rotate(135deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                    border: open ? 'none' : '1px solid var(--border)',
                }}>
                    <Plus size={16} strokeWidth={2.5} />
                </span>
            </button>
            <div
                style={{
                    height: height,
                    overflow: 'hidden',
                    transition: 'height 400ms cubic-bezier(0.16,1,0.3,1)',
                }}
            >
                <div ref={contentRef} style={{ paddingBottom: '24px' }}>
                    <p style={{
                        fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7,
                        opacity: open ? 1 : 0, transition: 'opacity 400ms ease 100ms',
                        margin: 0
                    }}>
                        {a}
                    </p>
                </div>
            </div>
        </div>
    )
}
