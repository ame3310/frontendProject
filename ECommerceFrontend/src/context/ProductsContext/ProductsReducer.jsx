const products = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "ADD_CART": {
      const product = action.payload;
      const exists = state.cart.find((item) => item.id === product.id);

      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...product, quantity: 1 }],
        };
      }
    } 
    case "REMOVE_FROM_CART":
  return {
    ...state,
    cart: state.cart.filter((item) => item._id !== action.payload),
  };

case "UPDATE_QUANTITY":
  return {
    ...state,
    cart: state.cart.map((item) =>
      item._id === action.payload.id
        ? { ...item, quantity: action.payload.quantity }
        : item
    ),
  };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default products;
