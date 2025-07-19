import React, { useContext, useEffect, useMemo } from 'react'
import { Divider, Typography, Button, Space, message } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { CartContext } from '../../context/CartContext/CartState'
import { OrderContext } from '../../context/OrdersContext/OrdersState'

import CartList from '../../components/Cart/CartList'

const { Title } = Typography

const CartPage = () => {
  const {
    cart,
    clearCart,
    removeFromCart,
    updateQuantity,
  } = useContext(CartContext)

  const { createOrder } = useContext(OrderContext)
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const cartListData = useMemo(() =>
    (cart ?? []).map(item => ({
      id: item.id,
      title: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    [cart]
  )
  const total = useMemo(() => 
  (cart ?? []).reduce((acc, item) => acc + item.price * item.quantity, 0),
  [cart])

  const createNewOrder = async () => {
      try {
        await createOrder(cart)
        clearCart()
        setTimeout(() => {
        message.success('Pedido realizado con éxito')
        }, 0)
      } catch (error) {
        console.error('Error creando pedido', error)
        setTimeout(() => {
        if (error.response?.status === 401) {
          messageApi.error('Oops, necesitas estar logueado para hacer pedidos.', 10)
        } else {
          messageApi.error('Error al realizar el pedido. Intentalo de nuevo.', 10)
        }
      }, 0)
    }
  }  

  return (
    <div className='cart-container'>
      {contextHolder}
      <Divider orientation='left' className='cart-header'>
        <Title level={3} style={{ margin: 0 }}>
          <ShoppingCartOutlined /> Carrito de Compras
        </Title>
      </Divider>

      <CartList
        cartData={cartListData}
        onRemove={removeFromCart}
        onQuantityChange={updateQuantity}
      />

      <div className='cart-footer'>
        <div className='cart-total'>
        <Title level={4} style={{ margin: 0 }}>
          Total: {total.toFixed(2)}€
        </Title>
        </div>
      <div className='cart-actions'>
        <Space>
          <Button danger onClick={clearCart} disabled={(cart ?? []).length === 0}>
            Vaciar
          </Button>
          <Button type="primary" onClick={createNewOrder} disabled={(cart ?? []).length === 0}>
            Comprar
          </Button>
        </Space>        
      </div>  
    </div>
    </div>
  )
}

export default CartPage