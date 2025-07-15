import { createContext, useContext, useState} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const algorithm = isDarkMode
  ? 'darkAlgorithm'
  : 'defaultAlgorithm';

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
};

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme, algorithm}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
