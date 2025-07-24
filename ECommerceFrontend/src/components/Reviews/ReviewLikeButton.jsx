import { useState } from "react";
import { likeReview, unlikeReview } from "../../services/reviews";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Button, message } from "antd";
import { useAuth } from "../../context/AuthContext/AuthContext";

const ReviewLikeButton = ({ review, refreshReviews }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const hasLiked = Boolean(review.likedByUser);

  const handleToggleLike = async () => {
    if (!user) {
      message.warning("Debes iniciar sesión para dar like.");
      return;
    }

    setLoading(true);

    try {
      if (hasLiked) {
        await unlikeReview(review.id);
      } else {
        await likeReview(review.id);
      }

      if (refreshReviews) {
        await refreshReviews();
      }
    } catch {
      message.error("Error al actualizar el like.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      icon={hasLiked ? <LikeFilled /> : <LikeOutlined />}
      type={hasLiked ? "primary" : "default"}
      onClick={handleToggleLike}
      loading={loading}>
      {review.likeCount ?? 0}
    </Button>
  );
};

export default ReviewLikeButton;
