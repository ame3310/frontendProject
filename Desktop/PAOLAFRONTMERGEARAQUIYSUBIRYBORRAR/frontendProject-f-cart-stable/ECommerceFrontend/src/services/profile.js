import axiosInstance from "../utils/axiosInstance";

export const getUserProfile = () => {
  return axiosInstance.get("/users/profile");
};

export const deleteReview = (id) => {
  return axiosInstance.delete(`/reviews/${id}`);
};

export const updateReview = (id, formData) => {
  return axiosInstance.put(`/reviews/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
