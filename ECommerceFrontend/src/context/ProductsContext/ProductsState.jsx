import { createContext, useReducer } from "react";
import axios from "axios";
import ProductsReducer from "./ProductsReducer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const initialState = {
  products: [],
  cart:[],
  error: null,
};

export const ProductsContext = createContext(initialState);

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "PRODUCTS_ERROR",
        payload: err.message,
      });
      console.error("Error al cargar productos:", err.message);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        error: state.error,
        getProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
