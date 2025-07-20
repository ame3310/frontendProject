import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { getProducts } from '../../utils/api.js'
import ProductCard from '../../components/ProductCard.jsx'
import SearchBar from '../../components/SearchBar.jsx'
import CartList from '../../components/Cart/CartList.jsx'
import '../assets/styles/pages/products.scss'
import { CartContext } from '../../context/CartContext/CartState.jsx'

const Products = () => {
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const { addCart, cart, removeFromCart, updateQuantity,clearCart } = useContext(CartContext)
  const navigate = useNavigate()
  const search = searchParams.get('search') || ''
  const priceMin = searchParams.get('minPrice') || ''
  const priceMax = searchParams.get('maxPrice') || ''

  const [redirectCountdown, setRedirectCountdown] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProducts() 
        setAllProducts(res)
        setFilteredProducts(res)
      } catch (err) {
        console.error('Error cargando productos', err)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    let filtered = allProducts

    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (priceMin) {
      filtered = filtered.filter(p => p.price >= Number(priceMin))
    }

    if (priceMax) {
      filtered = filtered.filter(p => p.price <= Number(priceMax))
    }

    setFilteredProducts(filtered)
  }, [search, priceMin, priceMax, allProducts])

    const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)
  }
  
  const handleAddToCart = (product) => {
    addCart(product)
  }

  const cartListData = useMemo(() =>
    (cart ?? []).map(item => ({
      id: item.id,
      title: item.name,
      price: item.price,
      quantity: item.quantity,
    })),[cart]
  )
  const handleClearCart = () => clearCart()
  const goToCartPageWithCountdown = () => {
    let count = 3
    setRedirectCountdown(count)
    const interval = setInterval(() => {
      count -= 1
      if (count > 0) {
        setRedirectCountdown(count)
      } else {
        clearInterval(interval)
        setRedirectCountdown(null)
        navigate('/cart')
      }
    }, 1000)
  }

  return (
    <div className='products-page'>
      <h2>Listado de productos</h2>
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

        <div className={`products-grid ${cart.length > 0 ? 'with-sidebar' : ''}`}>
          {filteredProducts.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            filteredProducts.map(p => (
              <div key={p.id} className="product-wrapper">
                <ProductCard product={p} size="large" onAddToCart={handleAddToCart}/>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-container compact">
            <div className="cart-sidebar">
              <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4>🛒 Carrito</h4>
              </Link>

              {redirectCountdown !== null && (
                <div style={{ marginBottom: '1rem', color: 'orange', fontWeight: 'bold', textAlign: 'center' }}>
                  Serás redirigido en {redirectCountdown}...
                </div>
              )}

              <CartList
                cartData={cartListData}
                onRemove={removeFromCart}
                onQuantityChange={updateQuantity}
                onClear={handleClearCart}
                onCheckout={goToCartPageWithCountdown}
                compact
              />
            </div>
          </div>
        )}   
    </div>
  )
}

export default Products
