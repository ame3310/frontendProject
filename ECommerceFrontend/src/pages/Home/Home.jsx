import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../services/products";
import ProductCard from "../../components/ProductCard";
import "./home.scss";
import homeHeroBg from "../../assets/images/nobg.png";
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import judgingCat from "../../assets/images/judgingCat.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data.slice(0, 6));
      } catch (err) {
        console.error("Error al cargar productos", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="home" >
      <section className="home__hero" style={{ "--home-hero-bg": `url(${homeHeroBg})` }}>
        <div>
          <h1>
            Bienvenido a <span>MichiStore</span>
          </h1>
          <p>Donde los gatos mandan... y tú pagas.</p>
          <Link to="/products" className="btn-primary">
            Aquí, humano
          </Link>
        </div>
      </section>

      <section className="home__featured">
        <h2>Tributos Destacados</h2>
          {products.length === 0 ? (
            <p>Cargando productos...</p>
          ) : (
            <>
          <p className="swipe-hint">Desliza para ver más productos</p>            
          <Swiper
            spaceBetween={50}
            slidesPerView={1} 
            centeredSlides={true}
            loop={true}
            navigation
            pagination={{ clickable: true }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  product={product}
                  size="medium"
                  hideAddToCart
                />
              </SwiperSlide>
            ))}
          </Swiper>
          </>
          )}
      </section>
      <section className="home__cta">
        <div className="cta-text">
          <h3>¿Aún no has ofrecido tu tributo?</h3>
          <p>Los gatos están impacientes... y tú procrastinando. 🐾</p>
          <div className="cta-button-wrapper">    
            <Link to="/products" className="btn-secondary">Redímete ahora</Link>
          </div> 
        </div>
        <div className="cta-img" role="img" aria-label="Gato juzgando">
          <img src={judgingCat} alt="Gato juzgando" />
        </div>
      </section>
    </main>
  );
};

export default Home;
