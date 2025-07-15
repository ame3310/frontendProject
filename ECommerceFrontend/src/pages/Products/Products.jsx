import { useContext, useEffect } from 'react'
import { ProductsContext } from '../../context/ProductsContext/ProductsState'
import ProductCard from '../../components/Products/ProductCard'
import { Row, Col } from 'antd'

const Products = () => {
  const { getProducts, products, addCart } = useContext(ProductsContext)

  useEffect(() => {
    getProducts()
  }, [])

return (
    <div className="products-list" style={{ padding: '2rem' }}>
      <Row gutter={[16, 16]} justify="center">
        {products && products.map((product) => (
          <Col
            key={product.id || product._id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
          >
            <ProductCard product={product} addCart={addCart} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Products
