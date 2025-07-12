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

      {/* Renders <ProductDetail /> if route matches */}
      <Outlet />
    </div>
  );
};

export default Products;