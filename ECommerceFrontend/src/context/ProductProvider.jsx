import React, { useState } from "react";
import { ProductContext } from "./ProductContext";

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
<<<<<<< HEAD
    { id: 1, name: "Camiseta", price: 19.99, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Zapatos", price: 49.99, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Gorra", price: 14.99, image: "https://via.placeholder.com/150" },
  ]);

const getFeaturedProducts = () => {
  // Por ahora solo retorna los primeros productos
  return products.slice(0, 4);
};
=======
    {
      id: 1,
      name: "Camiseta básica",
      category: "ropa",
      price: 12.99,
      image: "/images/Product1.jpg",
    },
    {
      id: 2,
      name: "Zapatillas deportivas",
      category: "ropa",
      price: 59.9,
      image: "/images/Product2.jpg",
    },
    {
      id: 3,
      name: "El nombre del viento",
      category: "libros",
      price: 18.95,
      image: "/images/Product3.jpg",
    },
    {
      id: 4,
      name: "Sapiens: De animales a dioses",
      category: "libros",
      price: 22.5,
      image: "/images/Product4.jpg",
    },
    {
      id: 5,
      name: "Smartphone XYZ",
      category: "tecnología",
      price: 399.99,
      image: "/images/Product5.jpg",
    },
    {
      id: 6,
      name: "Auriculares Bluetooth ABC",
      category: "tecnología",
      price: 79.9,
      image: "/images/Product6.jpg",
    },
  ]);

  const getFeaturedProducts = () => {
    return products.slice(0, 3);
  };
>>>>>>> feature/home

  return (
    <ProductContext.Provider value={{ products, getFeaturedProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
