import { createContext, useReducer } from "react";
import axios from "axios";
import AdminReducer from "./AdminReducer";

const initialState = {
    users: [],
    orders: [],
    products: [],
    error: null,
};

export const AdminContext = createContext(initialState);

const API_URL = "http://localhost:3000/api";
const token = localStorage.getItem("token");
const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: token ? `Bearer ${token}` : "",
    },
    });

export const AdminProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AdminReducer, initialState);

    const getUsers = async () => {
        try {
        const res = await api.get("/users");
        dispatch({ type: "GET_USERS", payload: res.data });
        } catch (err) {
        dispatch({ type: "ADMIN_ERROR", payload: err.message });
        console.error("Error cargando usuarios:", err.message);
        }
    };

    const getOrders = async () => {
        try {
        const res = await api.get("/orders");
        dispatch({ type: "GET_ORDERS", payload: res.data });
        } catch (err) {
        dispatch({ type: "ADMIN_ERROR", payload: err.message });
        console.error("Error cargando pedidos:", err.message);
        }
    };

    const getProducts = async () => {
        try {
        const res = await api.get("/products");
        dispatch({ type: "GET_PRODUCTS", payload: res.data });
        } catch (err) {
        dispatch({ type: "ADMIN_ERROR", payload: err.message });
        console.error("Error cargando productos:", err.message);
        }
    };

    const addProduct = async (newProductData) => {
    try {
        const res = await api.post('/products', newProductData);
        dispatch({ type: 'ADD_PRODUCT', payload: res.data });
    } catch (err) {
        dispatch({ type: 'ADMIN_ERROR', payload: err.message });
        console.error('Error añadiendo producto:', err.message);
        }
    };

    const updateUser = async (id, updatedData) => {
        try {
        const res = await api.put(`/users/${id}`, updatedData);
        dispatch({ type: "UPDATE_USER", payload: res.data });
        } catch (err) {
        dispatch({ type: "ADMIN_ERROR", payload: err.message });
        console.error("Error actualizando usuario:", err.message);
        }
    };

    const updateProduct = async (id, updatedData) => {
        try {
        const res = await api.put(`/products/${id}`, updatedData);
        dispatch({ type: "UPDATE_PRODUCT", payload: res.data });
        } catch (err) {
        dispatch({ type: "ADMIN_ERROR", payload: err.message });
        console.error("Error actualizando producto:", err.message);
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
            }}
        >
        {children}
        </AdminContext.Provider>
    );
};
