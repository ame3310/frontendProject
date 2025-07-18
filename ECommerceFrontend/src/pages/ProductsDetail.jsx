import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../utils/api";
import "../styles/pages/productsDetail.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res);
      } catch (err) {
        console.error("Error cargando producto", err);
      }
    };
    fetch();
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="product-detail">
     <img
  src={`http://localhost:3000/uploads/${product.images?.[0] ?? 'placeholder.jpg'}`}
  alt={product.name}
/>
      <div className="product-detail__info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>
          <strong>Precio:</strong> {product.price} €
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
