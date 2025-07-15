import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../../context/ProductsContext/ProductsState';
import ProductCard from '../../components/ProductCard';

const Products = () => {
  const { getProducts, products, addCart } = useContext(ProductsContext);

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {products && products.map(product => (
        <ProductCard key={product._id} product={product} addCart={addCart} />
      ))}
    </div>
  );
};

export default Products;
