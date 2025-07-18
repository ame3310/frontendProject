import { createContext, useReducer } from "react";
import axios from "axios";
import ProductsReducer from "./ProductsReducer";

const initialState = {
  products: [],
  error: null,
  favorites: [], 
};


export const ProductsContext = createContext(initialState);

const API_URL = "http://localhost:3000/api";

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

    const toggleFavorite = (productId) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: productId });
  };

 return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        error: state.error,
        favorites: state.favorites,
        getProducts,
        toggleFavorite,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
