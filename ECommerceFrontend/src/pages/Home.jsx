import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../utils/api";
import "../styles/pages/home.scss";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

const fetchProducts = async () => {
    try {
      const data = await getProducts();
      console.log("Productos cargados en Home:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
      setError("Error cargando productos");
    }
  };

  useEffect(() => {
    fetchProducts();
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
          {error && <p className="error">{error}</p>}
          {!error && products.length === 0 && <p>No products available.</p>}
          {products.map((product) => (
            <div className="product-card" key={product.id}>
 <img
  src={`http://localhost:3000/uploads/${product.image ?? "placeholder.jpg"}`}
  alt={product.name}
  onError={(e) => {
    e.target.onerror = null; 
    e.target.src = "http://localhost:3000/uploads/mario.jpg"; 
  }}
/>

              <h3>{product.name}</h3>
             <p>${product.price ? product.price.toFixed(2) : "N/A"}</p>
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
