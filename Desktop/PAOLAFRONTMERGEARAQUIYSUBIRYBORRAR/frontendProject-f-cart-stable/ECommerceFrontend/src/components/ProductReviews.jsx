import { useState, useEffect } from "react";
import { Typography, Button, Input, Rate, message, Spin } from "antd";
import { useAuth } from "../context/AuthContext/AuthContext.jsx";
import { getReviewsByProductId, createReview } from "../services/reviews";
import ReviewLikeButton from "./Reviews/ReviewLikeButton";

const { Title, Text } = Typography;

const ProductReviews = ({ productId }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loadingReview, setLoadingReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingFetch, setLoadingFetch] = useState(true);

  const fetchReviews = async () => {
    setLoadingFetch(true);
    try {
      const res = await getReviewsByProductId(productId);
      setReviews(res.data);
    } catch (err) {
      console.error("Error al obtener reviews:", err);
      message.error("No se pudieron cargar las reseñas.");
    } finally {
      setLoadingFetch(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setLoadingReview(true);
    try {
      await createReview(productId, rating, comment);
      message.success("Review añadida con éxito.");
      setComment("");
      setRating(5);
      await fetchReviews();
    } catch {
      message.error("Error al enviar la review.");
    } finally {
      setLoadingReview(false);
    }
  };

  return (
    <div className="product-reviews">
      <Title level={4}>Reseñas de este producto</Title>

      {loadingFetch && <Spin />}

      {!loadingFetch && reviews.length === 0 && (
        <p>Este producto aún no tiene reseñas.</p>
      )}

      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <Text strong>
            {review.User?.userName || review.User?.email || "Anónimo"}
          </Text>
          <p>{review.comment}</p>
          <p>⭐ {review.rating} / 5</p>
          <p>👍 Likes: {review.likeCount}</p>
          <ReviewLikeButton review={review} refreshReviews={fetchReviews} />
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
