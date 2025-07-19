import React, { useEffect, useState, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../utils/api'
import ProductCard from '../components/ProductCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import '../assets/styles/pages/products.scss'
import { CartContext } from '../context/CartContext/CartState.jsx'

const Products = () => {
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const { addCart } = useContext(CartContext)
  const search = searchParams.get('search') || ''
  const priceMin = searchParams.get('minPrice') || ''
  const priceMax = searchParams.get('maxPrice') || ''

  useEffect(() => {
    const fetch = async () => {
      const filters = {
        name: search,
        minPrice: priceMin || undefined,
        maxPrice: priceMax || undefined,
      }
      try {
        const res = await getProducts(filters)
        console.log('✅ Productos recibidos:', res)
        setProducts(res)
      } catch (err) {
        console.error('Error cargando productos', err)
      }
    }
    fetch()
  }, [search, priceMin, priceMax])

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) newParams.set(key, value)
    else newParams.delete(key)
    setSearchParams(newParams)
  }

  const handleAddToCart = (product) => {
    addCart(product)
  }

  return (
    <div className='products-page'>
      <h2>Todos los productos</h2>

      <div className='filters'>
        <SearchBar
          value={search}
          onChange={(val) => updateParam('search', val)}
        />
        <input
          type='number'
          placeholder='Precio mínimo'
          value={priceMin}
          onChange={(e) => updateParam('minPrice', e.target.value)}
        />
        <input
          type='number'
          placeholder='Precio máximo'
          value={priceMax}
          onChange={(e) => updateParam('maxPrice', e.target.value)}
        />
      </div>

      <div className='products-grid'>
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          products.map(p => (
            <div key={p.id} className="product-wrapper">
              <ProductCard product={p} />
              <button onClick={() => handleAddToCart(p)}>Añadir al carrito</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Products
