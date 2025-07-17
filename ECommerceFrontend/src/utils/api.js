import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getProducts = async (filters = {}) => {
  const mappedFilters = {
    ...(filters.name && { name: filters.name }),
    ...(filters.minPrice && { minPrice: filters.minPrice }),
    ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
  };

  const params = new URLSearchParams(mappedFilters).toString();
  const url = `${API_URL}/products?${params}`;
  console.log("[API] URL generada:", url);

  try {
    const response = await axios.get(url);
    console.log("[API] Datos recibidos:", response.data);
    return response.data;
  } catch (err) {
    console.error("[API] Error al obtener productos:", err.message);
    throw err;
  }
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};
