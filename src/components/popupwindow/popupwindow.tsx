import React, { useState, useRef, useEffect } from 'react';

interface PopupProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  preferredPosition?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  offset?: number;
  className?: string;
  popupClassName?: string;
  arrowClassName?: string;
  showArrow?: boolean;
}

interface Position {
  top: number;
  left: number;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export const Popup: React.FC<PopupProps> = ({
  trigger,
  children,
  preferredPosition = 'auto',
  offset = 12,
  className = '',
  popupClassName = '',
  arrowClassName = '',
  showArrow = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0, position: 'bottom' });
  const [isPositioned, setIsPositioned] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const getBestPosition = (): 'top' | 'bottom' | 'left' | 'right' => {
    if (!triggerRef.current || !popupRef.current) {
      return 'bottom';
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 16;

    // Calculate available space in each direction
    const spaces = {
      bottom: viewportHeight - triggerRect.bottom - padding,
      top: triggerRect.top - padding,
      right: viewportWidth - triggerRect.right - padding,
      left: triggerRect.left - padding
    };

    // Priority order for auto positioning: bottom > top > right > left
    const positionPriority = ['bottom', 'top', 'right', 'left'] as const;

    // First, try to find a position that fits with priority order
    for (const pos of positionPriority) {
      const requiredSpace = (pos === 'top' || pos === 'bottom') 
        ? popupRect.height + offset 
        : popupRect.width + offset;
      
      if (spaces[pos] >= requiredSpace) {
        return pos;
      }
    }

    // If nothing fits perfectly, choose the one with most space
    const maxSpace = Math.max(...Object.values(spaces));
    const bestPosition = Object.entries(spaces).find(([, space]) => space === maxSpace);
    return bestPosition ? bestPosition[0] as 'top' | 'bottom' | 'left' | 'right' : 'bottom';
  };

  const calculatePosition = (): Position => {
    if (!triggerRef.current || !popupRef.current) {
      return { top: 0, left: 0, position: 'bottom' };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const padding = 16;

    // Determine final position
    let finalPosition: 'top' | 'bottom' | 'left' | 'right';
    
    if (preferredPosition === 'auto') {
      finalPosition = getBestPosition();
    } else {
      // Original logic for non-auto positions
      const spaceTop = triggerRect.top - padding;
      const spaceBottom = viewportHeight - triggerRect.bottom - padding;
      const spaceLeft = triggerRect.left - padding;
      const spaceRight = viewportWidth - triggerRect.right - padding;

      const positionPriority = {
        'bottom': ['bottom', 'top', 'right', 'left'],
        'top': ['top', 'bottom', 'right', 'left'],
        'right': ['right', 'left', 'bottom', 'top'],
        'left': ['left', 'right', 'bottom', 'top']
      };

      const priorities = positionPriority[preferredPosition];
      finalPosition = preferredPosition;
      
      for (const pos of priorities) {
        let fitsInPosition = false;
        
        switch (pos) {
          case 'bottom':
            fitsInPosition = spaceBottom >= popupRect.height + offset;
            break;
          case 'top':
            fitsInPosition = spaceTop >= popupRect.height + offset;
            break;
          case 'right':
            fitsInPosition = spaceRight >= popupRect.width + offset;
            break;
          case 'left':
            fitsInPosition = spaceLeft >= popupRect.width + offset;
            break;
        }
        
        if (fitsInPosition) {
          finalPosition = pos as 'top' | 'bottom' | 'left' | 'right';
          break;
        }
      }
    }

    let top = 0;
    let left = 0;

    // Calculate position based on final position - aligned to button edge, not center
    switch (finalPosition) {
      case 'bottom':
        top = triggerRect.bottom + scrollY + offset;
        left = triggerRect.left + scrollX; // Align to left edge of trigger
        break;
      case 'top':
        top = triggerRect.top + scrollY - popupRect.height - offset;
        left = triggerRect.left + scrollX; // Align to left edge of trigger
        break;
      case 'right':
        top = triggerRect.top + scrollY; // Align to top edge of trigger
        left = triggerRect.right + scrollX + offset;
        break;
      case 'left':
        top = triggerRect.top + scrollY; // Align to top edge of trigger
        left = triggerRect.left + scrollX - popupRect.width - offset;
        break;
    }

    // Prevent horizontal overflow
    if (finalPosition === 'top' || finalPosition === 'bottom') {
      if (left < padding) {
        left = padding;
      } else if (left + popupRect.width > viewportWidth - padding) {
        left = viewportWidth - popupRect.width - padding;
      }
    }

    // Prevent vertical overflow
    if (finalPosition === 'left' || finalPosition === 'right') {
      if (top < padding) {
        top = padding;
      } else if (top + popupRect.height > viewportHeight - padding) {
        top = viewportHeight - popupRect.height - padding;
      }
    }

    return { top, left, position: finalPosition };
  };

  const updatePosition = () => {
    if (isOpen && popupRef.current) {
      const newPosition = calculatePosition();
      setPosition(newPosition);
      setIsPositioned(true);
    }
  };

  // Check if current position is still valid during scroll
  const isCurrentPositionValid = (): boolean => {
    if (!triggerRef.current || !popupRef.current || !isPositioned) {
      return true;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 16;

    switch (position.position) {
      case 'bottom':
        return (viewportHeight - triggerRect.bottom - padding) >= (popupRect.height + offset);
      case 'top':
        return (triggerRect.top - padding) >= (popupRect.height + offset);
      case 'right':
        return (viewportWidth - triggerRect.right - padding) >= (popupRect.width + offset);
      case 'left':
        return (triggerRect.left - padding) >= (popupRect.width + offset);
      default:
        return true;
    }
  };

  const handleDynamicRepositioning = () => {
    if (isOpen && popupRef.current && preferredPosition === 'auto') {
      if (!isCurrentPositionValid()) {
        // Current position is no longer valid, recalculate
        updatePosition();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsPositioned(false);
      updatePosition();
      
      const handleResize = () => updatePosition();
      const handleScroll = () => {
        if (preferredPosition === 'auto') {
          // For auto position, check if we need to reposition dynamically
          handleDynamicRepositioning();
        } else {
          // For fixed positions, just update coordinates
          updatePosition();
        }
      };
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popupRef.current &&
        triggerRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const getArrowStyles = (): React.CSSProperties => {
    if (!showArrow || !triggerRef.current || !popupRef.current || !isPositioned) {
      return { display: 'none' };
    }

    const arrowSize = 8;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const baseArrowStyle: React.CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      zIndex: 1,
    };

    switch (position.position) {
      case 'bottom': {
        const triggerCenter = triggerRect.left + scrollX + (triggerRect.width / 2);
        const popupLeft = position.left;
        let arrowLeft = triggerCenter - popupLeft - arrowSize;
        
        const minLeft = arrowSize;
        const maxLeft = popupRect.width - arrowSize * 2;
        arrowLeft = Math.max(minLeft, Math.min(maxLeft, arrowLeft));
        
        return {
          ...baseArrowStyle,
          top: -arrowSize,
          left: arrowLeft,
          borderTop:'none',
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid #ffffff`,
          filter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.1))',
        };
      }
      case 'top': {
        const triggerCenter = triggerRect.left + scrollX + (triggerRect.width / 2);
        const popupLeft = position.left;
        let arrowLeft = triggerCenter - popupLeft - arrowSize;
        
        const minLeft = arrowSize;
        const maxLeft = popupRect.width - arrowSize * 2;
        arrowLeft = Math.max(minLeft, Math.min(maxLeft, arrowLeft));
        
        return {
          ...baseArrowStyle,
          bottom: -arrowSize,
          left: arrowLeft,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderTop: `${arrowSize}px solid #ffffff`,
          borderBottom:'none',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
        };
      }
      case 'right': {
        const triggerCenter = triggerRect.top + scrollY + (triggerRect.height / 2);
        const popupTop = position.top;
        let arrowTop = triggerCenter - popupTop - arrowSize;
        
        const minTop = arrowSize;
        const maxTop = popupRect.height - arrowSize * 2;
        arrowTop = Math.max(minTop, Math.min(maxTop, arrowTop));
        
        return {
          ...baseArrowStyle,
          left: -arrowSize,
          top: arrowTop,
          borderLeft : 'none',
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid #ffffff`,
          filter: 'drop-shadow(-2px 0 4px rgba(0,0,0,0.1))',
        };
      }
      case 'left': {
        const triggerCenter = triggerRect.top + scrollY + (triggerRect.height / 2);
        const popupTop = position.top;
        let arrowTop = triggerCenter - popupTop - arrowSize;
        
        const minTop = arrowSize;
        const maxTop = popupRect.height - arrowSize * 2;
        arrowTop = Math.max(minTop, Math.min(maxTop, arrowTop));
        
        return {
          ...baseArrowStyle,
          right: -arrowSize,
          top: arrowTop,
          borderRight : 'none',
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderLeft: `${arrowSize}px solid #ffffff`,
          filter: 'drop-shadow(2px 0 4px rgba(0,0,0,0.1))',
        };
      }
      default:
        return { display: 'none' };
    }
  };

  // Enhanced default popup styles
  const defaultPopupStyles = {
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: 'rgba(0,0,0,0.3) 0px 0 8px',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(8px)',
    minWidth: '200px',
    maxWidth: '400px',
    zIndex: 1000,
    opacity: isPositioned ? 1 : 0,
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={className}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        style={{ 
          display: 'inline-block', 
          cursor: 'pointer', 
          userSelect: 'none' 
        }}
      >
        {trigger}
      </div>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }} 
          />
          
          {/* Popup */}
          <div ref={popupRef} className={popupClassName} style={{ position: 'fixed', top: position.top, left: position.left, ...defaultPopupStyles, }}  role="dialog" aria-modal="true">
            {/* Arrow */}
            {showArrow && isPositioned && (
              <div 
                className={arrowClassName}
                style={getArrowStyles()} 
              />
            )}
            
            {/* Content */}
            <div 
              style={{
                padding: '16px',
                maxHeight: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e1 transparent',
              }}
            >
              {children}
            </div>
          </div>
        </>
      )}

      {/* CSS for webkit scrollbars */}
      <style>{`
        .smart-popup-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .smart-popup-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .smart-popup-content::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .smart-popup-content::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
};
