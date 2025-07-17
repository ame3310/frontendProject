import React, { useContext, useMemo, useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { ProductsContext } from '../../context/ProductsContext/ProductsState.jsx'
import { CartContext } from '../../context/CartContext/CartState.jsx'
import { Typography } from 'antd'
// import { getProducts } from "../utils/api";
import ProductCard from "../../components/Products/ProductCard.jsx";
import SearchBar from "../../components/SearchBar.jsx"; 
import CartList from "../../components/Cart/CartList.jsx";
import "../../styles/main.scss"

const { Title } = Typography

const Products = () => {
  const { getProducts, products = [] } = useContext(ProductsContext)
  const { addCart, cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams();
  const [redirectCountdown, setRedirectCountdown] = useState(null)

  const search = searchParams.get("search") || "";
  const priceMin = searchParams.get("minPrice") || "";
  const priceMax = searchParams.get("maxPrice") || "";

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  useEffect(() => {
      const filters = {
        name: search,
        minPrice: priceMin || undefined,
        maxPrice: priceMax || undefined,
      };
      getProducts(filters)
  }, [search, priceMin, priceMax]);

  const cartListData = useMemo(() =>
    (cart ?? []).map(item => ({
      id: item.id,
      title: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    [cart]
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
    <div className="products-page">
      <div className="products-container">

 
      <div className="filters">
        <SearchBar value={search} onChange={(val) => updateParam("search", val)} />
        <input
          type="number"
          placeholder="Precio mínimo"
          value={priceMin}
          onChange={(e) => updateParam("minPrice", e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={priceMax}
          onChange={(e) => updateParam("maxPrice", e.target.value)}
        />
      </div>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id || product._id} product={product} addCart={addCart} />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
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