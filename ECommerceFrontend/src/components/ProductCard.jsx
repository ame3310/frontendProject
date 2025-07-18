import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ProductCard = ({ product, currentUser }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(product.isFavorite || false);
  }, [product]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await fetch(`http://localhost:3000/api/favorites/${product.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await fetch(`http://localhost:3000/api/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.id }),
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error actualizando favorito", error);
    }
  };

  return (
    <div className="product-card">
      <img
        src={`http://localhost:3000/uploads/${product.images?.[0] ?? "placeholder.jpg"}`}
        alt={product.name}
        width="150"
        height="150"
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>

      <button onClick={toggleFavorite} className="btn-favorite">
        {isFavorite ? "❤️ Quitar favorito" : "🤍 Añadir favorito"}
      </button>

      <Link to={`/products/${product.id}`} className="btn-secondary">
        Ver detalles
      </Link>
    </div>
  );
};

export default ProductCard;
