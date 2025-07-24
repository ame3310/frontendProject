import axiosInstance from "../utils/axiosInstance";

export const addFavorite = (productId) => {
  return axiosInstance.post(`/users/favorites/${productId}`);
};

export const removeFavorite = (productId) => {
  return axiosInstance.delete(`/users/favorites/${productId}`);
};
