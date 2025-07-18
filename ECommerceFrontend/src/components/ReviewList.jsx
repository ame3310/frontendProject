import React, { useState, useEffect } from "react";

const ReviewList = ({ reviews }) => {
  const [localReviews, setLocalReviews] = useState([]);


  useEffect(() => {
    setLocalReviews(reviews.map((r) => ({ ...r })));
  }, [reviews]);

  const handleLike = (reviewId) => {
    setLocalReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, likes: (review.likes || 0) + 1 }
          : review
      )
    );
  };

  return (
    <div className="review-list">
      {localReviews.map((review) => (
        <div key={review.id} className="review-item">
          <p><strong>{review.username}</strong>: {review.text}</p>
          {review.photoUrl && (
            <img
              src={`http://localhost:3000/uploads/${review.photoUrl}`}
              alt="review"
              width="150"
            />
          )}
          <button onClick={() => handleLike(review.id)}>
            ❤️ {review.likes || 0}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
