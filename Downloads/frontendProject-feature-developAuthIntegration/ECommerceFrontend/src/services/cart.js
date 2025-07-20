import axiosInstance from "../../utils/axiosInstance";

export const createOrderService = (cart) => {
  return axiosInstance.post("/orders", { products: cart });
};
