import SearchBar from "./SearchBar";

const ProductsFilter = ({
  search,
  priceMin,
  priceMax,
  onSearchChange,
  onPriceMinChange,
  onPriceMaxChange,
}) => {
  return (
    <div className="products-filters">
      <SearchBar value={search} onChange={onSearchChange} />

      <input
        type="number"
        placeholder="Precio mínimo"
        value={priceMin}
        onChange={(e) => onPriceMinChange(e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio máximo"
        value={priceMax}
        onChange={(e) => onPriceMaxChange(e.target.value)}
      />
    </div>
  );
};

export default ProductsFilter;
