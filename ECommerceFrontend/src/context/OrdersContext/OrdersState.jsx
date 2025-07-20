import { createContext } from "react";
import axios from "axios";

const initialState = {};
const API_URL = import.meta.env.VITE_API_URL;

const OrderContext = createContext(initialState)

const OrderProvider = ({children}) => {
    const createOrder = async (cart) => {
        try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error("No hay token de autenticación");
        const items = cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
        }));

            const res = await axios.post(
                `${API_URL}/orders`,
                { items },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            return res.data 
        }
        catch (error) {
    console.error("Error creando pedido:", error.response?.data || error.message);
    throw error;
    }
        }
        
    return (
        <OrderContext.Provider 
        value={{
            createOrder,
        }}
        >
            {children}
        </OrderContext.Provider>
    )
}
export {OrderContext, OrderProvider}