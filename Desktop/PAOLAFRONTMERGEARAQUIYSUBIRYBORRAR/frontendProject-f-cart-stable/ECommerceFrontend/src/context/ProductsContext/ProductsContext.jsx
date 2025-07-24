import { createContext, useContext, useState } from "react";
import { getAllProducts } from "../../services/products";
import { addFavorite, removeFavorite } from "../../services/favorites";
import { useAuth } from "../AuthContext/AuthContext";

const ProductsContext = createContext();
export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const { user } = useAuth();

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getAllProducts();
      let products = res.data;

      if (user?.favorites?.length > 0) {
        const favoriteIds = user.favorites.map((fav) => fav.id);

        products = products.map((product) => ({
          ...product,
          isFavorite: favoriteIds.includes(product.id),
        }));
      }

      setAllProducts(products);
      setFilteredProducts(products);
    } catch (err) {
      console.error("Error al cargar productos:", err.message);
      setError(err.message || "Error al cargar productos.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = ({ name = "", minPrice = 0, maxPrice = Infinity }) => {
    const filtered = allProducts.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(name.toLowerCase());
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      return matchesName && matchesPrice;
    });

    setFilteredProducts(filtered);
  };

  const toggleFavorite = async (productId) => {
    const updatedProducts = [...allProducts];
    const index = updatedProducts.findIndex((p) => p.id === productId);

    if (index === -1) return;

    const product = updatedProducts[index];
    const currentlyFavorite = product?.isFavorite === true;

    // Actualización optimista
    product.isFavorite = !currentlyFavorite;
    setAllProducts([...updatedProducts]);
    setFilteredProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isFavorite: !currentlyFavorite } : p
      )
    );

    try {
      if (currentlyFavorite) {
        await removeFavorite(productId);
      } else {
        await addFavorite(productId);
      }
    } catch (error) {
      console.error(
        `[ProductsContext] Error al ${
          currentlyFavorite ? "quitar" : "añadir"
        } favorito:`,
        error?.response?.data?.message || error.message
      );

      // Revertir en caso de error
      product.isFavorite = currentlyFavorite;
      setAllProducts([...updatedProducts]);
      setFilteredProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, isFavorite: currentlyFavorite } : p
        )
      );
    }
  };

  const getProductByIdLocal = (id) => {
    return allProducts.find((p) => p.id === parseInt(id)) || null;
  };

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        filteredProducts,
        loading,
        error,
        loadProducts,
        applyFilters,
        toggleFavorite,
        getProductByIdLocal,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
