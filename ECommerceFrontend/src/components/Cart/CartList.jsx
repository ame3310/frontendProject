import React from 'react'
import { List, Typography, Button, Space } from 'antd'
import CartItem from './CartItem'

const { Title } = Typography

const CartList = ({ cartData, onRemove, onQuantityChange, compact = false, onClear, onCheckout }) => {
    return (
        <>
        <List
        size={compact ? "small" : "default"}
        bordered={!compact}
        dataSource={cartData}
        locale={{ emptyText: 'El carrito está vacío' }}
        header={!compact && <div style={{ fontWeight: 'bold' }}>Productos seleccionados</div>}
        renderItem={(item) => (
            <CartItem
            key={item.id}
            item={item}
            onRemove={onRemove}
            onQuantityChange={onQuantityChange}
            compact={compact}
            />
            )}
        />
        {compact && cartData.length > 0 && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Space>
                <Button danger onClick={onClear}>
                Vaciar
                </Button>
                <Button type="primary" onClick={onCheckout}>
                Hacer pedido
                </Button>
            </Space>
            </div>
        )}
        </>
    )
    }

export default CartList