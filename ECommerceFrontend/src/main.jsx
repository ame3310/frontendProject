import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css';

<<<<<<< HEAD
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

=======
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
>>>>>>> bd3f1723fa05b1281f14655dbaa085e69e44bda4
