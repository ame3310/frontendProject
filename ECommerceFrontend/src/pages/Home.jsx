<<<<<<< HEAD
import React, { useContext, useEffect } from "react";
=======
import React, { useContext, useEffect, useState } from "react";
>>>>>>> feature/home
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import "../styles/pages/Home.scss";

const Home = () => {
<<<<<<< HEAD
  const { products, getFeaturedProducts } = useContext(ProductContext);

  useEffect(() => {
    getFeaturedProducts();
=======
  const { getFeaturedProducts } = useContext(ProductContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const featured = getFeaturedProducts();
    setFeaturedProducts(featured);
>>>>>>> feature/home
  }, []);

  return (
    <div className="home">
      <section className="hero">
<<<<<<< HEAD
        <h1>Bienvenido a Nuestra Tienda</h1>
        <p>Descubre productos increíbles al mejor precio</p>
        <Link to="/products" className="btn-primary">
          Ver Productos
=======
        <h1>Welcome to Our E-commerce</h1>
        <p>Discover amazing products at the best prices</p>
        <Link to="/products" className="btn-primary">
          View Products
>>>>>>> feature/home
        </Link>
      </section>

      <section className="featured">
<<<<<<< HEAD
        <h2>Productos Destacados</h2>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
=======
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
>>>>>>> feature/home
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
<<<<<<< HEAD
             <Link to={`/products/${product.id}`} className="btn-secondary">

                Ver Detalles
=======
              <Link to={`/products/${product.id}`} className="btn-secondary">
                View Details
>>>>>>> feature/home
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> feature/home
