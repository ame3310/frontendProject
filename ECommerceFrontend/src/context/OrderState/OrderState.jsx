import { createContext } from "react";
import axios from "axios";

const initialState = {};
const API_URL = import.meta.env.VITE_API_URL;

const OrderContext = createContext(initialState)
const OrderProvider = ({children}) => {
    const createOrder = async (order) => {
        const token = JSON.parse(localStorage.getItem('token'))
        const res = await axios.post(
            API_URL + '/api/orders',
            { productIds: order},
            {
                headers: {
                    authorization: token
                }
            }
        )
        return res
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