import { Link } from "react-router-dom";
import { Tag } from "antd"

const ProductCard = ({ product, size = 'medium', onAddToCart, hideAddToCart = false }) => {
  return (
    <div className={`product-card product-${size}`}>
      <img
        src={`http://localhost:3000/uploads/${product.images?.[0] ?? '/default-product.png'}`}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Precio: {product.price}€</p>
      <div className="product-card__categories">
        {product.categories && product.categories.length > 0 ? (
          product.categories.map((c) => (
            <Tag color="blue" key={c.name}>{c.name}</Tag>
          ))
        ) : (
          <Tag color="default">Sin categoría</Tag>
        )}
      </div>
      <Link to={`/products/${product.id}`} className="btn-secondary">
        Ver detalles
      </Link>
      {!hideAddToCart && (
      <button
          className="btn-primary"
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          Añadir al carrito
        </button>
      )}
    </div>
  );
};

export default ProductCard;