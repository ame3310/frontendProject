<<<<<<< HEAD
import { Link, Outlet } from "react-router-dom";

const Products = () => {
  const products = [
    { id: 1, name: "Camiseta" },
    { id: 2, name: "Zapatos" },
    { id: 3, name: "Gorra" },
  ];

  return (
    <div>
      <h2>Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
=======
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/pages/Products.scss";

const allProductsData = [
  { id: 1, name: "Camiseta básica", category: "ropa", price: 15 },
  { id: 2, name: "Zapatillas deportivas", category: "ropa", price: 75 },
  { id: 3, name: "El nombre del viento", category: "libros", price: 20 },
  {
    id: 4,
    name: "Sapiens: De animales a dioses",
    category: "libros",
    price: 25,
  },
  { id: 5, name: "Smartphone XYZ", category: "tecnología", price: 350 },
  {
    id: 6,
    name: "Auriculares Bluetooth ABC",
    category: "tecnología",
    price: 60,
  },
];

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let filtered = allProductsData;

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (searchText.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min)) {
      filtered = filtered.filter((product) => product.price >= min);
    }

    if (!isNaN(max)) {
      filtered = filtered.filter((product) => product.price <= max);
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, searchText, minPrice, maxPrice]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavs) =>
      prevFavs.includes(id)
        ? prevFavs.filter((favId) => favId !== id)
        : [...prevFavs, id]
    );
  };

  return (
    <div className="products">
      <h2 style={{ color: "#fda085" }}>Productos</h2>

      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />

      <div className="filters" style={{ marginBottom: "1rem" }}>
        <button
          className={categoryFilter === "all" ? "active" : ""}
          onClick={() => setCategoryFilter("all")}
        >
          Todos
        </button>
        <button
          className={categoryFilter === "ropa" ? "active" : ""}
          onClick={() => setCategoryFilter("ropa")}
        >
          Ropa
        </button>
        <button
          className={categoryFilter === "libros" ? "active" : ""}
          onClick={() => setCategoryFilter("libros")}
        >
          Libros
        </button>
        <button
          className={categoryFilter === "tecnología" ? "active" : ""}
          onClick={() => setCategoryFilter("tecnología")}
        >
          Tecnología
        </button>
      </div>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
          min="0"
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
          min="0"
        />
      </div>

      <ul className="product-list">
        {filteredProducts.map((product) => {
          const isFavorite = favorites.includes(product.id);
          return (
            <li key={product.id} style={{ position: "relative" }}>
              <Link to={`${product.id}`}>
                {product.name} — <strong>${product.price.toFixed(2)}</strong>
              </Link>
              <button
                onClick={() => toggleFavorite(product.id)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: isFavorite ? "red" : "#ccc",
                  transition: "color 0.3s ease",
                }}
                aria-label={
                  isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"
                }
              >
                {isFavorite ? "❤️" : "🤍"}
              </button>
            </li>
          );
        })}
      </ul>

>>>>>>> feature/home
      <Outlet />
    </div>
  );
};

export default Products;
