import React, { createContext, useState } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, name: "Camiseta", price: 19.99, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Zapatos", price: 49.99, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Gorra", price: 14.99, image: "https://via.placeholder.com/150" },
  ]);

  const getFeaturedProducts = () => products.slice(0, 4);

  return (
    <ProductContext.Provider value={{ products, getFeaturedProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
