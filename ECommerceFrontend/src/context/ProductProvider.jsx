import React, { useState } from "react";
import { ProductContext } from "./ProductContext";

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, name: "Camiseta", price: 19.99, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Zapatos", price: 49.99, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Gorra", price: 14.99, image: "https://via.placeholder.com/150" },
  ]);

  const getFeaturedProducts = () => {
    // Simulación; podrías filtrar o hacer llamada a API aquí
    return products;
  };

  return (
    <ProductContext.Provider value={{ products, getFeaturedProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
