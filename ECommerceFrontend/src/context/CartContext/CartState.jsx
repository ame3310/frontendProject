import { createContext, useReducer, useEffect } from "react";
import cartReducer from "./CartReducer";

const loadCartFromStorage = () => {
    try {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error al leer el carrito desde localStorage:", error);
        return [];
    }
};

const initialState = {
    cart: loadCartFromStorage(),
};
export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }, [state.cart]);

    const addCart = (product) =>
        dispatch({ type: "ADD_CART", payload: product });

    const removeFromCart = (id) =>
        dispatch({ type: "REMOVE_FROM_CART", payload: id });

    const updateQuantity = (id, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

    const clearCart = () =>
        dispatch({ type: "CLEAR_CART" });

    return (
        <CartContext.Provider
        value={{
            cart: state.cart,
            addCart,
            removeFromCart,
            updateQuantity,
            clearCart,
        }}
        >
        {children}
        </CartContext.Provider>
    );
};
