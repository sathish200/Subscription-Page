import React, { useState, useEffect } from 'react';

interface Quote {
  text: string;
  author: string;
}

const IoTWavesBanner: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  const iotQuotes: Quote[] = [
    {
      text: "The Internet of Things is not a concept, it is a network, the true technology-enabled Network of all networks.",
      author: "Edewede Oriwoh"
    },
    {
      text: "IoT is a giant network of connected things and people – all of which collect and share data about the way they are used.",
      author: "IBM"
    },
    {
      text: "The Internet of Things will transform the economy, society, and individuals' daily lives.",
      author: "McKinsey Global Institute"
    },
    {
      text: "IoT is about connecting the unconnected and making the invisible visible.",
      author: "Tech Innovation"
    },
    {
      text: "Smart cities, smart homes, smart everything – IoT is the foundation of our connected future.",
      author: "Digital Transformation"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % iotQuotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [iotQuotes.length]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const currentQuote = iotQuotes[currentQuoteIndex];

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container.light {
          position: relative;
          width: 100%;
          max-height: 300px;
          height:100%;
          overflow: hidden;
          transition: background-color 0.5s ease;
        }

        .container.light {
          background: #dbeafe;
        }

        .container.dark {
          background: #111827;
        }

        .theme-toggle {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 20;
          padding: 5px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .theme-toggle.light {
          background-color: #1f2937;
          color: white;
        }

        .theme-toggle.light:hover {
          background-color: #374151;
        }

        .theme-toggle.dark {
          background-color: #fbbf24;
          color: #1f2937;
        }

        .theme-toggle.dark:hover {
          background-color: #f59e0b;
        }

        .background-gradient {
          position: absolute;
          inset: 0;
          transition: opacity 0.5s ease;
        }

        .background-gradient.light {
          background: linear-gradient(135deg, #dbeafe 0%, #fdf2f8 50%, #fce7f3 100%);
        }

        .background-gradient.dark {
          background: linear-gradient(135deg, #111827 0%, #1e3a8a 50%, #581c87 100%);
        }

        .waves-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .quote-banner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .quote-container {
          max-width: 100%;
          max-height: 250px;
          margin: 0 auto;
          padding: 1rem;
          border-radius:0px;
          transition: all 0.5s ease;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color:none;
        }

        .quote-container.light {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(0, 0, 0, 0.1);
          width:100%;
          height:100%
        }

        .quote-container.dark {
          background: none;
          border-color: none;
          height : 100%;
          width : 100%;
        }

        .quote-content {
          text-align: center;
        }

        .main-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
          transition: color 0.3s ease;
        }

        @media (min-width: 768px) {
          .main-title {
            font-size: 1.5rem;
          }
        }

        .main-title.light {
          color: #1f2937;
        }

        .main-title.dark {
          color: white;
        }

        .quote-wrapper {
          position: relative;
          min-height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }

        .quote-text-container {
          transition: all 1s ease;
          transform: translateY(0);
          text-align: center;
          max-width: 100%;
          animation: fadeInOut 4s ease-in-out infinite;
          overflow: hidden;
        }

        .quote-text-container.light {
          color: #374151;
        }

        .quote-text-container.dark {
          color: #fff;
        }

        .quote-text {
          font-size: 20px;
          font-style: italic;
          font-weight: 500;
          line-height: 1.6;
          margin-bottom: 0px;
        }

        @media (min-width: 768px) {
          .quote-text {
            font-size: 1.25rem;
          }
        }
     @media (max-width: 576px) {
          .quote-text {
            font-size: 15px;
          }
        }
        .quote-author {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .quote-author.light {
          color: #4b5563;
        }

        .quote-author.dark {
          color: #93c5fd;
        }

        .quote-indicators {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
          gap: 0.5rem;
        }

        .indicator {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .indicator.active.light {
          background-color: #2563eb;
        }

        .indicator.active.dark {
          background-color: #60a5fa;
        }

        .indicator.inactive.light {
          background-color: #9ca3af;
        }

        .indicator.inactive.dark {
          background-color: #4b5563;
        }

        @keyframes fadeInOut {
          0%, 20% { 
            opacity: 1; 
            transform: translateY(0); 
          }
          25%, 75% { 
            opacity: 1; 
            transform: translateY(0); 
          }
          80%, 100% { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
        }
      `}</style>

      <div className={`container ${isDark ? 'dark' : 'light'}`}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* Background Gradient Layer */}
        <div className={`background-gradient ${isDark ? 'dark' : 'light'}`} />

        {/* Animated Wave SVG */}
        <svg
          className="waves-svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradient definitions for waves */}
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#3B82F6" : "#60A5FA"} stopOpacity="0.8">
                <animate attributeName="stop-color" 
                  values={isDark ? "#3B82F6;#8B5CF6;#06B6D4;#3B82F6" : "#60A5FA;#A78BFA;#34D399;#60A5FA"}
                  dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor={isDark ? "#8B5CF6" : "#A78BFA"} stopOpacity="0.4">
                <animate attributeName="stop-color" 
                  values={isDark ? "#8B5CF6;#06B6D4;#3B82F6;#8B5CF6" : "#A78BFA;#34D399;#60A5FA;#A78BFA"}
                  dur="8s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#06B6D4" : "#34D399"} stopOpacity="0.6">
                <animate attributeName="stop-color" 
                  values={isDark ? "#06B6D4;#10B981;#8B5CF6;#06B6D4" : "#34D399;#60A5FA;#A78BFA;#34D399"}
                  dur="10s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor={isDark ? "#10B981" : "#60A5FA"} stopOpacity="0.3">
                <animate attributeName="stop-color" 
                  values={isDark ? "#10B981;#8B5CF6;#06B6D4;#10B981" : "#60A5FA;#A78BFA;#34D399;#60A5FA"}
                  dur="10s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#8B5CF6" : "#A78BFA"} stopOpacity="0.4">
                <animate attributeName="stop-color" 
                  values={isDark ? "#8B5CF6;#3B82F6;#10B981;#8B5CF6" : "#A78BFA;#60A5FA;#34D399;#A78BFA"}
                  dur="12s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor={isDark ? "#3B82F6" : "#60A5FA"} stopOpacity="0.2">
                <animate attributeName="stop-color" 
                  values={isDark ? "#3B82F6;#10B981;#8B5CF6;#3B82F6" : "#60A5FA;#34D399;#A78BFA;#60A5FA"}
                  dur="12s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            {/* 3D Effect Filters */}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={isDark ? "#000000" : "#1F2937"} floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* Wave Layer 1 - Background */}
          <path fill="url(#waveGradient1)" filter="url(#shadow)">
            <animate attributeName="d" 
              values="M0,400 C300,450 600,350 900,400 C1050,425 1200,375 1200,400 L1200,800 L0,800 Z;
                      M0,350 C300,300 600,450 900,350 C1050,300 1200,425 1200,350 L1200,800 L0,800 Z;
                      M0,400 C300,450 600,350 900,400 C1050,425 1200,375 1200,400 L1200,800 L0,800 Z"
              dur="8s" repeatCount="indefinite" />
          </path>

          {/* Wave Layer 2 - Middle */}
          <path fill="url(#waveGradient2)" filter="url(#shadow)">
            <animate attributeName="d" 
              values="M0,450 C400,400 800,500 1200,450 L1200,800 L0,800 Z;
                      M0,500 C400,550 800,400 1200,500 L1200,800 L0,800 Z;
                      M0,450 C400,400 800,500 1200,450 L1200,800 L0,800 Z"
              dur="10s" repeatCount="indefinite" />
          </path>

          {/* Wave Layer 3 - Foreground */}
          <path fill="url(#waveGradient3)" filter="url(#shadow)">
            <animate attributeName="d" 
              values="M0,550 C200,500 400,600 600,550 C800,500 1000,600 1200,550 L1200,800 L0,800 Z;
                      M0,600 C200,650 400,500 600,600 C800,650 1000,500 1200,600 L1200,800 L0,800 Z;
                      M0,550 C200,500 400,600 600,550 C800,500 1000,600 1200,550 L1200,800 L0,800 Z"
              dur="12s" repeatCount="indefinite" />
          </path>

          {/* Floating Particles/Dots for IoT Feel */}
          <g opacity="0.7">
            <circle cx="150" cy="200" r="3" fill={isDark ? "#60A5FA" : "#3B82F6"}>
              <animate attributeName="cy" values="200;180;200" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="350" cy="150" r="2" fill={isDark ? "#8B5CF6" : "#A78BFA"}>
              <animate attributeName="cy" values="150;130;150" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="550" cy="180" r="2.5" fill={isDark ? "#10B981" : "#34D399"}>
              <animate attributeName="cy" values="180;160;180" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="750" cy="220" r="3" fill={isDark ? "#06B6D4" : "#0891B2"}>
              <animate attributeName="cy" values="220;200;220" dur="4.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;1;0.3" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="950" cy="160" r="2" fill={isDark ? "#F59E0B" : "#FBBF24"}>
              <animate attributeName="cy" values="160;140;160" dur="3.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;1;0.4" dur="3.8s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Connection Lines */}
          <g opacity="0.4" stroke={isDark ? "#60A5FA" : "#3B82F6"} strokeWidth="1" fill="none">
            <line x1="150" y1="200" x2="350" y2="150">
              <animate attributeName="stroke-dasharray" values="0,100;50,50;0,100" dur="6s" repeatCount="indefinite" />
            </line>
            <line x1="350" y1="150" x2="550" y2="180">
              <animate attributeName="stroke-dasharray" values="0,100;50,50;0,100" dur="7s" repeatCount="indefinite" />
            </line>
            <line x1="550" y1="180" x2="750" y2="220">
              <animate attributeName="stroke-dasharray" values="0,100;50,50;0,100" dur="8s" repeatCount="indefinite" />
            </line>
            <line x1="750" y1="220" x2="950" y2="160">
              <animate attributeName="stroke-dasharray" values="0,100;50,50;0,100" dur="5s" repeatCount="indefinite" />
            </line>
          </g>
        </svg>

        {/* Quote Banner */}
        <div className="quote-banner">
          <div className={`quote-container ${isDark ? 'dark' : 'light'}`}>
            <div className="quote-content">
              <h1 className={`main-title ${isDark ? 'dark' : 'light'}`}>
                IoT Innovation
              </h1>
              
              <div className="quote-wrapper">
                <div 
                  key={currentQuoteIndex}
                  className={`quote-text-container ${isDark ? 'dark' : 'light'}`}
                >
                  <blockquote className="quote-text">
                    "{currentQuote.text}"
                  </blockquote>
                  <cite className={`quote-author ${isDark ? 'dark' : 'light'}`}>
                    — {currentQuote.author}
                  </cite>
                </div>
              </div>

              <div className="quote-indicators">
                {iotQuotes.map((_, index) => (
                  <div
                    key={index}
                    className={`indicator ${
                      index === currentQuoteIndex ? 'active' : 'inactive'
                    } ${isDark ? 'dark' : 'light'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IoTWavesBanner;