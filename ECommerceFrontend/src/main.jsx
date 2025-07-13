
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css';
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);