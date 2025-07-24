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
    colorPrimary: '#1890ff', 
    colorBgLayout: '#f0f2f5', 
    colorText: '#000000d9', 
    colorBgContainer: '#ffffff', 
    colorBorder: '#d9d9d9',
  };

  const darkTokens = {
    colorPrimary: '#177ddc', 
    colorBgLayout: '#141414', 
    colorText: '#ffffffd9', 
    colorBgContainer: '#1f1f1f', 
    colorBorder: '#434343',
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
