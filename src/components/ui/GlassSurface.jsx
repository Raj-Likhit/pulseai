import { useEffect, useState, useRef, useId } from 'react';

/* ── GlassSurface ────────────────────────────────────────────────
   SVG filter-based glass displacement effect from ReactBits.
   Falls back to standard backdrop-filter blur on unsupported browsers.
   Theme-matched: dark violet tint.
   ─────────────────────────────────────────────────────────────── */
const GlassSurface = ({
    children,
    width = '100%',
    height = 80,
    borderRadius = 20,
    borderWidth = 0.07,
    brightness = 20,
    opacity = 0.9,
    blur = 14,
    displace = 0,
    backgroundOpacity = 0.05,
    saturation = 1.4,
    distortionScale = -180,
    redOffset = 0,
    greenOffset = 10,
    blueOffset = 20,
    xChannel = 'R',
    yChannel = 'G',
    mixBlendMode = 'difference',
    className = '',
    style = {},
}) => {
    const uniqueId = useId().replace(/:/g, '-');
    const filterId = `glass-filter-${uniqueId}`;
    const redGradId = `red-grad-${uniqueId}`;
    const blueGradId = `blue-grad-${uniqueId}`;

    const [svgSupported, setSvgSupported] = useState(false);
    const containerRef = useRef(null);
    const feImageRef = useRef(null);
    const redChannelRef = useRef(null);
    const greenChannelRef = useRef(null);
    const blueChannelRef = useRef(null);
    const gaussianBlurRef = useRef(null);

    const generateDisplacementMap = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        const actualWidth = rect?.width || 400;
        const actualHeight = rect?.height || 200;
        const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

        const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"/>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;
        return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
    };

    const updateDisplacementMap = () => {
        feImageRef.current?.setAttribute('href', generateDisplacementMap());
    };

    useEffect(() => {
        updateDisplacementMap();
        [
            { ref: redChannelRef, offset: redOffset },
            { ref: greenChannelRef, offset: greenOffset },
            { ref: blueChannelRef, offset: blueOffset },
        ].forEach(({ ref, offset }) => {
            if (ref.current) {
                ref.current.setAttribute('scale', (distortionScale + offset).toString());
                ref.current.setAttribute('xChannelSelector', xChannel);
                ref.current.setAttribute('yChannelSelector', yChannel);
            }
        });
        gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());
    }, [width, height, borderRadius, borderWidth, brightness, opacity, blur, displace, distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel, mixBlendMode]);

    useEffect(() => {
        if (!containerRef.current) return;
        const obs = new ResizeObserver(() => setTimeout(updateDisplacementMap, 0));
        obs.observe(containerRef.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const checkSupport = () => {
            if (typeof window === 'undefined') return false;
            const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
            const isFirefox = /Firefox/.test(navigator.userAgent);
            if (isWebkit || isFirefox) return false;
            const div = document.createElement('div');
            div.style.backdropFilter = `url(#${filterId})`;
            return div.style.backdropFilter !== '';
        };
        setSvgSupported(checkSupport());
    }, []);

    const containerStyle = {
        ...style,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: `${borderRadius}px`,
        '--glass-frost': backgroundOpacity,
        '--glass-saturation': saturation,
        '--filter-id': `url(#${filterId})`,
    };

    return (
        <div
            ref={containerRef}
            className={`glass-surface ${svgSupported ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`}
            style={containerStyle}
        >
            <svg
                style={{
                    width: '100%', height: '100%', pointerEvents: 'none',
                    position: 'absolute', inset: 0, opacity: 0, zIndex: -1,
                }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
                        <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
                        <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" result="dispRed" />
                        <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
                        <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" result="dispGreen" />
                        <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
                        <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" result="dispBlue" />
                        <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue" />
                        <feBlend in="red" in2="green" mode="screen" result="rg" />
                        <feBlend in="rg" in2="blue" mode="screen" result="output" />
                        <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
                    </filter>
                </defs>
            </svg>

            <div style={{
                width: '100%', height: '100%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                padding: '0.5rem', borderRadius: 'inherit', position: 'relative', zIndex: 1,
            }}>
                {children}
            </div>

            <style>{`
        .glass-surface {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.26s ease-out;
        }
        .glass-surface--svg {
          background: rgba(13, 5, 32, var(--glass-frost, 0.05));
          backdrop-filter: var(--filter-id) saturate(var(--glass-saturation, 1.4));
          box-shadow: inset 0 0 2px 1px rgba(139,92,246,0.15), 0 8px 32px rgba(0,0,0,0.4);
        }
        .glass-surface--fallback {
          background: rgba(139, 92, 246, 0.06);
          backdrop-filter: blur(16px) saturate(1.8) brightness(1.1);
          -webkit-backdrop-filter: blur(16px) saturate(1.8) brightness(1.1);
          border: 1px solid rgba(139,92,246,0.2);
          box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4);
        }
      `}</style>
        </div>
    );
};

export default GlassSurface;
