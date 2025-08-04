const AdminReducer = (state, action) => {
	switch (action.type) {
		case "GET_USERS":
			return { ...state, users: action.payload };
		case "GET_ORDERS":
			return { ...state, orders: action.payload };
		case "GET_PRODUCTS":
			return { ...state, products: action.payload };
		case "GET_CATEGORIES":
			return {
				...state,
				categories: action.payload,
			};
		case "ADD_PRODUCT":
			return {
				...state,
				products: [...state.products, action.payload],
			};
		case "UPDATE_USER":
			return {
				...state,
				users: state.users.map((u) =>
					u.id === action.payload.id ? action.payload : u
				),
			};
		case "UPDATE_PRODUCT":
			return {
				...state,
				products: state.products.map((p) =>
					p.id === action.payload.id ? action.payload : p
				),
			};
		case "DELETE_PRODUCT":
			return {
				...state,
				products: state.products.filter((p) => p.id !== action.payload),
			};
		case "DELETE_USER":
			return {
				...state,
				users: state.users.filter((user) => user.id !== action.payload),
			};
		case "ADD_CATEGORY":
			return {
				...state,
				categories: [...state.categories, action.payload],
			};
		case "ADMIN_ERROR":
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default AdminReducer;
