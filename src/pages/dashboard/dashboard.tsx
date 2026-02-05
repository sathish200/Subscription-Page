import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/controls/Button';
import Radar from '../../asserts/images/Radar.jpg';
import Roboeye from '../../asserts/images/roboeye.jpg';
import smartdustbin from '../../asserts/images/smartdustbin.jpg';
import arduinoradar from '../../asserts/images/arduinoradar.jpg';
import display from '../../asserts/images/display.jpg';
import oleddisplay from '../../asserts/images/oleddisplay.jpg';
import IoTCover from './banner';
import SubscribeUnlockPage from '../subscribeToUnlock/subscribe';
import { getDemoData, VideoData } from '../configuration';
// interface VideoData {
//   title: string;
//   videoId: string;
//   publishedAt: string;
//   description: string;
//   thumbnail: string;
//   link: string;
//   views: string;
//   duration: string;
//   category: string;
  
// }

export const YouTubeDashboard = (props?:any) => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [subscribeToUnlock, setsubscribeToUnlock] = useState(false)

  // const getDemoData = (): VideoData[] => {
  //   return [
  //     {
  //       title: "How to Make a Radar With ESP8266",
  //       videoId: "demo1",
  //       publishedAt: new Date(Date.now() - 86400000).toISOString(),
  //       description: "Watch this incredible radar system using the ESP8266, an ultrasonic sensor, and a servo motor to scan the surroundings and visualize distance data in real time.",
  //       thumbnail: Radar,
  //       link: "https://www.youtube.com/watch?v=Fi3g5PLHTlI&t=80s",
  //       views: "125,847",
  //       duration: "8:23",
  //       category: "NodeMCU"
  //     },
  //     {
  //       title: "How to Make a Animated Robot Eyes with ESP8266",
  //       videoId: "demo2",
  //       publishedAt: new Date(Date.now() - 86400000).toISOString(),
  //       description: "create awesome animated robot eyes using an ESP8266 microcontroller and an OLED display! Whether you're building a robot for fun or adding personality to your next DIY project, these expressive eyes will bring it to life",
  //       thumbnail: Roboeye,
  //       link: "https://youtu.be/PVk5r0LEIFw",
  //       views: "125,847",
  //       duration: "8:23",
  //       category: "NodeMCU"
  //     },
  //     {
  //       title: "How to Make a Smart Dustbin with ESP8266",
  //       videoId: "demo3",
  //       publishedAt: new Date(Date.now() - 86400000).toISOString(),
  //       description: "make a Smart Dustbin using the ESP8266 NodeMCU, which opens automatically using an ultrasonic sensor and detects harmful gases using a gas sensor. Plus, you’ll also see how to connect the system to a mobile dashboard via Wi-Fi!",
  //       thumbnail: smartdustbin,
  //       link: "https://www.youtube.com/watch?v=5fTK_asSHKc",
  //       views: "125,847",
  //       duration: "8:23",
  //       category: "NodeMCU"
  //     },
  //     {
  //       title: "How to Make a Radar using Arduino",
  //       videoId: "demo4",
  //       publishedAt: new Date(Date.now() - 86400000).toISOString(),
  //       description: "In this step-by-step tutorial, learn how to build an LED scrolling text display using the Raspberry Pi Pico microcontroller. Whether you're a beginner in electronics or a Raspberry Pi enthusiast, this project is a fun and educational way to understand interfacing, display control, and embedded coding.",
  //       thumbnail: arduinoradar,
  //       link: "https://youtu.be/GS6FJrWg4pA",
  //       views: "125,847",
  //       duration: "8:23",
  //       category: "Arduino"
  //     },
  //     {
  //       title: "Make a LED Scrolling Display Using Raspberry Pi Pico",
  //       videoId: "demo5",
  //       publishedAt: new Date(Date.now() - 86400000).toISOString(),
  //       description: "In this step-by-step tutorial, learn how to build an LED scrolling text display using the Raspberry Pi Pico microcontroller. Whether you're a beginner in electronics or a Raspberry Pi enthusiast, this project is a fun and educational way to understand interfacing, display control, and embedded coding.",
  //       thumbnail: display,
  //       link: "https://youtu.be/_7FEAHZQrWc",
  //       views: "125,847",
  //       duration: "8:23",
  //       category: "Raspberry Pi"
  //     },
  //     {
  //       title: "How to Connect OLED Display with Arduino",
  //       videoId: "demo6",
  //       publishedAt: new Date(Date.now() - 86400000).toISOString(),
  //       description: "In this video, you'll learn how to connect a 0.96-inch I2C OLED display to an Arduino Uno step-by-step! Whether you're a beginner or an experienced maker, this tutorial will guide you through the wiring, code, and tips to get your OLED screen working perfectly with Arduino.",
  //       thumbnail: oleddisplay,
  //       link: "https://youtu.be/UhnA0AFHdY8",
  //       views: "125,847",
  //       duration: "8:23",
  //       category: "Arduino"
  //     },
  //   ];
  // };
  // Sample array of cards
  const cards = Array.from({ length: 10 }, (_, index) => ({
    id: `card-${index}`,
    title: `Card ${index + 1}`,
  }));
  // Set up intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          // If the element is intersecting and not already visible
          if (entry.isIntersecting && !visibleElements.has(id)) {
            setVisibleElements((prev) => new Set(prev).add(id));
            observer.unobserve(entry.target); // Stop observing after it's visible once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    elementRefs.current.forEach((element) => {
      observer.observe(element);
    });

    observerRef.current = observer;

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    elementRefs.current.clear();
  }, [cards]);

  const setElementRef = (id: string, element: HTMLElement | null) => {
    if (element) {
      elementRefs.current.set(id, element);
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    }
  };

  useEffect(() => {
    const demoData = getDemoData();
    setVideos(demoData);
    setFilteredVideos(demoData);
  }, []);

  useEffect(() => {
    let filtered = videos;

    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    setFilteredVideos(filtered);

    // Reset visible elements when filters change
    setVisibleElements(new Set());
  }, [searchTerm, selectedCategory, videos]);

  useEffect(() => {
    let filtered = videos;

    // ... search term filtering ...

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    setFilteredVideos(filtered);
  }, [searchTerm, selectedCategory, videos]);
  const options = [
    { value: 'All', label: 'All' },
    { value: 'NodeMCU', label: 'NodeMCU' },
    { value: 'Arduino', label: 'Arduino' },
    { value: 'Raspberry Pi', label: 'Raspberry Pi' },
  ];
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const wrapper = document.querySelector(".wrapper");

    const handleScroll = () => {
      if (!wrapper) return;
      const scrollTop = (wrapper as HTMLElement).scrollTop;
      setIsSticky(scrollTop > 230);
    };

    wrapper?.addEventListener("scroll", handleScroll);
    return () => wrapper?.removeEventListener("scroll", handleScroll);
  }, []);
  // const handleSourceCodeClick = (video: VideoData) => {
  //   const extractVideoId = (url: string) => {
  //     if (!url) return null;

  //     // Handle youtu.be/ format
  //     if (url.includes('youtu.be/')) {
  //       return url.split('youtu.be/')[1].split(/[?&]/)[0];
  //     }

  //     // Handle youtube.com URLs
  //     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  //     const match = url.match(regExp);

  //     return (match && match[2].length === 11) ? match[2] : null;
  //   };

  //   const videoId = extractVideoId(video.link);

  //   if (!videoId) {
  //     console.error('Could not extract video ID from URL:', video.link);
  //     return;
  //   }

  //   // Store the selected video with the extracted video ID
  //   localStorage.setItem('selectedVideo', JSON.stringify({
  //     title: video.title,
  //     videoId: videoId,
  //     link: video.link
  //   }));

  //   // Redirect to the unlock page
  //   window.location.href = '#/subscribe';
  // };

  const handleSourceCodeClick = (video: VideoData) => {
    const extractVideoId = (url: string) => {
      if (!url) return null;

      // Handle youtu.be/ format
      if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1].split(/[?&]/)[0];
      }

      // Handle youtube.com URLs
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = extractVideoId(video.link);

    if (!videoId) {
      console.error('Could not extract video ID from URL:', video.link);
      return;
    }

    // Store the selected video with the extracted video ID
    localStorage.setItem('selectedVideo', JSON.stringify({
      title: video.title,
      videoId: videoId,
      link: video.link
    }));

    // Redirect to the unlock page
    setsubscribeToUnlock(true)
  };

  return (
    <>
      {subscribeToUnlock ? <SubscribeUnlockPage  onCancel={() => {setsubscribeToUnlock(false)}}/> : <>
          <div className="min-vh-100">
            <div className="container-fluid mt-3">
              {/* Header Section with Animation */}
              <div className="row min-h-200">
                <div className="col-sm-12 banner"><IoTCover /></div>
              </div>
              <div className={`sticky-top ${isSticky ? 'sticky-active' : ''}`}>
                <div className="row my-4">
                  <div className="col-lg-12 mx-auto">
                    <div
                      id="search-header"
                      ref={(el) => setElementRef('search-header', el)}
                      className={`card border-1 ${isSticky ? 'border-radius-1' : ''} glass-effect animate-header ${visibleElements.has('search-header') ? 'visible' : ''}`}
                    >
                      <div className="card-body p-2 px-3">
                        <div className="input-group input-group-md py-2">
                          <Button label='Search' icon='icon-search font-13 pr-md-1' className='input-group-text font-0 font-md-14 bg-primary segoeui-semibold text-white border-0' />
                          <input
                            type="text"
                            className="form-control border-1 shadow-none"
                            placeholder="Search experiments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="form-select ms-2  max-w-80 max-w-sm-100">
                            {options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Videos Grid with Staggered Animation */}
              <div className="row g-3">
                {filteredVideos.map((video, index) => (
                  <div key={video.videoId} className="col-xl-4 col-lg-6 col-md-6">
                    <div
                      id={`video-${video.videoId}`}
                      ref={(el) => setElementRef(`video-${video.videoId}`, el)}
                      className={`card h-100 shadow border-0 glass-effect card-hover animate-card ${visibleElements.has(`video-${video.videoId}`) ? 'visible' : ''}`}
                      style={{
                        transitionDelay: `${(index % 6) * 0.1}s`
                      }}
                    >
                      {/* Thumbnail Container */}
                      <div className="position-relative overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="card-img-top"
                          style={{ objectFit: 'contain', transition: 'transform 0.3s ease' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />

                        {/* Play Overlay */}
                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center play-overlay">
                          <div className="btn btn-light btn-lg rounded-circle">
                            ▶️
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded">
                          <small className="d-flex align-items-center">
                            ⏱️ {video.duration}
                          </small>
                        </div>

                        {/* Category Badge */}
                        <div className="position-absolute top-0 start-0 m-2">
                          <span className="badge bg-primary category-badge">
                            {video.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="card-body d-flex flex-column p-4">
                        <h5 className="card-title fw-bold mb-3 text-dark lh-base">
                          {video.title}
                        </h5>

                        <p className="card-text text-muted small mb-3">
                          {video.description.substring(0, 120)}...
                        </p>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2">
                          <Button label='Code' icon='icon-pw-source-code pr-1' className='btn text-primary border-primary ml-auto btn-primary:hover btn-sm' onClick={() => handleSourceCodeClick(video)} />
                          <a
                            href={video.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm d-flex align-items-center justify-content-center btn-gradient"
                          >
                            <span className='icon-play3 px-1'></span> Watch Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results with Animation */}
              {filteredVideos.length === 0 && (
                <div
                  id="no-results"
                  ref={(el) => setElementRef('no-results', el)}
                  className={`text-center py-5 animate-element ${visibleElements.has('no-results') ? 'visible' : ''}`}
                >
                  <div className="card shadow-lg border-0 mx-auto glass-effect" style={{ maxWidth: '500px' }}>
                    <div className="card-body p-5">
                      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                      <h3 className="text-muted mb-3">No Experiments Found</h3>
                      <p className="text-muted">
                        Try adjusting your search terms or category filters to find more amazing experiments!
                      </p>
                      <button
                        className="btn btn-primary btn-gradient"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('All');
                        }}
                      >
                        🔄 Clear Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer with Animation */}
              <footer className="text-center pt-4 mb-3">
                <div
                  id="footer"
                  ref={(el) => setElementRef('footer', el)}
                  className={`card glass-effect border-0 shadow animate-element ${visibleElements.has('footer') ? 'visible' : ''}`}
                >
                  <div className="card-body py-4">
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧪✨</div>
                    <h5 className="text-primary mb-3">Subscribe for More Amazing Experiments!</h5>
                    <p className="text-muted mb-3">
                      Join our community of science enthusiasts and never miss a mind-blowing experiment.
                    </p>
                    <button className="btn btn-primary font-14 btn-lg btn-gradient px-3">
                      🔔 Subscribe Now
                    </button>
                  </div>
                </div>
              </footer>

              {/* Footer for mobile */}

            </div>
          </div>
      </>}
 
    </>
  );
};

export default YouTubeDashboard;