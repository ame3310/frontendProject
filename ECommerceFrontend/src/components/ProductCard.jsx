import { Link } from "react-router-dom";

const ProductCard = ({ product, size = 'medium' }) => {
  return (
    <div className={`product-card product-${size}`}>
      <img
        src={`http://localhost:3000/uploads/${product.images?.[0] ?? 'placeholder.jpg'}`}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <Link to={`/products/${product.id}`} className="btn-secondary">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;