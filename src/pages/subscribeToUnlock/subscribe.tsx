
import React, { useState, useEffect } from 'react';
import { Heart, Share2, Bell, Code, Check, Star, Sparkles, Lock, Unlock, ExternalLink, Eye, Play } from 'lucide-react';
import { Pageheader } from '../../components/pageheader/pageheader';
import GradientWaves from './fluidwaves';
import { SOURCE_CODE_LINKS } from './sourcecode';
import Button from '../../components/controls/Button';

interface StepStatus {
  subscribe: boolean;
  like: boolean;
  share: boolean;
  watch: boolean;
}
interface VideoData {
  title: string;
  videoId: string;
  link: string;
}
const SubscribeUnlockPage = (props?:any) => {
  const [steps, setSteps] = useState<StepStatus>({
    subscribe: false,
    like: false,
    share: false,
    watch: false
  });

  const [progress, setProgress] = useState<number>(0);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [pulseEffect, setPulseEffect] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  // Crazy Experiments YouTube URLs
  const YOUTUBE_URLS = {
    subscribe: selectedVideo ? `https://www.youtube.com/watch?v=${selectedVideo.videoId}` : '',
    like: selectedVideo ? `https://www.youtube.com/watch?v=${selectedVideo.videoId}` : '',
    share: selectedVideo ? `https://www.youtube.com/watch?v=${selectedVideo.videoId}` : '',
    watch: selectedVideo ? `https://www.youtube.com/watch?v=${selectedVideo.videoId}` : ''  // Add this
  };
  useEffect(() => {
    try {
      const storedVideo = localStorage.getItem('selectedVideo');
      if (storedVideo) {
        const parsedVideo = JSON.parse(storedVideo);
        if (parsedVideo && parsedVideo.videoId && parsedVideo.link) {
          setSelectedVideo(parsedVideo);
          return;
        }
      }

      // Fallback to a default video
      setSelectedVideo({
        title: "How to Make a Radar With ESP8266",
        videoId: "Fi3g5PLHTlI",
        link: "https://www.youtube.com/watch?v=Fi3g5PLHTlI&t=80s"
      });
    } catch (error) {
      console.error('Error loading selected video:', error);
      // Fallback to a default video if there's any error
      setSelectedVideo({
        title: "How to Make a Radar With ESP8266",
        videoId: "Fi3g5PLHTlI",
        link: "https://www.youtube.com/watch?v=Fi3g5PLHTlI&t=80s"
      });
    }
  }, []);

  useEffect(() => {
    const completedSteps = Object.values(steps).filter(Boolean).length;
    const newProgress = (completedSteps / 4) * 100;  // Change from 3 to 4
    setProgress(newProgress);

    if (completedSteps === 4 && !isUnlocked) {  // Change from 3 to 4
      setIsUnlocked(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [steps, isUnlocked]);

  const handleStepComplete = (step: keyof StepStatus) => {
    if (!steps[step]) {
      setSteps(prev => ({ ...prev, [step]: true }));
      setPulseEffect(step);
      setTimeout(() => setPulseEffect(''), 800);
    }
  };


  // Update the handleYouTubeAction function to use the selected video
  const handleYouTubeAction = (action: keyof StepStatus) => {
    if (!selectedVideo) return;

    let targetUrl = YOUTUBE_URLS[action];

    if (action === 'share') {
      const shareText = `Check out this video from Crazy Experiments: ${selectedVideo.title}`;

      if (navigator.share) {
        navigator.share({
          title: 'Crazy Experiments - Amazing Video!',
          text: shareText,
          url: YOUTUBE_URLS.share,
        }).then(() => {
          handleStepComplete(action);
        });
        return;
      } else {
        targetUrl = `https://www.youtube.com/share?url=${encodeURIComponent(YOUTUBE_URLS.share)}&title=${encodeURIComponent(shareText)}`;
      }
    }

    // For watch action, we'll complete the step immediately when they click
    if (action === 'watch') {
      handleStepComplete(action);
    }

    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    // For other actions, wait 3 seconds before marking as complete
    if (action !== 'watch') {
      setTimeout(() => handleStepComplete(action), 3000);
    }
  };

  const resetProgress = () => {
    setSteps({ subscribe: false, like: false, share: false, watch: false });  // Add watch
    setIsUnlocked(false);
    setProgress(0);
    setShowConfetti(false);
  };

  const downloadSourceCode = () => {
    if (!selectedVideo) return;

    // Find the source code link for the current video
    const sourceCodeInfo = SOURCE_CODE_LINKS[selectedVideo.videoId];

    if (sourceCodeInfo) {
      // Open the Google Drive link in a new tab
      window.open(sourceCodeInfo.url, '_blank');
    } else {
      // Fallback if no link is found
      const element = document.createElement('a');
      const file = new Blob(['// Source code for: ' + selectedVideo.title], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'source-code-' + selectedVideo.videoId + '.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // Show message to user
      alert('Direct source code link not available for this video yet. Please check the video description for links.');
    }
  };
  return (
    <>
      <div className="page-container">
        <GradientWaves
          colors={{ start: '#ff00ff', end: '#00ffff' }}
          animationSpeed="ultra-fast"
          style={{ position: 'absolute', top: 0 }}
          height={700}
        />
        {/* Sub4unlock-style Animated Background */}
        <div className="animated-background">
          <div className="grid-lines">
            <div className="grid-line vertical"></div>
            <div className="grid-line horizontal"></div>
          </div>
          <div className="particles">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  opacity: Math.random() * 0.3 + 0.1,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${20 + Math.random() * 20}s`
                }}
              />
            ))}
          </div>
          <div className="floating-dots">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="floating-dot"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${15 + Math.random() * 30}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Confetti Effect */}
        {showConfetti && (
          <div className="confetti-container">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#a55eea'][Math.floor(Math.random() * 6)],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="content-container mx-auto">
          <div className="main-card">

            {/* Header */}
            <div className="header-section">
              <div className={`lock-icon ${isUnlocked ? 'unlocked' : ''}`}>
                {isUnlocked ? <Unlock size={48} /> : <Lock size={48} />}
              </div>
              <h1 className="main-title">
                {isUnlocked ? '🎉 Unlocked!' : 'Subscribe to Unlock'}
              </h1>
              <p className="subtitle">
                {isUnlocked
                  ? 'Amazing! You can now access the Crazy Experiments source code!'
                  : 'Complete all YouTube actions for Crazy Experiments channel to unlock exclusive source code'
                }
              </p>
              {selectedVideo && (
                <div className="video-preview mt-3 p-3 bg-light rounded">
                  <p className="small text-muted mb-1">You're unlocking source code for:</p>
                  <a
                    href={selectedVideo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary fw-bold d-block text-truncate"
                  >
                    {selectedVideo.title}
                  </a>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-label">Progress</span>
                <span className="progress-percentage">{Math.round(progress)}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="progress-steps">
                <div className={`step-dot ${steps.subscribe ? 'completed' : ''}`}></div>
                <div className={`step-dot ${steps.like ? 'completed' : ''}`}></div>
                <div className={`step-dot ${steps.share ? 'completed' : ''}`}></div>
              </div>
            </div>

            {/* Action Steps */}
            <div className="steps-container">
              {/* Watch Step */}
              {/* Watch Step */}
              <div className={`step-card ${steps.watch ? 'completed' : ''} ${pulseEffect === 'watch' ? 'pulse' : ''}`}>
                <div className="step-icon watch-icon">
                  {steps.watch ? <Check size={24} /> : <Play size={24} />}
                </div>
                <div className="step-content">
                  <h3>Watch Our Video</h3>
                  <p>Enjoy our amazing experiments and learn something new!</p>
                </div>
                <button
                  className={`action-btn watch-btn ${steps.watch ? 'completed' : ''}`}
                  onClick={() => handleYouTubeAction('watch')}
                  disabled={steps.watch}
                >
                  {steps.watch ? 'Watched ▶️' : (
                    <>
                      Watch <ExternalLink size={16} />
                    </>
                  )}
                </button>
              </div>
              {/* Subscribe Step */}
              <div className={`step-card ${steps.subscribe ? 'completed' : ''} ${pulseEffect === 'subscribe' ? 'pulse' : ''}`}>
                <div className="step-icon subscribe-icon">
                  {steps.subscribe ? <Check size={24} /> : <Bell size={24} />}
                </div>
                <div className="step-content">
                  <h3>Subscribe to Crazy Experiments</h3>
                  <p>Join our amazing community of experiment lovers!</p>
                </div>
                <button
                  className={`action-btn subscribe-btn ${steps.subscribe ? 'completed' : ''}`}
                  onClick={() => handleYouTubeAction('subscribe')}
                  disabled={steps.subscribe}
                >
                  {steps.subscribe ? 'Subscribed ✓' : (
                    <>
                      Subscribe <ExternalLink size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Like Step */}
              <div className={`step-card ${steps.like ? 'completed' : ''} ${pulseEffect === 'like' ? 'pulse' : ''}`}>
                <div className="step-icon like-icon">
                  {steps.like ? <Check size={24} /> : <Heart size={24} />}
                </div>
                <div className="step-content">
                  <h3>Like Our Latest Video</h3>
                  <p>Show some love to our crazy experiments!</p>
                </div>
                <button
                  className={`action-btn like-btn ${steps.like ? 'completed' : ''}`}
                  onClick={() => handleYouTubeAction('like')}
                  disabled={steps.like}
                >
                  {steps.like ? 'Liked ❤️' : (
                    <>
                      Like <ExternalLink size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Share Step */}
              <div className={`step-card ${steps.share ? 'completed' : ''} ${pulseEffect === 'share' ? 'pulse' : ''}`}>
                <div className="step-icon share-icon">
                  {steps.share ? <Check size={24} /> : <Share2 size={24} />}
                </div>
                <div className="step-content">
                  <h3>Share Our Video</h3>
                  <p>Help spread the word about Crazy Experiments!</p>
                </div>
                <button
                  className={`action-btn share-btn ${steps.share ? 'completed' : ''}`}
                  onClick={() => handleYouTubeAction('share')}
                  disabled={steps.share}
                >
                  {steps.share ? 'Shared 📤' : (
                    <>
                      Share <ExternalLink size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Unlock Section */}
            <div className="unlock-section">
              {isUnlocked ? (
                <div className="unlocked-content">
                  <button className="download-btn" onClick={downloadSourceCode}>
                    <Code size={20} />
                    Download Source Code
                  </button>
                  <button className="reset-btn" onClick={resetProgress}>
                    Reset Demo
                  </button>
                  <div className="success-message">
                    <Sparkles size={20} />
                    <span>All Crazy Experiments actions completed!</span>
                  </div>
                </div>
              ) : (
                <div className="locked-content">
                  <button className="locked-btn" disabled>
                    <Lock size={20} />
                    Complete All Actions to Unlock
                  </button>
                  <p className="remaining-steps">
                    {3 - Object.values(steps).filter(Boolean).length} steps remaining
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="footer-section">
              <div className="footer-content">
                <Star size={16} />
                <span>Thank you for supporting Crazy Experiments! 🧪⚗️</span>
              </div>
              <Button className='btn-primary mx-auto action-btn subscribe-btn mt-3' label='Back' onClick={props?.onCancel}/>
            </div>
          </div>
        </div>

        <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .page-container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f8f9fa;
        }

        /* Sub4unlock-style Animated Background */
        .animated-background {
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .grid-lines {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .grid-line {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.03);
        }
        .watch-icon {
          background: linear-gradient(135deg, #6f42c1, #5a2d91);
          color: white;
        }
        .grid-line.vertical {
          width: 1px;
          height: 100%;
          left: 50%;
          transform: translateX(-50%);
        }
        .watch-btn {
           background: linear-gradient(135deg, #6f42c1, #5a2d91);
           color: white;
        }
        .grid-line.horizontal {
          width: 100%;
          height: 1px;
          top: 50%;
          transform: translateY(-50%);
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          animation: particleFloat linear infinite;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) translateX(0);
          }
          100% {
            transform: translateY(-100px) translateX(calc(var(--random-offset) * 100px));
          }
        }

        .floating-dots {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .floating-dot {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 50%;
          animation: floatDot ease-in-out infinite;
        }

        @keyframes floatDot {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(calc(var(--random-x) * 20px), calc(var(--random-y) * 20px));
          }
        }

        /* Confetti */
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confettiFall ease-out forwards;
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        /* Main Content */
        .content-container {
          width: 100%;
          max-width: 800px;
          padding: 20px;
          z-index: 10;
        }

        .main-card {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        /* Header */
        .header-section {
          text-align: center;
          margin-bottom: 40px;
        }

        .lock-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          color: white;
          margin-bottom: 20px;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lock-icon.unlocked {
          background: linear-gradient(135deg, #28a745, #20c997);
          animation: bounce 0.8s ease-in-out;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-15px); }
          60% { transform: translateY(-8px); }
        }

        .main-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 15px;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #6c757d;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Progress */
        .progress-section {
          margin-bottom: 40px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .progress-label {
          font-weight: 600;
          color: #495057;
        }

        .progress-percentage {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .progress-bar {
          height: 8px;
          background: #e9ecef;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 15px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 10px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .progress-steps {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .step-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #dee2e6;
          transition: all 0.3s ease;
        }

        .step-dot.completed {
          background: linear-gradient(135deg, #28a745, #20c997);
          transform: scale(1.2);
        }

        /* Steps */
        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 40px;
        }

        .step-card {
          display: flex;
          align-items: center;
          padding: 20px;
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
        }

        .step-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
        }

        .step-card.completed {
          background: linear-gradient(135deg, rgba(40, 167, 69, 0.05), rgba(32, 201, 151, 0.05));
          border-color: rgba(40, 167, 69, 0.1);
        }

        .step-card.pulse {
          animation: cardPulse 0.8s ease-in-out;
        }

        @keyframes cardPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        .step-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          margin-right: 20px;
          transition: all 0.3s ease;
        }

        .subscribe-icon {
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
        }

        .like-icon {
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: white;
        }

        .share-icon {
          background: linear-gradient(135deg, #ffc107, #e0a800);
          color: white;
        }

        .step-card.completed .step-icon {
          background: linear-gradient(135deg, #28a745, #20c997);
        }

        .step-content {
          flex: 1;
        }

        .step-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .step-content p {
          color: #6c757d;
          font-size: 0.9rem;
          margin: 0;
        }

        .action-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 110px;
          justify-content: center;
        }

        .subscribe-btn {
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
        }

        .like-btn {
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: white;
        }

        .share-btn {
          background: linear-gradient(135deg, #ffc107, #e0a800);
          color: white;
        }

        .action-btn.completed {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
        }

        .action-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .action-btn:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }

        /* Unlock Section */
        .unlock-section {
          text-align: center;
        }

        .unlocked-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .download-btn {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
          border: none;
          padding: 14px 36px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(40, 167, 69, 0.2);
        }

        .download-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(40, 167, 69, 0.3);
        }

        .reset-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reset-btn:hover {
          background: #5a6268;
          transform: translateY(-2px);
        }

        .success-message {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #28a745;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .locked-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .locked-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 14px 36px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 600;
          cursor: not-allowed;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0.7;
        }

        .remaining-steps {
          color: #6c757d;
          font-size: 0.9rem;
        }

        /* Footer */
        .footer-section {
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding-top: 25px;
        }

        .footer-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #6c757d;
          font-size: 0.85rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .main-card {
            padding: 30px 20px;
          }

          .main-title {
            font-size: 2rem;
          }

          .step-card {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .step-icon {
            margin-right: 0;
          }

          .unlocked-content {
            gap: 15px;
          }

          .download-btn, .locked-btn {
            padding: 12px 30px;
            font-size: 0.9rem;
          }
        }
      `}</style>
      </div>
    </>
  );
};

export default SubscribeUnlockPage;