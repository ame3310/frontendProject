import axiosInstance from "../utils/axiosInstance";

export const getAllCategories = () => {
  return axiosInstance.get("/categories");
};
