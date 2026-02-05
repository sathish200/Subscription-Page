
import React, { useState, useCallback } from 'react';

// Types
export interface NavItem {
  id: string;
  label: any;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number | string;
  disabled?: boolean;
}

export interface NavigationTheme {
  backgroundColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  hoverColor?: string;
  borderColor?: string;
  activeBackgroundColor?: string;
  hoverBackgroundColor?: string;
  shadowColor?: string;
}

export interface MobileBottomNavProps {
  items: NavItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  theme?: NavigationTheme;
  showLabels?: boolean;
  iconSize?: number;
  className?: string;
  maxWidth?: string;
  position?: 'sticky' | 'fixed' | 'relative';
  children?: React.ReactNode;
  renderContent?: (activeTab: string, activeItem: NavItem | undefined) => React.ReactNode;
  containerStyle?: React.CSSProperties;
  navStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  items,
  activeTab: controlledActiveTab,
  onTabChange,
  theme = {},
  showLabels = true,
  iconSize = 20,
  className = '',
  maxWidth = '28rem',
  position = 'sticky',
  children,
  renderContent,
  containerStyle = {},
  navStyle = {},
  buttonStyle = {}
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(items[0]?.id || '');
  
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  
  const defaultTheme: NavigationTheme = {
    backgroundColor: '#ffffff',
    activeColor: '#2563eb',
    inactiveColor: '#6b7280',
    hoverColor: '#374151',
    borderColor: '#e5e7eb',
    activeBackgroundColor: '#eff6ff',
    hoverBackgroundColor: '#f9fafb',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    ...theme
  };

  const handleTabClick = useCallback((tabId: string, item: NavItem): void => {
    if (item.disabled) return;
    
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  }, [controlledActiveTab, onTabChange]);

  const activeItem = items.find(item => item.id === activeTab);

  const defaultContent = renderContent ? 
    renderContent(activeTab, activeItem) : 
    activeItem ? (
      <div className="default-content">
        <h1 className="default-title">{activeItem.label}</h1>
        <p className="default-subtitle">Current active tab: {activeTab}</p>
      </div>
    ) : null;

  return (
    <>
      <style>{`
        .mobile-nav-container {
          min-height: 100vh;
          background-color: #f5f5f5;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .mobile-nav-content {
          flex: 1;
          padding: 1rem;
        }

        .default-content {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px ${defaultTheme.shadowColor};
          padding: 2rem;
          text-align: center;
        }

        .default-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .default-subtitle {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .mobile-nav-footer {
          background: ${defaultTheme.backgroundColor};
          border-top: 1px solid ${defaultTheme.borderColor};
          padding: 0.5rem 0.75rem;
          position: ${position};
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1026;
        }

        .mobile-nav-list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: ${maxWidth};
          margin: 0 auto;
        }

        .mobile-nav-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          border: none;
          background: none;
          cursor: pointer;
          flex: 1;
          min-width: 0;
          position: relative;
        }

        .mobile-nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .mobile-nav-button:not(:disabled):hover {
          transform: translateY(-1px);
        }

        .mobile-nav-button.active {
          color: ${defaultTheme.activeColor};
          background-color: ${defaultTheme.activeBackgroundColor};
        }

        .mobile-nav-button.inactive {
          color: ${defaultTheme.inactiveColor};
        }

        .mobile-nav-button.inactive:not(:disabled):hover {
          color: ${defaultTheme.hoverColor};
          background-color: ${defaultTheme.hoverBackgroundColor};
        }

        .mobile-nav-icon {
          margin-bottom: ${showLabels ? '0.25rem' : '0'};
          transition: color 0.2s ease;
        }

        .mobile-nav-label {
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
          display: ${showLabels ? 'block' : 'none'};
        }

        .mobile-nav-badge {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          min-width: 1rem;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.625rem;
          font-weight: 600;
          padding: 0 0.25rem;
        }

        @media (max-width: 480px) {
          .mobile-nav-button {
            padding: 0.375rem 0.5rem;
          }
          
          .mobile-nav-label {
            font-size: 0.625rem;
          }
        }
      `}</style>

      <div 
        className={`mobile-nav-container ${className}`}
        style={containerStyle}
      >
        {children ? (
          children
        ) : (
          <div className="mobile-nav-content p-0">
            {defaultContent}
          </div>
        )}

        <footer 
          className="mobile-nav-footer"
          style={navStyle}
        >
          <nav className="mobile-nav-list">
            {items.map((item: NavItem) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id, item)}
                  disabled={item.disabled}
                  className={`mobile-nav-button ${isActive ? 'active' : 'inactive'}`}
                  type="button"
                  style={buttonStyle}
                  aria-label={`Navigate to ${item.label}${item.badge ? ` (${item.badge} notifications)` : ''}`}
                  aria-pressed={isActive}
                >
                  <Icon 
                    size={iconSize} 
                    className="mobile-nav-icon"
                  />
                  {showLabels && (
                    <span className="mobile-nav-label">
                      {item.label}
                    </span>
                  )}
                  {item.badge && (
                    <span className="mobile-nav-badge">
                      {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </footer>
      </div>
    </>
  );
};

export default MobileBottomNav;