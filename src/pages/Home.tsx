import React, { useEffect, useState } from 'react'
import YouTubeDashboard from './dashboard/dashboard'
import { Pageheader } from '../components/pageheader/pageheader'
import Button from '../components/controls/Button'
import { ArrowLeft, ArrowRight, Undo2 } from 'lucide-react'
import MobileBottomNav, { NavItem } from '../components/mobile-menu/mobilemenu'
import { Home, Search, Heart, User, Settings } from 'lucide-react';

const HomePage = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
    const useWindowWidth = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
  };
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 576;
  const shouldShowDashboard = !isMobile || (isMobile && currentTab === 'home');
  // 2. Define your navigation items
  const navItems: NavItem[] = [
    { id: 'home', label: (<>{shouldShowDashboard && <YouTubeDashboard/>}</>), icon: Home },
    { id: 'search', label: 'Search', icon: Search, badge: 3 },
    { id: 'favorites', label: 'Favorites', icon: Heart, badge: 'new' },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];
  return (
    <>
      <Pageheader title='Welcome to Crazy Experiments' className='font-20 mb-0' headerclassName='p-3 page-header'
        extras={<>
          <Button label='Explore the Channel' className='btn btn-primary font-0 font-md-13 btn-sm' onClick={() => window.open('https://www.youtube.com/@crazyexperiments-2000', '_blank')} riconcomponent={<ArrowRight size={19} strokeWidth={2.22} absoluteStrokeWidth />} />
        </>}
      />
      {isMobile ? (
        <MobileBottomNav
          items={navItems}
          activeTab={currentTab}
          onTabChange={setCurrentTab}
          theme={{ activeColor: '#10b981' }}
          iconSize={24}
          navStyle={{ boxShadow: '0 -1px 4px rgba(0,0,0,0.1)' }}
          showLabels={false}
          position={'fixed'}
          renderContent={(tabId, item) => (
            <>
              {item?.label}
            </>
          )}
        />
      ) : <>{<YouTubeDashboard />}</>}
    </>
  )
}

export default HomePage