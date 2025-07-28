import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import { ProductsProvider } from "./context/ProductsContext/ProductsContext.jsx";
import { OrderProvider } from "./context/OrdersContext/OrdersState";
import { CartProvider } from "./context/CartContext/CartState.jsx";
import { AdminProvider } from "./context/AdminContext/AdminState.jsx";
import { AuthProvider } from "./context/AuthContext/AuthContext.jsx";
import "./assets/styles/main.scss";

const ThemedApp = () => {
  const { algorithm } = useTheme();
  const selectedAlgorithm =
    algorithm === "darkAlgorithm"
      ? theme.darkAlgorithm
      : theme.defaultAlgorithm;

  return (
    <ConfigProvider theme={{ algorithm: selectedAlgorithm }}>
      <App />
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AdminProvider>
            <OrderProvider>
              <CartProvider>
                <ProductsProvider>
                  <ThemedApp />
                </ProductsProvider>
              </CartProvider>
            </OrderProvider>
          </AdminProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
