import { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext/ProductsState'
import { Card, Tag, Typography, Button } from 'antd';
const { Title, Paragraph, Text } = Typography;

const ProductCard = ({ product}) => {
  const { addCart } = useContext(ProductsContext)

  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.name}
          src={product.image || "/default-product.png"}
          style={{ height: 200, objectFit: 'cover' }}
        />
      }
      style={{ width: 300, margin: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      actions={[
        <Button type='primary' onClick={() => {
          addCart(product)
        }}>
          Añadir al carrito
        </Button>
      ]}  
      >
      <Title level={4}>{product.name}</Title>
      <Paragraph>{product.description}</Paragraph>
      <Text strong>Precio: </Text>
      <Text>{product.price.toFixed(2)} €</Text>
      <div style={{ marginTop: '0.5rem' }}>
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