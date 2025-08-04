import { createContext, useReducer } from "react";
import AdminReducer from "./AdminReducer";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  users: [],
  orders: [],
  products: [],
  categories: [],
  error: null,
};

export const AdminContext = createContext(initialState);

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initialState);

  const getUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      dispatch({ type: "GET_USERS", payload: res.data });
    } catch (err) {
      dispatch({ type: "ADMIN_ERROR", payload: err.message });
      console.error("Error cargando usuarios:", err.message);
    }
  };

  const getOrders = async () => {
    try {
      const res = await axiosInstance.get("/orders");
      dispatch({ type: "GET_ORDERS", payload: res.data });
    } catch (err) {
      dispatch({ type: "ADMIN_ERROR", payload: err.message });
      console.error("Error cargando pedidos:", err.message);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      dispatch({ type: "GET_PRODUCTS", payload: res.data });
    } catch (err) {
      dispatch({ type: "ADMIN_ERROR", payload: err.message });
      console.error("Error cargando productos:", err.message);
    }
  };
  const getCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      dispatch({ type: "GET_CATEGORIES", payload: res.data });
    } catch (err) {
      dispatch({ type: "ADMIN_ERROR", payload: err.message });
      console.error("Error cargando categorías:", err.message);
    }
  };

  const addProduct = async (newProductData) => {
    try {
      const res = await axiosInstance.post("/products", newProductData);
      dispatch({ type: "ADD_PRODUCT", payload: res.data });
    } catch (err) {
      dispatch({ type: "ADMIN_ERROR", payload: err.message });
      console.error("Error añadiendo producto:", err.message);
    }
  };

  const updateUser = async (userData) => {
    try {
      const res = await axiosInstance.patch(`/users/profile`, userData);
      dispatch({ type: "UPDATE_USER", payload: res.data });
    } catch (err) {
      dispatch({ type: "ADMIN_ERROR", payload: err.message });
      console.error("Error actualizando usuario:", err.message);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const res = await axiosInstance.patch(`/products/${id}`, updatedData);
      dispatch({ type: "UPDATE_PRODUCT", payload: res.data });
    } catch (err) {
      dispatch({ type: "ADMIN_ERROR", payload: err.message });
      console.error("Error actualizando producto:", err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      dispatch({ type: "DELETE_USER", payload: id });
    } catch (err) {
      dispatch({ type: "ADMIN_ERROR", payload: err.message });
      console.error("Error borrando usuario:", err.message);
    }
  };

  const getUser = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      dispatch({ type: "GET_USER", payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };

const createCategory = async (categoryData) => {
  try {
    const res = await axiosInstance.post("/categories", categoryData);
    dispatch({ type: "ADD_CATEGORY", payload: res.data });
    return res.data;
  } catch (err) {
    dispatch({ type: "ADMIN_ERROR", payload: err.message });
    console.error("Error añadiendo categoría:", err.message);
    throw err;
  }
};

  return (
    <AdminContext.Provider
      value={{
        users: state.users,
        orders: state.orders,
        products: state.products,
        error: state.error,
        getUsers,
        getOrders,
        getProducts,
        addProduct,
        updateUser,
        updateProduct,
        deleteUser,
        categories: state.categories,
        getCategories,
        getUser,
        createCategory,
      }}>
      {children}
    </AdminContext.Provider>
  );
};
