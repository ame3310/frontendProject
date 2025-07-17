import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../utils/api";
import ProductCard from "../ProductCardMaider";
import '../../styles/main.scss'

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProducts();
        setProducts(res.slice(0, 6));
      } catch (err) {
        console.error("Error al cargar productos", err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="home-page">
      <main className="home">
            <section className="home_hero">
              <div className="home_hero-text">
                <h1>
                  Bienvenido a <span>Terminal Goods</span>
                </h1>
                <p>Explora productos tecnológicos únicos al mejor precio.</p>
                <Link to="/products" className="btn-primary">
                  Ver productos
                </Link>
              </div>
              <img src="/hero-image.jpg" alt="Hero" className="home_hero-img" />
            </section>

            <section className="home_featured">
              <h2>Productos Destacados</h2>
              <div className="product-grid">
                {products.length === 0 ? (
                  <p>Cargando productos...</p>
                ) : (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
              <Link to="/products" className="btn-secondary">
                Ver todos los productos
              </Link>
            </section>
        </main>
    </div>
    
  );
};

export default Home;
