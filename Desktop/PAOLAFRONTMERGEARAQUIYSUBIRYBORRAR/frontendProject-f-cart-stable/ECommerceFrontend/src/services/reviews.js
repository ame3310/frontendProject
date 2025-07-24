import axiosInstance from "../utils/axiosInstance";

export const getReviewsByProductId = (productId) => {
  return axiosInstance.get(`/reviews/product/${productId}`);
};

export const getAllReviewsByUser = () => {
  return axiosInstance.get("/reviews/user");
};

export const createReview = (productId, rating, comment) => {
  return axiosInstance.post(`/reviews`, {
    productId,
    rating,
    comment,
  });
};

export const updateReview = (reviewId, formData) => {
  return axiosInstance.put(`/reviews/${reviewId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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
