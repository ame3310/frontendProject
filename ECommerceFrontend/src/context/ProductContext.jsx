<<<<<<< HEAD
import React, { createContext, useState } from "react";
=======
import React, { createContext, useState, useEffect } from "react";
>>>>>>> feature/home

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
<<<<<<< HEAD
  const [products, setProducts] = useState([
    { id: 1, name: "Camiseta", price: 19.99, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Zapatos", price: 49.99, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Gorra", price: 14.99, image: "https://via.placeholder.com/150" },
  ]);

  const getFeaturedProducts = () => products.slice(0, 4);

  return (
    <ProductContext.Provider value={{ products, getFeaturedProducts }}>
=======
  const initialProducts = [
    {
      id: 1,
      name: "Camiseta básica",
      category: "ropa",
      price: 12.99,
      image: "/images/Product1.jpg",
      featured: true,
    },
    {
      id: 2,
      name: "Zapatillas deportivas",
      category: "ropa",
      price: 59.9,
      image: "/images/Product2.jpg",
      featured: true,
    },
    {
      id: 3,
      name: "El nombre del viento",
      category: "libros",
      price: 18.95,
      image: "/images/Product3.jpg",
      featured: false,
    },
    {
      id: 4,
      name: "Sapiens: De animales a dioses",
      category: "libros",
      price: 22.5,
      image: "/images/Product4.jpg",
      featured: true,
    },
    {
      id: 5,
      name: "Smartphone XYZ",
      category: "tecnología",
      price: 399.99,
      image: "/images/Product5.jpg",
      featured: false,
    },
    {
      id: 6,
      name: "Auriculares Bluetooth ABC",
      category: "tecnología",
      price: 79.9,
      image: "/images/Product6.jpg",
      featured: true,
    },
  ];

  const [products] = useState(initialProducts);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const featured = initialProducts.filter((p) => p.featured);
    setFeaturedProducts(featured);
  }, []);

  return (
    <ProductContext.Provider value={{ products, featuredProducts }}>
>>>>>>> feature/home
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
