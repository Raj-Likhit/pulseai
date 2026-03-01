'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

/* ── Dock ────────────────────────────────────────────────────────
   macOS-style magnifying icon dock from ReactBits.
   Themed: dark violet glass bg, violet icon glow on hover.
   ─────────────────────────────────────────────────────────────── */

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }) {
    const ref = useRef(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, val => {
        const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
        return val - rect.x - baseItemSize / 2;
    });

    const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
    const size = useSpring(targetSize, spring);

    return (
        <motion.div
            ref={ref}
            style={{ width: size, height: size }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            onClick={onClick}
            className={`dock-item ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            {Children.map(children, child => cloneElement(child, { isHovered }))}
        </motion.div>
    );
}

function DockLabel({ children, className = '', ...rest }) {
    const { isHovered } = rest;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsub = isHovered.on('change', v => setIsVisible(v === 1));
        return () => unsub();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`dock-label ${className}`}
                    role="tooltip"
                    style={{
                        position: 'absolute',
                        top: '-1.5rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'max-content',
                        whiteSpace: 'pre',
                        borderRadius: '8px',
                        border: '1px solid rgba(139,92,246,0.25)',
                        background: 'rgba(13,5,32,0.95)',
                        backdropFilter: 'blur(12px)',
                        padding: '3px 10px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#A78BFA',
                        letterSpacing: '0.04em',
                        pointerEvents: 'none',
                    }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DockIcon({ children, isHovered, className = '' }) {
    const scale = useSpring(useTransform(isHovered ?? useMotionValue(0), [0, 1], [1, 1.15]), { mass: 0.1, stiffness: 200, damping: 12 });

    return (
        <motion.div
            className={`dock-icon ${className}`}
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '100%', height: '100%', scale,
            }}
        >
            {children}
        </motion.div>
    );
}

export { DockItem, DockLabel, DockIcon };

export default function Dock({
    items,
    className = '',
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 70,
    distance = 180,
    panelHeight = 64,
    dockHeight = 256,
    baseItemSize = 48,
}) {
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification, dockHeight]);
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    return (
        <motion.div
            style={{ height, scrollbarWidth: 'none', display: 'flex', maxWidth: '100%', alignItems: 'center', margin: '0 8px' }}
        >
            <motion.div
                onMouseMove={({ pageX }) => { isHovered.set(1); mouseX.set(pageX); }}
                onMouseLeave={() => { isHovered.set(0); mouseX.set(Infinity); }}
                className={`dock-panel ${className}`}
                style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: 'fit-content',
                    gap: '12px',
                    borderRadius: '20px',
                    background: 'rgba(13,5,32,0.85)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    padding: '0 12px 10px',
                    height: panelHeight,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, i) => (
                    <DockItem
                        key={i}
                        onClick={item.onClick}
                        className={item.className ?? ''}
                        mouseX={mouseX}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                    >
                        <DockIcon>
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '100%', height: '100%', borderRadius: '12px',
                                background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
                                color: '#A78BFA', fontSize: '18px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                transition: 'background 0.2s, box-shadow 0.2s',
                            }}>
                                {item.icon}
                            </div>
                        </DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}
