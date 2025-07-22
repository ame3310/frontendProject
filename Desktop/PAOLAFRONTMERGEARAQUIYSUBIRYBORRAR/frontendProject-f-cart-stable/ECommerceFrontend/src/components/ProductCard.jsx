import { useState } from "react";
import { Link } from "react-router-dom";
import { Tag, Modal, Tooltip } from "antd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { useProducts } from "../context/ProductsContext/ProductsContext";
import { useAuth } from "../context/AuthContext/AuthContext";

const ProductCard = ({
  product,
  size = "medium",
  onAddToCart,
  hideAddToCart = false,
}) => {
  const { user } = useAuth();
  const { toggleFavorite } = useProducts();

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const isFavorite = product.isFavorite;

  const [showModal, setShowModal] = useState(false);

  const handleFavoriteClick = () => {
    if (!user) return;

    if (isFavorite) {
      setShowModal(true);
    } else {
      toggleFavorite(product.id);
    }
  };

  const confirmRemoveFavorite = () => {
    toggleFavorite(product.id);
    setShowModal(false);
  };

  return (
    <div
      className={`product-card product-${size} ${isFavorite ? "favorite" : ""}`}
      style={{ position: "relative" }}>
      {user && (
        <Tooltip
          title={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}>
          <IconButton
            onClick={handleFavoriteClick}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Tooltip>
      )}

      <img
        src={`${BACKEND_URL}/uploads/${
          product.images?.[0] ?? "default-product.png"
        }`}
        alt={product.name}
      />

      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Precio: {product.price}€</p>

      <div className="product-card__categories">
        {product.categories && product.categories.length > 0 ? (
          product.categories.map((c) => (
            <Tag color="blue" key={c.name}>
              {c.name}
            </Tag>
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
          onClick={() => onAddToCart && onAddToCart(product)}>
          Añadir al carrito
        </button>
      )}

      <Modal
        title="¿Eliminar de favoritos?"
        open={showModal}
        onOk={confirmRemoveFavorite}
        onCancel={() => setShowModal(false)}
        okText="Sí, eliminar"
        cancelText="Cancelar"
        centered>
        <p>¿Quieres quitar "{product.name}" de tus favoritos?</p>
      </Modal>
    </div>
  );
};

export default ProductCard;
