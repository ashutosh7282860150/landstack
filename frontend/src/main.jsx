import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { LandStackProvider } from './context/LandStackContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LandStackProvider>
      <App />
    </LandStackProvider>
  </React.StrictMode>,
);
