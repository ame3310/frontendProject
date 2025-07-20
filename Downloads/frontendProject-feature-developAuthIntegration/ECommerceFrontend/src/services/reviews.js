import axiosInstance from "../utils/axiosInstance";

export const getReviewsByProductId = (productId) => {
  return axiosInstance.get(`/reviews/product/${productId}`);
};

export const createReview = (productId, rating, comment) => {
  return axiosInstance.post(`/reviews`, {
    productId,
    rating,
    comment,
  });
};

export const updateReview = (reviewId, rating, comment) => {
  return axiosInstance.put(`/reviews/${reviewId}`, {
    rating,
    comment,
  });
};

export const deleteReview = (reviewId) => {
  return axiosInstance.delete(`/reviews/${reviewId}`);
};

export const likeReview = (reviewId) => {
  return axiosInstance.post(`/reviews/${reviewId}/like`);
};

export const unlikeReview = (reviewId) => {
  return axiosInstance.delete(`/reviews/${reviewId}/unlike`);
};
