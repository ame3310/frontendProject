import { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext/ProductsState'
import { CartContext } from '../../context/CartContext/CartState';
import { Card, Tag, Typography, Button } from 'antd';
const { Title, Paragraph, Text } = Typography;

const ProductCard = ({ product}) => {
  const { addCart } = useContext(CartContext)
  const imageUrl = product.images
    ? `http://localhost:3000/uploads/${product.images}`
    : './default-product.png';

  return (
    <Card
      hoverable
      className="product-card"
      cover={
        <img
          alt={product.name}
          src={imageUrl}
        />
      }
      actions={[
        <Button
          type='primary'
          onClick={() => {
            addCart(product);
          }}
        >
          Añadir al carrito
        </Button>,
      ]}
    >
      <Title level={4} className="product-title">{product.name}</Title>
      <Paragraph className="product-description">{product.description}</Paragraph>
      <Text className="product-price">Precio: </Text>
      <Text>{product.price.toFixed(2)} €</Text>
      <div className="product-tags">
        {product.categories && product.categories.length > 0 ? (
          product.categories.map((c) => (
            <Tag color="blue" key={c.name}>{c.name}</Tag>
          ))
        ) : (
          <Tag color="default">Sin categoría</Tag>
        )}
      </div>
    </Card>
  );
};

export default ProductCard