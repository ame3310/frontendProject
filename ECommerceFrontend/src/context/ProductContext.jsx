import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getFeaturedProducts = async () => {
    try {
      const res = await fetch("https://api-ecommerce.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error al obtener productos", err);
    }
  };

  return (
    <ProductContext.Provider value={{ products, getFeaturedProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
