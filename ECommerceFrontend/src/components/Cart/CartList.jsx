import React from 'react'
import { List, Typography } from 'antd'
import CartItem from './CartItem'

const { Title } = Typography

const CartList = ({ cartData, onRemove, onQuantityChange }) => {
  return (
    <List
      bordered
      dataSource={cartData}
      locale={{ emptyText: 'El carrito está vacío' }}
      header={<div style={{ fontWeight: 'bold' }}>Productos seleccionados</div>}
      renderItem={(item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={onRemove}
          onQuantityChange={onQuantityChange}
        />
      )}
    />
  )
}

export default CartList