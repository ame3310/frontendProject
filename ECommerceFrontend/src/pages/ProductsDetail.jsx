import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm.jsx";
import ReviewList from "../components/ReviewList.jsx";
import {
  getReviewsFromStorage,
  saveReviewToStorage,
  updateReviewLikes,
  getLikedReviews,
  saveLikedReview,
} from "../utils/localStorageReviews";
import "../styles/pages/productsDetail.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [likedReviews, setLikedReviews] = useState(new Set());

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
    setReviews(getReviewsFromStorage(id));
    setLikedReviews(getLikedReviews());
  }, [id]);

  const handleReviewAdded = (newReview) => {
    const reviewWithMeta = {
      ...newReview,
      id: Date.now(), 
      likes: 0,
      username: "UsuarioDemo",
    };
    saveReviewToStorage(id, reviewWithMeta);
    setReviews((prev) => [reviewWithMeta, ...prev]);
  };

  const handleLike = (reviewId) => {
    if (likedReviews.has(reviewId)) return;

    updateReviewLikes(id, reviewId);
    saveLikedReview(reviewId);
    setReviews(getReviewsFromStorage(id));
    setLikedReviews(getLikedReviews());
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="product-detail">
      <img
        src={`http://localhost:3000/uploads/${product.images?.[0] ?? "placeholder.jpg"}`}
        alt={product.name}
      />
      <div className="product-detail__info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Precio:</strong> {product.price} €</p>
      </div>

      <h3>Reseñas</h3>
      <ReviewForm productId={id} onReviewAdded={handleReviewAdded} />
      <ReviewList reviews={reviews} onLike={handleLike} />
    </div>
  );
};

export default ProductDetail;
