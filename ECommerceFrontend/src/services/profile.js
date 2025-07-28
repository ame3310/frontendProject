import axiosInstance from "../utils/axiosInstance";

export const getUserProfile = () => {
  return axiosInstance.get("/users/profile");
};

export const updateProfile = (formData) => {
  return axiosInstance.patch("/users/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteReview = (id) => {
  return axiosInstance.delete(`/reviews/${id}`);
};

export const updateReview = (id, formData) => {
  return axiosInstance.put(`/reviews/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
