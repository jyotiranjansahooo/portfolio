import React, { useMemo } from 'react';

const DigitalGridWeaveLoading = () => {
  // Generate subtle, background grid lines or particles
  const gridLines = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      // Position lines deterministically
      rotation: `${(i * 30) % 180}deg`,
      scale: `${1.2 + (i % 3) * 0.1}`,
      delay: `${(i % 5) * 0.15}s`,
      duration: `${4 + (i % 3)}s`,
      opacity: 0.03 + (i % 3) * 0.02, // Very subtle opacity
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-900/95 backdrop-blur-sm pointer-events-auto">
      <style>{`
        /* CSS Keyframes for the Digital Grid Weave */
        @keyframes subtleSpin { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        @keyframes pulseBar { 
          0%, 100% { width: 10%; background-color: #4f46e5; } 
          50% { width: 90%; background-color: #a855f7; } 
        }
        @keyframes shimmer {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        @keyframes wave {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }

        .grid-line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          transform-origin: center;
          animation: subtleSpin linear infinite;
          mix-blend-mode: screen;
        }

        .loader-bar {
          position: relative;
          width: 80px;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.1);
          margin-top: 2rem;
        }

        .loader-bar-fill {
          height: 100%;
          border-radius: 4px;
          animation: pulseBar 2.5s ease-in-out infinite;
        }

        .hexagon-inner {
          animation: spinSlow 8s linear infinite reverse;
        }
        
      `}</style>

      {/* Grid Lines Background Effect */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
        {gridLines.map(line => (
          <div
            key={line.id}
            className="grid-line text-indigo-400/80"
            style={{
              transform: `rotate(${line.rotation}) scaleX(${line.scale})`,
              opacity: line.opacity,
              animationDuration: `${line.duration}s`,
              animationDelay: line.delay,
            }}
            aria-hidden
          />
        ))}
      </div>

      {/* Main Loader Container */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8">
        
        {/* Animated Geometric Shape (e.g., a rotating hexagon) */}
        <div className="w-24 h-24 text-white" style={{ animation: 'shimmer 2s ease-in-out infinite' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-400/80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {/* Outer Ring */}
            <circle cx="50" cy="50" r="45" opacity="0.1" />

            {/* Pulsing Hexagon */}
            <g className="hexagon-inner" style={{ transformOrigin: '50% 50%' }}>
                <polygon 
                  points="50,5 93.3,30 93.3,75 50,100 6.7,75 6.7,30" 
                  strokeLinejoin="round" 
                  strokeDasharray="200" 
                  strokeDashoffset="0" 
                  style={{ 
                    animation: 'wave 2s linear infinite alternate',
                    transformOrigin: 'center',
                    transformBox: 'fill-box'
                  }}
                  opacity="0.9"
                  fill="none"
                  stroke="#a855f7" // Violet
                />
            </g>
          </svg>
        </div>

        {/* Loading Text */}
        <h1 className="text-xl md:text-3xl font-mono mt-8 text-gray-100 uppercase tracking-widest animate-pulse">
          <span className="text-indigo-400">&lt;</span>LOADING<span className="text-indigo-400">/&gt;</span>
        </h1>

        {/* Loading Bar */}
        <div className="loader-bar">
          <div className="loader-bar-fill" />
        </div>
        
        {/* Sub-text for context */}
        <p className="text-sm mt-4 text-gray-400 font-sans">
          Initializing Portfolio. . .
        </p>

      </div>
    </div>
  );
};

export default DigitalGridWeaveLoading;