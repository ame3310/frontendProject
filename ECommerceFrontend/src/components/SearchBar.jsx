import React, { useState } from "react";

const SearchBar = ({ initialSearch, initialPriceMin, initialPriceMax, onFilter }) => {
  const [search, setSearch] = useState(initialSearch || "");
  const [priceMin, setPriceMin] = useState(initialPriceMin || "");
  const [priceMax, setPriceMax] = useState(initialPriceMax || "");

const handleSubmit = (e) => {
  e.preventDefault();
  onFilter({
    search,
    priceMin: priceMin !== "" ? parseFloat(priceMin) : undefined,
    priceMax: priceMax !== "" ? parseFloat(priceMax) : undefined,
  });
};

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio mínimo"
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio máximo"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
      />
      <button type="submit" className="btn-primary">Buscar</button>
    </form>
  );
};

export default SearchBar;