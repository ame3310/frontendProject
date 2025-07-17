import React from 'react'
import { List, Typography, InputNumber, Popconfirm, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import classNames from 'classnames'

const { Text } = Typography

const CartItem = ({ item, onRemove, onQuantityChange, compact = false }) => {
    return (
        <List.Item
        className={classNames('cart-list-item', { compact })}
        actions={[
            <Popconfirm
            key="delete"
            title="¿Quieres eliminar este producto?"
            onConfirm={() => onRemove(item.id)}
            okText="Sí"
            cancelText="No"
            >
            <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>,
        ]}
        >
        <List.Item.Meta
            title={<Text className="product-title">{item.title}</Text>}
            description={
            <div className="product-details">
                <div className="price">
                <Text>
                    Precio: <Text strong>{item.price.toFixed(2)} €</Text>
                </Text>
                </div>
                <div className="quantity">
                <Text>Cantidad:</Text>
                <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => onQuantityChange(item.id, value)}
                    style={{ width: 70 }}
                />
                </div>
                <div className="subtotal">
                <Text>
                    Subtotal:{' '}
                    <Text strong>
                    {(item.price * item.quantity).toFixed(2)} €
                    </Text>
                </Text>
                </div>
            </div>
            }
        />
        </List.Item>
    )
}

export default CartItem