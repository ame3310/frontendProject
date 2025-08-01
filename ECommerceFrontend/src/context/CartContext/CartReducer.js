const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_CART": {
			const product = action.payload;
			const exists = state.cart.find((item) => item.id === product.id);
			if (exists) {
				return {
					...state,
					cart: state.cart.map((item) =>
						item.id === product.id
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
				cart: state.cart.filter((item) => item.id !== action.payload),
			};
		case "UPDATE_QUANTITY":
			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.payload.id
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

export default cartReducer;
