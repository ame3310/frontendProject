import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import "../styles/pages/Home.scss";

const Home = () => {
  const { getFeaturedProducts } = useContext(ProductContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const featured = getFeaturedProducts();
    setFeaturedProducts(featured);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Our E-commerce</h1>
        <p>Discover amazing products at the best prices</p>
        <Link to="/products" className="btn-primary">
          View Products
        </Link>
      </section>

      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <Link to={`/products/${product.id}`} className="btn-secondary">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
