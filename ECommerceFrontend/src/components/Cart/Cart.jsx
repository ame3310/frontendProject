import React, { useContext, useEffect } from 'react'
import { Divider, List, Button, Typography, InputNumber, Popconfirm } from 'antd'
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons'

import { ProductsContext } from '../../context/ProductsContext/ProductsState'
import { OrderContext } from '../../context/OrderContext/OrderState'

const { Title, Text } = Typography

const Cart = () => {
  const {
    cart,
    clearCart,
    removeFromCart,
    updateQuantity
  } = useContext(ProductsContext)

  const { createOrder } = useContext(OrderContext)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const cartListData = cart.map(item => ({
    key: item._id,
    title: item.name,
    description: (
      <>
        <Text>Precio: {item.price}€</Text><br />
        <Text>Cantidad: </Text>
        <InputNumber
          min={1}
          value={item.quantity}
          onChange={(value) => updateQuantity(item.key, value)}
          style={{ width: 60 }}
        />
      </>
    ),
    actions: [
      <Popconfirm
        title="¿Quieres eliminar este producto?"
        onConfirm={() => removeFromCart(item._id)}
        okText="Sí"
        cancelText="No"
      >
        <Button danger icon={<DeleteOutlined />} />
      </Popconfirm>
    ],
  }))

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const createNewOrder = async () => {
    try {
      await createOrder(cart)
      clearCart()
    } catch (error) {
      console.error('Error creando pedido', error)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <Divider orientation='left'>
        <Title level={3}><ShoppingCartOutlined /> Carrito de Compras</Title>
      </Divider>

      <List
        bordered
        dataSource={cartListData}
        renderItem={item => (
          <List.Item actions={item.actions}>
            <List.Item.Meta
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
        locale={{ emptyText: 'El carrito está vacío' }}
        header={<div>Productos seleccionados:</div>}
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div><strong>Total:</strong> {total.toFixed(2)}€</div>
            <div>
              <Button onClick={clearCart}>Vaciar</Button>{' '}
              <Button
                type='primary'
                onClick={createNewOrder}
                disabled={cart.length === 0}
              >
                Comprar
              </Button>
            </div>
          </div>
        }
      />
    </div>
  )
}

export default Cart
