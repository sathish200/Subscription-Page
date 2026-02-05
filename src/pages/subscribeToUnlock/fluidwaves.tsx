import React from 'react';

interface GradientWavesProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  colors?: {
    start: string;
    end: string;
  };
  animationSpeed?: 'slow' | 'medium' | 'fast' | 'ultra-fast';
}

const GradientWaves: React.FC<GradientWavesProps> = ({
  width = 1272,
  height = 594,
  className = '',
  style = {},
  colors = { start: '#4f46e5', end: '#06b6d4' },
  animationSpeed = 'fast' // Changed default to fast
}) => {
  const speedConfig = {
    slow: { duration: '20s', offset: '25s' },
    medium: { duration: '15s', offset: '18s' },
    fast: { duration: '8s', offset: '10s' }, // Made faster
    'ultra-fast': { duration: '4s', offset: '5s' } // Added ultra-fast option
  };

  const { duration, offset } = speedConfig[animationSpeed];

  return (
    <div className={className} style={{ width: '100%', ...style }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid"
        width={width}
        height={height}
        style={{
          shapeRendering: 'auto',
          display: 'block',
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
      >
        <defs>
          {/* Primary gradient */}
          <linearGradient y2="0" y1="0" x2="1" x1="0" id="primaryGradient">
            <stop offset="0" stopColor={colors.start} />
            <stop offset="1" stopColor={colors.end} />
          </linearGradient>

          {/* Secondary gradient for variation */}
          <linearGradient y2="0" y1="0" x2="1" x1="0" id="secondaryGradient">
            <stop offset="0" stopColor={colors.end} />
            <stop offset="1" stopColor={colors.start} />
          </linearGradient>

          {/* Radial gradient for depth */}
          <radialGradient cx="0.5" cy="0.5" r="0.8" id="radialGradient">
            <stop offset="0" stopColor={colors.start} stopOpacity="0.8" />
            <stop offset="1" stopColor={colors.end} stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Wave Layer 1 - Deepest */}
        <path
          opacity="0.3"
          fill="url(#primaryGradient)"
          d={`M 0 0 L 0 ${height * 0.6} Q ${width * 0.1} ${height * 0.59} ${width * 0.2} ${height * 0.52} T ${width * 0.4} ${height * 0.51} T ${width * 0.6} ${height * 0.45} T ${width * 0.8} ${height * 0.33} T ${width} ${height * 0.36} L ${width} 0 Z`}
        >
          <animate
            attributeName="d"
            values={`M 0 0 L 0 ${height * 0.6} Q ${width * 0.1} ${height * 0.59} ${width * 0.2} ${height * 0.52} T ${width * 0.4} ${height * 0.51} T ${width * 0.6} ${height * 0.45} T ${width * 0.8} ${height * 0.33} T ${width} ${height * 0.36} L ${width} 0 Z;
                     M 0 0 L 0 ${height * 0.65} Q ${width * 0.1} ${height * 0.62} ${width * 0.2} ${height * 0.55} T ${width * 0.4} ${height * 0.48} T ${width * 0.6} ${height * 0.42} T ${width * 0.8} ${height * 0.38} T ${width} ${height * 0.32} L ${width} 0 Z;
                     M 0 0 L 0 ${height * 0.6} Q ${width * 0.1} ${height * 0.59} ${width * 0.2} ${height * 0.52} T ${width * 0.4} ${height * 0.51} T ${width * 0.6} ${height * 0.45} T ${width * 0.8} ${height * 0.33} T ${width} ${height * 0.36} L ${width} 0 Z`}
            dur={duration}
            repeatCount="indefinite"
          />
        </path>

        {/* Wave Layer 2 */}
        <path
          opacity="0.4"
          fill="url(#secondaryGradient)"
          d={`M 0 0 L 0 ${height * 0.55} Q ${width * 0.1} ${height * 0.58} ${width * 0.2} ${height * 0.54} T ${width * 0.4} ${height * 0.53} T ${width * 0.6} ${height * 0.48} T ${width * 0.8} ${height * 0.34} T ${width} ${height * 0.29} L ${width} 0 Z`}
        >
          <animate
            attributeName="d"
            values={`M 0 0 L 0 ${height * 0.55} Q ${width * 0.1} ${height * 0.58} ${width * 0.2} ${height * 0.54} T ${width * 0.4} ${height * 0.53} T ${width * 0.6} ${height * 0.48} T ${width * 0.8} ${height * 0.34} T ${width} ${height * 0.29} L ${width} 0 Z;
                     M 0 0 L 0 ${height * 0.58} Q ${width * 0.1} ${height * 0.55} ${width * 0.2} ${height * 0.51} T ${width * 0.4} ${height * 0.49} T ${width * 0.6} ${height * 0.44} T ${width * 0.8} ${height * 0.31} T ${width} ${height * 0.33} L ${width} 0 Z;
                     M 0 0 L 0 ${height * 0.55} Q ${width * 0.1} ${height * 0.58} ${width * 0.2} ${height * 0.54} T ${width * 0.4} ${height * 0.53} T ${width * 0.6} ${height * 0.48} T ${width * 0.8} ${height * 0.34} T ${width} ${height * 0.29} L ${width} 0 Z`}
            dur={offset}
            repeatCount="indefinite"
          />
        </path>

        {/* Wave Layer 3 */}
        <path
          opacity="0.5"
          fill="url(#radialGradient)"
          d={`M 0 0 L 0 ${height * 0.7} Q ${width * 0.1} ${height * 0.64} ${width * 0.2} ${height * 0.58} T ${width * 0.4} ${height * 0.55} T ${width * 0.6} ${height * 0.5} T ${width * 0.8} ${height * 0.35} T ${width} ${height * 0.29} L ${width} 0 Z`}
        >
          <animate
            attributeName="d"
            values={`M 0 0 L 0 ${height * 0.7} Q ${width * 0.1} ${height * 0.64} ${width * 0.2} ${height * 0.58} T ${width * 0.4} ${height * 0.55} T ${width * 0.6} ${height * 0.5} T ${width * 0.8} ${height * 0.35} T ${width} ${height * 0.29} L ${width} 0 Z;
                     M 0 0 L 0 ${height * 0.68} Q ${width * 0.1} ${height * 0.67} ${width * 0.2} ${height * 0.61} T ${width * 0.4} ${height * 0.52} T ${width * 0.6} ${height * 0.47} T ${width * 0.8} ${height * 0.37} T ${width} ${height * 0.31} L ${width} 0 Z;
                     M 0 0 L 0 ${height * 0.7} Q ${width * 0.1} ${height * 0.64} ${width * 0.2} ${height * 0.58} T ${width * 0.4} ${height * 0.55} T ${width * 0.6} ${height * 0.5} T ${width * 0.8} ${height * 0.35} T ${width} ${height * 0.29} L ${width} 0 Z`}
            dur="7s"
            repeatCount="indefinite"
          />
        </path>

        {/* Wave Layer 4 */}
        <path
          opacity="0.4"
          fill="url(#primaryGradient)"
          d={`M 0 0 L 0 ${height * 0.6} Q ${width * 0.1} ${height * 0.58} ${width * 0.2} ${height * 0.54} T ${width * 0.4} ${height * 0.44} T ${width * 0.6} ${height * 0.47} T ${width * 0.8} ${height * 0.37} T ${width} ${height * 0.3} L ${width} 0 Z`}
        >
          <animate
            attributeName="d"
            values={`M 0 0 L 0 ${height * 0.6} Q ${width * 0.1} ${height * 0.58} ${width * 0.2} ${height * 0.54} T ${width * 0.4} ${height * 0.44} T ${width * 0.6} ${height * 0.47} T ${width * 0.8} ${height * 0.37} T ${width} ${height * 0.3} L ${width} 0 Z;
                     M 0 0 L 0 ${height * 0.63} Q ${width * 0.1} ${height * 0.61} ${width * 0.2} ${height * 0.57} T ${width * 0.4} ${height * 0.41} T ${width * 0.6} ${height * 0.44} T ${width * 0.8} ${height * 0.34} T ${width} ${height * 0.32} L ${width} 0 Z;
                     M 0 0 L 0 ${height * 0.6} Q ${width * 0.1} ${height * 0.58} ${width * 0.2} ${height * 0.54} T ${width * 0.4} ${height * 0.44} T ${width * 0.6} ${height * 0.47} T ${width * 0.8} ${height * 0.37} T ${width} ${height * 0.3} L ${width} 0 Z`}
            dur="9s"
            repeatCount="indefinite"
          />
        </path>

        {/* Wave Layer 5 - Top */}
        <path
          opacity="0.6"
          fill="url(#secondaryGradient)"
          d={`M 0 0 L 0 ${height * 0.67} Q ${width * 0.1} ${height * 0.68} ${width * 0.2} ${height * 0.62} T ${width * 0.4} ${height * 0.44} T ${width * 0.6} ${height * 0.36} T ${width * 0.8} ${height * 0.37} T ${width} ${height * 0.3} L ${width} 0 Z`}
        >
          <animate
            attributeName="d"
            values={`M 0 0 L 0 ${height * 0.67} Q ${width * 0.1} ${height * 0.68} ${width * 0.2} ${height * 0.62} T ${width * 0.4} ${height * 0.44} T ${width * 0.6} ${height * 0.36} T ${width * 0.8} ${height * 0.37} T ${width} ${height * 0.3} L ${width} 0 Z;
                     M 0 0 L 0 ${height * 0.64} Q ${width * 0.1} ${height * 0.65} ${width * 0.2} ${height * 0.59} T ${width * 0.4} ${height * 0.41} T ${width * 0.6} ${height * 0.33} T ${width * 0.8} ${height * 0.34} T ${width} ${height * 0.28} L ${width} 0 Z;
                     M 0 0 L 0 ${height * 0.67} Q ${width * 0.1} ${height * 0.68} ${width * 0.2} ${height * 0.62} T ${width * 0.4} ${height * 0.44} T ${width * 0.6} ${height * 0.36} T ${width * 0.8} ${height * 0.37} T ${width} ${height * 0.3} L ${width} 0 Z`}
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        {/* Floating elements for extra beauty - Also made faster */}
        <circle cx={width * 0.15} cy={height * 0.2} r="2" fill={colors.start} opacity="0.4">
          <animate
            attributeName="cy"
            values={`${height * 0.2}; ${height * 0.25}; ${height * 0.2}`}
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.4; 0.8; 0.4"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx={width * 0.7} cy={height * 0.15} r="3" fill={colors.end} opacity="0.3">
          <animate
            attributeName="cy"
            values={`${height * 0.15}; ${height * 0.22}; ${height * 0.15}`}
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3; 0.7; 0.3"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx={width * 0.9} cy={height * 0.18} r="1.5" fill={colors.start} opacity="0.5">
          <animate
            attributeName="cy"
            values={`${height * 0.18}; ${height * 0.23}; ${height * 0.18}`}
            dur="3.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5; 0.9; 0.5"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default GradientWaves;