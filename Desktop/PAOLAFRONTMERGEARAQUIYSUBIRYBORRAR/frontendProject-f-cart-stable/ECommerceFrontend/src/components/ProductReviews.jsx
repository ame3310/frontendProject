import { useState } from "react";
import { Typography, Button, Input, Rate, message, Spin } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext/AuthContext.jsx";
import { createReview, likeReview, unlikeReview } from "../services/reviews";

const { Title, Text } = Typography;

const ProductReviews = ({ productId, reviews = [], refreshReviews }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setLoadingReview(true);
    try {
      await createReview(productId, rating, comment);
      message.success("Review añadida con éxito.");
      setComment("");
      setRating(5);
      await refreshReviews();
    } catch {
      message.error("Error al enviar la review.");
    } finally {
      setLoadingReview(false);
    }
  };

  const handleToggleLike = async (review) => {
    if (!user) {
      message.warning("Debes iniciar sesión para dar like.");
      return;
    }

    setLoadingLike(true);
    try {
      if (review.likedByUser) {
        await unlikeReview(review.id);
      } else {
        await likeReview(review.id);
      }
      await refreshReviews();
    } catch {
      message.error("Error al actualizar el like.");
    } finally {
      setLoadingLike(false);
    }
  };

  return (
    <div className="product-reviews">
      <Title level={4}>Reseñas de este producto</Title>

      {(loadingLike || loadingReview) && <Spin />}

      {reviews.length === 0 && !loadingLike && !loadingReview && (
        <p>Este producto aún no tiene reseñas.</p>
      )}

      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <Text strong>
            {review.User?.userName || review.User?.email || "Anónimo"}
          </Text>
          <p>{review.comment}</p>
          <p>⭐ {review.rating} / 5</p>

          <Button
            icon={review.likedByUser ? <LikeFilled /> : <LikeOutlined />}
            type={review.likedByUser ? "primary" : "default"}
            onClick={() => handleToggleLike(review)}
            disabled={loadingLike}>
            {review.likeCount ?? 0}
          </Button>
        </div>
      ))}

      {user ? (
        <div className="review-form">
          <Title level={5}>Escribe tu review</Title>
          <Rate
            value={rating}
            onChange={setRating}
            style={{ marginBottom: "1rem" }}
            disabled={loadingReview}
          />
          <Input.TextArea
            rows={4}
            placeholder="Escribe tu comentario..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loadingReview}
            style={{ marginBottom: "1rem" }}
          />
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loadingReview}
            disabled={!comment.trim() || loadingReview}>
            Añadir review
          </Button>
        </div>
      ) : (
        <p>Inicia sesión para escribir una review o dar likes.</p>
      )}
    </div>
  );
};

export default ProductReviews;
