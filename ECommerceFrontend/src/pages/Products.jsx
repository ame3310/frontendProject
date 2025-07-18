import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../utils/api";
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx"; 
import "../styles/pages/products.scss";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const priceMin = parseFloat(searchParams.get("priceMin")) || 0;
  const priceMax = parseFloat(searchParams.get("priceMax")) || Infinity;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProducts();
        const filtered = allProducts.filter((p) => {
          const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
          const matchPrice = p.price >= priceMin && p.price <= priceMax;
          return matchSearch && matchPrice;
        });
        setProducts(filtered);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchData();
  }, [search, priceMin, priceMax]);

 const handleFilter = ({ search, priceMin, priceMax }) => {
  const params = {};
  if (search) params.search = search;

  const min = parseFloat(priceMin);
  const max = parseFloat(priceMax);

  if (!isNaN(min)) params.priceMin = min;
  if (!isNaN(max)) params.priceMax = max;

  setSearchParams(params);
};
  return (
    <div className="products-page">
      <h2>Todos los productos</h2>
      <SearchBar
        initialSearch={search}
        initialPriceMin={priceMin}
        initialPriceMax={priceMax}
        onFilter={handleFilter}
      />
      <div className="products-grid">
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </div>
  );
};

export default Products;
