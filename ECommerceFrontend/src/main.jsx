import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import {ConfigProvider, theme} from 'antd';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import './index.css';

const ThemedApp = () => {
  const {algorithm} = useTheme();
  const selectedAlgorithm =
  algorithm === 'darkAlgorithm' ? theme.darkAlgorithm : theme.defaultAlgorithm;

  return (
    <ConfigProvider theme={{ algorithm: selectedAlgorithm }}>
      <App />
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);