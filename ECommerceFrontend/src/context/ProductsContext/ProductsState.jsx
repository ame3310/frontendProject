import { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
import ProductsReducer from './ProductsReducer'

const API_URL = import.meta.env.VITE_API_URL
const cart = JSON.parse(localStorage.getItem('cart'))
const initialState = {
    products: [],
    cart: cart ? cart : [],
}
export const ProductsContext = createContext(initialState);

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const getProducts = async () => {
    const res = await axios.get(`${API_URL}/products`);
    dispatch({
      type: 'GET_PRODUCTS',
      payload: res.data,
    });
    return res; 
  };

  const addCart = (product) => {
    dispatch({
      type: 'ADD_CART',
      payload: product,
    });
  };

  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    })
  }

  const removeFromCart = (id) => {
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: id,
  });
};

const updateQuantity = (id, quantity) => {
  dispatch({
    type: 'UPDATE_QUANTITY',
    payload: { id, quantity },
  });
};

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        getProducts,
        addCart,
        clearCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};