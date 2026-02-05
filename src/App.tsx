import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/header';
import { useFocusTrap } from './useFocusTrap';
import SubscribeUnlockPage from './pages/subscribeToUnlock/subscribe';
import HomePage from './pages/Home';
function App() {
  const [menuBar , setMenuBar] = useState(false)
  const focusTrapRef = useFocusTrap(true);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  return (
    <>
      <div ref={focusTrapRef} tabIndex={-1}>
        <Header className='main-header' menuCollapsed={menuBar} collapseToggle={() => setMenuBar(prev => !prev)}/>
        <Router>
        <div className='d-flex'>
          {/* <Menu menuBar={menuBar}/> */}
          <div className='w-100 container-xl px-0 wrapper'>
           <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/subscribe' element = {<SubscribeUnlockPage/>}/>
          </Routes>
          </div>
        </div>
        </Router>
      </div>
    </>
  );
}

export default App;
