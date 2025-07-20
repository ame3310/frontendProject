import ProductCard from "./ProductCard";

const ProductGrid = ({ products, loading, error, onAddToCart }) => {
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (products.length === 0) return <p>No hay productos disponibles.</p>;

  return (
    <div className="products-grid">
      {products.map((p) => (
        <div key={p.id} className="product-wrapper">
          <ProductCard product={p} size="large" />
          <button onClick={() => onAddToCart(p)}>Añadir al carrito</button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
