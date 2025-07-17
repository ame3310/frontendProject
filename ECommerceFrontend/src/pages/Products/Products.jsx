import { useContext, useEffect, useMemo, useState } from 'react'
import { ProductsContext } from '../../context/ProductsContext/ProductsState'
import { CartContext } from '../../context/CartContext/CartState'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../../components/Products/ProductCard'
import CartList from '../../components/Cart/CartList'
import { Row, Col, Typography } from 'antd'

const { Title } = Typography

const Products = () => {
  const { getProducts, products = []} = useContext(ProductsContext)
  const { addCart, cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [redirectCountdown, setRedirectCountdown] = useState(null) 

  useEffect(() => {
    getProducts()
  }, [])

  const cartListData = useMemo(() =>
    (cart ?? []).map(item => ({
      id: item.id,
      title: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    [cart]
  );
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
    <div className="products-page">
        <div className="products-list">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id || product._id} product={product} addCart={addCart} />
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-sidebar">
            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Title level={4}>🛒 Carrito</Title>
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
        )}
      </div>
    )
}

export default Products
