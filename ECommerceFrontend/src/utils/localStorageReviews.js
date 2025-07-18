export const getReviewsFromStorage = (productId) => {
  const data = localStorage.getItem(`reviews_${productId}`);
  return data ? JSON.parse(data) : [];
};

export const saveReviewToStorage = (productId, review) => {
  const existing = getReviewsFromStorage(productId);
  localStorage.setItem(
    `reviews_${productId}`,
    JSON.stringify([review, ...existing])
  );
};

export const updateReviewLikes = (productId, reviewId) => {
  const reviews = getReviewsFromStorage(productId);
  const updated = reviews.map((r) =>
    r.id === reviewId ? { ...r, likes: (r.likes || 0) + 1 } : r
  );
  localStorage.setItem(`reviews_${productId}`, JSON.stringify(updated));
};

export const getLikedReviews = () => {
  const liked = localStorage.getItem("likedReviews");
  return liked ? new Set(JSON.parse(liked)) : new Set();
};

export const saveLikedReview = (reviewId) => {
  const liked = getLikedReviews();
  liked.add(reviewId);
  localStorage.setItem("likedReviews", JSON.stringify([...liked]));
};



