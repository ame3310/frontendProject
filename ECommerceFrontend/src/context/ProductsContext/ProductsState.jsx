import { createContext, useReducer } from "react";
import axios from "axios";
import ProductsReducer from "./ProductsReducer";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  products: [],
  cart:[],
};

export const ProductsContext = createContext(initialState);

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const getProducts = async () => {
    const res = await axios.get(`${API_URL}/products`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: res.data,
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        getProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
