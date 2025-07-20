import axiosInstance from "../utils/axiosInstance";

export const getAllProducts = () => {
  return axiosInstance.get("/products");
};

export const getProductById = (id) => {
  return axiosInstance.get(`/products/${id}`);
};
