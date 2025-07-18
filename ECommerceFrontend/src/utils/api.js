import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  if (!res.ok) throw new Error("Error al obtener los productos");
  return await res.json();
};
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

