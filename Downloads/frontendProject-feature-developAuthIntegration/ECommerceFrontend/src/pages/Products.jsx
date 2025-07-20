import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useContext } from "react";
import { CartContext } from "../context/CartContext/CartState.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import "../assets/styles/pages/products.scss";

const Products = () => {
  const { filteredProducts, loadProducts, applyFilters, loading, error } =
    useProducts();

  const { addCart } = useContext(CartContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const priceMin = searchParams.get("minPrice") || "";
  const priceMax = searchParams.get("maxPrice") || "";

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters({
      name: search,
      minPrice: parseFloat(priceMin) || 0,
      maxPrice: parseFloat(priceMax) || Infinity,
    });
  }, [search, priceMin, priceMax]);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  const handleAddToCart = (product) => {
    addCart(product);
  };

  return (
    <div className="products-page">
      <h2>Todos los productos</h2>

      <div className="filters">
        <SearchBar
          value={search}
          onChange={(val) => updateParam("search", val)}
        />
        <input
          type="number"
          placeholder="Precio mínimo"
          value={priceMin}
          onChange={(e) => updateParam("minPrice", e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={priceMax}
          onChange={(e) => updateParam("maxPrice", e.target.value)}
        />
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p>Error: {error}</p>}

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          filteredProducts.map((p) => (
            <div key={p.id} className="product-wrapper">
              <ProductCard product={p} size="large" />
              <button onClick={() => handleAddToCart(p)}>
                Añadir al carrito
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
