import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProductCard = ({ product, size = "medium" }) => {
  const { toggleFavorite } = useProducts();

  const handleFavoriteClick = () => {
    toggleFavorite(product.id);
  };

  return (
    <div
      className={`product-card product-${size} ${
        product.isFavorite ? "favorite" : ""
      }`}>
      <div
        className="favorite-badge"
        onClick={handleFavoriteClick}
        style={{ cursor: "pointer" }}>
        {product.isFavorite ? "❤️" : "🤍"}
      </div>

      <img
        src={`${BACKEND_URL}/uploads/${
          product.images?.[0] ?? "placeholder.jpg"
        }`}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>

      <Link to={`/products/${product.id}`} className="btn-secondary">
        Ver detalle
      </Link>
    </div>
  );
};

export default ProductCard;
