import React, { useContext, useEffect } from 'react'
import { Divider, List, Button, Typography, InputNumber, Popconfirm, Space } from 'antd'
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
  price: item.price,
  quantity: item.quantity,
  actions: [
    <Popconfirm
      key="delete"
      title="¿Quieres eliminar este producto?"
      onConfirm={() => removeFromCart(item._id)}  // Aquí _id
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
    <div style={{ maxWidth: 600, margin: 'auto', padding: '1rem' }}>
      <Divider orientation='left'>
        <Title level={3} style={{ margin: 0 }}>
          <ShoppingCartOutlined /> Carrito de Compras
        </Title>
      </Divider>

      <List
        bordered
        dataSource={cartListData}
        locale={{ emptyText: 'El carrito está vacío' }}
        header={<div style={{ fontWeight: 'bold' }}>Productos seleccionados</div>}
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10 }}>
            <Title level={4} style={{ margin: 0 }}>
              Total: {total.toFixed(2)} €
            </Title>
            <Space>
              <Button danger onClick={clearCart} disabled={cart.length === 0}>
                Vaciar
              </Button>
              <Button type="primary" onClick={createNewOrder} disabled={cart.length === 0}>
                Comprar
              </Button>
            </Space>
          </div>
        }
        renderItem={item => (
          <List.Item actions={item.actions} style={{ padding: '16px 24px' }}>
            <List.Item.Meta
              title={<Text strong>{item.title}</Text>}
              description={
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Text>Precio: <Text strong>{item.price.toFixed(2)} €</Text></Text>
                  <Text>Cantidad:</Text>
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => updateQuantity(item.key, value)}
                    style={{ width: 70 }}
                  />
                  <Text>
                    Subtotal: <Text strong>{(item.price * item.quantity).toFixed(2)} €</Text>
                  </Text>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default Cart
