import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={`http://localhost:3000/uploads/${product.images?.[0] ?? 'placeholder.jpg'}`}
        alt={product.name}
        width="150"
        height="150"
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