import React, { useEffect, createContext, useContext, useState} from "react";
import { ConfigProvider, theme } from "antd";

const ThemeContext = createContext();
const { darkAlgorithm, defaultAlgorithm } = theme

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    document.body.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);
  
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const algorithm = isDarkMode ? darkAlgorithm : defaultAlgorithm;

const lightTokens = {
    colorPrimary: '#dc7a0a', 
    colorBgLayout: '#faf9f6', 
    colorText: '#2c2f38', 
    colorBgContainer: '#ffffff', 
    colorBorder: '#ddd9d4',
  };

  const darkTokens = {
    colorPrimary: '#dc7a0a', 
    colorBgLayout: '#0b0f14', 
    colorText: '#dadde3', 
    colorBgContainer: '#1e1b26', 
    colorBorder: '#2a2d33',
  };

  const themeTokens = isDarkMode ? darkTokens : lightTokens;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider theme={{ algorithm, token: themeTokens }}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);
