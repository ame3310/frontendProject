const ProductsReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        error: null,
      };

    case "PRODUCTS_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "TOGGLE_FAVORITE":
      const productId = action.payload;
      const isAlreadyFavorite = state.favorites.includes(productId);
      return {
        ...state,
        favorites: isAlreadyFavorite
          ? state.favorites.filter((id) => id !== productId)
          : [...state.favorites, productId],
      };

    default:
      return state;
  }
};

export default ProductsReducer;
