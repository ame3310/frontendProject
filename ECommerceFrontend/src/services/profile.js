import axiosInstance from "../utils/axiosInstance";

export const getUserProfile = () => {
	return axiosInstance.get("/users/profile");
};

export const deleteReview = (id) => {
	return axiosInstance.delete(`/reviews/${id}`);
};

export const updateReview = (id, comment) => {
	return axiosInstance.put(`/reviews/${id}`, { comment });
};
