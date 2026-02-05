import React, { useRef, useEffect, useState, useCallback } from "react";
import './tabs.css'

interface Tab {
  label: string;
  value: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  selected,
  onSelect,
  className = "",
  variant = 'default',
  size = 'md'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLUListElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const checkOverflow = useCallback(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    const hasOverflow = scroll.scrollWidth > scroll.clientWidth;
    setShowLeft(hasOverflow && scroll.scrollLeft > 5);
    setShowRight(hasOverflow && scroll.scrollLeft < scroll.scrollWidth - scroll.clientWidth - 5);
  }, []);

  const scrollToActiveTab = useCallback(() => {
    const scroll = scrollRef.current;
    const tabsList = tabsListRef.current;
    if (!scroll || !tabsList) return;

    const activeTabElement = tabsList.children[activeTabIndex] as HTMLElement;
    if (!activeTabElement) return;

    const containerRect = scroll.getBoundingClientRect();
    const tabRect = activeTabElement.getBoundingClientRect();
    
    const isTabVisible = 
      tabRect.left >= containerRect.left && 
      tabRect.right <= containerRect.right;

    if (!isTabVisible) {
      const scrollOffset = tabRect.left - containerRect.left - (containerRect.width - tabRect.width) / 2;
      scroll.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  }, [activeTabIndex]);

  useEffect(() => {
    const selectedIndex = tabs.findIndex(tab => tab.value === selected);
    setActiveTabIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [selected, tabs]);

  useEffect(() => {
    checkOverflow();
    scrollToActiveTab();
    
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [checkOverflow, scrollToActiveTab]);

  const scroll = (direction: "left" | "right") => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    
    const offset = scrollEl.clientWidth * 0.6;
    scrollEl.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  const handleTabClick = (tabValue: string, index: number) => {
    onSelect(tabValue);
    setActiveTabIndex(index);
  };

  const activeTab = tabs.find((tab) => tab.value === selected);

  return (
    <div className={`tabs-container ${className}`}>
      <div 
        className={`tabs-nav-container variant-${variant}`} 
        ref={containerRef}
      >
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="scroll-button left"
            aria-label="Scroll left"
          >
            <div className="scroll-button-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}

        <div 
          ref={scrollRef}
          className="tabs-scroll-container"
          onScroll={checkOverflow}
        >
          <ul 
            ref={tabsListRef}
            className="tabs-list"
            style={{ 
              paddingLeft: showLeft ? '48px' : '0', 
              paddingRight: showRight ? '48px' : '0' 
            }}
          >
            {tabs.map((tab, index) => (
              <li key={tab.value} className="tab-item">
                <button
                  onClick={() => handleTabClick(tab.value, index)}
                  className={`
                    tab-button 
                    size-${size}
                    ${selected === tab.value ? 'active' : ''}
                  `}
                  role="tab"
                  aria-selected={selected === tab.value}
                  aria-controls={`tabpanel-${tab.value}`}
                  id={`tab-${tab.value}`}
                >
                  {tab.icon && (
                    <span className="tab-icon">
                      {tab.icon}
                    </span>
                  )}
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="scroll-button right"
            aria-label="Scroll right"
          >
            <div className="scroll-button-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
      </div>

      <div 
        className="tab-content-panel"
        role="tabpanel"
        id={`tabpanel-${selected}`}
        aria-labelledby={`tab-${selected}`}
      >
        <div className="tab-content">
          {activeTab?.content || (
            <div className="tab-empty-state">
              No content available for this tab.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};