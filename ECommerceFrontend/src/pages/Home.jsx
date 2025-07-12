import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import "../styles/pages/Home.scss";

const Home = () => {
  const { products, getFeaturedProducts } = useContext(ProductContext);

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Bienvenido a Nuestra Tienda</h1>
        <p>Descubre productos increíbles al mejor precio</p>
        <Link to="/products" className="btn-primary">
          Ver Productos
        </Link>
      </section>

      <section className="featured">
        <h2>Productos Destacados</h2>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
             <Link to={`/products/${product.id}`} className="btn-secondary">

                Ver Detalles
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;