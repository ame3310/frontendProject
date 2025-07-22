import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext/ProductsContext";
import { getProductById } from "../../services/products";
import ProductReviews from "../../components/ProductReviews";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductByIdLocal } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("Producto cargado:", product);

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res.data);
    } catch (err) {
      console.error("Error cargando producto", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedProduct = getProductByIdLocal(id);

    if (cachedProduct) {
      setProduct(cachedProduct);
      setLoading(false);
    } else {
      fetchProduct();
    }
  }, [id, getProductByIdLocal]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-detail">
      <img
        src={`${BACKEND_URL}/uploads/${
          product.images?.[0] ?? "placeholder.jpg"
        }`}
        alt={product.name}
      />

      <div className="product-detail__info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>
          <strong>Precio:</strong> {product.price} €
        </p>
      </div>

      <ProductReviews
        productId={product.id}
        reviews={product.reviews}
        refreshReviews={fetchProduct}
      />
    </div>
  );
};

export default ProductDetail;
