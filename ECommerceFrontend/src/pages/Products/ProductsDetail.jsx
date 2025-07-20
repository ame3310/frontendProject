import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../utils/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res);
      } catch (err) {
        console.error("Error cargando producto", err);
      }
    };
    fetch();
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="product-detail">
      <img
        src={`http://localhost:3000/uploads/${product.images?.[0] ?? 'placeholder.jpg'}`}
        alt={product.name}
      />
      <div className="product-detail__info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>
          <strong>Precio:</strong> {product.price} €
        </p>
      </div>

      <section className="product-detail__reviews">
        <h3>Reseñas</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <ul>   
              {product.reviews.map((review) => (
                <li key={review.id} className="review">
                  <p><strong>{review.user}</strong> - {review.rating} ⭐</p>
                  <p>{review.comment}</p>
                </li>
                ))}
            </ul>
          ) : (
            <p>No hay reseñas para este producto.</p>
            )}
        </section>
      </div>       
  );
};

export default ProductDetail;
