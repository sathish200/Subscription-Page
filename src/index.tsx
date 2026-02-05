 // eslint-disable-next-line 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../src/asserts/css/powerui.css';
import '../src/asserts/css/powerVariable.css'
import '../src/asserts/css/custom.css'
import '../src/asserts/icons/style.css'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
