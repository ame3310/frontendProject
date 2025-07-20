import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {getProducts} from '../utils/api'
import ProductCard from '../components/ProductCard'
import './home.scss'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProducts()
        setProducts(res.slice(0, 6))
      } catch (err) {
        console.error('Error al cargar productos', err)
      }
    }
    fetch()
  }, [])

  return (
    <main className='home'>
      <section className='home__hero'>
        <div>
          <h1>
            Bienvenido a <span>Terminal Goods</span>
          </h1>
          <p>Explora productos tecnológicos únicos al mejor precio.</p>
          <Link to='/products' className='btn-primary'>
            Ver productos
          </Link>
        </div>
      </section>

      <section className='home__featured'>
        <h2>Productos Destacados</h2>
        <div className='home__product-grid'>
          {products.length === 0 ? (
            <p>Cargando productos...</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} size="medium" hideAddToCart/>
            ))
          )}
        </div>
      </section>
    </main>
  )
}

export default Home
