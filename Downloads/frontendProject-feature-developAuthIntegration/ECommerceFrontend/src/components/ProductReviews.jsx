import { useState } from "react";
import { Typography, Button, Input, Rate, message } from "antd";
import { useAuth } from "../context/AuthContext";
import { createReview, likeReview, unlikeReview } from "../services/reviews";

const { Title, Text } = Typography;

const ProductReviews = ({ productId, reviews = [], refreshReviews }) => {
  const { user } = useAuth();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setLoading(true);
    try {
      await createReview(productId, rating, comment);
      message.success("Review añadida con éxito.");
      setComment("");
      setRating(5);
      if (refreshReviews) refreshReviews();
    } catch {
      message.error("Error al enviar la review.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLike = async (review) => {
    try {
      if (review.likedByUser) {
        await unlikeReview(review.id);
      } else {
        await likeReview(review.id);
      }
      if (refreshReviews) refreshReviews();
    } catch {
      message.error("Error al actualizar el like.");
    }
  };

  return (
    <div className="product-reviews">
      <Title level={4}>Reseñas de este producto</Title>

      {reviews.length === 0 && <p>Este producto aún no tiene reseñas.</p>}

      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <Text strong>{review.User?.userName || "Anónimo"}</Text>
          <p>{review.comment}</p>
          <p>⭐ {review.rating} / 5</p>
          <p>Likes: {review.likes?.length ?? 0}</p>

          {user && (
            <Button
              size="small"
              type={review.likedByUser ? "primary" : "default"}
              onClick={() => handleToggleLike(review)}>
              {review.likedByUser ? "Quitar Like" : "Dar Like"}
            </Button>
          )}
        </div>
      ))}

      {user && (
        <div className="review-form">
          <Title level={5}>Escribe tu review</Title>
          <Rate
            value={rating}
            onChange={setRating}
            style={{ marginBottom: "1rem" }}
          />
          <Input.TextArea
            rows={4}
            placeholder="Escribe tu comentario..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={!comment.trim()}>
            Añadir review
          </Button>
        </div>
      )}

      {!user && <p>Inicia sesión para escribir una review o dar likes.</p>}
    </div>
  );
};

export default ProductReviews;
